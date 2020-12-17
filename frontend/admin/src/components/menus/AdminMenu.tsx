import React from "react";
import { AuthContext } from "../../contexts/AuthContext";
import styled from "styled-components";

interface OpenProps {
  open: boolean;
}

export default function AdminMenu() {
  const { user, signIn } = React.useContext(AuthContext);

  const [open, setOpen] = React.useState<boolean>(false);
  const toggleOpen = () => setOpen(!open);

  function handleOption() {
    setOpen(false);
  }

  return (
    <>
      <Container open={open}>
        <ContentContainer>
          <TitleContainer>Menu</TitleContainer>
          <MenuContainer>
            <MenuOptions>
              <Option onClick={() => handleOption()}>asdasdasd</Option>
            </MenuOptions>
          </MenuContainer>
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
  transition: width 0.3s linear;
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
  // justify-content: center;

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
