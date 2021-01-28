export class Suggestion {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly categories: string | string[],
    readonly pronoum: string,
    readonly createdAt: string,
    readonly updatedAt: string
  ) {}
}
