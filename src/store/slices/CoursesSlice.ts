"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Category, Course } from "../types"

interface CoursesState {
  categories: Category[]
  featuredCourses: Course[]
  userCourses: Course[]
  recommendedCourses: Course[]
  popularCourses: Course[]
  loading: boolean
  error: string | null
}

const initialState: CoursesState = {
  categories: [
    {
      id: "1",
      name: "Frontend",
      icon: "💻",
      courses: [
        {
          id: "1",
          title: "React Əsasları",
          description: "React ilə müasir veb tətbiqlər yaratmaq",
          thumbnail: "/placeholder.svg?height=200&width=300",
          progress: 65,
          tags: ["React", "JavaScript", "Frontend"],
          category: "Frontend",
          duration: "8 saat",
          instructor: "Əli Məmmədov",
          rating: 4.8,
          studentsCount: 1250,
          price: 49.99,
          isEnrolled: true,
        },
        {
          id: "2",
          title: "Next.js Dərinləşmə",
          description: "Next.js ilə tam stack tətbiqlər",
          thumbnail: "/placeholder.svg?height=200&width=300",
          progress: 30,
          tags: ["Next.js", "React", "SSR"],
          category: "Frontend",
          duration: "12 saat",
          instructor: "Leyla Həsənova",
          rating: 4.9,
          studentsCount: 890,
          price: 79.99,
          isEnrolled: true,
        },
      ],
      modules: [
        {
          id: "1",
          title: "React Komponentləri",
          subModules: [
            { id: "1", title: "Funksional Komponentlər", duration: "45 dəq", completed: true },
            { id: "2", title: "Props və State", duration: "60 dəq", completed: true },
            { id: "3", title: "Event Handling", duration: "30 dəq", completed: false },
          ],
        },
      ],
    },
    {
      id: "2",
      name: "Backend",
      icon: "⚙️",
      courses: [
        {
          id: "3",
          title: "Node.js API Yaratmaq",
          description: "RESTful API-lər və mikroservislər",
          thumbnail: "/placeholder.svg?height=200&width=300",
          progress: 80,
          tags: ["Node.js", "Express", "API"],
          category: "Backend",
          duration: "10 saat",
          instructor: "Rəşad Quliyev",
          rating: 4.7,
          studentsCount: 670,
          price: 59.99,
          isEnrolled: true,
        },
      ],
      modules: [],
    },
    {
      id: "3",
      name: "Design",
      icon: "🎨",
      courses: [
        {
          id: "4",
          title: "UI/UX Dizayn Əsasları",
          description: "İstifadəçi təcrübəsi və interfeys dizaynı",
          thumbnail: "/placeholder.svg?height=200&width=300",
          progress: 45,
          tags: ["UI/UX", "Figma", "Design"],
          category: "Design",
          duration: "6 saat",
          instructor: "Nigar Əliyeva",
          rating: 4.6,
          studentsCount: 450,
          price: 39.99,
          isEnrolled: false,
        },
      ],
      modules: [],
    },
  ],
  featuredCourses: [],
  userCourses: [],
  recommendedCourses: [],
  popularCourses: [],
  loading: false,
  error: null,
}

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setFeaturedCourses: (state, action: PayloadAction<Course[]>) => {
      state.featuredCourses = action.payload
    },
    setUserCourses: (state, action: PayloadAction<Course[]>) => {
      state.userCourses = action.payload
    },
    setRecommendedCourses: (state, action: PayloadAction<Course[]>) => {
      state.recommendedCourses = action.payload
    },
    setPopularCourses: (state, action: PayloadAction<Course[]>) => {
      state.popularCourses = action.payload
    },
    updateCourseProgress: (state, action: PayloadAction<{ courseId: string; progress: number }>) => {
      const { courseId, progress } = action.payload
      
      // Kategorilerdeki kursları güncelle
      state.categories.forEach((category) => {
        const course = category.courses.find((c) => c.id === courseId)
        if (course) {
          course.progress = progress
        }
      })
      
      // Diğer kurs listelerini de güncelle
      const updateCourseInList = (courses: Course[]) => {
        const course = courses.find((c) => c.id === courseId)
        if (course) {
          course.progress = progress
        }
      }
      
      updateCourseInList(state.featuredCourses)
      updateCourseInList(state.userCourses)
      updateCourseInList(state.recommendedCourses)
      updateCourseInList(state.popularCourses)
    },
    enrollInCourse: (state, action: PayloadAction<string>) => {
      const courseId = action.payload
      
      state.categories.forEach((category) => {
        const course = category.courses.find((c) => c.id === courseId)
        if (course) {
          course.isEnrolled = true
          course.progress = 0
        }
      })
    },
    completeModule: (state, action: PayloadAction<{ categoryId: string; moduleId: string; subModuleId: string }>) => {
      const { categoryId, moduleId, subModuleId } = action.payload
      const category = state.categories.find(c => c.id === categoryId)
      
      if (category) {
        const module = category.modules.find(m => m.id === moduleId)
        if (module) {
          const subModule = module.subModules.find(sm => sm.id === subModuleId)
          if (subModule) {
            subModule.completed = true
          }
        }
      }
    },
  },
})

export const { 
  setLoading,
  setError,
  setFeaturedCourses, 
  setUserCourses, 
  setRecommendedCourses,
  setPopularCourses,
  updateCourseProgress,
  enrollInCourse,
  completeModule
} = coursesSlice.actions

export default coursesSlice.reducer
