import { Expense } from './Expense';

export type Grant = {
  id: string;
  grantName: string;
  openDate: string;
  closeDate: string;
  status: string;
  amountRequested: number;
  amountApproved?: number;
  sponsorName?: string;
  sponsorUrl?: string;
  dateWhenFundsWereReceived?: string;
  expirationDate?: string;
  expenses?: Expense[];
};
