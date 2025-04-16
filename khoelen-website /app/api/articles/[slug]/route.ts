import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug
  const cookieStore = cookies()
  const supabase = createClient()(cookieStore)

  const { data, error } = await supabase
    .from("articles")
    .select("*, categories(*), profiles(full_name, avatar_url)")
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 })
  }

  return NextResponse.json({ data })
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug
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
      .update({
        title: body.title,
        slug: body.slug,
        content: body.content,
        featured_image: body.featured_image,
        published: body.published,
        published_at: body.published && !body.published_at ? new Date().toISOString() : body.published_at,
        category_id: body.category_id,
      })
      .eq("slug", slug)
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug
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
  const { error } = await supabase.from("articles").delete().eq("slug", slug)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
