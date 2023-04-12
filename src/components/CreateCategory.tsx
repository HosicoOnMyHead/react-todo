import styled from "styled-components";
import { motion } from "framer-motion";
import { useSetRecoilState } from "recoil";
import { categoryState } from "../atoms";
import { useForm } from "react-hook-form";

const InputCategory = styled(motion.input)`
  margin-left: 10px;
  font-size: 20px;
  height: 40px;
  border: none;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;

interface IForm {
  category: string;
}

function CreateCategory() {
  const setCategory = useSetRecoilState(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ category }: IForm) => {
    setCategory((oldCategories) => [
      { text: category, id: Date.now() },
      ...oldCategories,
    ]);
    setValue("category", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <InputCategory
        {...register("category", {
          required: "Please write  a New Category",
        })}
        placeholder="Creat New Category"
        autoFocus
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
    </form>
  );
}

export default CreateCategory;
