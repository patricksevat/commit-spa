# Bloomreach SPA

Boilerplate based on [CRA Must Have Libraries](https://www.npmjs.com/package/cra-template-must-have-libraries)

## Requirements

- Use React or Angular ✅
- Css or SCSS/SASS ✅
- Commit overview
    - Fetch commits via Github API ✅
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
    - TODO want to add Suspense?
    - TODO error handling? Perhaps Error Boundaries

### Testing

- Unit tests: use Enzyme for basic component tests, use Jest for service logic
- Integration tests: check if needed, could be that Enzyme is enough, otherwise Cypress. Will need to remove Puppeteer 
that came with template

### Focus points

- No focus on A11y, I've shown that in the previous demo
- No focus on theming, I've shown that in previous demo
- Focus on services
- Focus on testing

### 

## Time log

### August 16th
- 10:45 - 11:20 create boilerplate / remove unused parts, start thinking about architecture, document in README.md
- 11:20 - 12:15 read up a bit on hooks, make a start on the CommitService
- 12:50 - 13:15 Implement StateContext and StateProvider
- 13:15 - 14:00 CommitService tests, 
- 14:00 - start on OverviewPage
