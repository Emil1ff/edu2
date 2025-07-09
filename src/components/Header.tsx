"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Menu, Moon, Sun, Search, X } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { Input } from "@/components/ui/input"

import { useSelector, useDispatch } from "react-redux"
import { toggleSidebar } from "@/store/slices/navigationSlice"
import type { RootState } from "@/store"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const dispatch = useDispatch()
  const { isOpen: isSidebarOpen } = useSelector((state: RootState) => state.navigation)

  // navItems array-ını silin və onun yerinə search state əlavə edin
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <motion.header
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Sol tərəf - Nav Icon və Logo */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch(toggleSidebar())}
              className="hover:bg-primary/10 relative"
            >
              <Menu className="h-5 w-5" />
              {isSidebarOpen && (
                <motion.div
                  className="absolute inset-0 bg-primary/10 rounded-md"
                  layoutId="nav-bg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Button>

            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/60 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent hidden md:block">
                Təhsil Platforması
              </span>
            </motion.div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex">
            <div className="relative w-full">
              <Search className="absolute top-1/2 transform -translate-y-1/2 h-4 w-6 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Kurs, müəllim və ya mövzu axtarın..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 w-[700px] bg-background/60 backdrop-blur-sm border-primary/20 focus:border-primary/40 focus:bg-background/80 transition-all duration-200"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/auth">Daxil ol</Link>
              </Button>
              <Button asChild>
                <Link href="/auth">Qeydiyyat</Link>
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-background/95 backdrop-blur-md">
                <div className="flex flex-col space-y-4 mt-8">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Axtarış..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4"
                    />
                    {searchQuery && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                        onClick={() => setSearchQuery("")}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>

                  <div className="flex flex-col space-y-2 pt-4 border-t">
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link href="/auth">Daxil ol</Link>
                    </Button>
                    <Button className="justify-start" asChild>
                      <Link href="/auth">Qeydiyyat</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
