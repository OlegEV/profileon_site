import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Профилеон — Поликарбонатные трубы российского производства",
  description: "Поликарбонатные трубы для дома, хобби и творчества. Прозрачные, опаловые и белые трубы диаметром от 8 до 284 мм. Российское производство. Создайте свой светильник, аквариум или стильную упаковку.",
  keywords: ["поликарбонатные трубы", "прозрачные трубы", "трубы для аквариума", "трубы для светильников", "DIY", "творчество", "Профилеон", "российское производство"],
  authors: [{ name: "Профилеон" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Профилеон — Поликарбонатные трубы",
    description: "Поликарбонатные трубы для дома, хобби и творчества. Прозрачность стекла и прочность пластика.",
    url: "https://profileon.ru",
    siteName: "Профилеон",
    type: "website",
    images: ["/many_tubes.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${roboto.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
