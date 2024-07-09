import {
  Input as ChakraInput,
  FormLabel,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { useForm } from "react-hook-form";

interface InputProps extends ChakraInputProps {
  name?: string;
  label?: string;
  error?: boolean;
}

type Inputs = {
  id?: number;
  nome?: string;
  tel?: string;
  validated: false;
  code?: string;
};

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error, ...rest },
  ref
) => {
  const {
    register,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        id={name}
        placeholder={name}
        textTransform={name === "tel" ? "none" : "capitalize"}
        type={name === "tel" ? "tel" : "text"}
        {...register(name === "tel" ? "tel" : "nome", { required: true })}
        focusBorderColor="teal.200"
        isInvalid={name === "tel" ? errors.tel && true : errors.nome && true}
        variant="filled"
        size="lg"
        ref={ref}
        {...rest}
      />
    </>
  );
};

export const Input = forwardRef(InputBase);
