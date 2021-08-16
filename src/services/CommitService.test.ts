import { endpoint, CommitService } from './CommitService'
import { personalAccessToken } from '../secret/githubApi';
import { ICommit } from '../types/commits';

const mockedCommits: ICommit[] = [{
  sha: '123',
  commit: {
    author: {
      name: 'Patrick',
      date: 'iso8601',
    },
    message: 'feat(): awesome',
  },
  html_url: 'https://foo.com/commit123',
  author: {
    login: 'sevatpmc',
    url: 'https://foo.com/sevatpmc',
    avatar_url: '',
  }
}]

const fetchMock = jest.fn(() => {
  return Promise.resolve({
    json: () => Promise.resolve(mockedCommits),
    ok: true,
  })
}) as jest.Mock;

global.fetch = fetchMock

describe('CommitService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should call the Github API', async function () {
    await CommitService.fetchCommits();

    const call = fetchMock.mock.calls[0];
    expect(call[0]).toBe(endpoint);
  });

  it('should add correct headers', async function () {
    await CommitService.fetchCommits();

    const call = fetchMock.mock.calls[0];
    expect(call[1]).toMatchObject({
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${personalAccessToken}`
      }
    });
  });

  it('should return commits', async function () {
    const result = await CommitService.fetchCommits('iso8601');

    expect(result).toMatchObject({
      error: '',
      commits: mockedCommits,
      since: 'iso8601'
    })
  });

  it('should handle errors', async function () {
    fetchMock.mockReturnValueOnce(Promise.resolve({
      ok: false,
      status: 500,
    }));

    const result = await CommitService.fetchCommits('iso8601');

    expect(result).toMatchObject({
      error: 'Unable to fetch commits',
      commits: [],
      since: 'iso8601'
    })
  });
});