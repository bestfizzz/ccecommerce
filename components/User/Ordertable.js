import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Date", "Price", "Products"];

const TABLE_ROWS = [];

export default function OrderTable() {
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
                {TABLE_ROWS && TABLE_ROWS.length > 0 ? (
                    <tbody>
                        {TABLE_ROWS.map(({ date, price, products }, index) => {
                            const isLast = index === TABLE_ROWS.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={index}>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {date}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {price}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        {products.map(({ product, quantity }, idx) => (
                                            <div key={idx}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {product} ({quantity})
                                                </Typography>
                                            </div>
                                        ))}
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
