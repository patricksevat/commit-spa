import { personalAccessToken } from '../../secret/githubApi'
import { Iso8601Timestamp, nowTimestamp } from '../utils/date-time';

export const endpoint = 'https://api.github.com/repos/bloomreach/brxm/commits'

class CommitServiceClass {
  async fetchCommits(since: Iso8601Timestamp = nowTimestamp()) {
    const response = await fetch(endpoint, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${personalAccessToken}`
      }
    });

    if(!response.ok) {
      // TODO handle error
    }

    return response.json();
  }
}

// Singleton, will allow for caching responses, but also cancelling unfinished requests (for example during navigation)
export const CommitService = new CommitServiceClass();
