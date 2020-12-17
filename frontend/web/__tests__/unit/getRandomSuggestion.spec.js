import { getRandomSuggestion } from "../../src/repositories/suggestionsRepo";

const suggestions = [
  {
    id: "a",
    name: "Parque",
    categories: ["places"],
  },
  {
    id: "b",
    name: "Test",
    categories: ["any"],
  },
  {
    id: "c",
    name: "Igreja",
    categories: ["places"],
  },
  {
    id: "d",
    name: "Restaurante Italiano",
    categories: ["eat", "places"],
  },
  {
    id: "e",
    name: "Restaurante Mexicano",
    categories: ["eat", "places"],
  },
  {
    id: "f",
    name: "Viajar",
    categories: ["action"],
  },
  {
    id: "g",
    name: "Ler um livro",
    categories: ["action"],
  },
  {
    id: "h",
    name: "Jogar Magic",
    categories: ["action"],
  },
];

const blacklist = [
  {
    id: "a",
  },
  {
    id: "b",
  },
  {
    id: "c",
  },
  {
    id: "d",
  },
  {
    id: "e",
  },
  {
    id: "f",
  },
  {
    id: "g",
  },
  {
    id: "h",
  },
];

const actionBlacklist = [
  {
    id: "f",
  },
  {
    id: "g",
  },
];

const eatBlacklist = [
  {
    id: "d",
  },
];

describe("#GET RANDOM SUGGESTION", () => {
  it("Should return a random suggestion", () => {
    const suggestion = getRandomSuggestion(suggestions, [], "any");

    console.log("SUG", suggestion);

    expect(suggestion).not.toBe("");
    expect(suggestion).not.toBe("0");
  });

  it("Should return a suggestion with action categories", () => {
    const suggestion = getRandomSuggestion(suggestions, [], "action");

    console.log("SUG", suggestion);

    expect(suggestion).not.toBe("");
    expect(suggestion.categories).toContain("action");
  });

  it("Should return a suggestion with eat categories", () => {
    const suggestion = getRandomSuggestion(suggestions, [], "eat");

    console.log("SUG", suggestion);

    expect(suggestion).not.toBe("");
    expect(suggestion.categories).toContain("eat");
  });

  it("Should return a noSuggestion because of full Blacklist", () => {
    const suggestion = getRandomSuggestion(suggestions, blacklist, "any");

    console.log("SUG", suggestion);

    expect(suggestion).not.toBe("");
    expect(suggestion.id).toBe("0");
  });

  it("Should return a suggestion with ID = 'e' beacause of Blacklist and categories", () => {
    const suggestion = getRandomSuggestion(suggestions, eatBlacklist, "eat");

    console.log("SUG", suggestion);

    expect(suggestion).not.toBe("");
    expect(suggestion.id).toBe("e");
  });
});
