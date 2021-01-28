import { Suggestion } from "./Suggestion";

export class DefaultSuggestion extends Suggestion {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly categories: string[],
    readonly hasURL: boolean,
    readonly plural?: string
  ) {
    super(id, name);
  }
}
