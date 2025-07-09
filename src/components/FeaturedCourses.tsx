"use client"

import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import { CourseCard } from "./CourseCard"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

export function FeaturedCourses() {
  const { featuredCourses } = useSelector((state: RootState) => state.landing)

  return (
    <section id="courses" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Seçilmiş Kurslar</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ən məşhur və keyfiyyətli kurslarımızla biliklərinizi artırın
          </p>
        </motion.div>

        <div className="relative">
          <div className="flex justify-center gap-2 mb-8">
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

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
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
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="featured-courses-slider pb-12"
          >
            {featuredCourses.map((course, index) => (
              <SwiperSlide key={course.id}>
                <CourseCard course={course} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Button size="lg" variant="outline">
            Bütün Kurslara Bax
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
