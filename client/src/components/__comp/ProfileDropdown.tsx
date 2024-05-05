import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu";
import { store } from "store/store";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Avatar from "components/__comp/Avatar";
import { signOutUser } from "services/apiAuth";
import { useDispatch } from "react-redux";
import { userNavigation } from "components/constants";

const Dropdown: React.FC = () => {
  const { currentUser } = store.getState().user;

  const navigation = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    await signOutUser(dispatch);
    navigation("/sign-in");
  };

  return currentUser ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar src={currentUser?.avatar} alt={currentUser?.username} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to={"/profile"}>
          <DropdownMenuItem className="cursor-pointer">
            Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    userNavigation.map((item) => {
      return (
        <NavLink
          key={item.id}
          to={item.href}
          type="button"
          className={`${item.cssAttribute}`}
        >
          {item.label}
        </NavLink>
      );
    })
  );
};

export default Dropdown;
