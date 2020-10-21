# Rancid Tomatillos

## Abstract
Rancid Tomatillos is a React App where a user can view movie ratings, view movie descriptions and comments other users left on a movie. A user is able to log in to expand their capabilites to favoriting movies, leaving comments on movies and rate the movies. A user is able to delete their rating and add a new rating for movies that they have already commented on, allowing for one rating per user per movie.

In this project, we started fresh with `create-react-app` and developed the entire application from scratch. Includes a robust testing suite with Jest, fetching and posting to multiple API's, SCSS, custom error handling understandable for a user, an express JS server for comments/favoriting and other technologies that will be listed inside the tech stack.

### App in Action
![Rancid Tomatillos No User](./src/images/Rancid-tomatillos-no-user.gif)
![Rancid Tomatillos User Leaving Comment](./src/images/Rancid-tomatillos-user-rating.gif)

## Setup & Installation
To view and use the application, clone down [this repository](https://github.com/nathanielmillard/rancid-tomatillos) and install with npm.
```
git@github.com:nathanielmillard/rancid-tomatillos.git
npm install
npm start --> localhost:3000 by default
```

In order for comments and favoriting functionality to work, you will also have to clone and install the rancid-tomatillos-microserver [at this repository](https://github.com/nathanielmillard/rancid-tomatillos-microserver).

**The microserver must be in a directory outside of the Rancid Tomatillos directory**

```
git@github.com:nathanielmillard/rancid-tomatillos-microserver.git
npm install
npm start --> localhost:3001 by default
```
To view the test suite for Rancid Tomatillos:
```
Inside of the Rancid Tomatillos directory--> npm test
```

## Skills
- Stateful and Pure components
- React Router DOM
- Test Driven Development - Jest, React Router Library, User Event
- Accessibility - A color scheme that accommodates for colorblindness and accessibility score 90+
- Working with a partner to develop the app side by side with meeting collaborations, as well as driving assigned functionality individually.
- Code base efficiency by following SRP and DRY principles and using newer technologies.
- Conditionally rendering and artfully displaying specific feedback messages for user for a smooth UI/UX experience.

## Technologies Used
- Create React App
- React Router
- JSX
- HTML
- CSS/SASS
- Jest
- NPM
- GitHub/Git
- Eslint
- React Testing Library
- Express JS
- Restful API
- User-Event

## Wins & Challenges

### Challenges
- Deciding how to structure the UI to let the user have a fun, intuitive and easy to use experience without a lot of bloat while waiting for API fetch calls.
- Information feedback for the user that allows them to see exactly what is happening with every action they perform.
- Using Express JS to set up our own servers to handle commenting and favoriting functionality.
- Deciding the most efficient classes for state to live. Learning when data is being passed down too far through prop drilling.
- A large learning curve with React Testing Library as well as unit, integration and interactive testing.

### Wins
- Tackling complicated logic involving a brand new tech stack and setting up new technologies on our own.
- Having a full set of tests through TDD that tests for unit component testing, integration between multiple component testing and interactive testing to simulate user actions and feedback.
- Having our state live in as few places as possible, while still having all of the data and UI update in real time with every user action.
- Completing all 7 iterations and an extension to deploy on Heroku.

## Contributors
- [Nathan Darrington](https://github.com/npdarrington)
- [Nathaniel Millard](https://github.com/nathanielmillard)

## Additional Links
- [Project Board](https://github.com/nathanielmillard/rancid-tomatillos/projects/1)
- [Original Project Specs](https://frontend.turing.io/projects/module-3/rancid-tomatillos-v2.html)
