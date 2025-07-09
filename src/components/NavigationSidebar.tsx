"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/store"
import { closeSidebar, toggleSubLesson } from "@/store/slices/navigationSlice"
import { X, Play, CheckCircle, Lock, Clock, Star, Sparkles, ChevronDown, ChevronRight, User } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function NavigationSidebar() {
  const dispatch = useDispatch()
  const { lessons, isOpen } = useSelector((state: RootState) => state.navigation)
  const [expandedLessons, setExpandedLessons] = useState<string[]>([])

  const toggleLesson = (lessonId: string) => {
    setExpandedLessons((prev) => (prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId]))
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Başlanğıc":
        return "bg-green-500/10 text-green-600 border-green-500/20"
      case "Orta":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "İrəliləmiş":
        return "bg-red-500/10 text-red-600 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend":
        return "💻"
      case "Backend":
        return "⚙️"
      case "Design":
        return "🎨"
      case "Mobile":
        return "📱"
      case "DevOps":
        return "🔧"
      case "Data Science":
        return "📊"
      default:
        return "📚"
    }
  }

  const getCompletionPercentage = (subLessons: any[]) => {
    const completed = subLessons.filter((sl) => sl.isCompleted).length
    return Math.round((completed / subLessons.length) * 100)
  }

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => dispatch(closeSidebar())}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -400 }}
        animate={{ x: isOpen ? 0 : -400 }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 200,
          mass: 0.8,
        }}
        className="fixed left-0 top-0 h-full w-96 bg-background/95 backdrop-blur-md border-r z-50 shadow-2xl"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-primary/5 to-transparent">
            <div>
              <h2 className="text-xl font-bold">Dərslər Siyahısı</h2>
              <p className="text-sm text-muted-foreground">{lessons.length} dərs mövcuddur</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch(closeSidebar())}
              className="hover:bg-primary/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Lessons List */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3">
              {lessons.map((lesson, index) => {
                const isExpanded = expandedLessons.includes(lesson.id)
                const completionPercentage = getCompletionPercentage(lesson.subLessons)

                return (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group"
                  >
                    <Collapsible open={isExpanded} onOpenChange={() => toggleLesson(lesson.id)}>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full p-4 h-auto text-left hover:bg-primary/5 transition-all duration-200 group-hover:shadow-md"
                        >
                          <div className="flex items-start gap-3 w-full">
                            {/* Category Icon */}
                            <div className="text-2xl mt-1 flex-shrink-0">{getCategoryIcon(lesson.category)}</div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                                    {lesson.title}
                                  </h3>
                                  <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                                    {lesson.description}
                                  </p>
                                </div>

                                <div className="flex items-center gap-1 ml-2">
                                  {lesson.isNew && (
                                    <Badge className="bg-blue-500/10 text-blue-600 text-xs px-1.5 py-0.5">
                                      <Sparkles className="w-3 h-3 mr-1" />
                                      Yeni
                                    </Badge>
                                  )}
                                  {lesson.isPopular && (
                                    <Badge className="bg-orange-500/10 text-orange-600 text-xs px-1.5 py-0.5">
                                      <Star className="w-3 h-3 mr-1" />
                                      Məşhur
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              {/* Meta Info */}
                              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {lesson.duration}
                                </div>
                                <div className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  {lesson.instructor}
                                </div>
                                <Badge className={`text-xs px-2 py-0.5 ${getDifficultyColor(lesson.difficulty)}`}>
                                  {lesson.difficulty}
                                </Badge>
                              </div>

                              {/* Progress */}
                              <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                  <span>Tərəqqi</span>
                                  <span>{completionPercentage}%</span>
                                </div>
                                <Progress value={completionPercentage} className="h-1.5" />
                              </div>
                            </div>

                            {/* Expand Icon */}
                            <div className="flex-shrink-0 ml-2">
                              {isExpanded ? (
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                          </div>
                        </Button>
                      </CollapsibleTrigger>

                      <CollapsibleContent className="ml-4 mt-2 space-y-1">
                        {lesson.subLessons.map((subLesson, subIndex) => (
                          <motion.div
                            key={subLesson.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: subIndex * 0.05 }}
                          >
                            <Button
                              variant="ghost"
                              className="w-full justify-start p-3 h-auto text-left hover:bg-primary/5 disabled:opacity-50"
                              disabled={subLesson.isLocked}
                              onClick={() =>
                                !subLesson.isLocked &&
                                dispatch(
                                  toggleSubLesson({
                                    lessonId: lesson.id,
                                    subLessonId: subLesson.id,
                                  }),
                                )
                              }
                            >
                              <div className="flex items-center gap-3 w-full">
                                {/* Status Icon */}
                                <div className="flex-shrink-0">
                                  {subLesson.isLocked ? (
                                    <Lock className="h-4 w-4 text-muted-foreground" />
                                  ) : subLesson.isCompleted ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <Play className="h-4 w-4 text-primary" />
                                  )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <span
                                      className={`text-sm font-medium ${
                                        subLesson.isCompleted
                                          ? "line-through text-muted-foreground"
                                          : subLesson.isLocked
                                            ? "text-muted-foreground"
                                            : ""
                                      }`}
                                    >
                                      {subLesson.title}
                                    </span>
                                    <span className="text-xs text-muted-foreground ml-2">{subLesson.duration}</span>
                                  </div>
                                </div>
                              </div>
                            </Button>
                          </motion.div>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  </motion.div>
                )
              })}
            </div>
          </ScrollArea>

          {/* Footer Stats */}
          <div className="p-4 border-t bg-gradient-to-r from-primary/5 to-transparent">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-primary">{lessons.length}</div>
                <div className="text-xs text-muted-foreground">Dərs</div>
              </div>
              <div>
                <div className="text-lg font-bold text-primary">
                  {lessons.reduce((acc, lesson) => acc + lesson.subLessons.length, 0)}
                </div>
                <div className="text-xs text-muted-foreground">Mövzu</div>
              </div>
              <div>
                <div className="text-lg font-bold text-primary">
                  {Math.round(
                    lessons.reduce((acc, lesson) => acc + getCompletionPercentage(lesson.subLessons), 0) /
                      lessons.length,
                  )}
                  %
                </div>
                <div className="text-xs text-muted-foreground">Tamamlandı</div>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  )
}
