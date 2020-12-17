import IBlacklist from "../interfaces/IBlacklist";
import ISuggestion from "../interfaces/ISuggestion";
import IUserSuggestion from "../interfaces/IUserSuggestion";
import api from "../api";

const noSuggestion = {
  id: "0",
  name: "Aí vc me complica!",
};

export function getRandomSuggestion(
  suggestions: Array<ISuggestion>,
  userBlacklist: Array<IBlacklist>,
  category: string
): ISuggestion {
  let items = [...suggestions];
  let result: ISuggestion = noSuggestion;

  if (category !== "any") {
    items = suggestions.filter((suggestion) => {
      const categoriesSet = new Set(
        suggestion.categories &&
          suggestion.categories.map((category) => category.toLowerCase())
      );

      return categoriesSet.has(category) && suggestion;
    });
  }

  if (userBlacklist.length > 0) {
    const blacklistSet = new Set(
      userBlacklist.map((item: IBlacklist) => item.id)
    );

    items = items.filter((item) => {
      return !blacklistSet.has(item.id);
    });
  }

  if (items.length !== 0) {
    const index = Math.floor(Math.random() * items.length);
    result = items[index];

    if (category.toLowerCase() !== "action")
      result.url = result.name.split(" ").join("+");
  }

  return result;
}

export function getRandomUserSuggestion(
  userSuggestions: Array<IUserSuggestion>
): ISuggestion | IUserSuggestion {
  let result = noSuggestion;

  if (userSuggestions.length !== 0) {
    const index = Math.floor(Math.random() * userSuggestions.length);
    result = userSuggestions[index];
  }

  return result;
}
