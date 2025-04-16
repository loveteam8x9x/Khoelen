"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Edit, Loader2, Plus, Trash } from "lucide-react"

export default function ArticlesPage() {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("*, categories(*)")
        .order("created_at", { ascending: false })

      if (error) {
        throw error
      }

      setArticles(data || [])
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error.message || "Không thể tải bài viết",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return

    setIsDeleting(true)
    try {
      const { error } = await supabase.from("articles").delete().eq("id", deleteId)

      if (error) {
        throw error
      }

      setArticles(articles.filter((article) => article.id !== deleteId))
      toast({
        title: "Đã xóa bài viết",
        description: "Bài viết đã được xóa thành công",
      })
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error.message || "Không thể xóa bài viết",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setDeleteId(null)
    }
  }

  const filteredArticles = articles.filter((article) => article.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý bài viết</h1>
        <Button asChild>
          <Link href="/admin/articles/new">
            <Plus className="mr-2 h-4 w-4" />
            Bài viết mới
          </Link>
        </Button>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Tìm kiếm bài viết..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="space-y-4">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <Card key={article.id}>
                <CardHeader>
                  <CardTitle>{article.title}</CardTitle>
                  <CardDescription>
                    {article.published ? "Đã xuất bản" : "Chưa xuất bản"} •
                    {article.categories?.name ? ` ${article.categories.name} • ` : " "}
                    {new Date(article.created_at).toLocaleDateString("vi-VN")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{article.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/articles/${article.id}`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Chỉnh sửa
                      </Link>
                    </Button>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive" size="sm" onClick={() => setDeleteId(article.id)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Xóa
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Xác nhận xóa</DialogTitle>
                        <DialogDescription>
                          Bạn có chắc chắn muốn xóa bài viết "{article.title}"? Hành động này không thể hoàn tác.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteId(null)}>
                          Hủy
                        </Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                          {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          {isDeleting ? "Đang xóa..." : "Xóa"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="rounded-lg border p-8 text-center">
              <p className="text-muted-foreground">Không tìm thấy bài viết nào</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
