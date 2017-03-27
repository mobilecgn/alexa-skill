# 🖲 [alexa-skill](https://developer.amazon.com/alexa-skills-kit/) for the [mobile.cologne](http://www.mobilecologne.de) meetup

## About the skill

*   Ask the skill when the last/next meetup is. (Currently in German only.)

## About the tech setup

*   This project requires [Node.js](https://nodejs.org/)
*   It is also recommended to install [Yarn](https://yarnpkg.com/)
*   It uses [Neutrino](https://neutrino.js.org/) and
    [Babel](http://babeljs.io/) to 'transpile' latest ES6 JavaScript into
    Node 6.10 (latest lambda node version) JavaScript.
*   Tests are written in  [Jest](https://facebook.github.io/jest/).
*   We use [ESLint](http://eslint.org/) as linter with the
    [Airbnb](https://github.com/airbnb/javascript) guideline preset.

## Setup

### Preparation

*   Create an [Amazon Developer account](https://developer.amazon.com/)
*   Create an [AWS account](https://aws.amazon.com/)
*   Create a [Meetup API key](https://secure.meetup.com/meetup_api/key/)

### Build the sourcecode

*   `https://github.com/mobilecgn/alexa-skill.git`
*   `make` (which run `yarn run build` and package a ZIP file for lambda)

### Upload and configure your skill

*   Create an AWS lambda function
*   Create an Amazon Alexa Skill
    *   Define the env variable `MEETUP_ACCESS_KEY` with your Meetup API key.
    *   Define the env variable `MEETUP_GROUP_ID` with your Meetup group ID,
        which means the string-identifier from the URL, not the internal ID.
