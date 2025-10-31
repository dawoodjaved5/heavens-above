---
title: Project Documentation
---

# Heavens Above – Documentation

This documentation site is built with MkDocs and deployed via GitHub Actions.

## Overview

- site located under `heavens-above/public`.
- CI and code review run linters and security analysis on pushes and PRs.
- Scheduled job creates a simple backup log artifact nightly.
- Dependabot monitors npm dependencies.

## Deployment

The main site is deployed on vercel.

Documentation
This document provides a detailed explanation for the 7 GitHub Actions workflows set up for this assignment
1. Continuous Integration Setup
Workflow Name: Continuous Integration
File Path: .github/workflows/ci.yml 
Purpose
This workflow performs continuous integration (CI) checks on every push and pull request to the main branch. Its goal is to ensure that all new code is high-quality, passes all tests, and does not introduce security vulnerabilities before being merged.
Triggers
This workflow is triggered by:
push to the main branch.
pull_request to the main branch.
Configuration & Key Steps
The workflow runs a single job called build-and-lint on an ubuntu-latest runner.
Checkout Repository: It first checks out the repository's code.
Set up Node.js: It installs Node.js version 20.
Install Dependencies: It securely installs project dependencies using npm ci (if package-lock.json exists) or npm install.
Run Lint: It checks if a lint script exists in package.json. If it does, it runs npm run lint to enforce code style.
Run Tests: It checks if a test script exists. If it does, it runs npm test to execute the project's test suite.
Run Security Audit: It runs npm audit --audit-level=moderate to scan for dependencies with moderate or higher security vulnerabilities.
Code Quality Check: It performs a basic syntax check on all .js files (outside of node_modules) and verifies that HTML/CSS files exist in the public/ directory.
How to Interpret Results
Green Checkmark: All steps (install, lint, test, audit, and quality check) completed successfully. The code is safe to merge.
Red 'X': One of the steps failed. You can click on the workflow run's "Details" to see exactly which step (e.g., "Run lint" or "Run tests") failed and read the error log.
2. Deployment Pipeline
Workflow Name: Deploy Site to Vercel
File Path: .github/workflows/deploy-vercel.yml 
Purpose
This workflow implements a full deployment pipeline. It automates the process of building, testing, and deploying the web application to the Vercel hosting platform. It distinguishes between production and preview environments.
Triggers
push to the main branch (for production deployments).
pull_request to the main branch (for preview deployments).
workflow_dispatch (for manual runs).
Configuration & Key Steps
This workflow runs checks and then builds/deploys the application.
CI Checks: It first runs all the same checks as the CI workflow (install dependencies, lint, test) to ensure the code is valid before deploying.
Build Data: It runs npm run build to execute the project's build script (which scrapes satellite data).
Install Vercel CLI: It installs the Vercel command-line tool.
Pull Vercel Environment: It securely pulls the correct Vercel project information using a VERCEL_TOKEN secret.
Build Project (Production/Preview):
If triggered by a push to main, it runs vercel build --prod.
If triggered by a pull_request, it runs vercel build.
Deploy Project (Production/Preview):
If push to main, it deploys the prebuilt project to production (vercel deploy --prebuilt --prod).
If pull_request, it deploys the prebuilt project to a preview environment (vercel deploy --prebuilt).
How to Interpret Results
Green Checkmark: The application was successfully built and deployed.
On a Pull Request: The Vercel bot will add a comment to the PR with a unique URL to view the "preview" deployment.
On a main Push: The production website will be updated with the new version.
3. Scheduled Tasks
Workflow Name: Scheduled Data Updates
File Path: .github/workflows/scheduled-tasks.yml
Purpose
This workflow runs on an automated schedule to perform a maintenance task. It automatically runs the data scraping script to fetch the latest satellite data and commits the new data back to the repository.
Triggers
schedule: cron: '0 19 * * *' (runs automatically daily at 12am).
push to the main branch.
workflow_dispatch (for manual runs).
Configuration & Key Steps
Checkout & Setup: Checks out the code and sets up Node.js 20.
Install & Run: Installs dependencies and runs the data scraping script (node run.js).
Commit and Push:
It configures Git with a "GitHub Action" user.
It checks if the public/data/ directory has any changes.
If changes are found, it commits them with the message "Update satellite data - [date]" and pushes the commit directly to the main branch.
Trigger Vercel (Optional): If a VERCEL_DEPLOY_HOOK_URL secret is set, it sends a request to that URL to trigger a new Vercel deployment with the new data.
Log & Artifacts: It writes a summary to the GitHub step summary and uploads a backup artifact named data-update-[date].
How to Interpret Results
You can see this workflow run automatically in the "Actions" tab every hour.
A successful run will be indicated by a new commit appearing in the repository's history, authored by "GitHub Action".
You can also download the data-update artifact from the workflow summary page to see a log.
4. Dependency Updates
System Files:
Configuration: .github/dependabot.yml
Workflow: .github/workflows/dependency-updates.yml 
Purpose
This system automates the process of keeping project dependencies (from package.json) up-to-date. It uses two files: dependabot.yml to find updates and create pull requests, and the workflow to test and auto-merge those PRs.
Triggers
Dependabot Config: The dependabot.yml file configures Dependabot to scan for npm updates weekly.
Workflow: The dependency-updates.yml workflow is triggered on pull_request (to test Dependabot's PRs) and schedule/workflow_dispatch.
Configuration & Key Steps
Dependabot Scan (Weekly): As configured in dependabot.yml, Dependabot scans the npm ecosystem for updates. If it finds any, it creates a new pull request with the change.
Workflow Run (On PR): When Dependabot opens a pull request, this workflow triggers.
Run Tests: The workflow installs the new dependencies (npm ci) and runs the test suite (npm test).
Auto-Merge (If Safe):
The workflow checks if the PR author is dependabot[bot].
It fetches metadata to see if the update is a minor or patch change.
If the tests pass and the update is safe (minor/patch), the workflow automatically approves the PR and merges it using the "squash and merge" strategy.
How to Interpret Results
Success: You will see pull requests from dependabot[bot] get a green checkmark from this workflow and then be merged automatically.
Failure: If a dependency update causes the npm test step to fail, the workflow will show a red 'X'. The pull request will not be merged, indicating that a developer must review it manually.
5. Code Review Workflow
Workflow Name: Code Review
File Path: .github/workflows/code-review.yml
Purpose
This workflow enhances the code review process by automatically scanning all pull requests for code quality, dependency vulnerabilities, and deeper security issues using static analysis.
Triggers
push to the main branch.
pull_request to the main branch.
workflow_dispatch (for manual runs).
Configuration & Key Steps
This workflow runs two separate jobs in parallel: lint and codeql.
Job: lint
Installs Node.js 20 and dependencies.
Runs npm run lint (if it exists) to check code style.
Runs npm audit --audit-level=moderate to check for dependency vulnerabilities.
Performs the basic syntax and file-finding checks.
Job: codeql
This job uses the official github/codeql-action to perform advanced security analysis.
It initializes CodeQL for the javascript language.
It performs a deep analysis of the code to find potential security vulnerabilities (like injection risks, improper sanitization, etc.).
How to Interpret Results
This workflow's status will appear in the "Checks" section of a pull request.
Green Checkmark: All checks (lint, audit, CodeQL) passed.
Red 'X': A failure in lint or audit will be reported in the job's log.
CodeQL Findings: If the codeql job finds any security issues, it will report them in the "Security" > "Code scanning" tab of the repository, allowing for detailed review of the vulnerability.
6. Documentation Deployment
Workflow Name: Documentation Deployment
File Path: .github/workflows/documentation.yml
Purpose
This workflow automates the building and deployment of the project's technical documentation to GitHub Pages, making it publicly accessible.
Triggers
push to the main branch.
Configuration & Key Steps
Checkout Code: Checks out the repository's code.
Setup Python: Installs Python 3.11, which is required by MkDocs.
Install MkDocs: Installs the mkdocs and mkdocs-material packages using pip.
Build Documentation: Runs the mkdocs build command. This converts the Markdown files (e.g., in a docs/ folder) into a static HTML website in a new site/ directory.
Deploy to GitHub Pages:
It uses the peaceiris/actions-gh-pages action.
This action takes the contents of the site/ directory and automatically pushes them to a special branch named gh-pages.
How to Interpret Results
Green Checkmark: The documentation was successfully built and deployed.
You can go to the repository's "Settings" > "Pages" tab to find the public URL for the deployed GitHub Pages site.
You can also check the gh-pages branch in the repository to see the committed HTML files.
7. Custom Workflow Integration
Workflow Name: Release Notes Generator
File Path: .github/workflows/release-notes.yml 
Purpose
This is a custom workflow designed to automate a specific project task: generating a simple release notes file.
Triggers
This workflow is triggered by a wide variety of events:
push to any tag matching the pattern v*.*.* (e.g., v1.0.0).
release: types: [created] (when a new GitHub Release is created).
workflow_dispatch (for manual runs).
schedule: cron: '0 19 * * *' (runs automatically daily at 12am).
Configuration & Key Steps
Checkout Code: Checks out the repository's code.
Generate Release Notes: This step runs a simple shell command to create a file named release-notes.txt and populates it with the text "Release generated at [current date]".
Upload Notes: The workflow then uses the actions/upload-artifact action to upload the newly created release-notes.txt as a workflow artifact named release-notes.
How to Interpret Results
A successful (green) run of this workflow will have an "artifact" associated with it.
To find the notes, click on the completed workflow run in the "Actions" tab. On the summary page, you will see an artifact named "release-notes" that you can download.


