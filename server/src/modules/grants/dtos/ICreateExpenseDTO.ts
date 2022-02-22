export default interface ICreateExpenseDTO {
  name: string;
  lineItemCode: number;
  budget: number;
  amountSpent: number;
  date: string;
  grantId: string;
}
