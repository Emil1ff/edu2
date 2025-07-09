"use client"

import { motion } from "framer-motion"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import { Users, BookOpen, GraduationCap, Award } from "lucide-react"

export function Stats() {
  const { stats } = useSelector((state: RootState) => state.landing)

  const statsData = [
    {
      icon: Users,
      value: stats.students,
      label: "Aktiv Tələbə",
      suffix: "+",
    },
    {
      icon: BookOpen,
      value: stats.courses,
      label: "Kurs Sayı",
      suffix: "+",
    },
    {
      icon: GraduationCap,
      value: stats.instructors,
      label: "Təcrübəli Müəllim",
      suffix: "+",
    },
    {
      icon: Award,
      value: stats.satisfaction,
      label: "Məmnuniyyət Dərəcəsi",
      suffix: "%",
    },
  ]

  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Rəqəmlərlə Uğurumuz</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Minlərlə tələbənin güvəndiyi platforma</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <motion.div
                className="text-3xl md:text-4xl font-bold text-primary mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {stat.value.toLocaleString()}
                {stat.suffix}
              </motion.div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
