import React, { ReactElement } from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

interface OpenProps { 
  open: boolean
}


function ModalLayout(
  { open, closeModal, title, children }: 
  {open: boolean, closeModal: () => void, title: string, children: ReactElement}) {
  return (
    <>
      <Container open={open}>
        <Header>
          <Title>{title}</Title>
          <CloseButton>
            <FaTimesStyled onClick={() => closeModal()} />
          </CloseButton>
        </Header>

        <Content>{children}</Content>
      </Container>
      <Backdrop open={open} />
    </>
  );
}

export default ModalLayout;

const Container = styled.div<OpenProps>`
  display: ${({ open }) => (open ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 400px;
  height: 600px;
  margin: auto;
  z-index: 999;
  flex-direction: column;
  border-radius: 25px;
  background: purple;
  color: white;
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: 600px) {
    width: 300px;
  }
`;

const Backdrop = styled.div<OpenProps>`
  display: ${({ open }) => (open ? "flex" : "none")};
  box-sizing: border-box;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background: black;
  opacity: 0.5;
`;

const Header = styled.div`
  display: flex;
  height: auto;
  box-sizing: border-box;
  padding: 25px 25px 0;
`;

const Title = styled.h2`
  flex: 2;
  box-sizing: border-box;
  text-transform: uppercase;
`;

const CloseButton = styled.div`
  flex: 1;
  display: flex;
  box-sizing: border-box;
  justify-content: flex-end;
`;

const FaTimesStyled = styled(FaTimes)`
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    opacity: 0.8;
  }
`;

const Content = styled.div`
  box-sizing: border-box;
  padding: 25px;
`;
