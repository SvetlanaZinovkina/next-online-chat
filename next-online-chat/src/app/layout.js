import "./globals.css";

export const metadata = {
  title: "Chat-next",
  description: "Online-chat",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body
        className="min-h-screen bg-gradient-to-br from-black to-purple-900 w-screen h-screen font-roboto"
      >
        {children}
      </body>
    </html>
  );

}
