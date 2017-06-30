issues = [
  {
    "path": "file.txt"
    "stat": {
      "language": "Text"
      "size": 133
    }
    "type": "stat"
  }
  {
    "path": "src/bar"
    "stat": {
      "comment": 1
      "language": "JavaScript"
      "lines": 3
      "loc": 2
      "size": 67
    }
    "type": "stat"
  }
  {
    "path": "src/foo.rb"
    "stat": {
      "comment": 2
      "language": "Ruby"
      "lines": 30
      "loc": 28
      "size": 4134
    }
    "type": "stat"
  }
  {
    "path": "src/foo.slim"
    "stat": {
      "language": "Slim"
      "size": 54
    }
    "type": "stat"
  }
  {
    "path": "src/foo.ts"
    "stat": {
      "comment": 2
      "language": "TypeScript"
      "lines": 4
      "loc": 2
      "size": 111
    }
    "type": "stat"
  }
]

ignore_issues = [
  {
    "path": "src/bar"
    "stat": {
      "comment": 1
      "language": "JavaScript"
      "lines": 3
      "loc": 2
      "size": 67
    }
    "type": "stat"
  }
  {
    "path": "src/foo.slim"
    "stat": {
      "language": "Slim"
      "size": 54
    }
    "type": "stat"
  }
  {
    "path": "src/foo.ts"
    "stat": {
      "comment": 2
      "language": "TypeScript"
      "lines": 4
      "loc": 2
      "size": 111
    }
    "type": "stat"
  }
]

allow_issues = [
  {
    "path": "src/foo.rb"
    "stat": {
      "comment": 2
      "language": "Ruby"
      "lines": 30
      "loc": 28
      "size": 4134
    }
    "type": "stat"
  }
  {
    "path": "src/foo.ts"
    "stat": {
      "comment": 2
      "language": "TypeScript"
      "lines": 4
      "loc": 2
      "size": 111
    }
    "type": "stat"
  }
]

module.exports =
  issues: issues
  ignore_issues: ignore_issues
  allow_issues: allow_issues
