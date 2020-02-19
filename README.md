## Running BeerMe's Frontend
In the project directory, `frontend/beerme/`, run `npm start`. This will start a development server at [http://localhost:3000](http://localhost:3000).

## Testing BeerMe's Frontend
We're using Facebook's Jest testing framework. To run tests and get the full code coverage report, run `yarn test --coverage --watchAll=false` or `npm run test --coverage --watchAll=false`. The `watchAll=false` flag indicates we don't want to run in watch mode; there is a bug in Jest that prevents the coverage reports from being update when the tests are being watched.
