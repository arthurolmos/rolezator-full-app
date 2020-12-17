import React from "react";
import api from "../api";
import Navbar from "../components/header/Navbar";
import TableContainer from "../components/layout/TableContainer";
import SuggestionsTable from "../components/tables/SuggestionsTable";
import ISuggestion from "../interfaces/ISuggestion";
import Toast from "../components/toast";

type Severity = "warning" | "success" | "error" | "";

interface HeadCell {
  disablePadding: boolean;
  id: keyof ISuggestion;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    id: "_id",
    numeric: false,
    disablePadding: true,
    label: "_id",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Nome",
  },
  {
    id: "categories",
    numeric: false,
    disablePadding: false,
    label: "Categorias",
  },
  { id: "pronoum", numeric: false, disablePadding: false, label: "Pronome" },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Criado em",
  },
  {
    id: "updatedAt",
    numeric: false,
    disablePadding: false,
    label: "Atualizado em",
  },
];

export default function ManageSuggestions() {
  const [suggestions, setSuggestions] = React.useState<ISuggestion[]>([]);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [openToast, setOpenToast] = React.useState(false);
  const [severity, setSeverity] = React.useState<Severity>("");
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    getAllSuggestions();
  }, []);

  async function getAllSuggestions() {
    try {
      setLoading(true);

      const resp = await api.get("/suggestions");

      setSuggestions(resp.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching suggestions", error);
      setLoading(false);
    }
  }

  async function deleteSelected(selected: string[]) {
    if (selected.length > 1) {
      try {
        setLoading(true);

        await api.post(`/suggestions/deleteMany`, selected);

        showToast("success", "Registros excluídos com sucesso!");
        getAllSuggestions();
      } catch (error) {
        console.log("Error deleting one register", error);
        setLoading(false);
      }
    } else if (selected.length === 1) {
      try {
        setLoading(true);
        await api.delete(`/suggestions/${selected}`);

        const index = suggestions.findIndex((item) => item._id === selected[0]);
        if (index > -1) {
          suggestions.splice(index, 1);
          setSuggestions(suggestions);
        }

        showToast("success", "Registros excluídos com sucesso!");
        setLoading(false);
      } catch (error) {
        console.log("Error deleting one register", error);
        setLoading(false);
      }
    }
  }

  React.useEffect(() => console.log("loading", loading), [loading]);

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
      <TableContainer title="Sugestões" loading={loading}>
        <SuggestionsTable
          rows={suggestions}
          headCells={headCells}
          handleDelete={deleteSelected}
        />
      </TableContainer>
      <Toast
        open={openToast}
        severity={severity}
        message={message}
        close={closeToast}
      />
    </>
  );
}
