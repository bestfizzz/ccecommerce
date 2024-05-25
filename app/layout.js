import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import "./globals.css";
import CartContextProvider from "@/components/Cart/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export const getCategoriesData = async ()=>{
  console.log(`${process.env.NEXT_PUBLIC_URL}/api/categories`)
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/categories`, {method: 'GET'},{ next: { revalidate: 3600 } });
  return res.json()
}

export default async function RootLayout({ children }) {
  const categoryList = await getCategoriesData()
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartContextProvider>
        <Layout categoryList={categoryList}>
          {children}
        </Layout>
        </CartContextProvider>

        <script
          type="module"
          src="https://unpkg.com/@material-tailwind/html@latest/scripts/popover.js"
        ></script>
      </body>
    
    </html>
  );
}
