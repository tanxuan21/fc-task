import type { Metadata } from "next";
import "../styles/globals.scss"

export const metadata: Metadata = {
  title: "FangCun Daily",
  description: "FangCun Daily Description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ch">
      <body>
        {children}
      </body>
    </html>
  );
}
