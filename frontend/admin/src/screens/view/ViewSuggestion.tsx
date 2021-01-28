import React from "react";
import api from "../../api";
import Navbar from "../../components/header/Navbar";
import ViewContainer, {
  SelectInput,
} from "../../components/layout/ViewContainer";
import styled from "styled-components";
import { useParams } from "react-router-dom";

interface Params {
  id: string;
}

export function ViewSuggestion() {
  const { id } = useParams<Params>();

  const [loading, setLoading] = React.useState(false);

  const [name, setName] = React.useState("");
  const [pronoum, setPronoum] = React.useState("");
  const [categories, setCategories] = React.useState<string[]>([]);

  React.useEffect(() => {
    async function getItem() {
      try {
        setLoading(true);

        const resp = await api.get(`/suggestions/${id}`);

        setName(resp.data.name);
        setCategories(resp.data.categories);
        setPronoum(resp.data.pronoum);

        setLoading(false);
      } catch (error) {
        console.log("Error fetching suggestion", error);
        setLoading(false);
      }
    }

    getItem();
  }, [id]);

  return (
    <>
      <Navbar />
      <ViewContainer title="Visualizar Sugestão" loading={loading}>
        <>
          <Label>Id</Label>
          <Input value={id} disabled />

          <Label>Nome</Label>
          <Input value={name} disabled />

          <Label>Pronome</Label>
          <SelectInput
            value={{ value: pronoum, label: pronoum }}
            isDisabled={true}
          />

          <Label>Categoria</Label>
          <SelectInput
            isMulti
            isDisabled={true}
            value={categories.map((item) => ({ value: item, label: item }))}
          />
        </>
      </ViewContainer>
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
