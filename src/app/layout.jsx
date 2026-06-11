import "./globals.css";
import { SWRProvider } from "@/lib/swr-config";

export const metadata = {
  title: "Jelajahi Wisata Nusantara · Atourin",
  description:
    "Temukan destinasi, desa wisata, atraksi, dan pemandu terbaik di seluruh Indonesia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <SWRProvider>{children}</SWRProvider>
      </body>
    </html>
  );
}
