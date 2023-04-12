import { atom, selector } from "recoil";

export interface ICategories {
  text: string;
  id: number;
}

export interface IToDo {
  text: string;
  id: number;
  category: ICategories[];
}

export const categoryState = atom<ICategories[]>({
  key: "category",
  default: [
    { text: "TO_DO", id: 1 },
    { text: "DOING", id: 2 },
    { text: "DONE", id: 3 },
  ],
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
