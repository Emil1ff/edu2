"use client"

import { motion } from "framer-motion"
import { Star, Users, Clock } from "lucide-react"
import type { Course } from "@/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface CourseCardProps {
  course: Course
  index?: number
}

export function CourseCard({ course, index = 0 }: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group h-full"
    >
      <Card className="overflow-hidden bg-background/60 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl h-full flex flex-col">
        <div className="relative overflow-hidden">
          <Image
            src={course.thumbnail || "/placeholder.svg"}
            alt={course.title}
            width={400}
            height={300}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {course.originalPrice && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-red-500 hover:bg-red-600 text-white">
                -{Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}%
              </Badge>
            </div>
          )}

          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex flex-wrap gap-1">
              {course.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs bg-white/20 text-white backdrop-blur-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <CardContent className="p-6 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors mb-2">
              {course.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{course.description}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {course.duration}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {course.studentsCount.toLocaleString()}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{course.rating}</span>
                <span className="text-sm text-muted-foreground">({course.studentsCount})</span>
              </div>
              <div className="text-sm text-muted-foreground">{course.instructor}</div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">{course.price}₼</span>
                {course.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">{course.originalPrice}₼</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            Kursa Qeydiyyat
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
