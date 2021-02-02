export class User {
  constructor(
    readonly uid: string,
    readonly displayName: string,
    readonly email: string,
    readonly token: string
  ) {}
}
