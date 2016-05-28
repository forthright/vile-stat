# vile-stat [![Circle CI](https://circleci.com/gh/forthright/vile-stat.svg?style=svg&circle-token=4f88501f4048011c21e7c0fd561f82c5651cfd9b)](https://circleci.com/gh/forthright/vile-stat)

[![score-badge](https://vile.io/brentlintner/vile-stat/badges/score?token=uFywUmzZfbg6UboLzn6R)](https://vile.io/brentlintner/vile-stat) [![security-badge](https://vile.io/brentlintner/vile-stat/badges/security?token=uFywUmzZfbg6UboLzn6R)](https://vile.io/brentlintner/vile-stat) [![coverage-badge](https://vile.io/brentlintner/vile-stat/badges/coverage?token=uFywUmzZfbg6UboLzn6R)](https://vile.io/brentlintner/vile-stat) [![dependency-badge](https://vile.io/brentlintner/vile-stat/badges/dependency?token=uFywUmzZfbg6UboLzn6R)](https://vile.io/brentlintner/vile-stat)

A [vile](http://github.com/brentlintner/vile) plugin for tracking file statistics.

## Requirements

- [nodejs](http://nodejs.org)
- [npm](http://npmjs.org)

## Installation

    npm i vile-stat

## Config

```yml
stat:
  allow: ...
  ignore: ...
```

## Architecture

- `bin` houses any shell based scripts
- `src` is es6+ syntax compiled with [babel](https://babeljs.io)
- `lib` generated js library

## Hacking

    cd vile-stat
    npm install
    gem install stat
    npm run dev
    npm test
