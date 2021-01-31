import { Suggestion } from "./Suggestion";

export class Blacklist extends Suggestion {
  constructor(readonly id: string, readonly name: string) {
    super(id, name);
  }
}
