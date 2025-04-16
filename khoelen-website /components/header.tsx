"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

const mainNavItems = [
  {
    title: "Trang chủ",
    href: "/",
  },
  {
    title: "Thông tin tiểu đường",
    href: "/thong-tin",
    children: [
      {
        title: "Tiểu đường là gì",
        href: "/thong-tin/tieu-duong-la-gi",
      },
      {
        title: "Các loại tiểu đường",
        href: "/thong-tin/cac-loai-tieu-duong",
      },
      {
        title: "Triệu chứng",
        href: "/thong-tin/trieu-chung",
      },
      {
        title: "Điều trị",
        href: "/thong-tin/dieu-tri",
      },
    ],
  },
  {
    title: "Sống khỏe",
    href: "/song-khoe",
    children: [
      {
        title: "Chế độ ăn uống",
        href: "/song-khoe/che-do-an-uong",
      },
      {
        title: "Hoạt động thể chất",
        href: "/song-khoe/hoat-dong-the-chat",
      },
      {
        title: "Kiểm soát đường huyết",
        href: "/song-khoe/kiem-soat-duong-huyet",
      },
    ],
  },
  {
    title: "Tin tức & Nghiên cứu",
    href: "/tin-tuc",
  },
  {
    title: "Hỗ trợ",
    href: "/ho-tro",
  },
]

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Khoelen</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            {mainNavItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href ? "text-primary" : "text-foreground",
                  )}
                >
                  {item.title}
                </Link>
                {item.children && hoveredItem === item.href && (
                  <div className="absolute left-0 top-full z-10 mt-1 w-48 rounded-md border bg-background p-2 shadow-md">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-sm px-3 py-2 text-sm hover:bg-muted"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {isSearchOpen ? (
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-full rounded-md border px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button variant="ghost" size="icon" className="absolute right-0" onClick={() => setIsSearchOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Tìm kiếm</span>
            </Button>
          )}
          <Button variant="default" size="sm" asChild>
            <Link href="/ho-tro">Quyên góp</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4">
                {mainNavItems.map((item) => (
                  <div key={item.href} className="space-y-2">
                    <Link href={item.href} className="text-base font-medium hover:text-primary">
                      {item.title}
                    </Link>
                    {item.children && (
                      <div className="ml-4 flex flex-col gap-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="text-sm text-muted-foreground hover:text-primary"
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
