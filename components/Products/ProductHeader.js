import { FilterProduct } from "./FilterProduct";

export default function ProductHeader() {
    return (
        <div className='flex flex-col sm:flex-row justify-between mt-6 w-full border-b border-[#8f95ab]'>
            <h1 class="block antialiased tracking-normal font-sans text-2xl sm:text-5xl font-semibold leading-tight text-inherit">Products</h1>
            <FilterProduct />
        </div>
    )
}