import React from "react";
import styled from "styled-components";
import { Blacklist } from "../../models";
import { FaTimes } from "react-icons/fa";
import { UserController } from "../../controllers";
import { AuthContext } from "../../contexts/AuthContext";
import { Dots } from "react-activity";

export default function BlacklistItem({ item }: { item: Blacklist }) {
  const { user } = React.useContext(AuthContext);

  const [loading, setLoading] = React.useState<boolean>(false);

  async function handleRemove() {
    try {
      setLoading(true);

      await UserController.removeFromUserBlacklist(
        item.id,
        user.uid,
        user.token
      );

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  return (
    <Container>
      <Title>{item.name}</Title>
      {loading ? (
        <Dots color="white" />
      ) : (
        <CloseButton>
          <FaTimesStyled onClick={() => handleRemove()} />
        </CloseButton>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background: transparent;
  color: white;
  margin: 0 20px 10px;
  box-sizing: border-box;
  padding: 5px;
`;

const Title = styled.div`
  display: flex;
  flex: 2;
  box-sizing: border-box;
  text-transform: uppercase;
`;

const CloseButton = styled.div`
  flex: 1;
  display: flex;
  box-sizing: border-box;
  justify-content: flex-end;
`;

const FaTimesStyled = styled(FaTimes)`
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    opacity: 0.8;
  }
`;
