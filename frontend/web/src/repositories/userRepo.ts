import dao from "../dao";

export async function addToUserBlacklist(item: any) {
  try {
    const ref = dao.getUserRef();

    const blacklistRef = ref && ref.collection("blacklist");
    await dao.createDocument(blacklistRef, item);
  } catch (error) {
    console.log("Error inserting blacklist", error);
  }
}

export async function removeFromUserBlacklist(id: string) {
  try {
    const ref = dao.getUserRef();

    const blacklistRef = ref && ref.collection("blacklist").doc(id);
    await dao.deleteDocument(blacklistRef);
  } catch (error) {
    console.log("Error inserting doc", error);
  }
}

export async function addToUserSuggestions(item: any) {
  try {
    const ref = dao.getUserRef();

    const suggestionsRef = ref && ref.collection("suggestions");
    await dao.createDocument(suggestionsRef, item);
  } catch (error) {
    console.log("Error inserting suggestion", error);
  }
}

export async function removeFromUserSuggestions(id: string) {
  try {
    const ref = dao.getUserRef();

    const suggestionsRef = ref && ref.collection("suggestions").doc(id);
    await dao.deleteDocument(suggestionsRef);
  } catch (error) {
    console.log("Error removing doc", error);
  }
}
