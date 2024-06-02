import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import "./globals.css";
import CartContextProvider from "@/components/Cart/CartContext";
import { Suspense } from "react";
import { getCategories } from "@/libs/categories";
import { AuthProvider } from "@/components/User/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "COCO",
  description: "Fresh organic food from the farm",
  icons: {
    icon: '/favicon.ico', // /public path
  },
};

export default async function RootLayout({ children }) {
  const categoryList = await getCategories()///fucking nextjs npm run build on production doesnt serve api routes
  return (
    <html lang="en">
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
