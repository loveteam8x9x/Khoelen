import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Về Khoelen</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Khoelen cung cấp thông tin, hỗ trợ và nghiên cứu về bệnh tiểu đường, giúp mọi người sống khỏe mạnh và quản
              lý bệnh hiệu quả.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Thông tin</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/thong-tin/tieu-duong-la-gi" className="text-muted-foreground hover:text-primary">
                  Tiểu đường là gì
                </Link>
              </li>
              <li>
                <Link href="/thong-tin/cac-loai-tieu-duong" className="text-muted-foreground hover:text-primary">
                  Các loại tiểu đường
                </Link>
              </li>
              <li>
                <Link href="/thong-tin/trieu-chung" className="text-muted-foreground hover:text-primary">
                  Triệu chứng
                </Link>
              </li>
              <li>
                <Link href="/thong-tin/dieu-tri" className="text-muted-foreground hover:text-primary">
                  Điều trị
                </Link>
              </li>
              <li>
                <Link href="/thong-tin/phong-ngua" className="text-muted-foreground hover:text-primary">
                  Phòng ngừa
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Sống khỏe</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/song-khoe/che-do-an-uong" className="text-muted-foreground hover:text-primary">
                  Chế độ ăn uống
                </Link>
              </li>
              <li>
                <Link href="/song-khoe/hoat-dong-the-chat" className="text-muted-foreground hover:text-primary">
                  Hoạt động thể chất
                </Link>
              </li>
              <li>
                <Link href="/song-khoe/kiem-soat-duong-huyet" className="text-muted-foreground hover:text-primary">
                  Kiểm soát đường huyết
                </Link>
              </li>
              <li>
                <Link href="/song-khoe/cong-cu-ho-tro" className="text-muted-foreground hover:text-primary">
                  Công cụ hỗ trợ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Liên hệ</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Địa chỉ: 123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</li>
              <li>
                <Link href="tel:+84123456789" className="text-muted-foreground hover:text-primary">
                  Điện thoại: 0123 456 789
                </Link>
              </li>
              <li>
                <Link href="mailto:info@khoelen.com" className="text-muted-foreground hover:text-primary">
                  Email: info@khoelen.com
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Khoelen. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
