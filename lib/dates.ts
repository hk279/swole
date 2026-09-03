import { parseISO } from "date-fns";

/**
 * Workout dates are calendar dates (`@db.Date`), not instants. Everything
 * outside the database therefore moves them around as plain `YYYY-MM-DD`
 * strings; converting to a `Date` in a local timezone is what produced the
 * off-by-one between the list and detail endpoints.
 */

export const DATE_STRING_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/** Formats a stored calendar date as `YYYY-MM-DD`, read in UTC. */
export const toDateString = (date: Date) => date.toISOString().slice(0, 10);

/** Converts `YYYY-MM-DD` to the UTC-midnight `Date` the database stores. */
export const toStoredDate = (value: string) =>
  new Date(`${value}T00:00:00.000Z`);

/**
 * Parses `YYYY-MM-DD` as a *local* calendar date, for display only. Using
 * `new Date("2024-01-15")` here would give UTC midnight, which renders as the
 * previous day for anyone west of UTC.
 */
export const parseDateString = (value: string) => parseISO(value);

/** Today as `YYYY-MM-DD` in the viewer's own timezone. */
export const todayDateString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
