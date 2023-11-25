import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import '../globals.css'
import {NextAuthProvider} from "@/app/session-provider";
import Header from "@/components/Header/Header";
import {ThemeProvider} from "@/components/theme-provider";
import React from "react";
import {Toaster} from "@/components/ui/toaster";


const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Bug Tracker',
    description: 'Generated by create next app',
}


export default function RootLayout({children,}: {
    children: React.ReactNode
}) {

    return (

        <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} dark:bg-[#20212C]`}>
        <NextAuthProvider>
            <>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Header/>
                    <div className="container-fluid px-[200px] mt-10">
                        {children}
                    </div>
                    <Toaster />
                </ThemeProvider>
            </>
        </NextAuthProvider>
        </body>
        </html>

    )
}
