import Link from "next/link";
import { getSession } from "@auth0/nextjs-auth0";

export default async function Home() {
  const session = await getSession();
  const user = session?.user;

  return (
    <div
      c
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>Auth0 Authentication with Email Notification</h1>
      {user ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <p>You are logged in as: {user.email}</p>
          <Link
            style={{
              backgroundColor: "#0070f3",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "5px",
              textDecoration: "none",
              marginTop: "10px",
            }}
            href="/profile"
          >
            View Profile
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <p>Please login to continue</p>
          <Link
            style={{
              backgroundColor: "#0070f3",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "5px",
              textDecoration: "none",
              marginTop: "10px",
            }}
            href="/api/auth/login"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
}
