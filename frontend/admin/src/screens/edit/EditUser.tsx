import React from "react";
import api from "../../api";
import Navbar from "../../components/header/Navbar";
import EditContainer, {
  SelectInput,
} from "../../components/layout/EditContainer";
import styled from "styled-components";
import Toast from "../../components/toast";
import { useParams } from "react-router-dom";
import { User } from "../../models";

interface Params {
  id: string;
}

type Severity = "warning" | "success" | "error" | "";

export function EditUser() {
  const { id } = useParams<Params>();

  const [loading, setLoading] = React.useState(false);

  const [openToast, setOpenToast] = React.useState(false);
  const [severity, setSeverity] = React.useState<Severity>("");
  const [message, setMessage] = React.useState("");

  const [displayName, setDisplayName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isAdmin, setAdmin] = React.useState("");

  const title = "Usuário";

  React.useEffect(() => {
    async function getUser() {
      try {
        setLoading(true);

        const resp = await api.get(`/users/${id}`);
        console.log("RESP", resp);

        setDisplayName(resp.data.displayName);
        setEmail(resp.data.email);
        setAdmin(resp.data.isAdmin);

        setLoading(false);
      } catch (error) {
        console.log("Error fetching user", error);
        setLoading(false);
      }
    }

    getUser();
  }, [id]);

  async function submit() {
    // try {
    //   if (name === "" || pronoum === "" || categories.length === 0)
    //     return showToast("warning", "Preencha os campos corretamente!");
    //   setLoading(true);
    //   const suggestion = {
    //     name,
    //     pronoum,
    //     categories,
    //   };
    //   await api.put(`/suggestions/${_id}`, suggestion);
    //   clearFields();
    //   showToast("success", "Registro atualizado com sucesso!");
    //   setLoading(false);
    // } catch (error) {
    //   console.log("Error updating Suggestion", error);
    //   showToast("error", error.message);
    //   setLoading(false);
    // }
  }

  const showToast = (severity: Severity, message: string) => {
    setSeverity(severity);
    setMessage(message);
    setOpenToast(true);
  };

  const closeToast = () => {
    setSeverity("");
    setMessage("");
    setOpenToast(false);
  };

  return (
    <>
      <Navbar />
      <EditContainer title={`Editar ${title}`} loading={loading}>
        <>
          <Label>Nome</Label>
          <Input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />

          <Label>Email</Label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />

          <Button onClick={() => submit()}>Salvar</Button>
        </>
      </EditContainer>

      <Toast
        open={openToast}
        severity={severity}
        message={message}
        close={closeToast}
      />
    </>
  );
}

const Label = styled.span`
  margin-bottom: 10px;
`;

const Input = styled.input`
  height: 30px;
  width: 300px;
  margin: 0 auto 30px 0;
  box-sizing: border-box;
  border-radius: 4px;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  margin: 0 auto 20px 0;
`;
