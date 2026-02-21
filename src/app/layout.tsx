import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";

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
      <head>
        {/* Yandex.Metrika counter */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=106948090', 'ym');

            ym(106948090, 'init', {
              ssr: true,
              webvisor: true,
              clickmap: true,
              ecommerce: "dataLayer",
              referrer: document.referrer,
              url: location.href,
              accurateTrackBounce: true,
              trackLinks: true
            });
          `}
        </Script>
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/106948090"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
        {/* /Yandex.Metrika counter */}
      </head>
      <body
        className={`${montserrat.variable} ${roboto.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
