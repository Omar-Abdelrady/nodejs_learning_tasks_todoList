import { TodoType } from "@/types/todo.type";
import {
  Box,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { EditTodoModel } from "@/components/modals/editTodo.model";
import { useState } from "react";

interface TodoProps {
  todo: TodoType;
  openDescription: any;
  setOpenDescription: (id: number | null) => void;
}
export const Todo = (props: TodoProps) => {
  const { todo, openDescription, setOpenDescription } = props;
  const [openTodoEditModal, setOpenTodoEditModal] = useState<Boolean>(false);
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() =>
              todo.id == openDescription
                ? setOpenDescription(null)
                : setOpenDescription(todo.id)
            }
          >
            {todo.id == openDescription ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {todo.title}
        </TableCell>
        <TableCell align="right">{todo.title}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse
            in={todo.id == openDescription}
            timeout="auto"
            unmountOnExit
          >
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Description
              </Typography>
              <Typography gutterBottom component="div">
                {todo.description}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <EditTodoModel
        open={openTodoEditModal}
        handleClose={() => setOpenTodoEditModal(false)}
        todo={todo}
      />
    </>
  );
};
