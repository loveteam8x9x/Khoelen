import { createClient, createStaticClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import Image from "next/image"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock } from "lucide-react"

export async function generateStaticParams() {
  // Sử dụng createStaticClient thay vì createClient với cookies
  const supabase = createStaticClient()

  const { data } = await supabase.from("articles").select("slug").eq("published", true).eq("category_id", 1)

  return (
    data?.map(({ slug }) => ({
      slug,
    })) || []
  )
}

interface PageProps {
  params: {
    slug: string
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = params
  const cookieStore = cookies()
  const supabase = createClient()(cookieStore)

  const { data: article } = await supabase
    .from("articles")
    .select("*, categories(*), profiles(full_name, avatar_url)")
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (!article) {
    notFound()
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">{article.title}</h1>

        <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
          {article.published_at && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(article.published_at), "dd MMMM yyyy", { locale: vi })}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>5 phút đọc</span>
          </div>
        </div>

        {article.featured_image && (
          <div className="mb-8 overflow-hidden rounded-lg">
            <Image
              src={
                article.featured_image.startsWith("http")
                  ? article.featured_image
                  : `/placeholder.svg?height=600&width=1200&text=${encodeURIComponent(article.title)}`
              }
              alt={article.title}
              width={1200}
              height={600}
              className="w-full object-cover"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          {article.content.split("\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-12">
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Bài viết liên quan</h2>
              <p className="text-muted-foreground">Đang tải bài viết liên quan...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
