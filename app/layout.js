import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import "./globals.css";
import CartContextProvider from "@/components/Cart/CartContext";
import { Suspense } from "react";
import { AuthProvider } from "@/components/User/AuthContext";
import { revalidatePath } from 'next/cache'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "COCO",
  description: "Fresh organic food from the farm",
  icons: {
    icon: '/icon.ico', // /public path
  },
};
async function getCategoriesListMenu(){
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/categories`, {method: 'GET',cache:'no-cache'});
  let data = await res.json()
  revalidatePath('/', 'layout')
  return data
}

export default async function RootLayout({ children }) {

  const categoryList = await getCategoriesListMenu()///fucking nextjs npm run build on production doesnt serve api routes
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={inter.className + 'bg-white'}>
        <AuthProvider>
        <CartContextProvider>
        <Suspense>
        <Layout categoryList={categoryList}>
          {children}
        </Layout>
        </Suspense>
        </CartContextProvider>
        </AuthProvider>
        <script
          type="module"
          src="https://unpkg.com/@material-tailwind/html@latest/scripts/popover.js"
        ></script>
      </body>
    
    </html>
  );
}
