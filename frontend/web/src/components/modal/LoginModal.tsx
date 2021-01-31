import React from "react";
import ModalLayout from "./ModalLayout";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";

interface ModalProps {
  open: boolean;
  closeModal: () => void;
}

export default function LoginModal({ open, closeModal }: ModalProps) {
  const { adminLogin } = React.useContext(AuthContext);

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  async function handleAdminLogin() {
    const user = await adminLogin(email, password);
  }

  return (
    <ModalLayout open={open} closeModal={closeModal} title="Login">
      <>
        <ContentContainer>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <button onClick={() => handleAdminLogin()}>Login</button>
        </ContentContainer>
      </>
    </ModalLayout>
  );
}

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 25px 5px;
  height: 150px;

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
