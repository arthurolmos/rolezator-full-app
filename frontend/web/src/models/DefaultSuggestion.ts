import { Suggestion } from "./Suggestion";
import { Categories } from "./Categories";

export class DefaultSuggestion extends Suggestion {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly categories: Categories[],
    readonly hasURL: boolean,
    readonly places?: string
  ) {
    super(id, name);
  }
}
