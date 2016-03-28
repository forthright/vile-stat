# vile-stat [![Circle CI](https://circleci.com/gh/brentlintner/vile-stat.svg?style=svg&circle-token=4f88501f4048011c21e7c0fd561f82c5651cfd9b)](https://circleci.com/gh/brentlintner/vile-stat)

[![score-badge](http://joffrey-baratheon.herokuapp.com/brentlintner/vile-stat/badges/score?token=itYHe8UZ4r-kq4zAGtWx)](http://joffrey-baratheon.herokuapp.com/brentlintner/vile-stat) [![security-badge](http://joffrey-baratheon.herokuapp.com/brentlintner/vile-stat/badges/security?token=itYHe8UZ4r-kq4zAGtWx)](http://joffrey-baratheon.herokuapp.com/brentlintner/vile-stat) [![coverage-badge](http://joffrey-baratheon.herokuapp.com/brentlintner/vile-stat/badges/coverage?token=itYHe8UZ4r-kq4zAGtWx)](http://joffrey-baratheon.herokuapp.com/brentlintner/vile-stat) [![dependency-badge](http://joffrey-baratheon.herokuapp.com/brentlintner/vile-stat/badges/dependency?token=itYHe8UZ4r-kq4zAGtWx)](http://joffrey-baratheon.herokuapp.com/brentlintner/vile-stat)

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
