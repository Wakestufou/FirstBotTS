## Table of Contents
- [📜 Introduction](#-introduction)
- [⚙️ Getting Started](#️-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [With Release](#with-release)
    - [With clone project](#with-clone-project)
  - [Launching the bot](#launching-the-bot)
    - [Dev](#dev)
    - [Production](#production)
- [📄 License](#-license)

# 📜 Introduction
It's my first bot discord coded in Typescript.

# ⚙️ Getting Started
## Prerequisites
- [NodeJS](https://nodejs.org/en/)
- [npm](https://www.npmjs.com)

## Installation
### With Release
- Download the latest [release](https://github.com/Wakestufou/FirstBotTS/releases).

```sh
# Go to FirstBotTS
$ cd FirstBotTS

# Configure .env
$ cp .env.exemple .env

# Install
$ npm i
```

⚠️ Don't forget to change the values in the .env ⚠️
<br>
### With clone project
```sh
# Clone project
$ git clone https://github.com/Wakestufou/FirstBotTS.git

# Go to FirstBotTS
$ cd FirstBotTS

# Configure .env
$ cp .env.exemple .env

# Install
$ npm i
```
⚠️ Don't forget to change the values in the .env ⚠️

## Launching the bot
### Dev
```sh
$ npm run start:dev
```
### Production
```sh
# First, build project
$ npm run build

# Launch the bot
$ npm run start:prod
```

# 📄 License
