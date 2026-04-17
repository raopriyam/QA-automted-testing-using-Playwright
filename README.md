# Playwright Data-Driven QA Task (TypeScript)

This project implements a data-driven Playwright test suite in TypeScript for the demo project board app.

## Scope Covered

- Login automation to the demo app
- Data-driven execution from JSON scenarios
- Verification of task location by board + column
- Verification of expected tags for each scenario
- All 6 required acceptance test cases

## Tech Stack

- Playwright Test
- TypeScript

## Project Structure

- `playwright.config.ts` - Playwright configuration
- `tests/task-board.spec.ts` - Reusable test logic + dynamic test generation
- `test-data/scenarios.json` - All required scenarios

## Setup

1. Install dependencies:

```bash
npm install
```

2. Install Playwright browsers:

```bash
npx playwright install
```

## Run Tests

### 1. Headless mode (no browser window, fastest)
Use this to run all tests in the background and see pass/fail results in the terminal.

```bash
npm test
```

Expected output: `6 passed`

---

### 2. Headed mode (real browser window opens)
Use this to watch the browser navigate and interact with the app in real time.

```bash
npm run test:headed
```

Each test will open a browser window, log in, navigate the board, and verify tasks and tags visually.

---

### 3. Playwright UI mode (interactive test runner)
Use this to explore tests interactively. You can run individual tests, step through each action, and inspect screenshots and DOM state at each step.

```bash
npm run test:ui
```

This opens the Playwright UI window where all 6 tests are listed. Click any test to run it and watch a detailed timeline of every action.

## Data-Driven Design

The suite reads all test cases from `test-data/scenarios.json`. Each JSON object defines:

- `id`
- `application`
- `task`
- `column`
- `tags`

The test file loops through these scenarios and creates one test per case, reusing the same login/navigation/assertion helpers to avoid duplicated code.

## Credentials Used

- URL: `https://animated-gingersnap-8cf7f2.netlify.app/`
- Username: `admin`
- Password: `password123`
