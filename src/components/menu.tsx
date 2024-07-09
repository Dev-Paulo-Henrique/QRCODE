import { ExternalLinkIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Link,
  Box,
} from "@chakra-ui/react";

export function MenuAdmin() {
  return (
    <Box position={"absolute"} m={2} zIndex={999}>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
        />
        <MenuList>
          <Link href="/admin/users" target="_blank">
            <MenuItem icon={<ExternalLinkIcon />}>Lista de usuários</MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </Box>
  );
}
