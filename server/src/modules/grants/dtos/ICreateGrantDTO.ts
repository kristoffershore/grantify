export default interface ICreateGrantDTO {
  grantName: string;
  openDate: Date;
  closeDate: Date;
  status: string;
  amountRequested: number;
  amountApproved: number;
  sponsorName: string;
  sponsorUrl: string;
}
