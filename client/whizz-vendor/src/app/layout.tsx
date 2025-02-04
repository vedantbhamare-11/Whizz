import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Vendor Dashboard",
  description: "Manage your orders and menu items efficiently",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
