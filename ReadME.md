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

- Add timeout
- Handle errors

# Asynchronous Service

The synchronous approach requires using Pupeteer to load the page, fill in the data and submit. That takes alot of time and results in poor UX.
Therefore we'll implement an asynchronous service that provides a much more better user experience.

For the asynchronous version, we don't run the robot synchronously. rather, we'd queue the job application that came in and have a background worker process the application. Once we are done processing the application, we alert the API user with the result of the application.

How do we alert the API user? Through a callback(webhook)!
We make a post request to the callback_url they'll provide in the request.

So basically we'll add another field called callback_url to the form data.
To use the asynchronous service, post the form data to the `/applications/async` endpoint, after some seconds/minute, depending on how slow the internet is, you'd recieve an webhook request.

# Endpoints

For the synchronous endpoint

#### Route

`/application/sync`

#### Params

```
{
  "firstname": "Test",
  "lastname": "Lastname",
  "phone": "+1 234 234 0000",
  "location": "London, UK",
  "linkedin": "linkedin.com/profile/me" ,
  "email": "test@gmail.com",
  "resume": "https://frontier-public-assets.s3-us-west-2.amazonaws.com/05oo7evmr4hsc7ufvmdcpojlh1ki1rd3benjo0g1_Brian_CV.docx"
}
```

#### Response

```
{
    "status": true,
    "message": "application submitted sucessfully"
}
```

For the asynchronous endpoint

#### Route

`/application/async`

#### Params

```
{
  "firstname": "Test",
  "lastname": "Lastname",
  "phone": "+1 234 234 0000",
  "location": "London, UK",
  "linkedin": "linkedin.com/profile/me" ,
  "email": "test@gmail.com",
  "callback_url": "http://localhost:7700/callback",
  "resume": "https://frontier-public-assets.s3-us-west-2.amazonaws.com/05oo7evmr4hsc7ufvmdcpojlh1ki1rd3benjo0g1_Brian_CV.docx"
}
```

#### Response

```
{
    "status": true,
    "message": "application submitted sucessfully"
}
```
