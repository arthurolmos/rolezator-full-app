import { repo } from "../repositories/user";
import { Blacklist, DefaultSuggestion, UserSuggestion } from "../models";

export const UserController = {
  async addToUserBlacklist(suggestion: DefaultSuggestion, userId: string) {
    try {
      if (!userId) return; //TODO: throw Error

      const blacklistItem: Blacklist = {
        id: suggestion.id,
        name: suggestion.name,
      };

      console.log("blacklistItem", blacklistItem);

      return await repo.addToUserBlacklist(blacklistItem, userId);
    } catch (error) {
      console.log("Error inserting blacklist", error); //TODO: throw Error
    }
  },

  async removeFromUserBlacklist(blacklistItemId: string, userId: string) {
    try {
      console.log("HERE", blacklistItemId, userId);

      if (!userId) return; //TODO: throw Error

      console.log(blacklistItemId, userId);

      return await repo.removeFromUserBlacklist(blacklistItemId, userId);
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
