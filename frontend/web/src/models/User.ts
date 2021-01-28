import { repo } from "../repositories/user";

export class User {
  private _blacklist: Set<string>;

  constructor(readonly id: string, blacklist: Set<string>) {
    this._blacklist = blacklist;
  }

  get blacklist() {
    return this._blacklist;
  }

  updateBlacklist() {}
}
