# Bloomreach SPA

Boilerplate based on [CRA Must Have Libraries](https://www.npmjs.com/package/cra-template-must-have-libraries)

## Requirements

- Use React or Angular ✅
- Css or SCSS/SASS ✅
- Commit overview
    - Fetch commits via Github API
    - List view, newest on top
        - List item show first line of each commit + timestamp
            - Use ellipsis
        - Separate components for List + ListItem
        - Date range
- Commit detail page
    - At least full commit message
    - Others:
        - Timestamp
        - Link to issues?
        - Committer
- Properly tested

## Architecture

### Pages

- CommitOverviewPage
- CommitDetailPage

### Components

- CommitOverviewList
    - Loading spinner? Skeleton/shimmer component?
    - Lazy loading? Pagination?
- CommitOverviewListItem
- CommitOverviewDateRangePicker

### Services

- FetchCommitsService

### State management

- Redux? Context hook?
    - For this assignment Redux might be a bit overkill

### Testing

- Unit tests: use Enzyme for basic component tests, use Jest for service logic
- Integration tests: check if needed, could be that Enzyme is enough, otherwise Cypress. Will need to remove Puppeteer 
that came with template

## Time log

### August 16th
- 10:45 - 11:20 create boilerplate / remove unused parts, start thinking about architecture, document in README.md
- 11:20 - 12:15 read up a bit on hooks, make a start on the CommitService
- 12:50 - 13:15 Implement StateContext and StateProvider
