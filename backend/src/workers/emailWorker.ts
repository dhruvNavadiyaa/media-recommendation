import { Worker } from "bullmq";
import { connection } from "../config/redis";
import { sendMail } from "../services/mailService";

const emailWorker = new Worker(
  "email",
  async (job) => {
    const { to, subject, html } = job.data;
    await sendMail(to, subject, html);
    console.log(`📧 [${job.name}] Email sent to ${to}`);
  },
  { connection }
);

emailWorker.on("failed", (job, err) => {
  console.error(`❌ Job ${job?.id} failed:`, err.message);
});
