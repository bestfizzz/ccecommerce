'use client'
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }) {
    return (
        <div className={`flex min-h-screen flex-col items-center w-full ${inter.className} justify-between`}>
            <Nav />
            <div className="w-full">
                {children}
            </div>
            <Footer />
        </div>
    )
}