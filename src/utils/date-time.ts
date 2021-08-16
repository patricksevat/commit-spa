export type Iso8601Timestamp = string;

export const nowTimestamp = (): Iso8601Timestamp => {
  return new Date().toISOString();
}
