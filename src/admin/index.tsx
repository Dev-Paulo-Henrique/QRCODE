import { MenuAdmin } from "../components/menu";
import QrCodeReader, { QRCode } from "react-qrcode-reader";
import { useWindowSize } from "react-use";
import { database } from "../services/firebase";
import { ref, child, update } from "firebase/database";
import toast from "react-hot-toast";
import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Select,
} from "@chakra-ui/react";
import { useVideoDeviceInfos } from "../use-video-infos";

export function Admin() {
  const videoDeviceInfos = useVideoDeviceInfos();
  const [deviceId, setDeviceId] = useState("");
  const [error, setEroor] = useState(false);
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  function onSubmit() {
    password === process.env.ADMIN_PASSWORD ? setShow(true) : setEroor(true);
  }

  const { width, height } = useWindowSize();
  function handleRead(code: QRCode) {
    try {
      const userRef = child(ref(database), "users/" + code.data);

      const updates: { [key: string]: any } = {};
      updates["isValid"] = true;

      return update(userRef, updates)
        .then(() => {
          toast.success(`Código: ${code.data}`, {
            duration: 2500,
            position: "top-right",
          });
        })
        .catch((error) => {
          console.error("Error updating database: ", error);
        });
    } catch (error) {
      console.error("Erro ao atualizar o banco de dados: ", error);
    }
  }

  return (
    <>
      {!show ? (
        <Box
          h={height}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <FormControl isRequired isInvalid={error} w={width / 2}>
              <FormLabel>Senha de administrador</FormLabel>
              <InputGroup size="lg">
                <Input
                  pr="4.5rem"
                  type="password"
                  placeholder="Digite sua senha..."
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                />
                <InputRightElement width="4.5rem">
                  <Button
                    type="submit"
                    h="1.75rem"
                    size="sm"
                    onClick={onSubmit}
                  >
                    Entrar
                  </Button>
                </InputRightElement>
              </InputGroup>
              {error && <FormErrorMessage>Senha incorreta...</FormErrorMessage>}
            </FormControl>
          </form>
        </Box>
      ) : (
        <>
          <MenuAdmin />
          <Select
            name="devices"
            value={deviceId}
            onChange={(event) => {
              setDeviceId(event.target.value);
            }}
            right={0}
            zIndex={999}
            position={"absolute"}
            width={"auto"}
            m={2}
          >
            {videoDeviceInfos.map((info) => (
              <option
                value={info.deviceId}
                label={info.label}
                onClick={() => setDeviceId(info.deviceId)}
              >
                {info.label}
              </option>
            ))}
          </Select>
          <QrCodeReader
            delay={100}
            width={width}
            height={height}
            videoConstraints={{ deviceId }}
            onRead={handleRead}
          />
        </>
      )}
    </>
  );
}
