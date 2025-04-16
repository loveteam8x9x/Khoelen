import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Calendar, Clock } from "lucide-react"

export default async function NewsPage() {
  const cookieStore = cookies()
  const supabase = createClient()(cookieStore)

  const { data: articles } = await supabase
    .from("articles")
    .select("*, categories(*), profiles(full_name)")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(9)

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">Tin tức & Nghiên cứu</h1>
        <p className="text-xl text-muted-foreground">Cập nhật thông tin và nghiên cứu mới nhất về bệnh tiểu đường</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles
          ? articles.map((article) => (
              <Card key={article.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={
                      article.featured_image
                        ? article.featured_image.startsWith("http")
                          ? article.featured_image
                          : `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(article.title)}`
                        : `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(article.title)}`
                    }
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {article.published_at
                        ? format(new Date(article.published_at), "dd MMMM yyyy", { locale: vi })
                        : "Chưa xuất bản"}
                    </span>
                    <Clock className="ml-2 h-4 w-4" />
                    <span>5 phút đọc</span>
                  </div>
                  <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{article.content.substring(0, 120)}...</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="ghost" className="gap-1" asChild>
                    <Link href={`/tin-tuc/${article.slug}`}>
                      Đọc thêm
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          : Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="relative h-48 w-full bg-muted"></div>
                <CardHeader>
                  <div className="h-4 w-24 rounded bg-muted"></div>
                  <CardTitle className="h-6 w-full rounded bg-muted"></CardTitle>
                  <CardDescription className="h-12 w-full rounded bg-muted"></CardDescription>
                </CardHeader>
                <CardFooter>
                  <div className="h-10 w-24 rounded bg-muted"></div>
                </CardFooter>
              </Card>
            ))}
      </div>
    </div>
  )
}
