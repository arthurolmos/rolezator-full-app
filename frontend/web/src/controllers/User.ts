import { repo } from "../repositories/user";
import { Blacklist, UserSuggestion } from "../models";

export const UserController = {
  async addToUserBlacklist(blacklistItem: Blacklist, userId: string) {
    try {
      if (!userId) return; //TODO: throw Error

      return await repo.addToUserBlacklist(blacklistItem.id, userId);
    } catch (error) {
      console.log("Error inserting blacklist", error); //TODO: throw Error
    }
  },

  async removeFromUserBlacklist(suggestion: UserSuggestion, userId: string) {
    try {
      if (!userId) return; //TODO: throw Error

      return await repo.removeFromUserBlacklist(suggestion.id, userId);
    } catch (error) {
      console.log("Error removing suggestion", error);
    }
  },

  async addToUserSuggestions(suggestion: UserSuggestion, userId: string) {
    try {
      if (!userId) return; //TODO: throw Error

      return await repo.addToUserSuggestions(suggestion, userId);
    } catch (error) {
      console.log("Error inserting suggestion", error);
    }
  },

  async removeFromUserSuggestions(suggestion: UserSuggestion, userId: string) {
    try {
      if (!userId) return; //TODO: throw Error

      return await repo.removeFromUserSuggestions(suggestion.id, userId);
    } catch (error) {
      console.log("Error removing suggestion", error);
    }
  },
};
