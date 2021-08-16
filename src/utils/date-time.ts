import { Iso8601Timestamp } from '../types/date-time';

export const nowTimestamp = (): Iso8601Timestamp => {
  return new Date().toISOString();
}
