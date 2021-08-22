import { Iso8601Timestamp } from '../types/date-time'

export const nowTimestamp = (): Iso8601Timestamp => {
  return new Date().toISOString()
}

export const epochStartTimeStamp = (): Iso8601Timestamp => {
  return new Date(0).toISOString()
}

export const convertIso8601ToDateTimeLocal = (iso8601: Iso8601Timestamp): string => {
  const date = new Date(iso8601)
  const epochMsDate = date.getTime()
  // getTimeZoneOffset returns in minutes, 1 minute = 60k milliseconds
  const timezoneOffsetInMs = date.getTimezoneOffset() * 60000
  // Now we have UTC time with a timezone offset
  const isoStringWithTimezoneOffset = new Date(epochMsDate - timezoneOffsetInMs).toISOString()
  // Strip the "Z" part of the Iso8601 string so it no longer refers to UTC
  const isoStringWithoutZ = isoStringWithTimezoneOffset.slice(0, -1)
  // Remove seconds and milliseconds
  return isoStringWithoutZ.slice(0, -7)
}

export const convertDateTimeLocalToIso8601 = (dateTimeLocal: string): Iso8601Timestamp => {
  const fakeUtcDate = new Date(`${dateTimeLocal}Z`)
  const epochMsFakeUtcDate = fakeUtcDate.getTime()
  const timezoneOffsetInMs = fakeUtcDate.getTimezoneOffset() * 60000
  return new Date(epochMsFakeUtcDate + timezoneOffsetInMs).toISOString()
}

export function getLastYearInIsoString() {
  const now = new Date()
  const nowIsoString = now.toISOString()
  const segments = nowIsoString.split('-')
  const lastYear = Number(segments[0]) - 1
  return [lastYear, ...segments.slice(1)].join('-').slice(0, -8)
}
