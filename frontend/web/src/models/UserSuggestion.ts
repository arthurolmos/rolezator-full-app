import { Suggestion } from "./Suggestion";

export class UserSuggestion extends Suggestion {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly address: string,
    readonly coordinates: {
      readonly lat: number;
      readonly lng: number;
    }
  ) {
    super(id, name);
  }
}
