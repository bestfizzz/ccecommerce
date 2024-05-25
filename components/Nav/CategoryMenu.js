import { useState } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Typography,
} from "@material-tailwind/react";
import Link from "next/link";

export default function NestedMenu({ categoryList }) {
    return (
        <Menu placement="bottom-start" allowHover>
            <MenuHandler>
                <Link href="/products">
                    <button data-ripple-light="true" data-popover-target="menu-1" data-popover-nested="true"
                        class="relative select-none rounded-lg text-center align-middle font-sans text-xs font-medium text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                        <Typography as="li" variant="small" color="blue-gray" className="flex items-center gap-x-2 p-1 font-medium">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    fill="#90A4AE"
                                    d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                            </svg>
                            <p role="button" className="flex items-center">
                                Categories
                            </p>
                        </Typography>
                    </button>
                </Link>
            </MenuHandler>
            <MenuList>
                {categoryList.map(category => {
                    return MenuIncursion(category)
                })
                }
            </MenuList>
        </Menu>
    );
}

const MenuIncursion = (category) => {
    if (category.children?.length > 0) {
        const [openNested, setOpenNested] = useState(false)
        return (
            <Menu
                placement="right-start"
                open={openNested}
                handler={setOpenNested}
                allowHover
                offset={15}
            >
                <MenuHandler className="flex items-center justify-between">
                    <Link href={`/products/${category.name}`}>
                        <MenuItem className="flex items-center justify-between">
                            {category.name}
                            <ChevronUpIcon
                                strokeWidth={2.5}
                                className={`h-3.5 w-3.5 transition-transform ${openNested ? "rotate-90" : ""
                                    }`}
                            />
                        </MenuItem>
                    </Link>
                </MenuHandler>
                <MenuList>
                    {category.children.map(childCategory => {
                        return MenuIncursion(childCategory)
                    })
                    }
                </MenuList>
            </Menu>
        )
    } else {
        return (
            <Link href={`/products/${category.name}`}>
                <MenuItem>
                    {category.name}
                </MenuItem>
            </Link>
        )
    }
}