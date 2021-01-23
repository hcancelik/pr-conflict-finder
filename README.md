# Pull Request Conflict Finder

This action will check and label open PRs if they have a conflict. 

## Usage

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
          conflict_label: "Has Conflict"
          max_tries: 5
          wait_ms: 5000
```

## Options
|Option|Description|Default|
|:-----|:----------|:------|
|`conflict_label`|You can change the conflict label text with this option.|Has Conflict|
|max_tries|Number of amounts will action try to get the status of PR merge status.|5|
|wait_ms|Number of milliseconds action should wait between pools to check the status of PR merge status|5000|

## What are `max_tries` and `wait_ms` for?
In order to check mergeability of a pull request, Github needs to create a test merge commit and this may take some time. That's why this action will wait for given amount of miliseconds (`wait_ms`) if the mergeability status is not ready and try to get it until maxiumum number of tries (`max_tries`) is reached.  
