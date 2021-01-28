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
  value?: { label: string; value: string } | { label: string; value: string }[];
  options: { value: string; label: string }[];
  onChange: (e: any) => void;
  isMulti?: boolean;
}) {
  return <SelectStyled {...props} />;
}

export default function EditContainer(props: Props) {
  const location = useLocation();
  const { children, title, loading } = props;

  const backURL = location.pathname.split("/").slice(0, -2).join("/");

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
          <Title>{title}</Title>
        </ButtonsContainer>

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
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 15px 25px;
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
  flex: 2;
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
  align-items: center;
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
