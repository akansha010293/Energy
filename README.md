# Amber Coding Challenge

Hello and welcome to the Amber coding challenge. We've chosen this task to be broadly representative of the kind of work you would be doing if you join the team. Our intention is that this would take a maximum 4 hours of your time.

Your task is to implement the backend component of a customer's energy use dashboard, as well as making some updates to the dashboard UI.

## What we're assessing for

The code challenge will be reviewed by two of our engineers before proceeding to the technical interview, where we will use it as a springboard to discuss technical decisions. All candidates perform the same test regardless of experience level, but expectations on polish and quality of discussion on underlying approach in the follow up interview scale with seniority and experience.

If the technologies used in this challenge are new to you, we will take into account what you have shared with us about your experience in the pre-screening interview and on your resume, and will mark accordingly. We don't expect someone with little-to-no experience of, say TypeScript, to be producing exceptionally well written TypeScript or be able to fake it in a short amount of time, but we have set up this challenge so that you shouldn't be disadvantaged if that is the case. So even if you have little-to-no experience of TypeScript, React or Node, please attempt the challenge using them.

### The Task

#### Backend

- In `src/pages/api/usage.ts` comment/uncomment the relevant code to switch from sample to real data
- You must implement all compulsory fields on `UsageSummary` (totals and averages for varying time horizons)
- Bonus points for also calculating the optional field `UsagePeak`. [What is peak demand](https://web.archive.org/web/20220201052650/https://www.enertiv.com/resources/faq/what-is-peak-demand) can help you understand the underlying concept there

#### Frontend

In `src/pages/index.tsx` you must implement the following changes:

- Add a basic spinner/loader state to your application when it is loading data from the backend
- Add a way to vary/change the date window being displayed by the UI based off the data that has been returned. E.g only display 3 days worth of data, or 5.

#### Other tips

- Good tests carry a lot of bonus points here
- Information on the CSV file format can be found at [github.com/charliedotau/Smart-Meter-File-Format-Examples-Aus](https://github.com/charliedotau/Smart-Meter-File-Format-Examples-Aus). Short version: ignore the first 3 columns, column 4 is the date, and columns 6+ are the kwH used in each half hour window.
- Keep an eye out for the nominated units on data fields. [kW !== kWh](https://www.solarquotes.com.au/blog/kw-and-kwh-what-is-the-difference/)
- There's no right or wrong answer on classes vs functional style, but it's important you have some kind of decomposition and organisational approach you can speak to in the follow up interview

## General Tips

- Don't try to boil the ocean and show off across every aspect of the challenge, get it working end to end and then put your personal shine into one area. We want to be respectful of your time so pick a particular domain and explicitly tell us alongside your submission where you put your focus.
- Once the minimum requirements are met there are no right or wrong answers, instead this challenge is used as a conversation starter about your abilities in a follow up interview.
- Feel free to use 3rd party libraries. Ensure you choose libraries you're confident will install and run cleanly on on the reviewer's laptop without intervention. We don't want to see engineers reinventing the wheel, but conversely we need to see enough of your own code to get a sense of your personal style.
- The challenge is provided to you as a tarred up git repo, returning it the same way with your own commits showing work in progress is appreciated
- Adding tests is not required but is appreciated, especially if you're trying to highlight more "backend" like skills
- You are free to add, remove, or change libraries as you see fit. We provided a relatively full skeleton of build and testing tools as a convenience to minimise unnecessary time spent wrestling npm packages

  **_Please do not upload your submission as a public git repository._**

# Dev Process

In the project directory, you can run:

### `npm run dev`

Runs the app & api/server in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run test`

Runs all the tests
