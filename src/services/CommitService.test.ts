import { endpoint, CommitService } from './CommitService'

const fetchMock = jest.fn(() => {
  return Promise.resolve({
    json: () => Promise.resolve(),
  })
}) as jest.Mock;

global.fetch = fetchMock

describe('CommitService', () => {
  it('should call the Github API', async function () {
    await CommitService.fetchCommits();

    const call = fetchMock.mock.calls[0];
    expect(call[0]).toBe(endpoint);
  });
});
