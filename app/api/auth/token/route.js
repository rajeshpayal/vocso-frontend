import { NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";

export async function GET(req) {
  try {
    const session = await getSession();

    if (!session || !session.accessToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    return NextResponse.json({
      accessToken: session.accessToken,
    });
  } catch (error) {
    console.error("Error getting access token:", error);
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
}
