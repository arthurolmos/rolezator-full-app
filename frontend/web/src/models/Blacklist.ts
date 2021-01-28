import { Suggestion } from "./Suggestion";

export class Blacklist extends Suggestion {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly url: string
  ) {
    super(id, name);
  }
}
