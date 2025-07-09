"use client"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  const footerLinks = {
    Kurslar: ["Frontend", "Backend", "UI/UX Design", "Mobile", "DevOps", "Data Science"],
    Şirkət: ["Haqqımızda", "Komanda", "Karyera", "Əlaqə", "Blog"],
    Dəstək: ["Yardım Mərkəzi", "FAQ", "Canlı Dəstək", "Geri Bildirim"],
  }

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo və Təsvir */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/60 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold">Təhsil Platforması</span>
            </div>
            <p className="text-muted-foreground max-w-md">
              Müasir texnologiyaları öyrənin və karyeranızı yeni səviyyəyə qaldırın. Minlərlə tələbənin güvəndiyi
              platforma.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Linklər */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h3 className="font-semibold text-lg">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t mt-12 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-2">Xəbər Bülleteni</h3>
              <p className="text-muted-foreground">Yeni kurslar və xüsusi təkliflər haqqında məlumat alın</p>
            </div>
            <div className="flex gap-2">
              <Input placeholder="E-mail ünvanınız" className="flex-1" />
              <Button>Abunə ol</Button>
            </div>
          </div>
        </div>

        {/* Əlaqə Məlumatları */}
        <div className="border-t mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <span className="text-sm">info@tehsilplatformasi.az</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <span className="text-sm">+994 12 345 67 89</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm">Bakı, Azərbaycan</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 Təhsil Platforması. Bütün hüquqlar qorunur.</p>
        </div>
      </div>
    </footer>
  )
}
