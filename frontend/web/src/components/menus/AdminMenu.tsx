import React from "react";
import AddOptionModal from "../modal/AddOptionModal";
import { AuthContext } from "../../contexts/AuthContext";
import styled from "styled-components";

export default function AdminMenu() {
  const { user, signOut } = React.useContext(AuthContext);

  const [openAddOptionModal, setOpenAddOptionModal] = React.useState<boolean>(
    false
  );

  const toggleOpenAddOptionModal = () =>
    setOpenAddOptionModal(!openAddOptionModal);

  const closeAddOptionModal = () => setOpenAddOptionModal(false);

  return (
    <MenuContainer>
      <Username>Olá {user.displayName}!</Username>
      <MenuOptions>
        <Option onClick={toggleOpenAddOptionModal}>Adicionar Opções</Option>
        <button onClick={() => signOut()}>Sair</button>
      </MenuOptions>

      <AddOptionModal
        open={openAddOptionModal}
        closeModal={closeAddOptionModal}
      />
    </MenuContainer>
  );
}

const NoSelectContainer = styled.div`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-tap-highlight-color: transparent;
`;

const MenuOptions = styled(NoSelectContainer)`
  color: white;
  font-size: 20px;
  box-sizing: border-box;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const Option = styled.div`
  white-space: nowrap;
  transition: transform 0.5s ease;
  margin-bottom: 20px;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    transform: scale(1.1);
  }
`;

const MenuContainer = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
`;

const Username = styled.h3`
  color: white;
  white-space: nowrap;
  box-sizing: border-box;
`;
