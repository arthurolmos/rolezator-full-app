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

  async addToUserBlacklist(blacklistItem: Blacklist, userId: string) {
    return await api.post(`/users/${userId}/blacklist`, blacklistItem);
  },

  async removeFromUserBlacklist(blacklistItemId: string, userId: string) {
    return await api.delete(`/users/${userId}/blacklist/${blacklistItemId}`);
  },

  async addToUserSuggestions(item: any, userId: string) {
    return await api.post(`/users/${userId}/suggestions`, item);
  },

  async removeFromUserSuggestions(suggestionId: string, userId: string) {
    return await api.delete(`/users/${userId}/suggestions/${suggestionId}`);
  },
};
