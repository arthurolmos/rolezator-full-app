import React, { ReactElement } from "react";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";
import DefaultContainer from "./DefaultContainer";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Props {
  children: ReactElement;
  title: string;
  loading: boolean;
}

export default function TableContainer(props: Props) {
  const location = useLocation();
  const { children, title, loading } = props;

  const backURL = location.pathname.split("/").slice(0, -1).join("/");
  const addURL = location.pathname.concat("/create");

  return (
    <DefaultContainer>
      <>
        <ButtonsContainer>
          <Return>
            <Link to={backURL}>
              <IconStyled>
                <FaArrowLeft />
              </IconStyled>
            </Link>
          </Return>
          <ActionButtonsContainer>
            <Link to={addURL}>
              <IconStyled>
                <FaPlus />
              </IconStyled>
            </Link>
          </ActionButtonsContainer>
        </ButtonsContainer>

        <Title>{title}</Title>
        <ContentContainer>
          {" "}
          {loading ? <CircularProgress /> : children}
        </ContentContainer>
      </>
    </DefaultContainer>
  );
}

const ContentContainer = styled.div`
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const Title = styled.h1`
  box-sizing: border-box;
`;

const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
`;

const Return = styled.div`
  display: flex;
  flex: 1;
  box-sizing: border-box;
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  flex: 1;
  box-sizing: border-box;
  justify-content: flex-end;
`;

const IconStyled = styled.div`
  cursor: pointer;
  font-size: 20px;
  color: black;
  margin: 0 20px;

  &:hover {
    opacity: 0.5;
  }
`;
