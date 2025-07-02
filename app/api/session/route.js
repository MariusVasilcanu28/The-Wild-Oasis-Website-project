import { auth } from "@/app/_lib/auth";

export async function GET() {
  const session = await auth();
  return Response.json({ user: session?.user ?? null });
}
