import {
  Blacklist,
  Suggestion,
  UserSuggestion,
  DefaultSuggestion,
} from "../models";
import api from "../api";

const noSuggestion: Suggestion = {
  id: "0",
  name: "Aí vc me complica!",
};

export const repo = {
  filterSuggestions(
    category: string,
    suggestions: DefaultSuggestion[]
  ): DefaultSuggestion[] {
    const filtered = suggestions.filter((suggestion) => {
      const categoriesSet = new Set(
        suggestion.categories.map((category) => category.toLowerCase())
      );

      return categoriesSet.has(category) && suggestion;
    });

    return filtered;
  },

  filterBlacklist(
    items: DefaultSuggestion[],
    userBlacklist: Blacklist[]
  ): DefaultSuggestion[] {
    const blacklistSet = new Set(
      userBlacklist.map((item: Blacklist) => item.id)
    );

    return items.filter((item) => {
      return !blacklistSet.has(item.id);
    });
  },

  async getAllSuggestions() {
    const resp = await api.get("/suggestions");

    const suggestions = resp.data as DefaultSuggestion[];

    return suggestions;
  },

  async getFilteredSuggestions(category: string) {
    const resp = await api.get("/suggestions", {
      params: { category },
    });

    return resp.data;
  },

  getRandomSuggestion(
    suggestions: (DefaultSuggestion | UserSuggestion)[],
    userBlacklist: Array<Blacklist>,
    category: string
  ): DefaultSuggestion | UserSuggestion | Suggestion {
    let items = [...suggestions];
    let resp: Suggestion | DefaultSuggestion | UserSuggestion = noSuggestion;

    if (userBlacklist.length > 0 && category !== "user-suggestion") {
      items = this.filterBlacklist(items as DefaultSuggestion[], userBlacklist);
    }

    if (items.length > 0) {
      const index = Math.floor(Math.random() * items.length);
      const item = items[index];

      resp = item;
    }

    return resp;
  },

  getRandomSuggestion_OLD(
    suggestions: Array<DefaultSuggestion>,
    userBlacklist: Array<Blacklist>,
    category: string
  ): DefaultSuggestion | Suggestion {
    let items = [...suggestions];
    let resp: Suggestion | DefaultSuggestion = noSuggestion;

    if (category !== "any") {
      items = this.filterSuggestions(category, suggestions);
    }

    if (userBlacklist.length > 0) {
      items = this.filterBlacklist(items, userBlacklist);
    }

    if (items.length > 0) {
      const index = Math.floor(Math.random() * items.length);
      const item = items[index];

      resp = new DefaultSuggestion(
        item.id,
        item.name,
        item.categories,
        item.hasURL,
        item.places ? item.places : undefined
      );
    }

    return resp;
  },

  getRandomUserSuggestion(
    userSuggestions: Array<UserSuggestion>
  ): UserSuggestion | Suggestion {
    let result = noSuggestion;

    if (userSuggestions.length !== 0) {
      const index = Math.floor(Math.random() * userSuggestions.length);
      result = userSuggestions[index];
    }

    return result;
  },
};
