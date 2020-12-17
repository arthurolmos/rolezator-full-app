import React from "react";
import { FaTimes } from "react-icons/fa";
import styled from "styled-components";

interface ContainerProps {
  severity: Severity;
  open: boolean;
}

type Severity = "warning" | "success" | "error" | "";

interface TextProps {
  severity: Severity;
}

export default function Toast({
  open,
  severity,
  message,
  close,
}: {
  open: boolean;
  severity: Severity;
  message: string;
  close: () => void;
}) {
  React.useEffect(() => {
    if (open) {
      setTimeout(() => {
        return close();
      }, 3000);
    }

    clearTimeout();
  }, [open, close]);

  return (
    <Container severity={severity} open={open}>
      <Close onClick={close}>
        <FaTimes size={12} />
      </Close>
      <Text severity={severity}>{message}</Text>
    </Container>
  );
}

const Container = styled.div<ContainerProps>`
  position: fixed;
  bottom: 50px;
  right 0;
  left: 0;
  margin: auto;
  width: 300px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: opacity .5s ease-in-out;
  box-sizing: border-box;

  border-radius: 25px;

  background: ${(props) =>
    props.severity === "error"
      ? "pink"
      : props.severity === "warning"
      ? "yellow"
      : "lightgreen"};
  opacity: ${(props) => (props.open ? 1 : 0)};
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
`;

const Text = styled.span<TextProps>`
  color: ${(props) =>
    props.severity === "error"
      ? "red"
      : props.severity === "warning"
      ? "goldenrod"
      : "green"};
  box-sizing: border-box;
`;

const Close = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  padding: 0 15px;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;
