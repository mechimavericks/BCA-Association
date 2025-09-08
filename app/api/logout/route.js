import { cookies } from "next/headers";

export async function GET(params) {
  const cookieStore = await cookies();
  const cookieSet = cookieStore.get("token");
  if (!cookieSet) {
    return Response.json({
      status: "error",
      message: "Not logged in",
    });
  } else {
    await (await cookies()).delete("token");
    return Response.json({
      status: "success",
      message: "Logged out",
    });
  }
}
