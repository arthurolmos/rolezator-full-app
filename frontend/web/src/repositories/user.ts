import api from "../api";
import { Blacklist } from "../models";

export const repo = {
  async getUser(userId: string) {
    // const ref = instance.getUserRef();
    // if (ref) {
    //   const user = await dao.getDocument(ref);
    //   return user;
    // }
    // return null;
  },

  async addToUserBlacklist(
    blacklistItem: Blacklist,
    userId: string,
    token: string
  ) {
    return await api.post(`/users/${userId}/blacklist`, blacklistItem, {
      headers: { TokenId: token },
    });
  },

  async removeFromUserBlacklist(
    blacklistItemId: string,
    userId: string,
    token: string
  ) {
    return await api.delete(`/users/${userId}/blacklist/${blacklistItemId}`, {
      headers: { TokenId: token },
    });
  },

  async addToUserSuggestions(item: any, userId: string, token: string) {
    return await api.post(`/users/${userId}/suggestions`, item, {
      headers: { TokenId: token },
    });
  },

  async removeFromUserSuggestions(
    suggestionId: string,
    userId: string,
    token: string
  ) {
    return await api.delete(`/users/${userId}/suggestions/${suggestionId}`, {
      headers: { TokenId: token },
    });
  },
};
