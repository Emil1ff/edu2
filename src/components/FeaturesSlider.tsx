"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { motion } from "framer-motion"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import { CourseCard } from "./CourseCard"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

export function FeaturedSlider() {
  const { categories } = useSelector((state: RootState) => state.courses)
  const featuredCourses = categories.flatMap((cat) => cat.courses).slice(0, 6)

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Seçilmiş Kurslar</h2>
          <p className="text-muted-foreground">Ən yaxşı və məşhur kurslarımız</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="swiper-button-prev-custom hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="swiper-button-next-custom hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-primary/30",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-primary",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
        className="featured-slider"
      >
        {featuredCourses.map((course, index) => (
          <SwiperSlide key={course.id}>
            <CourseCard course={course} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  )
}
