import { Card, Typography } from "@material-tailwind/react";
import truncateText from "../truncateText";

const TABLE_HEAD = ["Products", "Price", "Date"];

export default function OrderTable({ orders }) {
    return (
        <Card className="h-full w-full overflow-scroll ">
            <table className="w-full min-w-fit table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th
                                key={head}
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                {orders && orders.length > 0 ? (
                    <tbody>
                        {orders.map((order, index) => {
                            const isLast = index === orders.length - 1;
                            const classes = isLast ? "sm:p-4" : "sm:p-4 border-b border-blue-gray-50";
                            const products = order.order.values
                            const date = order.createdAt
                            const cost = order.cost
                            return (
                                <tr key={index}>
                                    <td className={classes}>
                                        {products.map((product, idx) => {
                                            const properties=product.mapValue.fields
                                            const title = properties.title.stringValue
                                            const quantity = properties.quantity.integerValue
                                            return (
                                                <div className="flex justify-start" key={idx}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal mr-4"
                                                    >
                                                        x{quantity}
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {truncateText(title,20)}
                                                    </Typography>
                                                    
                                                </div>)
                                        })}
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {cost}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {date}
                                        </Typography>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                ) : (
                    <tbody>
                        <tr>
                            <td colSpan={TABLE_HEAD.length} className="p-4">
                                <Typography variant="h3" className="text-center">No order</Typography>
                            </td>
                        </tr>
                    </tbody>
                )}
            </table>
        </Card>
    );
}
