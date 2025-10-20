# Assignment 2 – GitHub Actions: Complete Implementation Guide

This document explains every file we created and why it's needed, written in simple terms.

## What is GitHub Actions?
Think of GitHub Actions like a robot assistant that watches your code. When you push code or create a pull request, the robot automatically checks if everything is working correctly, tests your code, and even deploys it to the internet!

## Files We Created and Why Each One is Important

### 1. `.github/workflows/ci.yml` - The Quality Checker Robot
**What it does:** This is like having a teacher check your homework every time you turn it in.

**Why we need it:**
- When you push code to GitHub, this robot automatically runs
- It checks if your JavaScript, HTML, and CSS code follows good rules (like proper spelling and grammar)
- It makes sure your code actually runs without crashing
- If something is wrong, it tells you exactly what to fix

**How it works:**
- Triggers: Runs every time you push code or create a pull request
- Uses Super-Linter (a tool that checks code quality)
- Shows you a green checkmark ✅ if everything is good, or red X ❌ if there are problems

### 2. `.github/workflows/deploy-ghpages.yml` - The Website Publisher Robot
**What it does:** This robot takes your website files and puts them on the internet so people can visit them.

**Why we need it:**
- Your website files are sitting in a folder called `heavens-above/public`
- This robot copies those files and uploads them to GitHub Pages (free website hosting)
- Now anyone can visit your website at a URL like `yourusername.github.io/repository-name`

**How it works:**
- Triggers: Runs when you push to the main branch
- Stage 1: Packages your website files
- Stage 2: Uploads them to GitHub Pages
- Shows you the website URL when it's done

### 3. `.github/workflows/scheduled-tasks.yml` - The Daily Helper Robot
**What it does:** This robot does maintenance tasks every day, like cleaning up your room automatically.

**Why we need it:**
- Creates backup logs to keep track of what's happening
- Checks how big your website files are
- Runs every night at midnight (like a digital janitor)
- You can also run it manually whenever you want

**How it works:**
- Triggers: Every day at midnight UTC, or when you click "Run workflow"
- Creates a `backup.txt` file with the current date
- Uploads this file as an artifact (like saving a receipt)

### 4. `.github/dependabot.yml` - The Update Monitor Robot
**What it does:** This robot watches your project's dependencies (like libraries your code uses) and tells you when new versions are available.

**Why we need it:**
- Your project uses libraries like `cheerio` and `request`
- These libraries get updated by their creators to fix bugs and add features
- This robot checks every week for updates
- It creates pull requests with the updates so you can review them

**How it works:**
- Checks npm packages in the `/heavens-above` folder
- Runs every Monday at 3 AM
- Creates pull requests with dependency updates
- Labels them as "dependencies" so you know what they are

### 5. `.github/workflows/dependency-updates.yml` - The Smart Update Robot
**What it does:** This robot is smart about which updates to automatically accept.

**Why we need it:**
- Not all updates are safe to accept automatically
- Minor updates (like 1.0.0 → 1.0.1) are usually safe
- Major updates (like 1.0.0 → 2.0.0) might break things
- This robot only auto-accepts safe updates

**How it works:**
- Only runs when Dependabot creates a pull request
- Checks if it's a minor or patch update
- If safe: automatically approves and merges
- If major: leaves it for you to review manually

### 6. `.github/workflows/code-review.yml` - The Code Inspector Robot
**What it does:** This robot thoroughly examines code when someone wants to merge changes.

**Why we need it:**
- When someone creates a pull request, this robot checks the code quality
- It looks for security problems (like leaving doors unlocked)
- It checks coding standards (like following the same writing style)
- It prevents bad code from being merged into your main project

**How it works:**
- Triggers: Only on pull requests
- Runs Super-Linter to check code style
- Runs CodeQL to check for security issues
- Both checks must pass before code can be merged

### 7. `.github/workflows/documentation.yml` - The Documentation Builder Robot
**What it does:** This robot builds and publishes documentation (like a user manual) for your project.

**Why we need it:**
- Documentation helps people understand how to use your project
- We use MkDocs (a tool that turns Markdown files into a nice website)
- This robot automatically updates the documentation when you change it

**How it works:**
- Triggers: When files in `docs/` folder or `mkdocs.yml` change
- Installs MkDocs and builds the documentation
- Deploys it to GitHub Pages as a separate documentation site

### 8. `.github/workflows/release-notes.yml` - The Release Announcement Robot
**What it does:** This robot creates release notes when you publish a new version of your project.

**Why we need it:**
- When you tag a new version (like v1.0.0), this robot creates release notes
- Release notes tell users what's new or what changed
- It's like writing a newsletter about your project updates

**How it works:**
- Triggers: When you push a tag like `v1.0.0`
- Creates a `release-notes.txt` file
- Uploads it as an artifact for you to use

### 9. `mkdocs.yml` - The Documentation Recipe
**What it does:** This file tells MkDocs how to build your documentation website.

**Why we need it:**
- It's like a recipe that tells the documentation robot what to do
- Sets the site name and navigation
- Chooses the Material theme (makes docs look pretty)

### 10. `docs/index.md` - The Documentation Homepage
**What it does:** This is the main page of your documentation website.

**Why we need it:**
- Provides an overview of your project
- Explains what the project does
- Helps users understand how everything works together

## How to Set Everything Up

### Step 1: Push Your Code to GitHub
```bash
git add .
git commit -m "Add GitHub Actions workflows"
git push origin main
```

### Step 2: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "GitHub Actions"
5. Save the settings

### Step 3: Check Your Workflows
1. Go to the "Actions" tab in your repository
2. You should see all 7 workflows listed
3. Click on any workflow to see if it's running

### Step 4: Test Everything
1. **CI**: Push some code to see the green/red checkmarks
2. **Deploy**: Check if your website is live at `yourusername.github.io/repository-name`
3. **Scheduled**: Wait until midnight or manually run the scheduled task
4. **Dependabot**: Wait for it to create a pull request (might take a week)
5. **Code Review**: Create a pull request to test the checks
6. **Documentation**: Edit a file in `docs/` to trigger documentation deployment
7. **Release Notes**: Create a tag like `v1.0.0` to test release notes

## What to Submit for Your Assignment

### Required Files:
1. All 7 YAML files in `.github/workflows/`
2. `.github/dependabot.yml`
3. `mkdocs.yml`
4. `docs/index.md`
5. This `documentation.md` file

### Screenshots to Take:
1. **CI Workflow**: Show a successful run with green checkmarks
2. **Deploy Workflow**: Show the deployment success and website URL
3. **Scheduled Task**: Show the backup artifact being created
4. **Dependabot PR**: Show a dependency update pull request
5. **Code Review**: Show checks passing on a pull request
6. **Documentation**: Show the documentation site being deployed
7. **Release Notes**: Show the release notes artifact

## Troubleshooting

**If workflows fail:**
- Check the "Actions" tab for error messages
- Make sure all files are in the correct locations
- Verify GitHub Pages is enabled in repository settings

**If website doesn't appear:**
- Wait 5-10 minutes after deployment
- Check the deploy workflow for the correct URL
- Make sure the `heavens-above/public` folder has your website files

**If Dependabot doesn't create PRs:**
- Wait up to a week (it checks weekly)
- Make sure `.github/dependabot.yml` is in the repository
- Check that your `package.json` has dependencies to update
