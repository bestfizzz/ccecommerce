'use client'
import { usePathname, useRouter } from 'next/navigation'
import { Select, Option, Button } from "@material-tailwind/react";
import { useState } from "react";

export function FilterProduct() {
    const pathname = usePathname()
    const router = useRouter()
    const [selectValue, setSelectedValue] = useState('popularity')
    const HandleFliter = () => {
        if (selectValue != '') {
            router.push(`${pathname}?filter=${selectValue}`)
        }
    }
    return (
        <div className="flex items-center">
            <div>
                <Select
                    value={selectValue}
                    onChange={(value) => setSelectedValue(value)}
                    label="Filter"
                    animate={{
                        mount: { y: 0 },
                        unmount: { y: 25 },
                    }}
                >
                    <Option value="popularity">Popularity</Option>
                    <Option value="availability">Availabilty</Option>
                </Select>
            </div>
            <Button size="sm" className="max-h-[45px] mx-4" onClick={HandleFliter}>
                Apply
            </Button>
        </div>
    );
}
