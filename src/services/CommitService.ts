import { personalAccessToken } from '../secret/githubApi'
import { Iso8601Timestamp } from '../types/date-time';
import { ICommit, ICommitState, IFormattedCommit } from '../types/commits';
import { applyQueryParams } from '../utils/fetch';

export const endpoint = 'https://api.github.com/repos/vuejs/vue/commits'

class CommitServiceClass {
  private sinceCache = '';
  private untilCache = '';
  private commitCache: ICommit[] = [];
  private headers = {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `token ${personalAccessToken}`
  };
  private defaultQueryParams = {
    per_page: 10
  }
  // TODO we are now duplicating state. Both here and in CommitContext. Perhaps we can keep state there and give fetchCommits a `useCache` param
  private currentPage = 1;
  private totalNumberOfPages: number|undefined = undefined;
  private linkHeaderPagesRegEx = /&page=(\d+)/

  async fetchCommits({ since, until, page }: IFetchCommitOptions): Promise<ICommitState> {
    if(since === this.sinceCache && this.currentPage === page && until === this.untilCache) {
      console.log('returning cache')
      return this.returnCache();
    }

    const response = await fetch(applyQueryParams(endpoint, {
      ...this.defaultQueryParams,
      page,
    }), {
      headers: this.headers
    });

    if(!response.ok) {
      return this.returnError({ since, until });
    }

    await this.handleSuccess(response, { since, page, until });

    return {
      error: '',
      numberOfPages: this.totalNumberOfPages,
      commits: this.commitCache,
      since,
      until,
    }
  }

  formatCommits(commits: ICommit[], locale: string|undefined = undefined): IFormattedCommit[] {
    return commits.map(commit => {
      const clonedCommit: IFormattedCommit = {...commit};
      const date = new Date(clonedCommit.commit.author.date);
      clonedCommit.commit.author.formattedDate = new Intl.DateTimeFormat(locale, { dateStyle: 'full', timeStyle: 'medium' }).format(date)
      return commit;
    })
  }

  // Cache is implemented so the formattedDate is recalculated when changing language
  // without the need for a new API call
  private returnCache() {
    return {
      error: '',
      commits: this.commitCache,
      numberOfPages: this.totalNumberOfPages,
      since: this.sinceCache,
      until: this.untilCache,
    }
  }

  private returnError({ since, until }: Omit<IFetchCommitOptions, 'page'>) {
    return {
      error: 'Unable to fetch commits', // TODO translate
      numberOfPages: undefined,
      commits: [],
      since,
      until,
    }
  }

  private async handleSuccess(response: Response, { since, page, until }: IFetchCommitOptions) {
    const commits = await response.json();
    this.totalNumberOfPages = this.getTotalNumberOfPagesFromHeaders(response);
    this.sinceCache = since;
    this.untilCache = until;
    this.currentPage = page;
    this.commitCache = commits;
  }

  private getTotalNumberOfPagesFromHeaders(response: Response): number {
    const headers = response.headers;
    // example:
    // <https://api.github.com/repositories/11730342/commits?per_page=10&page=2>; rel="next", <https://api.github.com/repositories/11730342/commits?per_page=10&page=320>; rel="last"
    const linkHeader = headers.get('Link');
    if(!linkHeader) {
      return 1
    }

    const splitLinkHeader = linkHeader.split(',')
    const linkToLastPage = splitLinkHeader.find(link => link.includes('rel="last"'));
    const matches = linkToLastPage && linkToLastPage.match(this.linkHeaderPagesRegEx);

    return matches ? Number(matches[1]) : 1
  }
}

// Singleton, will allow for caching responses, but also cancelling unfinished requests (for example during navigation)
export const CommitService = new CommitServiceClass();

export interface IFetchCommitOptions {
  since: Iso8601Timestamp,
  until: Iso8601Timestamp,
  page: number
}
