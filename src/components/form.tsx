import { FormControl, FormErrorMessage, Button } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Input } from "./input";
import toast from "react-hot-toast";
import { ref, set } from "firebase/database";
import { generateCode } from "../hooks/useCode";
import { database } from "../services/firebase";
import { Logo } from "../Logo";

type Inputs = {
  nome: string;
  tel: string;
};

export function Form() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isCode] = useState(Math.floor(Math.random() * 1e9) + 1e9);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  async function writeUserData({ nome, tel }: Inputs) {
    await set(ref(database, "users/" + isCode), {
      username: nome,
      phone: tel,
      isValid: false,
    });
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsLoading(true);
    writeUserData(data).then(() => {
      toast.success(`Código: ${isCode}`, {
        duration: 5000,
        position: "top-right",
      });
      setIsLoading(false);
      setIsFormVisible(false);
    });
  };

  return (
    <>
      {isFormVisible ? (
        <>
          <Logo h="40vmin" pointerEvents="none" />
          <form onSubmit={handleSubmit(onSubmit)} id="form">
            <FormControl isInvalid={errors.nome && true}>
              <Input
                label="Nome Completo"
                placeholder="Nome Completo"
                error={errors.nome && true}
                {...register("nome", { required: true })}
                isInvalid={errors.nome && true}
              />
              {errors.nome && (
                <FormErrorMessage>Preencha seu nome completo.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={errors.tel && true} mt={4}>
              <Input
                label="Telefone"
                placeholder="+00 (00) 00000-0000"
                error={errors.tel && true}
                {...register("tel", { required: true, maxLength: 19 })}
                isInvalid={errors.tel && true}
              />
              {errors.tel && (
                <FormErrorMessage>
                  Preencha seu número de telefone.
                </FormErrorMessage>
              )}
            </FormControl>

            <Button
              type="submit"
              isLoading={isLoading}
              colorScheme="teal"
              mt={4}
            >
              Enviar
            </Button>
          </form>
        </>
      ) : (
        generateCode(isCode)
      )}
    </>
  );
}
