import { test, expect, type Page, type Locator } from '@playwright/test';
import scenarios from '../test-data/scenarios.json';

type Scenario = {
  id: string;
  application: 'Web Application' | 'Mobile Application';
  task: string;
  column: 'To Do' | 'In Progress' | 'Done';
  tags: string[];
};

const credentials = {
  username: 'admin',
  password: 'password123',
};

function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function login(page: Page): Promise<void> {
  await page.goto('/');

  await page.getByLabel(/username/i).fill(credentials.username);
  await page.getByLabel(/password/i).fill(credentials.password);
  await page.getByRole('button', { name: /sign in|login/i }).click();

  await expect(page.getByRole('button', { name: /^Web Application/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /^Mobile Application/i })).toBeVisible();
}

async function openApplication(page: Page, application: Scenario['application']): Promise<Locator> {
  const sidebarItem = page.getByRole('button', {
    name: new RegExp(`^${escapeRegex(application)}`),
  });

  await sidebarItem.click();

  await expect(page.getByRole('banner').getByRole('heading', { name: application, exact: true })).toBeVisible();
  return page.locator('body');
}

async function getColumn(board: Locator, columnName: Scenario['column']): Promise<Locator> {
  const columnHeading = board.getByRole('heading', {
    name: new RegExp(`^${escapeRegex(columnName)} \\(`),
  });

  await expect(columnHeading.first(), `Column ${columnName} should exist in the selected board.`).toBeVisible();

  const column = columnHeading.first().locator('xpath=ancestor::div[1]');

  await expect(column).toBeVisible();
  return column;
}

async function assertTaskAndTags(column: Locator, taskName: string, expectedTags: string[]): Promise<void> {
  const taskTitle = column.getByText(taskName, { exact: true }).first();
  await expect(taskTitle, `Task ${taskName} should be visible in the expected column.`).toBeVisible();

  const taskCard = taskTitle.locator('xpath=ancestor::div[contains(@class,"bg-white")][1]');
  await expect(taskCard).toBeVisible();

  for (const tag of expectedTags) {
    await expect(taskCard.getByText(new RegExp(`^${escapeRegex(tag)}$`))).toBeVisible();
  }
}

for (const scenario of scenarios as Scenario[]) {
  test(`${scenario.id}: ${scenario.application} -> ${scenario.column} -> ${scenario.task}`, async ({ page }) => {
    await login(page);
    const board = await openApplication(page, scenario.application);
    const column = await getColumn(board, scenario.column);
    await assertTaskAndTags(column, scenario.task, scenario.tags);
  });
}
