import { useContext, useEffect, useState } from "react";
import { MainContext } from "../App";
import {
  Link,
  useParams,
  useLocation,
  useNavigate,
  redirect,
} from "react-router-dom";
import Todo from "../components/Todo";
import "../styles/TodoList.css";
import EmptyList from "../components/EmptyList";
import { FaRocket, FaPen, FaPlus, FaTrash } from "react-icons/fa";

let Icon = () => <></>;

const TodoList = () => {
  const location = useLocation();
  const { todoLists, setTodoLists, saveTodoLists, icons } =
    useContext(MainContext);
  const [todoList, setTodoList] = useState([]);
  const { id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    let found = false;

    if (todoLists.length) {
      todoLists.forEach((list) => {
        if (list.id == id) {
          setTodoList(list);
          found = true;
          Icon = icons[list.icon];
        }
      });
    }

    if (!found) {
      nav("/invalid-path");
    }
  }, [id]);

  return (
    <div className="todo-list main">
      <div className="todo-list-head">
        <h1 className="todo-list-heading color-black">
          <Icon className="icon" />
          {/* <FontAwesomeIcon icon={faRocket} style={{ color: "red" }} />{" "} */}
          {todoList.title}
        </h1>
        <div className="todo-list-btns">
          <FaTrash
            className="delete-todo-list-btn btn"
            onClick={() => {
              const newTodoLists = todoLists.filter((list) => list.id != id);
              setTodoLists(newTodoLists);
              saveTodoLists(newTodoLists);
              nav("/");
            }}
          />
          <Link to={location.pathname + "/edit-todo-list"}>
            <FaPen className="edit-todo-list-btn btn" />
          </Link>
          <Link to={location.pathname + "/create-todo"}>
            <FaPlus className="create-todo-btn btn" />
          </Link>
        </div>
      </div>
      {todoList.todos && todoList.todos.length ? (
        todoList.todos?.map((todo) => {
          return (
            <Todo
              title={todo.title}
              completed={todo.completed}
              key={todo.id}
              id={todo.id}
              date={todo.date}
              listId={todoList.id}
            />
          );
        })
      ) : (
        <EmptyList />
      )}
    </div>
  );
};

export default TodoList;
