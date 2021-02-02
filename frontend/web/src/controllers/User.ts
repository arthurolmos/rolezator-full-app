import { repo } from "../repositories/user";
import { Blacklist, DefaultSuggestion, UserSuggestion } from "../models";

export const UserController = {
  async addToUserBlacklist(
    suggestion: DefaultSuggestion,
    userId: string,
    token: string
  ) {
    try {
      if (!userId) return; //TODO: throw Error

      const blacklistItem: Blacklist = {
        id: suggestion.id,
        name: suggestion.name,
      };

      return await repo.addToUserBlacklist(blacklistItem, userId, token);
    } catch (error) {
      console.log("Error inserting blacklist", error); //TODO: throw Error
    }
  },

  async removeFromUserBlacklist(
    blacklistItemId: string,
    userId: string,
    token: string
  ) {
    try {
      if (!userId) return; //TODO: throw Error
      return await repo.removeFromUserBlacklist(blacklistItemId, userId, token);
    } catch (error) {
      console.log("Error removing suggestion", error);
    }
  },

  async addToUserSuggestions(
    suggestion: UserSuggestion,
    userId: string,
    token: string
  ) {
    try {
      if (!userId) return; //TODO: throw Error

      return await repo.addToUserSuggestions(suggestion, userId, token);
    } catch (error) {
      console.log("Error inserting suggestion", error);
    }
  },

  async removeFromUserSuggestions(
    suggestion: UserSuggestion,
    userId: string,
    token: string
  ) {
    try {
      if (!userId) return; //TODO: throw Error

      return await repo.removeFromUserSuggestions(suggestion.id, userId, token);
    } catch (error) {
      console.log("Error removing suggestion", error);
    }
  },
};
