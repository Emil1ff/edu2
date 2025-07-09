"use client"

import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { FeaturedCourses } from "@/components/FeaturedCourses"
import { Categories } from "@/components/Categories"
import { Features } from "@/components/Features"
import { Stats } from "@/components/Stats"
import { Testimonials } from "@/components/Testimonials"
import { Footer } from "@/components/Footer"
import { NavigationSidebar } from "@/components/NavigationSidebar"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <NavigationSidebar />
      <main>
        <Hero />
        <FeaturedCourses />
        <Categories />
        <Features />
        <Stats />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
