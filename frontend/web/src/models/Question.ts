import { Categories } from "./Categories";

export class Question {
  constructor(readonly text: string, readonly category: Categories) {}
}
