import React from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

interface Props {}

export default function Navbar() {
  const { signOut } = React.useContext(AuthContext);

  const history = useHistory();

  function handleSignOut() {
    signOut();

    history.replace("/login");
  }

  return (
    <Container>
      <Title>Admin Panel</Title>
      <SignOutButton onClick={() => handleSignOut()}>Sair</SignOutButton>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background: lightgray;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px;
  z-index: 999;
`;

const Title = styled.h2``;

const SignOutButton = styled.button`
  height: 50px;
  width: 100px;
  cursor: pointer;
`;
