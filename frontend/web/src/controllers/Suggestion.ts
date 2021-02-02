import { repo } from "../repositories/suggestions";
import { DefaultSuggestion, Blacklist, UserSuggestion } from "../models";

export const SuggestionController = {
  async getAllSuggestions() {
    try {
      return await repo.getAllSuggestions();
    } catch (err) {
      console.log(err);
    }
  },

  async getOnlyActionSuggestions() {
    try {
      return await repo.getFilteredSuggestions("action");
    } catch (err) {
      console.log(err);
    }
  },

  async getOnlyEatSuggestions() {
    try {
      return await repo.getFilteredSuggestions("eat");
    } catch (err) {
      console.log(err);
    }
  },

  async getOnlyGoSuggestions() {
    try {
      return await repo.getFilteredSuggestions("go");
    } catch (err) {
      console.log(err);
    }
  },

  filterSuggestions(category: string, suggestions: DefaultSuggestion[]) {
    try {
      return repo.filterSuggestions(category, suggestions);
    } catch (err) {
      console.log(err);
    }
  },

  getRandomUserSuggestion(userSuggestions: UserSuggestion[]) {
    return repo.getRandomUserSuggestion(userSuggestions);
  },

  getRandomSuggestion(
    suggestions: (DefaultSuggestion | UserSuggestion)[],
    userBlacklist: Array<Blacklist>,
    category: string
  ) {
    return repo.getRandomSuggestion(suggestions, userBlacklist, category);
  },
};
