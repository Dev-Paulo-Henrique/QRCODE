import {
  Icon,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { WarningIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { useUsers } from "../hooks/useUsers";

export function ListAdmin() {
  const { users } = useUsers();

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>{users.length} solicitações realizadas</TableCaption>
        <Thead>
          <Tr>
            <Th>Nome Completo</Th>
            <Th textAlign="center">Telefone</Th>
            <Th isNumeric textAlign="center">
              Código
            </Th>
            <Th textAlign="center">Válido</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>{user.username}</Td>
              <Td textAlign="center">{user.phone}</Td>
              <Td isNumeric textAlign="center">
                {user.id}
              </Td>
              <Td textAlign="center">
                {user.isValid === true ? (
                  <Icon as={CheckCircleIcon} color="green.500" />
                ) : (
                  <Icon as={WarningIcon} color="red.500" />
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
