"use client"

import { motion } from "framer-motion"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

export function Categories() {
  const { categories } = useSelector((state: RootState) => state.landing)

  return (
    <section id="categories" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Kurs Kateqoriyaları</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Müxtəlif sahələrdə özünüzü inkişaf etdirin</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              <Card className="h-full bg-background/60 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{category.name}</h3>
                  <p className="text-muted-foreground">{category.description}</p>
                  <div className="flex items-center justify-center gap-2">
                    <Badge variant="secondary">{category.coursesCount} kurs</Badge>
                  </div>
                  <div className="flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">Kursları gör</span>
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
