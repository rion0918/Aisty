import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabaseAdminClient";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("tryon_history")
    .select("id,prediction_id,result_image_url,label,created_at,clerk_id")
    .eq("clerk_id", userId)
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error("History fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch history" },
      { status: 500 }
    );
  }

  return NextResponse.json({ items: data ?? [] });
}

export async function DELETE(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const all = searchParams.get("all");

  try {
    if (id) {
      const { error } = await supabaseAdmin
        .from("tryon_history")
        .delete()
        .eq("id", id)
        .eq("clerk_id", userId);

      if (error) {
        console.error("History delete error:", error);
        return NextResponse.json(
          { error: "Failed to delete history item" },
          { status: 500 }
        );
      }
      return NextResponse.json({ success: true });
    }

    if (all === "true") {
      const { error } = await supabaseAdmin
        .from("tryon_history")
        .delete()
        .eq("clerk_id", userId);

      if (error) {
        console.error("History bulk delete error:", error);
        return NextResponse.json(
          { error: "Failed to delete all history" },
          { status: 500 }
        );
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Missing id or all=true" },
      { status: 400 }
    );
  } catch (e) {
    console.error("History DELETE handler error:", e);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}

export const runtime = "nodejs";
export const maxDuration = 60;
export const preferredRegion = ["hnd1"];
