import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import {
  Box,
  Collapse,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect, useState } from "react";
import { TodoType } from "@/types/todo.type";
import TodolistApi from "@/pages/api/todolist-api";
import { ResponseType } from "@/types/response.type";
import { EditTodoModel } from "@/components/modals/editTodo.model";
import { Todo } from "@/components/todo/todo";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [openDescription, setOpenDescription] = useState<Number | null>(null);
  const [todos, setTodos] = useState<Array<TodoType>>([]);

  const getTodoList = async () => {
    const todoListApi = new TodolistApi();
    try {
      const todos: ResponseType = await todoListApi.getTodolist();
      setTodos(todos.data.items);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTodoList();
  }, []);

  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
  ) {
    return { name, calories, fat, carbs, protein };
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Grid container justifyContent={"center"}>
          <Grid xs={6}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>title</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {todos.map((todo) => (
                    <Todo
                      todo={todo}
                      key={todo.id}
                      openDescription={open}
                      setOpenDescription={setOpenDescription}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </main>
    </>
  );
}
