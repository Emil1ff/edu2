"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Course, Category, Testimonial, Feature, Stats } from "../types"

interface LandingState {
  featuredCourses: Course[]
  categories: Category[]
  testimonials: Testimonial[]
  features: Feature[]
  stats: Stats
  loading: boolean
  error: string | null
  newsletter: {
    email: string
    subscribed: boolean
  }
  filters: {
    category: string
    priceRange: [number, number]
    rating: number
    level: string
  }
}

const initialState: LandingState = {
  featuredCourses: [
    {
      id: "1",
      title: "React və Next.js ilə Modern Veb Tətbiqlər",
      description: "Sıfırdan başlayaraq professional veb tətbiqlər yaratmağı öyrənin",
      thumbnail: "/placeholder.svg?height=300&width=400",
      tags: ["React", "Next.js", "JavaScript"],
      category: "Frontend",
      duration: "12 saat",
      instructor: "Əli Məmmədov",
      rating: 4.8,
      studentsCount: 1250,
      price: 99,
      originalPrice: 149,
      level: "Orta",
      language: "Azərbaycan",
      lastUpdated: "2024-01-15",
      isNew: true,
      isBestseller: false,
    },
    {
      id: "2",
      title: "Node.js və Express ilə Backend API",
      description: "Güclü və təhlükəsiz backend sistemləri qurun",
      thumbnail: "/placeholder.svg?height=300&width=400",
      tags: ["Node.js", "Express", "MongoDB"],
      category: "Backend",
      duration: "15 saat",
      instructor: "Leyla Həsənova",
      rating: 4.9,
      studentsCount: 890,
      price: 129,
      originalPrice: 179,
      level: "Qabaqcıl",
      language: "Azərbaycan",
      lastUpdated: "2024-01-10",
      isNew: false,
      isBestseller: true,
    },
    {
      id: "3",
      title: "UI/UX Dizayn Masterclass",
      description: "İstifadəçi təcrübəsi və interfeys dizaynında mütəxəssis olun",
      thumbnail: "/placeholder.svg?height=300&width=400",
      tags: ["UI/UX", "Figma", "Design"],
      category: "Design",
      duration: "10 saat",
      instructor: "Nigar Əliyeva",
      rating: 4.7,
      studentsCount: 650,
      price: 89,
      originalPrice: 129,
      level: "Başlanğıc",
      language: "Azərbaycan",
      lastUpdated: "2024-01-20",
      isNew: false,
      isBestseller: false,
    },
  ],
  categories: [
    {
      id: "1",
      name: "Frontend Development",
      icon: "💻",
      description: "React, Vue, Angular və digər frontend texnologiyaları",
      coursesCount: 45,
      color: "#3B82F6",
      featured: true,
    },
    {
      id: "2",
      name: "Backend Development",
      icon: "⚙️",
      description: "Node.js, Python, Java ilə server tərəfi proqramlaşdırma",
      coursesCount: 32,
      color: "#059669",
      featured: true,
    },
    {
      id: "3",
      name: "UI/UX Design",
      icon: "🎨",
      description: "İstifadəçi interfeysi və təcrübəsi dizaynı",
      coursesCount: 28,
      color: "#DC2626",
      featured: true,
    },
    {
      id: "4",
      name: "Mobile Development",
      icon: "📱",
      description: "React Native, Flutter ilə mobil tətbiq yaratma",
      coursesCount: 24,
      color: "#7C3AED",
      featured: false,
    },
    {
      id: "5",
      name: "DevOps",
      icon: "🔧",
      description: "Docker, Kubernetes, CI/CD və cloud texnologiyaları",
      coursesCount: 18,
      color: "#EA580C",
      featured: false,
    },
    {
      id: "6",
      name: "Data Science",
      icon: "📊",
      description: "Python, R ilə məlumat analizi və maşın öyrənməsi",
      coursesCount: 22,
      color: "#0891B2",
      featured: false,
    },
  ],
  testimonials: [
    {
      id: "1",
      name: "Rəşad Quliyev",
      role: "Frontend Developer",
      company: "Tech Solutions MMC",
      avatar: "/placeholder.svg?height=60&width=60",
      content:
        "Bu platformada öyrəndiklərim sayəsində arzuladığım işə qəbul oldum. Kurslar çox keyfiyyətli və praktikdır.",
      rating: 5,
      date: "2024-01-15",
      courseTaken: "React və Next.js ilə Modern Veb Tətbiqlər",
    },
    {
      id: "2",
      name: "Səbinə Məmmədova",
      role: "UI/UX Designer",
      company: "Creative Studio",
      avatar: "/placeholder.svg?height=60&width=60",
      content: "Dizayn kursları həqiqətən əla idi. İndi öz dizayn studiyam var və müştərilərim çoxdur.",
      rating: 5,
      date: "2024-01-10",
      courseTaken: "UI/UX Dizayn Masterclass",
    },
    {
      id: "3",
      name: "Elvin Həsənov",
      role: "Full Stack Developer",
      company: "Freelancer",
      avatar: "/placeholder.svg?height=60&width=60",
      content: "Həm frontend, həm də backend öyrənə bildim. İndi freelancer olaraq yaxşı qazanc əldə edirəm.",
      rating: 5,
      date: "2024-01-05",
      courseTaken: "Node.js və Express ilə Backend API",
    },
  ],
  features: [
    {
      id: "1",
      title: "Canlı Dərslər",
      description: "Həftədə 3 dəfə canlı dərslər və sual-cavab sessiyaları",
      icon: "🎥",
      color: "#3B82F6",
    },
    {
      id: "2",
      title: "Praktik Layihələr",
      description: "Hər kursda real layihələr üzərində işləyərək təcrübə qazanın",
      icon: "💼",
      color: "#059669",
    },
    {
      id: "3",
      title: "Sertifikat",
      description: "Kursu tamamladıqdan sonra rəsmi sertifikat alın",
      icon: "🏆",
      color: "#DC2626",
    },
    {
      id: "4",
      title: "Ömürlük Giriş",
      description: "Bir dəfə ödəyib ömür boyu kurs materiallarına giriş",
      icon: "♾️",
      color: "#7C3AED",
    },
    {
      id: "5",
      title: "Mobil Tətbiq",
      description: "İstənilən yerdə öyrənin - iOS və Android tətbiqlər",
      icon: "📱",
      color: "#EA580C",
    },
    {
      id: "6",
      title: "Mentorluq",
      description: "Təcrübəli mentorlardan birbaşa dəstək alın",
      icon: "👨‍🏫",
      color: "#0891B2",
    },
  ],
  stats: {
    students: 15000,
    courses: 150,
    instructors: 25,
    satisfaction: 98,
    countries: 12,
    completionRate: 89,
  },
  loading: false,
  error: null,
  newsletter: {
    email: "",
    subscribed: false,
  },
  filters: {
    category: "all",
    priceRange: [0, 300],
    rating: 0,
    level: "all",
  },
}

const landingSlice = createSlice({
  name: "landing",
  initialState,
  reducers: {
    setFeaturedCourses: (state, action: PayloadAction<Course[]>) => {
      state.featuredCourses = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    updateStats: (state, action: PayloadAction<Partial<Stats>>) => {
      state.stats = { ...state.stats, ...action.payload }
    },
    subscribeNewsletter: (state, action: PayloadAction<string>) => {
      state.newsletter.email = action.payload
      state.newsletter.subscribed = true
    },
    setFilters: (state, action: PayloadAction<Partial<typeof initialState.filters>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    resetFilters: (state) => {
      state.filters = initialState.filters
    },
    addTestimonial: (state, action: PayloadAction<Testimonial>) => {
      state.testimonials.unshift(action.payload)
    },
    toggleCategoryFeatured: (state, action: PayloadAction<string>) => {
      const category = state.categories.find(cat => cat.id === action.payload)
      if (category) {
        category.featured = !category.featured
      }
    },
  },
})

export const { 
  setFeaturedCourses, 
  setLoading, 
  setError,
  updateStats,
  subscribeNewsletter,
  setFilters,
  resetFilters,
  addTestimonial,
  toggleCategoryFeatured
} = landingSlice.actions

export default landingSlice.reducer
