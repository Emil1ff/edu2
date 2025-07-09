"use client"


export interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  progress?: number
  tags: string[]
  category: string
  isPopular?: boolean
  isRecommended?: boolean
  duration: string
  instructor: string
  rating: number
  studentsCount: number
  price: number
  originalPrice?: number
}

export interface SubModule {
  id: string
  title: string
  duration: string
  completed: boolean
}

export interface CourseModule {
  id: string
  title: string
  subModules: SubModule[]
}

export interface Category {
  id: string
  name: string
  icon: string
  description: string
  courses: Course[]
  modules: CourseModule[]
  coursesCount: number
}

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  completedCourses: number
  totalCourses: number
}

export interface Testimonial {
  id: string
  name: string
  role: string
  avatar: string
  content: string
  rating: number
}

export interface Feature {
  id: string
  title: string
  description: string
  icon: string
}

export interface Stats {
  students: number
  courses: number
  instructors: number
  satisfaction: number
}

export type Theme = "light" | "dark"
export type ColorScheme = "blue" | "red" | "green" | "purple" | "orange" | "pink" | "cyan"
