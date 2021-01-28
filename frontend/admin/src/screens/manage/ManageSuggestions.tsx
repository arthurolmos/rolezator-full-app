import React from "react";
import api from "../../api";
import Navbar from "../../components/header/Navbar";
import TableContainer from "../../components/layout/TableContainer";
import DefaultTable from "../../components/tables/DefaultTable";
import Toast from "../../components/toast";
import { Suggestion } from "../../models";
import { HeadCell } from "../../interfaces";
import Firebase from "firebase";

type Severity = "warning" | "success" | "error" | "";

const headCells: HeadCell<Suggestion>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "id",
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

export function ManageSuggestions() {
  const [suggestions, setSuggestions] = React.useState<Suggestion[]>([]);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [openToast, setOpenToast] = React.useState(false);
  const [severity, setSeverity] = React.useState<Severity>("");
  const [message, setMessage] = React.useState("");

  const title = "Sugestões";

  React.useEffect(() => {
    getAllSuggestions();
  }, []);

  async function getAllSuggestions() {
    try {
      setLoading(true);

      const resp = await api.get("/suggestions");

      const suggestions: Suggestion[] = [];
      console.log(resp.data);
      resp.data.forEach((doc: any) => {
        const createdAt = new Firebase.firestore.Timestamp(
          doc.createdAt._seconds,
          doc.createdAt._nanoseconds
        )
          .toDate()
          .toString();
        const updatedAt = new Firebase.firestore.Timestamp(
          doc.updatedAt._seconds,
          doc.updatedAt._nanoseconds
        )
          .toDate()
          .toString();

        console.log(createdAt, updatedAt);

        const suggestion = new Suggestion(
          doc.id,
          doc.name,
          doc.categories,
          doc.pronoum,
          createdAt,
          updatedAt
        );

        suggestions.push(suggestion);
      });

      setSuggestions(suggestions);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching suggestions", error);
      setLoading(false);
    }
  }

  async function deleteSelected(selected: string[]) {
    // if (selected.length > 1) {
    //   try {
    //     setLoading(true);
    //     await api.post(`/suggestions/deleteMany`, selected);
    //     showToast("success", "Registros excluídos com sucesso!");
    //     getAllSuggestions();
    //   } catch (error) {
    //     console.log("Error deleting one register", error);
    //     setLoading(false);
    //   }
    // } else if (selected.length === 1) {
    //   try {
    //     setLoading(true);
    //     await api.delete(`/suggestions/${selected}`);
    //     const index = suggestions.findIndex((item) => item._id === selected[0]);
    //     if (index > -1) {
    //       suggestions.splice(index, 1);
    //       setSuggestions(suggestions);
    //     }
    //     showToast("success", "Registros excluídos com sucesso!");
    //     setLoading(false);
    //   } catch (error) {
    //     console.log("Error deleting one register", error);
    //     setLoading(false);
    //   }
    // }
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
        <DefaultTable
          rows={suggestions}
          headCells={headCells}
          title={title}
          // handleDelete={deleteSelected}
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
