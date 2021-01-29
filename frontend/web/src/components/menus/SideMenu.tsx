import React from "react";
import UserMenu from "./UserMenu";
import { AuthContext } from "../../contexts/AuthContext";
import styled, { keyframes } from "styled-components";
import { Question } from "../../models";

const commonQuestions: Question[] = [
  {
    text: "O que vou fazer hoje?",
    category: "any",
  },
  {
    text: "O que vou comer hoje?",
    category: "eat",
  },
  {
    text: "Para onde irei hoje?",
    category: "action",
  },
];

interface OpenProps {
  open: boolean;
}

export default function SideMenu({
  handleQuestion,
}: {
  handleQuestion: (question: Question) => void;
}) {
  const { user, signIn } = React.useContext(AuthContext);

  const [open, setOpen] = React.useState(false);
  const toggleOpen = () => setOpen(!open);

  function handleOption(question: Question) {
    handleQuestion(question);
    setOpen(false);
  }

  return (
    <>
      <Container open={open}>
        <ContentContainer>
          <TitleContainer>
            <Title>RoleZatOr</Title>
            <Description>Desenvolvido por Arthur Wosniaki</Description>
          </TitleContainer>

          <MenuContainer>
            <MenuOptions>
              {user && (
                <OptionStyled
                  onClick={() =>
                    handleOption({
                      text: "Usar minhas sugestões!",
                      category: "user-suggestion",
                    })
                  }
                >
                  Usar minhas sugestões!
                </OptionStyled>
              )}
              {commonQuestions.map((question, index: number) => {
                return (
                  <Option key={index} onClick={() => handleOption(question)}>
                    {question.text}
                  </Option>
                );
              })}
            </MenuOptions>
          </MenuContainer>

          {user ? <UserMenu /> : <GoogleButton onClick={() => signIn()} />}
        </ContentContainer>
        <OpenBar onClick={toggleOpen}>MENU</OpenBar>
      </Container>
    </>
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

const GoogleButton = styled.div`
  width: 200px;
  height: 40px;
  background: url("/assets/btn_google_signin_dark_normal_web@2x.png");
  background-position: center;
  background-repeat: no-repeat;
  box-sizing: border-box;
  background-size: cover;

  cursor: pointer;

  &:hover {
    background: url("/assets/btn_google_signin_dark_focus_web@2x.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  &:active {
    background: url("/assets/btn_google_signin_dark_pressed_web@2x.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
`;

const Container = styled.div<OpenProps>`
  width: ${({ open }) => (open ? "350px" : "0")};
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  transition: width 0.3s ease;
  z-index: 999;
  display: flex;
  box-sizing: border-box;
  @media (max-width: 600px) {
    width: ${({ open }) => (open ? "250px" : "0")};
  }
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  min-width: 0;
  flex-direction: column;
  box-sizing: border-box;
  overflow-x: hidden;
  background: rgba(0, 0, 0, 0.8);
  align-items: center;

  position: relative;
`;

const OpenBar = styled.div`
  min-width: 50px;
  cursor: pointer;
  opacity: 0.8;
  box-sizing: border-box;

  background: red;
  transition: all 0.2s ease;

  position: absolute;
  top: 40px;
  right: -50px;

  &:hover {
    opacity: 1;
  }
`;

const TitleContainer = styled.div`
  margin: 60px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background: black;
`;

const glow = keyframes` {
    from {
      text-shadow: 0px -2px 4px #fff, 0px -2px 10px #FF3, 0px -10px 20px         #F90, 0px -20px 40px #C33;
    }
    to {
      text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
    }
}`;

const Title = styled.div`
  font-family: "Mystery Quest", cursive;
  animation: ${glow} 5s linear infinite alternate;
  color: white;
  box-sizing: border-box;
  font-size: 36px;

  @media (max-width: 600px) {
    font-size: 30px;
  }
`;

const Description = styled.div`
  display: flex;
  color: white;
  font-size: 16px;
  white-space: nowrap;
  box-sizing: border-box;

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const MenuOptions = styled(NoSelectContainer)`
  color: white;
  font-size: 20px;
  box-sizing: border-box;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const Option = styled.div`
  white-space: nowrap;
  transition: transform 0.5s ease;
  margin-bottom: 20px;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    transform: scale(1.1);
  }
`;

const OptionStyled = styled.div`
  white-space: nowrap;
  transition: transform 0.5s ease;
  margin-bottom: 20px;
  cursor: pointer;
  text-shadow: 0px -2px 4px #fff, 0px -2px 10px #ff3, 0px -10px 20px #f90,
    0px -20px 40px #c33;
  box-sizing: border-box;

  &:hover {
    transform: scale(1.1);
  }
`;

const MenuContainer = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;
