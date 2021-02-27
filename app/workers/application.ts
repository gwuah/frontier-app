import axios, { AxiosError, AxiosResponse } from "axios";
import BeeQueue from "bee-queue"
import { AsyncJobApplication } from "../common/shared-interfaces";
import { submitApplication } from "../services";

function sendResponse(job:BeeQueue.Job<AsyncJobApplication>, data: object, done: BeeQueue.DoneCallback<boolean>) {
  axios.post(job.data.callback_url, data)
  .then((_: AxiosResponse): void => {
    done(null, true)
  })
  .catch((error: AxiosError): void => {
    done(error, false)
  })
}

export default async function Worker(job: BeeQueue.Job<AsyncJobApplication>, done: BeeQueue.DoneCallback<boolean>) {
  try {
    const serviceResult = await submitApplication(job.data)
    if (serviceResult.error) {
      return sendResponse(job, { status: false, message: "request failed" }, done)
    }

    return sendResponse(job, {
      status: true,
      message: "application submitted sucessfully"
    }, done)
   
  } catch (error) {
    return sendResponse(job, { status: false, message: "request failed" }, done)
  }
}