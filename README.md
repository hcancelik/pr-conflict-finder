# Pull Request Conflict Finder

This action will check and label open PRs if they have a conflict. 

# Usage

Make sure to update your main/master branch in the workflow file.

```yaml
name: "conflict-finder"
on: 
  pull_request:
  push:
    branches: [main]
jobs:
  triage:
    runs-on: ubuntu-latest
    steps:
      - uses: hcancelik/pr-conflict-finder@v1
        with:
          secret_token: ${{ secrets.GITHUB_TOKEN }}
```
