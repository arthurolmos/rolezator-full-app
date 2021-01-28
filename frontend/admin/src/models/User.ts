import { TableData } from "../interfaces";

export class User implements TableData {
  constructor(
    readonly id: string,
    readonly displayName: string,
    readonly email: string,
    readonly isAdmin: boolean,
    readonly createdAt?: string,
    readonly lastSignIn?: string
  ) {}

  booleanToString(value: boolean): string {
    return value ? "true" : "false";
  }
}
