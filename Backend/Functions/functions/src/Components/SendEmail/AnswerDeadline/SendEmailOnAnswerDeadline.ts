import { logger } from "firebase-functions";
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { emailAnswerDeadlineReached } from "./OnAnswerDeadline/EmailAnswerDeadlineReached";
import { emailBeforeAnswerDeadline } from "./BeforeAnswerDeadline/EmailBeforeAnswerDeadline";

const daysBeforeDeadline: number = 2;

export const onScheduleEveryday = onSchedule('every day 06:00', async (event) => { //UTC, Slovenian time is +2 hours difference
  try {
    logger.info('onScheduleEveryday: started');
    await emailAnswerDeadlineReached();
    await emailBeforeAnswerDeadline(daysBeforeDeadline);
  } catch(error) {
    logger.error(error);
  }
});
