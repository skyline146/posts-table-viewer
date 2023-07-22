import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  TableBody,
} from "@mui/material";
import { useAppDispatch } from "../../store/hooks";
import { sortPosts } from "../../store/posts-slice";
import { Post } from "../../ts";
import "./style.css";

interface PostsTableProps {
  data: Post[];
}

export const PostsTable = ({ data }: PostsTableProps) => {
  const dispatch = useAppDispatch();

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#5A5C66" }}>
            <TableCell
              onClick={() => dispatch(sortPosts("id"))}
              className="head-button"
            >
              ID
            </TableCell>
            <TableCell
              onClick={() => dispatch(sortPosts("title"))}
              className="head-button"
            >
              Заголовок
            </TableCell>
            <TableCell
              onClick={() => dispatch(sortPosts("body"))}
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
