# Pull Request Conflict Finder

This action will check and label open PRs if they have a conflict. 

# Usage

```yaml
name: "review-tracker"
on: pull_request_review
jobs:
  triage:
    runs-on: ubuntu-latest
    steps:
      - uses: hcancelik/pr-conflict-finder@v1
        with:
          secret_token: ${{ secrets.GITHUB_TOKEN }}
```
