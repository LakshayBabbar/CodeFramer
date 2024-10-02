import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { code, inputs } = await req.json();
    const access_key = process.env?.ACCESS_KEY;
    const response = await fetch(process.env.COMPILER_URL + "/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, inputs, access_key }),
    });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }
    if (!response.ok) {
      throw new Error("Failed to compile code");
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
