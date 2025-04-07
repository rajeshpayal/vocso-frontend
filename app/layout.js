import { UserProvider } from "@auth0/nextjs-auth0/client";
import NavBar from "./components/NavBar";
import "./globals.css";

export const metadata = {
  title: "Auth0 Email App",
  description: "Auth0 authentication with email notification",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <NavBar />
          <main>{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
