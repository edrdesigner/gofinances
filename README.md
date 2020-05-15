# GoFinances

[![Author](https://img.shields.io/badge/author-edrdesigner-7159c1?style=flat-square)](https://github.com/edrdesigner)
[![Stars](https://img.shields.io/github/stars/edrdesigner/gofinances?color=7159c1&style=flat-square)](https://github.com/edrdesigner/gofinances/stargazers)


<p align="center">
    <img alt="GoBarber" src=".github/demo.gif?raw=true" />
</p>

---

# :pushpin: Table of Contents

* [About](#page_with_curl-About)
* [Features](#rocket-features)
* [Requiriments](#books-requirements)
* [Getting Started](#runner-getting-started)


## :page_with_curl: About
This repository contains a REST API made with Node.js as back-end, and an application in ReactJS as a front-end, both using TypeScript.

This is the GoFinances application, for managing transactions in which the user is able to access their total balance, as well as all the amount already made in deposit and withdrawal. Users can also import transactions by importing a CSV file.

# :rocket: Features
* Access to balances and transactions
* Import CSV transactions

## :books: Requirements
- [**Git**](https://git-scm.com/)
- [**Node.js**](https://nodejs.org/en/)
- [**Yarn**](https://yarnpkg.com/)
- [**Docker**](https://www.docker.com/)

## :runner: Getting started
``` bash
  # Clone this repository:
  $ git clone https://github.com/edrdesigner/gofinances.git

  # Access this folder:
  $ cd gofinances
```

## :gear: Starting back-end
```bash
  # Access back-end folder:
  $ cd backend

  # Install dependencies with yarn:
  $ yarn

  # Run migrations:
  $ yarn typeorm migration:run

  # Start application:
  $ yarn dev:server
```

## :computer: Starting front-end
```bash
  # Access frontend folder:
  $ cd frontend

  # Install dependencies with yarn:
  $ yarn

  # Start React app:
  $ yarn start
```

Made with love by [Eduardo Reichert](https://github.com/edrdesigner) 💜 at @RocketSeat GoStack 11.0 🚀