import { personalAccessToken } from '../secret/githubApi'
import { nowTimestamp } from '../utils/date-time';
import { Iso8601Timestamp } from '../types/date-time';
import { ICommit, ICommitState, IFormattedCommit } from '../types/commits';

export const endpoint = 'https://api.github.com/repos/vuejs/vue/commits'

class CommitServiceClass {
  private sinceCache = '';
  private commitCache: ICommit[] = [];
  private headers = {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `token ${personalAccessToken}`
  };

  async fetchCommits(since: Iso8601Timestamp = nowTimestamp()): Promise<ICommitState> {
    if(since === this.sinceCache) {
      return this.returnCache();
    }

    const response = await fetch(endpoint, {
      headers: this.headers
    });

    if(!response.ok) {
      return this.returnError(since);
    }

    const commits = await response.json();
    this.sinceCache = since;
    this.commitCache = commits;

    return {
      error: '',
      commits,
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
      since: this.sinceCache,
    }
  }

  private returnError(since: Iso8601Timestamp) {
    return {
      error: 'Unable to fetch commits', // TODO translate
      commits: [],
      since,
    }
  }
}

// Singleton, will allow for caching responses, but also cancelling unfinished requests (for example during navigation)
export const CommitService = new CommitServiceClass();
