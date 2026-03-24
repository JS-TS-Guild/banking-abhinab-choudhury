import { v6 as uuidv6 } from "uuid";
import { BankAccountId, BankId, UserId } from "@/types/Common";
import { BankOptions } from "./bank";

export default class BankAccont {
  private id: BankAccountId;
  private bankId: BankId;
  private balance: number;
  private isNegativeAllowed: boolean;

  constructor(bankId: BankId, balance: number = 0, options?: BankOptions) {
    this.id = uuidv6();
    this.bankId = bankId;
    this.balance = balance;
    this.isNegativeAllowed = options.isNegativeAllowed ?? false;
  }

  getId(): BankAccountId {
    return this.id;
  }

  getBankId(): BankId {
    return this.bankId;
  }

  getBalance() {
    return this.balance;
  }

  canDebit(amount: number): boolean {
    if (this.isNegativeAllowed) {
      return true;
    }
    return this.balance >= amount;
  }

  debit(amount: number) {
    if (amount < 0) {
      throw new Error("Amount should be greater then zero");
    }
    if (!this.canDebit(amount)) {
      throw new Error("Insufficient funds");
    }
    this.balance -= amount;
  }

  credit(amount: number) {
    if (amount < 0) {
      throw new Error("Amount should be greater then zero");
    }
    this.balance += amount;
  }
}
