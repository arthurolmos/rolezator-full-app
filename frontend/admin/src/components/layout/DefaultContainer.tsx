import React, { ReactElement } from "react";
import styled from "styled-components";

interface Props {
  children: ReactElement;
}

export default function DefaultContainer(props: Props) {
  const { children } = props;

  return <Container>{children}</Container>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 15px 15px 15px;
  box-sizing: border-box;
`;
