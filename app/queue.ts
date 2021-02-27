

import Queue from "bee-queue"
import redis from "redis"
import axios, { AxiosError, AxiosResponse } from "axios";
import { AsyncJobApplication } from "./common/shared-interfaces";
import { submitApplication } from "./services";

function sendResponse(url:string, data: object, done: Queue.DoneCallback<boolean>) {
    axios.post(url, data)
    .then((_: AxiosResponse): void => {
      done(null, true)
    })
    .catch((error: AxiosError): void => {
      done(error, false)
    })
}

export async function jobApplicationWorker(job: Queue.Job<AsyncJobApplication>, done: Queue.DoneCallback<boolean>) {
    const {callback_url} = job.data
    try {
      const serviceResult = await submitApplication({
        data: job.data,
        slowMo: 20,
        headless: false,
      })
      if (serviceResult.error) {
        return sendResponse(callback_url, { status: false, message: "request failed" }, done)
      }
  
      return sendResponse(callback_url, {
        status: true,
        message: "application submitted sucessfully"
      }, done)
     
    } catch (error) {
      return sendResponse(callback_url, { status: false, message: "request failed" }, done)
    }
}


export default function() {
    const jobApplicationsQueue = new Queue('JOB_APPLICATIONS', { redis: redis.createClient(process.env.REDIS_URL as string) });
    jobApplicationsQueue.process(jobApplicationWorker)

    return {
        getApplicationQueue: (): Queue => {
            return jobApplicationsQueue
        }
    }
}