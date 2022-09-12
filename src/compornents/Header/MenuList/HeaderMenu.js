import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { logOut } from "../../../service/firebase";
import { Link } from "react-router-dom";

export default function HeaderMenu(props) {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList color="gray.900">
        <MenuItem onClick={logOut}>ログアウト</MenuItem>
        <Link to="/">
          <MenuItem>マスタ地図の表示</MenuItem>
        </Link>
        <MenuDivider />
        <MenuGroup title="CSVデータ管理">
          <Link to="/master">
            <MenuItem>DB登録・削除</MenuItem>
          </Link>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="登録地図管理">
          <Link to="/maps">
            <MenuItem>登録地図一覧</MenuItem>
          </Link>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}
