import React from "react";
import DefaultModal from "./ModalLayout";
import SuggestionItem from "../listItems/SuggestionItem";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";
import { FaPlus } from "react-icons/fa";
import LocationSearchInput from "../inputs/LocationSearchInput";
import IUserSuggestion from "../../interfaces/IUserSuggestion";
import { addToUserSuggestions } from "../../repositories/userRepo";

interface Coordinates {
  lat: number;
  lng: number;
}

interface ISelection {
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  placeId: string;
}

interface ModalProps {
  open: boolean;
  closeModal: () => void;
}

export default function BlacklistModal({ open, closeModal }: ModalProps) {
  const { userSuggestions } = React.useContext(AuthContext);

  const [address, setAddress] = React.useState<string>("");
  const [selection, setSelection] = React.useState<ISelection | null>(null);

  function handleSetSelection(
    address: string,
    placeId: string,
    coordinates: Coordinates
  ) {
    const selection = {
      placeId,
      description: address,
      coordinates,
    };

    setSelection(selection);
  }

  function handleAddSuggestion() {
    if (selection) {
      addToUserSuggestions(selection);
      setAddress("");
      setSelection(null);
    }
  }

  const handleCloseModal = () => {
    setAddress("");
    closeModal();
  };

  return (
    <DefaultModal open={open} closeModal={handleCloseModal} title="Sugestões">
      <>
        <Description>"Lugares que preciso ir!"</Description>
        <InputContainer>
          <LocationSearchInput
            handleSetSelection={handleSetSelection}
            address={address}
            setAddress={setAddress}
          />
          <ButtonContainer>
            <Button onClick={() => handleAddSuggestion()}>
              <FaPlusStyled /> Adicionar
            </Button>
          </ButtonContainer>
        </InputContainer>
        <ContentContainer>
          {userSuggestions.map((item: IUserSuggestion, index: number) => {
            return <SuggestionItem item={item} key={index} />;
          })}
        </ContentContainer>
      </>
    </DefaultModal>
  );
}

const Description = styled.div`
  display: flex;
  padding: 5px;
  box-sizing: border-box;
`;

const ContentContainer = styled.div`
  display: block;
  margin: 25px 5px;
  height: 250px;
  overflow-y: auto;
  box-sizing: border-box;
`;

const InputContainer = styled.div`
  box-sizing: border-box;
  padding: 15px 0;
  display block;
  //justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  display flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 25px;
`;

const Button = styled.div`
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    opacity: 0.8;
  }
`;

const FaPlusStyled = styled(FaPlus)`
  margin-right: 15px;
  box-sizing: border-box;
`;
