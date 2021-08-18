import { personalAccessToken } from '../secret/githubApi'
import { Iso8601Timestamp } from '../types/date-time';
import { ICommit, ICommitState, IFormattedCommit } from '../types/commits';
import { applyQueryParams } from '../utils/fetch';

export const endpoint = 'https://api.github.com/repos/vuejs/vue/commits'

class CommitServiceClass {
  private headers = {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `token ${personalAccessToken}`
  };
  private defaultQueryParams = {
    per_page: 10
  }
  private linkHeaderPagesRegEx = /&page=(\d+)/

  async fetchCommits({ since, until, page }: IFetchCommitOptions): Promise<ICommitState> {
    const response = await fetch(applyQueryParams(endpoint, {
      ...this.defaultQueryParams,
      page,
    }), {
      headers: this.headers
    });

    if(!response.ok) {
      return this.returnError({ since, until });
    }

    return this.returnSuccess(response, { since, page, until });
  }

  formatCommits(commits: ICommit[], locale: string|undefined = undefined): IFormattedCommit[] {
    return commits.map(commit => {
      const clonedCommit: IFormattedCommit = {...commit};
      const date = new Date(clonedCommit.commit.author.date);
      clonedCommit.commit.author.formattedDate = new Intl.DateTimeFormat(locale, { dateStyle: 'full', timeStyle: 'medium' }).format(date)
      return commit;
    })
  }

  private returnError({ since, until }: Omit<IFetchCommitOptions, 'page'>) {
    return {
      error: 'unableToFetchCommits',
      numberOfPages: undefined,
      commits: [],
      since,
      until,
    }
  }

  private async returnSuccess(response: Response, { since, page, until }: IFetchCommitOptions) {
    const commits = await response.json();
    return {
      error: '',
      numberOfPages: this.getTotalNumberOfPagesFromHeaders(response),
      commits,
      since,
      until,
    }
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
