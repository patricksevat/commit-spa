import { personalAccessToken } from '../secret/githubApi'
import { nowTimestamp } from '../utils/date-time';
import { Iso8601Timestamp } from '../types/date-time';
import { ICommitState } from '../types/commits';

export const endpoint = 'https://api.github.com/repos/bloomreach/brxm/commits'

class CommitServiceClass {
  async fetchCommits(since: Iso8601Timestamp = nowTimestamp()): Promise<ICommitState> {
    const response = await fetch(endpoint, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${personalAccessToken}`
      }
    });

    if(!response.ok) {
      return {
        error: 'Unable to fetch commits', // TODO translate
        commits: [],
        since,
      }
    }

    return {
      error: '',
      commits: await response.json(),
      since
    }
  }
}

// Singleton, will allow for caching responses, but also cancelling unfinished requests (for example during navigation)
export const CommitService = new CommitServiceClass();
