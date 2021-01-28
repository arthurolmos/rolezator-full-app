import React from "react";
import ModalLayout from "./ModalLayout";
import BlacklistItem from "../listItems/BlacklistItem";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";
import { Blacklist } from "../../models";

interface ModalProps {
  open: boolean;
  closeModal: () => void;
}

export default function BlacklistModal({ open, closeModal }: ModalProps) {
  const { userBlacklist } = React.useContext(AuthContext);

  return (
    <ModalLayout open={open} closeModal={closeModal} title="Blacklist">
      <>
        <Description>"Lugares que não vou nem a pau!"</Description>
        <ContentContainer>
          {userBlacklist.map((item: Blacklist, index: number) => {
            return <BlacklistItem item={item} key={index} />;
          })}
        </ContentContainer>
      </>
    </ModalLayout>
  );
}

const Description = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 5px;
`;

const ContentContainer = styled.div`
  display: block;
  margin: 25px 5px;
  height: 250px;

  overflow-y: auto;
  box-sizing: border-box;
`;
