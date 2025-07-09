"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import { ChevronDown, ChevronRight, Play, CheckCircle } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { categories } = useSelector((state: RootState) => state.courses)
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["1"])
  const [expandedCourses, setExpandedCourses] = useState<string[]>([])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const toggleCourse = (courseId: string) => {
    setExpandedCourses((prev) => (prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]))
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={{ x: -320 }}
        animate={{ x: isOpen ? 0 : -320 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 bg-background/80 backdrop-blur-md border-r z-50 overflow-hidden"
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Dərs Kateqoriyaları</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {categories.map((category) => (
              <Collapsible
                key={category.id}
                open={expandedCategories.includes(category.id)}
                onOpenChange={() => toggleCategory(category.id)}
              >
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between p-3 h-auto hover:bg-primary/10">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                      <Badge variant="secondary" className="ml-auto">
                        {category.courses.length}
                      </Badge>
                    </div>
                    {expandedCategories.includes(category.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>

                <CollapsibleContent className="space-y-2 mt-2">
                  {category.courses.map((course) => (
                    <div key={course.id} className="ml-4">
                      <Collapsible
                        open={expandedCourses.includes(course.id)}
                        onOpenChange={() => toggleCourse(course.id)}
                      >
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-start p-3 h-auto text-left hover:bg-primary/5"
                          >
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{course.title}</span>
                                {expandedCourses.includes(course.id) ? (
                                  <ChevronDown className="h-3 w-3" />
                                ) : (
                                  <ChevronRight className="h-3 w-3" />
                                )}
                              </div>
                              <div className="space-y-1">
                                <Progress value={course.progress} className="h-1" />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>{course.progress}% tamamlandı</span>
                                  <span>{course.duration}</span>
                                </div>
                              </div>
                            </div>
                          </Button>
                        </CollapsibleTrigger>

                        <CollapsibleContent className="ml-4 mt-2 space-y-1">
                          {category.modules
                            .filter((module) => module.id === course.id)
                            .flatMap((module) => module.subModules)
                            .map((subModule) => (
                              <Button
                                key={subModule.id}
                                variant="ghost"
                                className="w-full justify-start p-2 h-auto text-xs hover:bg-primary/5"
                              >
                                <div className="flex items-center gap-2">
                                  {subModule.completed ? (
                                    <CheckCircle className="h-3 w-3 text-green-500" />
                                  ) : (
                                    <Play className="h-3 w-3 text-muted-foreground" />
                                  )}
                                  <span className={subModule.completed ? "line-through text-muted-foreground" : ""}>
                                    {subModule.title}
                                  </span>
                                  <span className="ml-auto text-muted-foreground">{subModule.duration}</span>
                                </div>
                              </Button>
                            ))}
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      </motion.aside>
    </>
  )
}
