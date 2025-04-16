import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Calendar, Clock, Heart, Info, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="hero-gradient py-16 text-white md:py-24">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col justify-center">
              <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Thông tin và hỗ trợ về bệnh tiểu đường
              </h1>
              <p className="mb-6 text-lg md:text-xl">
                Chúng tôi cung cấp thông tin, hỗ trợ và nghiên cứu để giúp mọi người sống khỏe mạnh với bệnh tiểu đường.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90">
                  <Link href="/thong-tin/tieu-duong-la-gi">Tìm hiểu thêm</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  <Link href="/ho-tro">Nhận hỗ trợ</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-64 w-full overflow-hidden rounded-lg md:h-80 lg:h-96">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Người sống khỏe với bệnh tiểu đường"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold md:text-4xl">Thông tin hữu ích</h2>
            <p className="mx-auto max-w-3xl text-muted-foreground">
              Tìm hiểu về bệnh tiểu đường và cách quản lý hiệu quả
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <Info className="h-8 w-8 text-primary" />
                <CardTitle className="mt-2">Tiểu đường là gì</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Tìm hiểu về bệnh tiểu đường, nguyên nhân và các loại tiểu đường khác nhau.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="gap-1" asChild>
                  <Link href="/thong-tin/tieu-duong-la-gi">
                    Tìm hiểu thêm
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <Heart className="h-8 w-8 text-primary" />
                <CardTitle className="mt-2">Sống khỏe</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Chế độ ăn uống, hoạt động thể chất và các lời khuyên để sống khỏe với bệnh tiểu đường.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="gap-1" asChild>
                  <Link href="/song-khoe">
                    Tìm hiểu thêm
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <Users className="h-8 w-8 text-primary" />
                <CardTitle className="mt-2">Hỗ trợ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Các dịch vụ hỗ trợ, tư vấn và cộng đồng dành cho người bệnh tiểu đường.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="gap-1" asChild>
                  <Link href="/ho-tro">
                    Tìm hiểu thêm
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <Calendar className="h-8 w-8 text-primary" />
                <CardTitle className="mt-2">Sự kiện</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Các sự kiện, hội thảo và hoạt động liên quan đến bệnh tiểu đường.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="gap-1" asChild>
                  <Link href="/su-kien">
                    Tìm hiểu thêm
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="bg-muted/50 py-12 md:py-16">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">Tin tức mới nhất</h2>
              <p className="text-muted-foreground">Cập nhật thông tin và nghiên cứu mới nhất về bệnh tiểu đường</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/tin-tuc">Xem tất cả</Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={`/placeholder.svg?height=400&width=600&text=Tin tức ${i}`}
                    alt={`Tin tức ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{`${i + 10}/04/2023`}</span>
                    <Clock className="ml-2 h-4 w-4" />
                    <span>5 phút đọc</span>
                  </div>
                  <CardTitle className="line-clamp-2">
                    Nghiên cứu mới về phương pháp điều trị tiểu đường type {i}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    Các nhà khoa học đã phát hiện phương pháp mới giúp kiểm soát đường huyết hiệu quả hơn cho bệnh nhân
                    tiểu đường.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="ghost" className="gap-1" asChild>
                    <Link href={`/tin-tuc/nghien-cuu-moi-${i}`}>
                      Đọc thêm
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="rounded-lg bg-primary p-8 text-center text-primary-foreground md:p-12">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Hãy tham gia cùng chúng tôi</h2>
            <p className="mx-auto mb-6 max-w-2xl text-lg">
              Quyên góp, tình nguyện hoặc tham gia các sự kiện để hỗ trợ cộng đồng người bệnh tiểu đường.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/ho-tro/quyen-gop">Quyên góp</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link href="/ho-tro/tinh-nguyen">Tình nguyện</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
