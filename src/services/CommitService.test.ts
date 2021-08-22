import { endpoint, CommitService } from './CommitService'
import { personalAccessToken } from '../secret/githubApi'
import { mockedCommits } from '../utils/mocks'

const fetchMock = jest.fn(() => {
  return Promise.resolve({
    json: () => Promise.resolve(mockedCommits),
    ok: true,
    headers: {
      get: () => `<https://api.github.com/repositories/11730342/commits?per_page=10&page=2>; rel="next", <https://api.github.com/repositories/11730342/commits?per_page=10&page=320>; rel="last"`,
    },
  })
}) as jest.Mock

global.fetch = fetchMock

describe('CommitService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('fetchCommits()', () => {
    it('should call the Github API', async function () {
      await CommitService.fetchCommits({ since: 'api', page: 1, until: '' })

      const call = fetchMock.mock.calls[0]
      expect(call[0]).toContain(endpoint)
    })

    it('should call the Github API with queryParams', async function () {
      await CommitService.fetchCommits({ since: 'api', page: 1, until: '' })

      const call = fetchMock.mock.calls[0]
      expect(call[0]).toContain('page=')
      expect(call[0]).toContain('until=')
      expect(call[0]).toContain('since=')
    })

    it('should add correct headers', async function () {
      await CommitService.fetchCommits({ since: 'headers', page: 1, until: '' })

      const call = fetchMock.mock.calls[0]
      expect(call[1]).toMatchObject({
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${personalAccessToken}`,
        },
      })
    })

    it('should return commits', async function () {
      const result = await CommitService.fetchCommits({ since: 'iso8601', page: 1, until: '' })

      expect(fetchMock).toHaveBeenCalledTimes(1)
      expect(result).toMatchObject({
        error: '',
        commits: mockedCommits,
        // See fetch mock headers
        numberOfPages: 320,
      })
    })

    it('should handle errors', async function () {
      fetchMock.mockReturnValueOnce(
        Promise.resolve({
          ok: false,
          status: 500,
        })
      )

      const result = await CommitService.fetchCommits({ since: 'error', page: 1, until: '' })

      expect(result).toMatchObject({
        error: 'unableToFetchCommits',
        commits: [],
        numberOfPages: undefined,
      })
    })
  })

  describe('formatCommits()', () => {
    it('should add formattedDate property in provided locale', function () {
      const formattedCommits = CommitService.formatCommits(mockedCommits, 'nl-nl')
      expect(formattedCommits[0].commit.author.formattedDate).toBe('dinsdag 17 augustus 2021 om 11:11:19')
    })
  })
})
