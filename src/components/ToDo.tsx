import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";
import styled from "styled-components";

const List = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  position: relative;
  span {
    color: black;
    font-weight: 400;
    margin-right: 10px;
    margin-left: 5px;
  }
  input {
    display: none !important;
  }
  input + label {
    width: 20px;
    height: 20px;
    border: 2px solid #bcbcbc;
    border-radius: 2px;
    cursor: pointer;
    margin-right: 10px;
  }
  input:checked + label:after {
    position: absolute;
    font-size: 24px;
    content: "✔";
    bottom: 1px;
    color: #f1c40f;
  }
  input:checked + label + span {
    text-decoration: line-through;
  }
`;

const Svg = styled.svg`
  height: 20px;
  width: 20px;
  cursor: pointer;
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      return [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <List>
      <input type="checkbox" id={`${id}`} />
      <label htmlFor={`${id}`}></label>
      <span>{text}</span>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 352 512"
        onClick={onClick}
      >
        <path
          d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
          fill={"#e74c3c"}
        />
      </Svg>
    </List>
  );
}

export default ToDo;
