import "./globals.css";
import AppWrapper from "../provider/AppWrapper";

export const metadata = {
  title: "Zino-chat",
  description: "Online-chat for you and your friends",
};

export default function RootLayout({ children }) {
  return (
    <AppWrapper>
      <html lang="ru">
        <body className="min-h-screen bg-gradient-to-br from-black to-purple-900 w-screen h-screen font-roboto">
          {children}
        </body>
      </html>
    </AppWrapper>
  );
}
