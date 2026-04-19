import * as moment from 'moment';

export const isThisDateInPast = (date: Date): boolean => {
  const checkedDate = new Date(date);
  const now = new Date();
  return checkedDate.getTime() <= now.getTime();
}

export const isThisDateInFuture = (date: Date): boolean => {
  const checkedDate = new Date(date);
  const now = new Date();
  return checkedDate.getTime() > now.getTime();
}

export const getDateFromNowToDurationInMinutes = (duration: number): Date => {
  const now = new Date();
  const nextDuration = moment(now).add(duration, 'minutes').toDate();
  return nextDuration;
};

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
