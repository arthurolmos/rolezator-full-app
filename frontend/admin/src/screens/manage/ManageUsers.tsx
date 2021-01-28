import React from "react";
import api from "../../api";
import Navbar from "../../components/header/Navbar";
import TableContainer from "../../components/layout/TableContainer";
import DefaultTable from "../../components/tables/DefaultTable";
import Toast from "../../components/toast";
import { AuthContext } from "../../contexts/AuthContext";
import { User } from "../../models";
import { HeadCell } from "../../interfaces";

type Severity = "warning" | "success" | "error" | "";

const headCells: HeadCell<User>[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "id",
  },
  {
    id: "displayName",
    numeric: false,
    disablePadding: true,
    label: "Nome",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  { id: "isAdmin", numeric: false, disablePadding: false, label: "Admin?" },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Criado em",
  },
];

export function ManageUsers() {
  const [users, setUsers] = React.useState<User[]>([]);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [openToast, setOpenToast] = React.useState(false);
  const [severity, setSeverity] = React.useState<Severity>("");
  const [message, setMessage] = React.useState("");

  const { admin } = React.useContext(AuthContext);

  const title = "usuário";

  React.useEffect(() => {
    getAllUsers();
  }, []);

  async function getAllUsers() {
    try {
      setLoading(true);

      const token = await admin.getIdTokenResult();
      const resp = await api.get("/users", {
        headers: {
          authorization: token,
        },
      });

      const users: User[] = [];
      resp.data.forEach((doc: any) => {
        const isAdmin =
          doc.customClaims && doc.customClaims.admin
            ? doc.customClaims.admin
            : false;
        const createdAt = doc.metadata.creationTime;

        const user = new User(
          doc.uid,
          doc.displayName,
          doc.email,
          isAdmin,
          createdAt
        );

        users.push(user);
      });

      setUsers(users);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching users", error);
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
      <TableContainer title="Usuários" loading={loading}>
        <DefaultTable
          rows={users}
          headCells={headCells}
          title="Usuário"
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
