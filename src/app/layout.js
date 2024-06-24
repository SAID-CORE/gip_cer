import {Inter} from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "CER - Delta KiloWatt",
    description: "Benvenuto nel mondo delle CER. Compila ora il form per scoprire tutti i vantaggi e dai vita alla tuona comunità di energie Rinnovabili",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Navbar/>
        {children}
        <Footer/>
        </body>
        </html>
    );
}
