import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import CreateCategory from "./CreateCategory";

const Wrapper = styled.div`
  background-color: #ecf0f1;
  height: 85vh;
  width: 100vw;
  max-width: 680px;
  border-radius: 15px;
  padding: 15px;
`;

const Select = styled(motion.select)`
  background-color: transparent;
  width: 100px;
  height: 40px;
  text-align: center;
  margin-right: 15px;
  font-size: 20px;
  border: none;
  border-radius: 5px;
  appearance: none;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Svg = styled(motion.svg)`
  height: 15px;
  width: 15px;
  cursor: pointer;
`;

function ToDoList() {
  const [open, setOpen] = useState(false);
  const onClick = (event: React.MouseEvent<SVGElement>) => {
    setOpen((current) => !current);
  };
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  console.log(Array.isArray(category));
  return (
    <Wrapper>
      <Nav>
        <Select
          value={category[0].text}
          onInput={onInput}
          whileHover={{ backgroundColor: "rgba(0,0,0,0.1)" }}
        >
          {category?.map((category) => (
            <option key={category.id} value={category.text}>
              {category.text}
            </option>
          ))}
        </Select>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          onClick={onClick}
        >
          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
        </Svg>
        <AnimatePresence>{open ? <CreateCategory /> : null}</AnimatePresence>
      </Nav>
      <CreateToDo />
      <hr />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </Wrapper>
  );
}

export default ToDoList;

// -----------------React Form 미사용-------------------- //
/* function ToDoList() {
  const [toDo, setToDo] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(toDo);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} placeholder="Write a to do" value={toDo} />
        <button>Add</button>
      </form>
    </div>
  );
}
 */
