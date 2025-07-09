"use client"

import { motion } from "framer-motion"
// import type { Course } from "@/types"
import { CourseCard } from "./CourseCard"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Course } from "@/store/types"

interface CourseSectionProps {
  title: string
  description?: string
  courses: Course[]
  showViewAll?: boolean
}

export function CourseSection({ title, description, courses, showViewAll = true }: CourseSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          {description && <p className="text-muted-foreground mt-1">{description}</p>}
        </div>
        {showViewAll && (
          <Button variant="ghost" className="group">
            Hamısına bax
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course, index) => (
          <CourseCard key={course.id} course={course} index={index} />
        ))}
      </div>
    </motion.section>
  )
}
