import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  TableBody,
} from "@mui/material";
import { Post } from "../../ts";
import "./style.css";

interface PostsTableProps {
  data: Post[];
  onSort: (type: string) => void;
}

export const PostsTable = ({ data, onSort }: PostsTableProps) => {

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#5A5C66" }}>
            <TableCell
              onClick={() => onSort("id")}
              className="head-button"
            >
              ID
            </TableCell>
            <TableCell
              onClick={() => onSort("title")}
              className="head-button"
            >
              Заголовок
            </TableCell>
            <TableCell
              onClick={() => onSort("body")}
              className="head-button"
            >
              Описание
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="left">{row.body}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
