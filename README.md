# LendiTest
### Objective
The objective of the test is to create a list of news from hackernews web and allow the user to search for the news from the list. Also it should allow them
to select and navigate to the selected news page.

## Features
  - List of news
  - Search the news by text which will filter the list
  - Navigate to the news page upon selecting a specific news
  - Share the url in the news page
  
  note: Since the information is not available to what need to share, I've assumed for now to share the url

### Install
- ```yarn install```
- ```pod install```

### Build
- IOS -> ```yarn ios```
- Android -> ```yarn android```

### Test
- yarn test

Considerations:
- I've chosen the latest react-native version which implements react 18 which gives lot of advantages.
- For the implementation, i've chosen react-navigation as the way forward which helps to navigate from one page to another. This library is very popular and 
  used across several different apps.
- I've used use-debounce library which is very effective allowing the user to provide leading or trailing time after the text has entered. This is implemented
  for Search functionality
- I've also imported couple of assets to fulfill the image requirments since the assets are not provided.
- I've included axios library as the REST API service, which is very popular and robust.
- I've include unit tests for coverage and make sure that the deliverables are properly tested. To help that i've used the library called react-native-testing-library
  which is very popular and efficient in performing unit tests 
  
Improvements:
* Due to time constraints, I could not implement  the following other advanced features in the app mentioned as an optional requirements
  - Display News & comments time stamp from now (e.g. 8h, 2 days).
  - Comments are displayed in a user-friendsly visual hierarchy.
  - Save favourite news.
  - Ability to display first level comments..

- Secondly we can onboard typescript to this project.
- There is not a requirement for a state management tool for now. But in general, if the project is big, bringing some state management tool would give 
  benefits.
- Add more unit test.
- As I don't have enough information about the Error scenario, I couldn't do much. But there is a room for improvement with the way how the errors needs to    handled
 
 Given time, I should be able to complete it.
 
Challenges:
- Because my current repo is bare bone javascript project which i created new from npx init react-native <project> it does not have the eslint
  or module resolver or prettier which i've to add it separately.
- Latest jest 28.0.2 version has issue and have to downgrade it.

 
 


