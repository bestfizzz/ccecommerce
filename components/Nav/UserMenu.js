'use client'
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Typography,
} from "@material-tailwind/react";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../User/AuthContext";

export default function UserMenu() {
    const { user, signout } = useContext(AuthContext)
    return (
        <Menu placement="bottom-start" allowHover>
            <MenuHandler>
                <Link href="/user">
                    <button data-ripple-light="true" data-popover-target="menu-1" data-popover-nested="true"
                        class="relative select-none rounded-lg text-center align-middle font-sans text-xs font-medium text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                        <Typography as="li" variant="small" color="blue-gray" className="flex items-center gap-x-2 p-1 font-medium">
                            <svg
                                width="16"
                                height="17"
                                viewBox="0 0 16 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M16 8.5C16 10.6217 15.1571 12.6566 13.6569 14.1569C12.1566 15.6571 10.1217 16.5 8 16.5C5.87827 16.5 3.84344 15.6571 2.34315 14.1569C0.842855 12.6566 0 10.6217 0 8.5C0 6.37827 0.842855 4.34344 2.34315 2.84315C3.84344 1.34285 5.87827 0.5 8 0.5C10.1217 0.5 12.1566 1.34285 13.6569 2.84315C15.1571 4.34344 16 6.37827 16 8.5ZM10 5.5C10 6.03043 9.78929 6.53914 9.41421 6.91421C9.03914 7.28929 8.53043 7.5 8 7.5C7.46957 7.5 6.96086 7.28929 6.58579 6.91421C6.21071 6.53914 6 6.03043 6 5.5C6 4.96957 6.21071 4.46086 6.58579 4.08579C6.96086 3.71071 7.46957 3.5 8 3.5C8.53043 3.5 9.03914 3.71071 9.41421 4.08579C9.78929 4.46086 10 4.96957 10 5.5ZM8 9.5C7.0426 9.49981 6.10528 9.77449 5.29942 10.2914C4.49356 10.8083 3.85304 11.5457 3.454 12.416C4.01668 13.0706 4.71427 13.5958 5.49894 13.9555C6.28362 14.3152 7.13681 14.5009 8 14.5C8.86319 14.5009 9.71638 14.3152 10.5011 13.9555C11.2857 13.5958 11.9833 13.0706 12.546 12.416C12.147 11.5457 11.5064 10.8083 10.7006 10.2914C9.89472 9.77449 8.9574 9.49981 8 9.5Z"
                                    fill="#90A4AE"
                                />
                            </svg>
                            <p role="button" className="flex items-center">
                                {user ? user.displayName : 'Account'}
                            </p>
                        </Typography>
                    </button>
                </Link>
            </MenuHandler>
            {!user ?
                <MenuList>
                    <Link href="/user/signup">
                        <MenuItem>
                            Sign up
                        </MenuItem>
                    </Link>
                    <Link href="/user/login">
                    <MenuItem>
                    Login
                    </MenuItem>
                    </Link>
                </MenuList>
                :
                <MenuList>
                    <Link href="/user/myprofile">
                    <MenuItem>
                        Orders
                    </MenuItem>
                    </Link>
                    <MenuItem>
                        <Link href='' role="button" onClick={signout}>Logout</Link>
                    </MenuItem>
                </MenuList>
            }
        </Menu>
    )
}