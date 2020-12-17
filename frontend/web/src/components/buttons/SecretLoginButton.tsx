import React from "react";
import LoginModal from "../modal/LoginModal";
import styled from "styled-components";

interface Props {}

export default function SecretLoginButton() {
  const [counter, setCounter] = React.useState<number>(0);
  const [open, setOpen] = React.useState<boolean>(false);

  const closeModal = () => setOpen(false);

  const increaseCounter = () => setCounter(counter + 1);

  return (
    <>
      {counter >= 5 ? (
        <LoginButton onClick={() => setOpen(true)}>Login</LoginButton>
      ) : (
        <Overlayer onClick={increaseCounter} />
      )}

      <LoginModal open={open} closeModal={closeModal} />
    </>
  );
}

const Overlayer = styled.div`
  opacity: 0;
  background: white;
  position: fixed;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const LoginButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
`;
