import React, { useMemo } from "react";
import { useTable } from "react-table";
import {
  TableContainer,
  Table as MUITable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Typography,
  CircularProgress,
  TablePagination,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import RadioButtonUncheckedIcon from "@mui/icons-material/OndemandVideo";
// import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ListIcon from "@mui/icons-material/List";

function BasicTable({
  columns: Columns,
  data: Data,
  loading,
  edit,
  remove,
  view,
  addImage,
  Thumbnail,
  addVideo,
  videoList,
}) {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = useMemo(() => Columns, [Columns]);
  const data = useMemo(() => Data, [Data]);
  const initialState = { hiddenColumns: ["_id"] };
  const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow } =
    useTable({
      columns,
      data,
      initialState,
    });

  return (
    <>
      <TableContainer sx={{ mt: 3 }}>
        <MUITable {...getTableProps()} stickyHeader>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    {...column.getHeaderProps()}
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {column.render("Header")}
                  </TableCell>
                ))}
                {/* actions */}
                {(edit ||
                  remove ||
                  view ||
                  addImage ||
                  addVideo ||
                  Thumbnail ||
                  videoList) && (
                  <TableCell
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      fontWeight: "bold",
                    }}
                    align="center"
                  >
                    Action
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {loading && (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}

            {!loading &&
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  prepareRow(row);
                  return (
                    <TableRow {...row.getRowProps()} hover>
                      {row.cells.map((cell) => (
                        // console.log()
                        // {row.values?.status_displayname != null ? "yes" : null}
                        <TableCell {...cell.getCellProps()} size="small">
                          {cell.render("Cell")}
                        </TableCell>
                      ))}
                      {/* actions */}

                      {(edit ||
                        remove ||
                        view ||
                        addImage ||
                        addVideo ||
                        Thumbnail ||
                        videoList) && (
                        <TableCell align="center" size="small">
                          {addImage && (
                            <IconButton
                              color="primary"
                              onClick={() => addImage(row.values.id)}
                            >
                              <AddPhotoAlternateIcon />
                            </IconButton>
                          )}
                          {addVideo && (
                            <IconButton
                              color="primary"
                              onClick={() => addVideo(row.values.id)}
                            >
                              <AddCircleIcon />
                            </IconButton>
                          )}
                          {videoList && (
                            <IconButton
                              color="primary"
                              onClick={() => videoList(row.values.id)}
                            >
                              <ListIcon />
                            </IconButton>
                          )}
                          {view && (
                            <IconButton
                              style={{ color: "grey" }}
                              sx={{
                                "&:hover": {
                                  color: "black !important",
                                },
                              }}
                              onClick={() => view(row.values._id)}
                            >
                              <ViewIcon />
                            </IconButton>
                          )}
                          {Thumbnail && (
                            <IconButton
                              style={{ color: "grey" }}
                              sx={{
                                "&:hover": {
                                  color: "black !important",
                                },
                              }}
                              onClick={() => Thumbnail(row.values.id)}
                            >
                              <RadioButtonUncheckedIcon />
                            </IconButton>
                          )}
                          {edit && (
                            <IconButton
                              style={{ color: "grey" }}
                              sx={{
                                "&:hover": {
                                  color: "black !important",
                                },
                              }}
                              onClick={() => edit(row.values._id)}
                            >
                              <EditIcon />
                            </IconButton>
                          )}
                          {remove && (
                            <IconButton
                              style={{ color: "grey" }}
                              sx={{
                                "&:hover": {
                                  color: "red !important",
                                },
                              }}
                              onClick={() => remove(row.values._id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
            {!loading && data.length < 1 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (remove || edit ? 1 : 0)}
                  align="center"
                >
                  <Typography color="GrayText">No records found!</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </MUITable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default BasicTable;
