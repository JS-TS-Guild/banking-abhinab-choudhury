import Bank from "@/models/bank";
import BankAccont from "@/models/bank-account";
import User from "@/models/user";
import { BankAccountId, BankId, UserId } from "@/types/Common";

export default class GlobalRegistry {
  private static users: Map<UserId, User> = new Map();
  private static banks: Map<BankId, Bank> = new Map();
  private static bankAccounts: Map<BankAccountId, BankAccont> = new Map();

  static registerUser(user: User) {
    this.users.set(user.getId(), user);
  }

  static registerBank(bank: Bank) {
    this.banks.set(bank.getId(), bank);
  }

  static registerBankAccount(bankAccount: BankAccont) {
    this.bankAccounts.set(bankAccount.getId(), bankAccount);
  }

  static getUser(userId: UserId): User {
    const user = this.users.get(userId);
    if (!user) throw new Error("User not found");
    return user;
  }

  static getBank(bankId: BankId): Bank {
    const bank = this.banks.get(bankId);
    if (!bank) throw new Error("Bank not found");
    return bank;
  }

  static getAllBank(): Bank[] {
    return Array.from(this.banks.values());
  }

  static getBankAccount(bankAccountId: BankAccountId): BankAccont {
    const account = this.bankAccounts.get(bankAccountId);
    if (!account) throw new Error("Bank Account not Found");
    return account;
  }

  static getAllBankAccount(): BankAccont[] {
    return Array.from(this.bankAccounts.values());
  }

  static clear() {
    this.users.clear();
    this.bankAccounts.clear();
    this.banks.clear();
  }
}
