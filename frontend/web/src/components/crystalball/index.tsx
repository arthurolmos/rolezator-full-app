import React from "react";
import styled, { keyframes } from "styled-components";
import { Suggestion, Question, UserSuggestion } from "../../models";

interface ActiveProps {
  active: boolean;
}

interface Props {
  active: boolean;
  action: () => void;
  question: Question;
  suggestion: UserSuggestion | Suggestion | null;
}

export default function Index({ active, action, question, suggestion }: Props) {
  return (
    <Container>
      <Overlayer
        active={active}
        onClick={() => {
          if (!active) {
            action();
          }
        }}
      />
      <Aura active={active} />
      <Image src="img/crystal-ball-crop.png" alt="crystal-ball" />
      <Texture />
      <QuestionText active={active}>{question && question.text}</QuestionText>
      <SuggestionText active={active}>
        {suggestion && suggestion.name}
      </SuggestionText>
    </Container>
  );
}

const NoSelectContainer = styled.div`
  user-select: none;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-tap-highlight-color: transparent;
`;

const Overlayer = styled(NoSelectContainer)<ActiveProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 9;
  cursor: ${({ active }) => (active ? "normal" : "pointer")};
  box-sizing: border-box;
`;

const Container = styled(NoSelectContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  box-sizing: border-box;
  margin: auto;
`;

const Image = styled.img`
  width: 400px;
  height: auto;
  z-index: 7;
  user-select: none;
  box-sizing: border-box;

  @media (max-width: 600px) {
    width: 300px;
  }
`;

const Aura = styled.div<ActiveProps>`
  width: 400px;
  height: auto;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  border-radius: 50%;
  background: ${({ active }) => (active ? "purple" : "white")};
  box-shadow:  ${({ active }) =>
    active ? "0 0 10px 10px purple;" : "0 0 10px 10px white;"}
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: all 0.8s ease, width 1ms;
  z-index: 6;

  ${Container}:hover & {
    opacity: 1;
  }

  @media (max-width: 600px) {
    width: 300px;
    opacity: 1;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Texture = styled.div`
  width: 400px;
  height: auto;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  border-radius: 50%;
  opacity: 0.5;
  transition: all 0.8s ease, width 1ms;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(9, 62, 121, 0) 100%
  );
  z-index: 8;
  // animation: ${rotate} 6s linear infinite;
  box-sizing: border-box;

  @media (max-width: 600px) {
    width: 300px;
    opacity: 1;
  }
`;

const glow = keyframes` {
    from {
      text-shadow: 0px -2px 4px #fff, 0px -2px 10px #FF3, 0px -10px 20px         #F90, 0px -20px 40px #C33;
    }
    to {
      text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
    }
}`;

const CrystalBallText = styled.div`
  font-family: "Mystery Quest", cursive;
  position: absolute;
  z-index: 8;
  color: white;
  font-size: 32px;
  word-wrap: break-word;
  transition: opacity 0.5s ease;
  align-text: center;
  box-sizing: border-box;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-shadow: 0px -2px 4px #fff, 0px -2px 10px #ff3, 0px -10px 20px #f90,
    0px -20px 40px #c33;

  @media (max-width: 600px) {
    font-size: 24px;
  }

  @media screen and (min-width: 600px) {
    animation: ${glow} 5s linear infinite alternate;
  }
`;

const QuestionText = styled(CrystalBallText)<ActiveProps>`
  opacity: ${({ active }) => (active ? 0 : 1)};
`;

const SuggestionText = styled(CrystalBallText)<ActiveProps>`
  opacity: ${({ active }) => (active ? 1 : 0)};
`;
