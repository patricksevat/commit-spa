import { personalAccessToken } from '../secret/githubApi'
import { nowTimestamp } from '../utils/date-time';
import { Iso8601Timestamp } from '../types/date-time';
import { ICommit, ICommitState, IFormattedCommit } from '../types/commits';
import { applyQueryParams } from '../utils/fetch';

export const endpoint = 'https://api.github.com/repos/vuejs/vue/commits'

class CommitServiceClass {
  private sinceCache = '';
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

  async fetchCommits(since: Iso8601Timestamp = nowTimestamp(), page = 1): Promise<ICommitState> {
    if(since === this.sinceCache && this.currentPage === page) {
      return this.returnCache();
    }

    const response = await fetch(applyQueryParams(endpoint, {
      ...this.defaultQueryParams,
      page,
    }), {
      headers: this.headers
    });

    if(!response.ok) {
      return this.returnError(since);
    }

    await this.handleSuccess(response, { since, page });

    return {
      error: '',
      numberOfPages: this.totalNumberOfPages,
      commits: this.commitCache,
      since
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

  private returnCache() {
    return {
      error: '',
      commits: this.commitCache,
      numberOfPages: this.totalNumberOfPages,
      since: this.sinceCache,
    }
  }

  private returnError(since: Iso8601Timestamp) {
    return {
      error: 'Unable to fetch commits', // TODO translate
      numberOfPages: undefined,
      commits: [],
      since,
    }
  }

  private async handleSuccess(response: Response, { since, page }: {since: Iso8601Timestamp, page: number}) {
    const commits = await response.json();
    this.totalNumberOfPages = this.getTotalNumberOfPagesFromHeaders(response);
    this.sinceCache = since;
    this.currentPage = page;
    this.commitCache = commits;
  }

  private getTotalNumberOfPagesFromHeaders(response: Response): number|undefined {
    const headers = response.headers;
    // example:
    // <https://api.github.com/repositories/11730342/commits?per_page=10&page=2>; rel="next", <https://api.github.com/repositories/11730342/commits?per_page=10&page=320>; rel="last"
    const linkHeader = headers.get('Link');
    if(!linkHeader) {
      return undefined
    }

    const splitLinkHeader = linkHeader.split(',')
    const linkToLastPage = splitLinkHeader.find(link => link.includes('rel="last"'));
    const matches = linkToLastPage && linkToLastPage.match(this.linkHeaderPagesRegEx);

    return matches ? Number(matches[1]) : undefined
  }
}

// Singleton, will allow for caching responses, but also cancelling unfinished requests (for example during navigation)
export const CommitService = new CommitServiceClass();
