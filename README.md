# Commit SPA

Boilerplate based on [CRA Must Have Libraries](https://www.npmjs.com/package/cra-template-must-have-libraries).

I have chosen for React as a framework, because it has been a while since I worked with React and am interested in
learning how hooks work and combining React with TypeScript.

## Install & run

Install dependencies: 

`$ yarn install`

Start app:

`$ yarn start`

Run unit tests (assumes no changes):

`$ yarn test`

Run e2e tests: 

`$ yarn test:e2e`

## Self review

Overall, I'm reasonably happy with this assignment. The lack of experience with React in the couple of years caused several timesinks
such as finding the right useContext pattern, React + TS config and testing patterns. The app itself works as expected and has
a good seperation of concerns, but could be slighly cleaner here and there.

- Shared state using `useContext` was fun to do, but took some iterations until I found the pattern that worked
    - Reviewing CommitService now, perhaps that some of the individual states can be grouped together to make it a bit cleaner
_ I think the separation of concerns between pages, components, services and context is good,
- TypeScript + React was tricky here and there
- Testing: "okay-ish"
    - Unit: main logic is under test, coverage on components can be improved. Utils should definitively be covered
    - Integration: all user interactions under test, so thats good.
        - Was struggling a bit with WebdriverIO + TypeScript support, that can be improved

## Requirements

- Use React or Angular ✅
- Css or SCSS/SASS ✅
- Commit overview
    - Fetch commits via Github API ✅
    - List view ✅
        - newest on top ✅
        - List item show first line of each commit + timestamp ✅
            - Use ellipsis ✅
        - Separate components for List + ListItem ✅
        - Date range ✅
- Commit detail page ✅
    - At least full commit message ✅
    - Others:
        - Timestamp ✅
        - Link to issues? Wont do ❌
        - Committer ✅
- Properly tested ⚠️
    - Add unit where needed ⚠️
    - Add integration ✅
        - Navigation to detail page ✅
            - Click external link ✅
        - Check language switching ✅
        - Check pagination ✅
        - Check Date Picker ✅

### Focus points

- No focus on A11y, I've shown that in the previous demo
- No focus on theming, I've shown that in previous demo
- Focus on services
- Focus on testing
