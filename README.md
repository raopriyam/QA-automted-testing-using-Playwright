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

## Video Walkthrough Script (3–4 minutes)

---

**[0:00–0:30] INTRO — Show VS Code with project folder open in sidebar**

"Hi, I'm walking you through my data-driven Playwright test suite for the project board application.

The challenge was to write six test cases without repeating code. Instead of copying the same logic six times, I built a solution where tests are driven by data. Let me show you how this works."

---

**[0:30–1:00] DATA FILE — Open `test-data/scenarios.json`**

"Here is the core of the solution — my scenario data file in JSON.

Each object represents one test case with an ID, the application name, the task to verify, the column it should be in, and the expected tags.

This is the single source of truth. All six required scenarios are here. If I need to add a seventh test in the future, I just add one more JSON object — no test code changes required."

---

**[1:00–2:00] TEST CODE — Open `tests/task-board.spec.ts`**

"Now the test code. Instead of six separate test functions, I have four reusable helper functions:

- `login` — handles credentials and waits for the app to be ready
- `openApplication` — navigates to the Web or Mobile board
- `getColumn` — finds the correct column by its heading
- `assertTaskAndTags` — verifies the task exists and has the right tags

All written once and reused for every scenario."

*Scroll to the bottom of the file.*

"At the bottom, you'll see a simple loop. For each scenario in the JSON data, one test is generated automatically. This is data-driven testing — the loop creates all six tests dynamically, no duplication."

---

**[2:00–2:20] CONFIG — Open `playwright.config.ts`**

"The Playwright config sets the base URL to the demo app, defines timeouts, and enables screenshots and video capture on failure for fast debugging."

---

**[2:20–3:20] LIVE RUN — Switch to terminal, run `npm test`**

"Let's run the full suite now."

*Type `npm test` and press Enter. Speak while it runs:*

"For each scenario, the test logs in with the provided credentials, navigates to the correct application board, finds the target column, verifies the task is there, and checks all expected tags are present."

*Wait for output.*

"All six tests passed. Complete coverage with clean, reusable code."

---

**[3:20–3:50] UI MODE — Run `npm run test:ui`**

"I can also open Playwright's interactive UI mode where each test is listed and I can run them individually, step through every action, and inspect the DOM at each point in time."

*Show the Playwright UI window briefly.*

---

**[3:50–4:00] WRAP UP — Back to VS Code sidebar**

"To summarize: tests are driven by JSON data, logic is written once and reused, all six scenarios pass, and the suite is easy to extend. Thanks for watching."

---

## Commands — Quick Reference (Run in Order)

### Before recording (run off camera to prepare)

**Step 1 — Install dependencies:**
```bash
npm install
```

**Step 2 — Install Playwright browsers:**
```bash
npx playwright install
```

**Step 3 — Confirm all tests pass (dry run):**
```bash
npm test
```

Expected output: `6 passed`

---

### During recording (on camera)

**Step 4 — Run headless (show terminal output):**
```bash
npm test
```

**Step 5 — Run headed (show live browser):**
```bash
npm run test:headed
```

**Step 6 — Open Playwright interactive UI:**
```bash
npm run test:ui
```
