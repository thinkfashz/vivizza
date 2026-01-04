
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vivazza | Pizzería Artesanal Talca",
  description: "La mejor pizza artesana del Maule con fermentación lenta y alma local.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@300;400;500;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
