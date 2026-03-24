import GlobalRegistry from "@/services/GlobalRegistry";
import { BankAccountId, UserId } from "@/types/Common";
import { v6 as uuidv6 } from "uuid";

export default class User {
  private userId: UserId;
  private accountIds: BankAccountId[];
  private name: string;

  constructor(name: string, accountIds: BankAccountId[]) {
    this.name = name;
    this.accountIds = accountIds;
    this.userId = uuidv6();
  }

  getId(): UserId {
    return this.userId;
  }

  getAccountIds(): BankAccountId[] {
    return this.accountIds;
  }

  getName(): string {
    return this.name;
  }

  static create(name: string, accountIds: BankAccountId[]): User {
    const user = new User(name, accountIds);
    GlobalRegistry.registerUser(user);
    return user;
  }
}
