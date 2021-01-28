type Category = "any" | "eat" | "action" | "user-suggestion";

export class Question {
  constructor(readonly text: string, readonly category: Category) {}
}
