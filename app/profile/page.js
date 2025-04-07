"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { user, error, isLoading } = useUser();
  const [status, setStatus] = useState("");
  const router = useRouter();

  useEffect(() => {
    // If user is authenticated, send token to backend
    const sendTokenToBackend = async () => {
      if (user) {
        try {
          setStatus("Sending token to backend...");
          // Get the access token using the SDK endpoint
          const tokenResponse = await fetch("/api/auth/token");
          if (!tokenResponse.ok) {
            throw new Error(`Failed to get token: ${tokenResponse.status}`);
          }
          const tokenData = await tokenResponse.json();
          console.log("Token retrieved:", tokenData);

          // Send token to backend
          const backendUrl =
            process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
          const backendResponse = await fetch(`${backendUrl}/auth/callback`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: tokenData.accessToken,
              email: user.email,
            }),
          });

          if (!backendResponse.ok) {
            throw new Error(`Backend error: ${backendResponse.status}`);
          }

          const responseData = await backendResponse.json();
          setStatus(responseData.message || "Email sent successfully!");
        } catch (err) {
          console.error("Error sending token:", err);
          setStatus(`Error: ${err.message}`);
        }
      }
    };

    if (user) {
      sendTokenToBackend();
    }
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!user) {
    router.push("/api/auth/login");
    return null;
  }

  return (
    <>
      <div className="profile-container">
        <h1>User Profile</h1>
        <div className="profile-card">
          <h2>{user.name || "User"}</h2>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <div className="status-box">
            <h3>Token Status:</h3>
            <p>{status}</p>
          </div>
        </div>
      </div>
    </>
  );
}
