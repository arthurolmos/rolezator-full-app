import React from "react";
import { styles } from "./functions/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { FaEdit, FaEye } from "react-icons/fa";
import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";
import { EnhancedTableToolbar, EnhancedTableHead } from "./components";
import { getComparator, selectItems, stableSort } from "./functions";
import { HeadCell } from "../../interfaces";

function objectKeys<T extends {}>(obj: T) {
  return Object.keys(obj).map((objKey) => objKey as keyof T);
}

type Order = "asc" | "desc";

const useStyles = styles;

//MAIN FUNCTION
export default function EnhancedTable<T extends { id: string }>(props: {
  rows: T[];
  headCells: HeadCell<T>[];
  title: string;
}) {
  const { headCells, rows, title } = props;
  const location = useLocation();

  const baseURL = location.pathname;

  const classes = useStyles();

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof T>("id");
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleDelete = () => {
    console.log("DELETE!", selected);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof T
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => String(n.id));
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const newSelected = selectItems(name, selected);

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          handleDelete={handleDelete}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={String(orderBy)}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(String(row.id));
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const id = String(row.id);

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                          key={id + "checkbox"}
                        />
                      </TableCell>
                      {objectKeys(row).map((itemProperty) => {
                        const value = row[itemProperty];

                        return (
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            align="center"
                            key={String(itemProperty)}
                          >
                            {typeof value === "boolean"
                              ? value === true
                                ? "V"
                                : "F"
                              : value}
                          </TableCell>
                        );
                      })}
                      <TableCell key={id + "edit"}>
                        <LinkStyled to={`${baseURL}/edit/${id}`}>
                          <FaEdit />
                        </LinkStyled>
                      </TableCell>
                      <TableCell
                        component="th"
                        id="ações"
                        scope="row"
                        padding="default"
                        align="center"
                        key={id + "view"}
                      >
                        <LinkStyled to={`${baseURL}/view/${id}`}>
                          <FaEye />
                        </LinkStyled>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}

const LinkStyled = styled(Link)`
  color: black;
  text-decoration: none;
  font-size: 20px;

  &:hover {
    opacity: 0.6;
    transform: scale(1.1);
  }
`;
