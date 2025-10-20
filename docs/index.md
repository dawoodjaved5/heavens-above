---
title: Project Documentation
---

# Heavens Above – Documentation

This documentation site is built with MkDocs and deployed via GitHub Actions.

## Overview

- Static site located under `heavens-above/public`.
- CI and code review run linters and security analysis on pushes and PRs.
- Scheduled job creates a simple backup log artifact nightly.
- Dependabot monitors npm dependencies.

## Deployment

The main site is deployed from `heavens-above/public` to GitHub Pages.

