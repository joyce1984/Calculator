# Calculator
## Assumptions

1) Calculator is only going to be used in Angular and wont be recreated in another technology such as a mobile app.

2) Multiplication was only required

3) Calculator is used across multiple questions, but the history is unique to the question.

## Front End
## Development server

Run NPM install
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Api connection

The front end connects to the api (when it is running) at http://localhost:7252 this is set in ReportingService

## Api
Open the solution in visual studio and debug it, it should launch a function app at http://localhost:7252
It should automatically create the reporting database. The connection string is in local.settings.json, if you need to change it.

## Api Tests
Api has unit and integration tests that should be able to be ran.