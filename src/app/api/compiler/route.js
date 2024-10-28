import { NextResponse } from "next/server";

export async function POST(req) {
  const referer = req.headers.get("referer") || "";
  if (!referer.includes(process.env.BASE_URL)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { code, inputs, language } = await req.json();

  try {
    const access_key = process.env?.ACCESS_KEY;
    const compilerUrl = process.env.COMPILER_URL + "/execute";

    const timeout = new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error("Server is booting, please wait few seconds")),
        8000
      )
    );

    const fetchExecution = fetch(compilerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, inputs, access_key }),
    });

    const response = await Promise.race([fetchExecution, timeout]);
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
