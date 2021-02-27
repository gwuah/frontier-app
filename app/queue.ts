

import Queue from "bee-queue"
import redis from "redis"
import applicationWorker from "./workers/application"

export default function() {
    const sharedConfig = { redis: redis.createClient(process.env.REDIS_URL as string) };
    let jobApplicationsQueue = new Queue('JOB_APPLICATIONS', sharedConfig);
    jobApplicationsQueue.process(applicationWorker)

    return {
        getApplicationQueue: (): Queue => {
            return jobApplicationsQueue
        }
    }
}