import React from "react";
import styled from "styled-components";
import MenuItem from "../components/menus/MenuItem";
import Navbar from "../components/header/Navbar";

const items = [
  {
    _id: "users",
    title: "Gerenciar usuários",
    link: "/panel/users",
  },
  {
    _id: "suggestions",
    title: "Gerenciar sugestões",
    link: "/panel/suggestions",
  },
];

export default function Admin() {
  return (
    <>
      <Navbar />
      <ContentContainer>
        {items.map((item) => {
          return <MenuItem item={item} key={item._id} />;
        })}
      </ContentContainer>
    </>
  );
}

const ContentContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;

  overflow-y: auto;
  box-sizing: border-box;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const Input = styled.input`
  box-sizing: border-box;
  height: 30px;
  margin: 0 0 15px 0;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }
`;
