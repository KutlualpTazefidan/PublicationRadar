import { Inter } from "next/font/google";
import "./globals.css";
import { Exo } from "next/font/google";
const exo = Exo({ subsets: ["latin"] });

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Publication Radar",
  description: "Trends in Scientific Research",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={exo.className}>{children} </body>
    </html>
  );
}
