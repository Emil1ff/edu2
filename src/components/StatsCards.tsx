"use client"

import { motion } from "framer-motion"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import { BookOpen, Clock, Trophy, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function StatsCards() {
  const { user } = useSelector((state: RootState) => state.user)
  const { categories } = useSelector((state: RootState) => state.courses)

  const totalCourses = categories.reduce((acc, cat) => acc + cat.courses.length, 0)
  const completedCourses = user?.completedCourses || 0
  const completionRate = Math.round((completedCourses / totalCourses) * 100)

  const stats = [
    {
      title: "Ümumi Kurslar",
      value: totalCourses,
      icon: BookOpen,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Tamamlanmış",
      value: completedCourses,
      icon: Trophy,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Tamamlanma Faizi",
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Ümumi Vaxt",
      value: "124 saat",
      icon: Clock,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="bg-background/60 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
