# vile-stat

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
