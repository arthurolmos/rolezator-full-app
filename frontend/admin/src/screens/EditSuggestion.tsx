import React from "react";
import api from "../api";
import Navbar from "../components/header/Navbar";
import EditContainer, { SelectInput } from "../components/layout/EditContainer";
import styled from "styled-components";
import Toast from "../components/toast";
import { useParams } from "react-router-dom";

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

interface IParams {
  _id: string;
}

export default function EditSuggestions() {
  const { _id } = useParams<IParams>();

  const [loading, setLoading] = React.useState(false);

  const [openToast, setOpenToast] = React.useState(false);
  const [severity, setSeverity] = React.useState<Severity>("");
  const [message, setMessage] = React.useState("");

  const [name, setName] = React.useState("");
  const [pronoum, setPronoum] = React.useState("");
  const [categories, setCategories] = React.useState<string[]>([]);
  const [allCategories, setAllCategories] = React.useState<IOption[]>([]);

  // const selectedCategories =

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

    async function getItem() {
      try {
        setLoading(true);

        const resp = await api.get(`/suggestions/${_id}`);

        console.log("RESP", resp);
        setName(resp.data.name);
        setCategories(resp.data.categories);
        setPronoum(resp.data.pronoum);

        setLoading(false);
      } catch (error) {
        console.log("Error fetching suggestion", error);
        setLoading(false);
      }
    }

    getAllCategories();
    getItem();
  }, [_id]);

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

      await api.put(`/suggestions/${_id}`, suggestion);

      clearFields();
      showToast("success", "Registro atualizado com sucesso!");
      setLoading(false);
    } catch (error) {
      console.log("Error updating Suggestion", error);
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
      <EditContainer title="Editar Sugestão" loading={loading}>
        <>
          <Label>Nome</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />

          <Label>Pronome</Label>
          <SelectInput
            value={{ value: pronoum, label: pronoum }}
            options={pronoums}
            onChange={(e) => setPronoum(e.value)}
          />

          <Label>Categoria</Label>
          <SelectInput
            isMulti
            value={categories.map((item) => ({ value: item, label: item }))}
            options={allCategories}
            onChange={(e) => handleCategories(e)}
          />

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
