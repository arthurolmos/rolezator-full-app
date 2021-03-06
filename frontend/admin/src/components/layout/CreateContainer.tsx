import React, { ReactElement } from "react";
import { FaArrowLeft, FaPlus, FaEdit } from "react-icons/fa";
import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";
import DefaultContainer from "./DefaultContainer";
import Select from "react-select";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Props {
  children: ReactElement;
  title: string;
  loading: boolean;
}

export function SelectInput(props: {
  options: { value: string; label: string }[];
  onChange: (e: any) => void;
  isMulti?: boolean;
}) {
  return <SelectStyled {...props} />;
}

export default function CreateContainer(props: Props) {
  const location = useLocation();
  const { children, title, loading } = props;

  const backURL = location.pathname.split("/").slice(0, -1).join("/");

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
        </ButtonsContainer>

        <Title>{title}</Title>
        <ContentContainer>
          {loading ? (
            <LoadingContainer>
              <CircularProgress />
            </LoadingContainer>
          ) : (
            children
          )}
        </ContentContainer>
      </>
    </DefaultContainer>
  );
}

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 15px 25px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 15px 25px;
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

const IconStyled = styled.div`
  cursor: pointer;
  font-size: 20px;
  color: black;
  margin: 0 20px;

  &:hover {
    opacity: 0.5;
  }
`;

const SelectStyled = styled(Select)`
  height: 30px;
  width: 300px;
  margin: 0 auto 30px 0;
  box-sizing: border-box;
`;
