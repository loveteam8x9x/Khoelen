"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { ArrowLeft, Loader2 } from "lucide-react"

export default function NewArticlePage() {
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [content, setContent] = useState("")
  const [featuredImage, setFeaturedImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTitle(value)
    // Generate slug from title
    setSlug(
      value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, ""),
    )
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFeaturedImage(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Upload image if selected
      let imageUrl = null
      if (featuredImage) {
        const fileExt = featuredImage.name.split(".").pop()
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
        const filePath = `articles/${fileName}`

        const { error: uploadError, data } = await supabase.storage.from("images").upload(filePath, featuredImage)

        if (uploadError) {
          throw uploadError
        }

        imageUrl = filePath
      }

      // Insert article into database
      const { error } = await supabase.from("articles").insert({
        title,
        slug,
        content,
        featured_image: imageUrl,
        author_id: (await supabase.auth.getUser()).data.user?.id,
      })

      if (error) {
        throw error
      }

      toast({
        title: "Bài viết đã được tạo",
        description: "Bài viết của bạn đã được tạo thành công.",
      })

      router.push("/admin/articles")
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error.message || "Có lỗi xảy ra khi tạo bài viết.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/admin/articles">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Quay lại</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Tạo bài viết mới</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Thông tin bài viết</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Tiêu đề</Label>
              <Input id="title" value={title} onChange={handleTitleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
              <p className="text-xs text-muted-foreground">URL của bài viết sẽ là: khoelen.com/tin-tuc/{slug}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Nội dung</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[300px]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="featuredImage">Hình ảnh đại diện</Label>
              <Input id="featuredImage" type="file" accept="image/*" onChange={handleImageChange} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/admin/articles">Hủy</Link>
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Đang lưu..." : "Lưu bài viết"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
