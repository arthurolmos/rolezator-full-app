import React from "react";
import BlacklistModal from "../modal/BlacklistModal";
import SuggestionsModal from "../modal/SuggestionsModal";
import { AuthContext } from "../../contexts/AuthContext";
import styled from "styled-components";

export default function UserMenu() {
  const { user, signOut } = React.useContext(AuthContext);

  const [openBlacklistModal, setOpenBlacklistModal] = React.useState<boolean>(
    false
  );
  const [
    openSuggestionsModal,
    setOpenSuggestionsModal,
  ] = React.useState<boolean>(false);

  const toggleOpenBlacklistModal = () =>
    setOpenBlacklistModal(!openBlacklistModal);
  const toggleOpenSuggestionsModal = () =>
    setOpenSuggestionsModal(!openSuggestionsModal);

  const closeBlacklistModal = () => setOpenBlacklistModal(false);
  const closeSuggestionsModal = () => setOpenSuggestionsModal(false);

  return (
    <MenuContainer>
      <Username>Olá {user.displayName}!</Username>
      <MenuOptions>
        <Option onClick={toggleOpenSuggestionsModal}>Minhas Sugestões</Option>
        <Option onClick={toggleOpenBlacklistModal}>Minha Blacklist</Option>
        <LogoutButton onClick={() => signOut()}>Sair</LogoutButton>
      </MenuOptions>

      <SuggestionsModal
        open={openSuggestionsModal}
        closeModal={closeSuggestionsModal}
      />
      <BlacklistModal
        open={openBlacklistModal}
        closeModal={closeBlacklistModal}
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

const LogoutButton = styled.div`
  background-color: purple;
  border-radius: 15px;
  padding: 5px;
  align-items: center;
  display: flex;
  justify-content: center;
  text: white;
  cursor: pointer;
  text-transform: uppercase;

  &:hover {
    opacity: 0.8;
  }
`;
