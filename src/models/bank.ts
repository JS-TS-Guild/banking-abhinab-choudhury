import { BankAccountId, BankId, UserId } from "@/types/Common";
import BankAccont from "./bank-account";
import GlobalRegistry from "@/services/GlobalRegistry";
import { v6 as uuidv6 } from "uuid";
import TransactionService from "@/services/TransactionService";

export interface BankOptions {
  isNegativeAllowed?: boolean;
}

export default class Bank {
  private id: BankId;
  private isNegativeAllowed: boolean;
  private accountIds: Set<BankAccountId>;

  constructor(id: BankId, options?: BankOptions) {
    this.id = id;
    this.accountIds = new Set<BankAccountId>();
    this.isNegativeAllowed = options?.isNegativeAllowed ?? false;
  }

  static create(options?: BankOptions): Bank {
    const bank = new Bank(uuidv6(), options);
    GlobalRegistry.registerBank(bank);
    return bank;
  }

  getId() {
    return this.id;
  }

  getAccount(bankAccountId: BankAccountId): BankAccont {
    if (!this.accountIds.has(bankAccountId)) {
      throw new Error("Bank account not found");
    }
    return GlobalRegistry.getBankAccount(bankAccountId);
  }

  createAccount(initialBalance = 0): BankAccont {
    const account = new BankAccont(this.id, initialBalance, {
      isNegativeAllowed: this.isNegativeAllowed,
    });
    this.accountIds.add(account.getId());

    GlobalRegistry.registerBankAccount(account);
    return account;
  }

  send(
    fromUserId: UserId,
    toUserId: UserId,
    ammount: number,
    toBankId?: BankId,
  ) {
    TransactionService.transfer(
      this.id,
      fromUserId,
      toUserId,
      ammount,
      toBankId,
    );
  }

  transfer(
    fromUserId: UserId,
    toUserId: UserId,
    ammount: number,
    toBankId?: BankId,
  ) {
    this.send(fromUserId, toUserId, ammount, toBankId);
  }
}
