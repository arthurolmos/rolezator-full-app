import api from "../api";

export const repo = {
  async getUser(userId: string) {
    // const ref = instance.getUserRef();
    // if (ref) {
    //   const user = await dao.getDocument(ref);
    //   return user;
    // }
    // return null;
  },

  async addToUserBlacklist(blacklistItemId: string, userId: string) {
    return await api.post(`/users/${userId}/blacklist`, {
      blacklistItemId,
    });
  },

  async removeFromUserBlacklist(blacklistItemId: any, userId: string) {
    return await api.delete(`/users/${userId}/blacklist/${blacklistItemId}`);
  },

  async addToUserSuggestions(item: any, userId: string) {
    return await api.post(`/users/${userId}/suggestions`, item);
  },

  async removeFromUserSuggestions(suggestionId: string, userId: string) {
    return await api.delete(`/users/${userId}/suggestions/${suggestionId}`);
  },
};
