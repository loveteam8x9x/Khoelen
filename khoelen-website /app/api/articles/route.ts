import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : 10
  const page = searchParams.get("page") ? Number.parseInt(searchParams.get("page")!) : 1

  const cookieStore = cookies()
  const supabase = createClient()(cookieStore)

  let query = supabase
    .from("articles")
    .select("*, categories(*), profiles(full_name, avatar_url)")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1)

  if (category) {
    query = query.eq("categories.slug", category)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}

export async function POST(request: Request) {
  const cookieStore = cookies()
  const supabase = createClient()(cookieStore)

  // Check if user is authenticated and is admin
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Get user role
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

  if (!profile || profile.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  // Process the request
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from("articles")
      .insert({
        title: body.title,
        slug: body.slug,
        content: body.content,
        featured_image: body.featured_image,
        author_id: session.user.id,
        published: body.published || false,
        published_at: body.published ? new Date().toISOString() : null,
        category_id: body.category_id,
      })
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
