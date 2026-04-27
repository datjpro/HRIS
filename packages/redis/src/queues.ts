import { Queue, Worker, type Processor } from "bullmq";

export const QUEUE_NAMES = {
  ONBOARDING: "onboarding-jobs",
  RECRUITMENT: "recruitment-jobs",
  REPORTS: "reports-jobs"
} as const;

const redisUrl = process.env.REDIS_URL ?? "redis://localhost:6379";

export const createQueue = (name: (typeof QUEUE_NAMES)[keyof typeof QUEUE_NAMES]): Queue => {
  return new Queue(name, {
    connection: {
      url: redisUrl
    }
  });
};

export const createWorker = <TData>(
  name: (typeof QUEUE_NAMES)[keyof typeof QUEUE_NAMES],
  processor: Processor<TData>
): Worker<TData> => {
  return new Worker<TData>(name, processor, {
    connection: {
      url: redisUrl
    }
  });
};

