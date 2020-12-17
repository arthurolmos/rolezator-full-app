import React from "react";
import { AuthContext } from "../contexts/AuthContext";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

export default function Login() {
  const { admin, signIn } = React.useContext(AuthContext);
  const history = useHistory();

  const [email, setEmail] = React.useState<string>("admin.rolezator@gmail.com");
  const [password, setPassword] = React.useState<string>("DepecheMode@666");

  async function handleAdminLogin() {
    await signIn(email, password);
  }

  React.useEffect(() => {
    console.log(admin);
    !!admin && history.replace("/panel");
  }, [admin, history]);

  return (
    <ContentContainer>
      <LoginContainer>
        <Title>LOGIN</Title>
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
      </LoginContainer>
    </ContentContainer>
  );
}

const ContentContainer = styled.div`
  witdth: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid black;
  padding: 15px;
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 400px;

  height: 30px;
  margin: 0 0 15px 0;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }
`;

const Title = styled.h2``;
