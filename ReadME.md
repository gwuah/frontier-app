# Frontier Backend Engineer Assignment

This repository contains a solution for the test described here https://github.com/BeFrontier/frontier-rpa-exercise/blob/master/README.md

## Contents

- [Setup](#setup)
- [Testing](#testing)
- [Todo](#todo)
- [Asynchronous Service](#asynchronous-service)
- [Endpoints](#endpoints)

# Setup

- Clone project from github `git clone https://github.com/gwuah/frontier-app.git`
- Install all dependencies by running `npm install`
- Create a copy of the `.env.sample` in the root repository and use values that suit you.
- Start project by running `npm start`

# Testing

- Run `npm test`

# Todo

- Delete yarn.lock and install with npm
- Create tmp folder and download
- Add timeout
- Handle errors

# Asynchronous Service

The synchronous approach requires using Pupeteer to load the page, fill in the data and submit. That takes alot of time and results in poor UX.
Therefore we'll implement an asynchronous service that provides a much more better user experience.

For the asynchronous version, we don't run the robot synchronously. rather, we'd queue the application that came in and have a background worker process the application. Once we are done processing the application, we need to have a way to alert the user of the result of their application request.

We have 2 main ways of reaching the user, their email and their phone number.
It's much more easier to send an email than to send a phone number, so we'll fire an email contain a status response.

To use the asynchronous service, post the form data to the `/applications/async` endpoint, after some seconds, you'd recieve an email.

# Endpoints
