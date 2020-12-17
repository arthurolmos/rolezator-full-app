import React from "react";
import ModalLayout from "./ModalLayout";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";

interface ModalProps {
  open: boolean;
  closeModal: () => void;
}

export default function AddOptionModal({ open, closeModal }: ModalProps) {
  const [description, setDescription] = React.useState<string>("");
  const [plural, setPlural] = React.useState<string>("");
  const [pronoum, setPronoum] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("");

  async function handleAddOption() {
    const url = description.split(" ").join("+");
    const plural = description.split(" ").join("s ");
    console.log(url);
    console.log(plural);
  }

  return (
    <ModalLayout open={open} closeModal={closeModal} title="Login">
      <>
        <ContentContainer>
          <Input
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            placeholder="Pronome"
            value={pronoum}
            onChange={(e) => setPronoum(e.target.value)}
          />
          <Input
            placeholder="Categoria"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Input
            placeholder="Plural?"
            value={plural}
            onChange={(e) => setPlural(e.target.value)}
          />
          <button onClick={() => handleAddOption()}>Adicionar</button>
        </ContentContainer>
      </>
    </ModalLayout>
  );
}

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 25px 5px;

  overflow-y: auto;
  box-sizing: border-box;
`;

const Input = styled.input`
  box-sizing: border-box;
  height: 30px;
  width: 100%;
  margin: 0 0 15px 0;

  &:focus {
    outline: none;
  }
`;
