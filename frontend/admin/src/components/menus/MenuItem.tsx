import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface Props {
  item: {
    title: string;
    link: string;
  };
}

export default function MenuItem(props: Props) {
  const { item } = props;

  return (
    <LinkStyled to={item.link}>
      <Container>{item.title}</Container>
    </LinkStyled>
  );
}

const Container = styled.div`
  width: 150px;
  height: 150px;
  border: 2px solid black;
  border-radius: 25px;
  box-shadow: 5px 5px lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 25px;

  text-wrap: wrap;

  cursor: pointer;
  &:hover {
    background: lightgray;
    font-weight: bold;
  }
`;

const LinkStyled = styled(Link)`
  color: black;
  text-decoration: none;
`;
