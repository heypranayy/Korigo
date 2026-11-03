import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") || "/blogs";
  const secret = searchParams.get("secret");

  // Allow revalidation if secret matches or general dev
  if (secret && secret !== "korigo_sync") {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  try {
    revalidatePath(path);
    revalidatePath("/blogs");
    revalidatePath("/blogs/[slug]", "page");
    return NextResponse.json({ revalidated: true, path, now: Date.now() });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}

