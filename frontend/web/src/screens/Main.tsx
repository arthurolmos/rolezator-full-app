import React from "react";
import SideMenu from "../components/menus/SideMenu";
import CrystalBall from "../components/crystalball";
import styled, { keyframes } from "styled-components";
import { AuthContext } from "../contexts/AuthContext";
import {
  Question,
  DefaultSuggestion,
  UserSuggestion,
  Suggestion,
  Blacklist,
} from "../models";
import { UserController, SuggestionController } from "../controllers";

interface ActiveProps {
  active: boolean;
}

export default function Main() {
  const { user, userBlacklist, userSuggestions } = React.useContext(
    AuthContext
  );

  const defaulQuestion: Question = {
    text: "O qUe Vou faZeR HoJE??",
    category: "any",
  };

  const [active, setActive] = React.useState(false);

  const [question, setQuestion] = React.useState(defaulQuestion);
  const [allSuggestions, setAllSuggestions] = React.useState<
    Array<DefaultSuggestion>
  >([]);
  const [suggestion, setSuggestion] = React.useState<
    UserSuggestion | DefaultSuggestion | Suggestion | null
  >(null);

  function getUserSuggestion(): void {
    const resp = SuggestionController.getRandomUserSuggestion(userSuggestions);

    setSuggestion(resp);
    setActive(true);
  }

  function getSuggestion(): void {
    const resp = SuggestionController.getRandomSuggestion(
      allSuggestions,
      userBlacklist,
      question.category
    );

    setSuggestion(resp);
    setActive(true);
  }

  function handleQuestion(question: Question) {
    setQuestion(question);
    setActive(false);
  }

  async function handleAddToBlacklist() {
    await UserController.addToUserBlacklist(suggestion as Blacklist, user.uid);

    setActive(false);
  }

  function selectAction() {
    return question.category === "user-suggestion"
      ? getUserSuggestion()
      : getSuggestion();
  }

  function UserSuggestionText({ suggestion }: { suggestion: UserSuggestion }) {
    return (
      <Text active={active}>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${suggestion.coordinates.lat},${suggestion.coordinates.lng}&query_place_id=${suggestion.id}`}
          target="_blank"
          rel="noreferrer"
        >
          Ir para {suggestion.name}!
        </a>
      </Text>
    );
  }

  function SuggestionURL({ suggestion }: { suggestion: DefaultSuggestion }) {
    const url = suggestion.name.split(" ").join("+");

    return (
      <Text active={active}>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${url}`}
          target="_blank"
          rel="noreferrer"
        >
          Descubra {suggestion.plural} próximos da sua área!
        </a>
      </Text>
    );
  }

  React.useEffect(() => {
    async function getAllSuggestions() {
      const suggestions = await SuggestionController.getAllSuggestions();

      if (suggestions) setAllSuggestions(suggestions);
    }

    getAllSuggestions();
  }, []);

  return (
    <Container>
      <ContainerTexture />
      <SideMenu handleQuestion={handleQuestion} />

      <CrystalBall
        active={active}
        action={selectAction}
        suggestion={suggestion}
        question={question}
      />

      <TextContainer>
        {question.category === "user-suggestion" && (
          <UserSuggestionText suggestion={suggestion as UserSuggestion} />
        )}
        {suggestion && "hasURL" in suggestion && suggestion.hasURL === true && (
          <SuggestionURL suggestion={suggestion as DefaultSuggestion} />
        )}
        <Text onClick={() => setActive(false)} active={active}>
          TeNTar noVamENte?
        </Text>
        {user && suggestion && (
          <Text onClick={() => handleAddToBlacklist()} active={active}>
            JaMais! AdicIoNar a BlacKLisT!
          </Text>
        )}
      </TextContainer>
    </Container>
  );
}

const NoSelectContainer = styled.div`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-tap-highlight-color: transparent;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: black;
  box-sizing: border-box;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  overflow: hidden;

  background-image: url("/img/universe-darker-3.jpg");
  @media (max-width: 360px) {
    background-image: url("/img/universe-darker-3-small.jpg");
  }
`;

const slide = keyframes`
  0% { width: 0 }
  50% { width: 100%; }
  100% { width: 0; }
`;

const ContainerTexture = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  opacity: 0.8;

  width: 200px;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(9, 62, 121, 0) 100%
  );
  z-index: 8;
  // animation: ${slide} 10s linear infinite;

  @media (max-width: 600px) {
    width: 300px;
    opacity: 0.8;
  }

  z-index: 1;
`;

const TextContainer = styled(NoSelectContainer)`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  margin-bottom: 30px;
  z-index: 4;
  user-select: none;
`;

const Text = styled.div<ActiveProps>`
  font-family: "Mystery Quest", cursive;
  color: white;
  margin: 20px;
  cursor: pointer;
  // transition: text-shadow 0.5s ease;
  // text-shadow: 0px -2px 4px #fff, 0px -2px 10px #ff3, 0px -10px 20px #f90,
  //   0px -20px 40px #c33;
  font-size: 28px;
  visibility: ${({ active }) => (active ? "visible" : "hidden")};
  opacity: ${({ active }) => (active ? 1 : 0)};

  &:hover {
    text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6,
      0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
  }

  & a {
    text-decoration: none;
    color: white;
  }

  @media (max-width: 600px) {
    font-size: 20px;
  }
`;
