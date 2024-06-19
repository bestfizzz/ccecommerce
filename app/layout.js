import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import "./globals.css";
import CartContextProvider from "@/components/Cart/CartContext";
import { getCategories } from "@/libs/categories";
import { Suspense } from "react";
import { AuthProvider } from "@/components/User/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "COCO",
  description: "Fresh organic food from the farm",
  icons: {
    icon: '/icon.ico', // /public path
  },
};

export default async function RootLayout({ children }) {
  async function getCategoriesListMenu(){
    'use server';
    return await getCategories()
  }
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
