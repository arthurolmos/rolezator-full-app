import React from "react";
import api from "../api";
import Navbar from "../components/header/Navbar";
import CreateContainer, {
  SelectInput,
} from "../components/layout/CreateContainer";
import styled from "styled-components";
import Toast from "../components/toast";

type Severity = "warning" | "success" | "error" | "";

const pronoums = [
  { value: "M", label: "M" },
  { value: "F", label: "F" },
  { value: "N", label: "N" },
];

interface IOption {
  value: string;
  label: string;
}

interface ICategory {
  name: string;
}

export default function CreateSuggestions() {
  const [loading, setLoading] = React.useState(false);

  const [openToast, setOpenToast] = React.useState(false);
  const [severity, setSeverity] = React.useState<Severity>("");
  const [message, setMessage] = React.useState("");

  const [name, setName] = React.useState("");
  const [pronoum, setPronoum] = React.useState("");
  const [categories, setCategories] = React.useState<string[]>([]);
  const [allCategories, setAllCategories] = React.useState<IOption[]>([]);

  const [file, setFile] = React.useState<any | null>(null);

  React.useEffect(() => {
    async function getAllCategories() {
      const resp = await api.get("/categories");

      const categories: IOption[] = [];
      resp.data.forEach((item: ICategory) => {
        const categoryOption = { value: item.name, label: item.name };

        categories.push(categoryOption);
      });

      setAllCategories(categories);
    }

    getAllCategories();
  }, []);

  function handleCategories(e: { value: string; label: string }[] | null) {
    if (e) {
      const categories = e && e.map(({ value }) => value);

      setCategories(categories);
    } else {
      setCategories([]);
    }
  }

  async function submit() {
    try {
      if (name === "" || pronoum === "" || categories.length === 0)
        return showToast("warning", "Preencha os campos corretamente!");

      setLoading(true);

      const suggestion = {
        name,
        pronoum,
        categories,
      };

      const resp = await api.post("/suggestions", suggestion);

      console.log("RESP", resp);

      clearFields();
      showToast("success", "Registro inserido com sucesso!");
      setLoading(false);
    } catch (error) {
      console.log("Error creating new Suggestion", error);
      showToast("error", error.message);
      setLoading(false);
    }
  }

  async function submitFile() {
    try {
      if (!file || file.name.split(".").pop() !== "csv")
        return showToast("warning", "Selecione um arquivo .csv!");

      setLoading(true);

      // const suggestion = {
      //   name,
      //   pronoum,
      //   categories,
      // };

      // const resp = await api.post("/suggestions", suggestion);

      showToast("success", "Registros inseridos com sucesso!");
      setLoading(false);
    } catch (error) {
      console.log("Error creating new Suggestion", error);
      showToast("error", error.message);
      setLoading(false);
    }
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

  const clearFields = () => {
    setName("");
    setCategories([]);
    setPronoum("");
  };

  return (
    <>
      <Navbar />
      <CreateContainer title="Criar Sugestão" loading={loading}>
        <>
          <InputContainer>
            <Title>Individual</Title>

            <Label>Nome</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />

            <Label>Pronome</Label>
            <SelectInput
              options={pronoums}
              onChange={(e) => setPronoum(e.value)}
            />

            <Label>Categoria</Label>
            <SelectInput
              isMulti
              options={allCategories}
              onChange={(e) => handleCategories(e)}
            />

            <Button onClick={() => submit()}>Salvar</Button>
          </InputContainer>

          <InputContainer>
            <Title>Adicionar arquivo CSV</Title>

            <Label>Selecionar arquivo csv</Label>
            <Input
              type="file"
              onChange={(e) => e.target.files && setFile(e.target.files[0])}
            />

            <Button onClick={() => submitFile()}>Upload</Button>
          </InputContainer>
        </>
      </CreateContainer>

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

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Title = styled.h3``;
