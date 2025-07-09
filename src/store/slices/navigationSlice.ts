"use client"


import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface SubLesson {
  id: string
  title: string
  duration: string
  isCompleted: boolean
  isLocked: boolean
}

interface Lesson {
  id: string
  title: string
  description: string
  duration: string
  difficulty: "Başlanğıc" | "Orta" | "İrəliləmiş"
  category: string
  instructor: string
  subLessons: SubLesson[]
  isPopular?: boolean
  isNew?: boolean
}

interface NavigationState {
  lessons: Lesson[]
  isOpen: boolean
  loading: boolean
}

const generateSubLessons = (lessonId: string, lessonTitle: string): SubLesson[] => {
  const subLessonTemplates = [
    "Giriş və Əsaslar",
    "Praktik Nümunələr",
    "İrəliləmiş Texnikalar",
    "Real Layihə",
    "Test və Debug",
    "Yekun və Təkrar",
  ]

  return subLessonTemplates.map((template, index) => ({
    id: `${lessonId}-sub-${index + 1}`,
    title: `${lessonTitle} - ${template}`,
    duration: `${Math.floor(Math.random() * 30) + 15} dəq`,
    isCompleted: Math.random() > 0.7,
    isLocked: index > 2 && Math.random() > 0.5,
  }))
}

const initialState: NavigationState = {
  lessons: [
    {
      id: "1",
      title: "HTML5 və Semantik Markup",
      description: "Modern HTML5 elementləri və semantik struktur",
      duration: "3 saat",
      difficulty: "Başlanğıc",
      category: "Frontend",
      instructor: "Əli Məmmədov",
      subLessons: generateSubLessons("1", "HTML5"),
      isNew: true,
    },
    {
      id: "2",
      title: "CSS3 və Flexbox Layout",
      description: "CSS3 xüsusiyyətləri və müasir layout texnikaları",
      duration: "4 saat",
      difficulty: "Başlanğıc",
      category: "Frontend",
      instructor: "Leyla Həsənova",
      subLessons: generateSubLessons("2", "CSS3"),
      isPopular: true,
    },
    {
      id: "3",
      title: "JavaScript Əsasları",
      description: "JavaScript dili və DOM manipulyasiyası",
      duration: "6 saat",
      difficulty: "Başlanğıc",
      category: "Frontend",
      instructor: "Rəşad Quliyev",
      subLessons: generateSubLessons("3", "JavaScript"),
    },
    {
      id: "4",
      title: "React Komponentləri",
      description: "React ilə komponent əsaslı inkişaf",
      duration: "8 saat",
      difficulty: "Orta",
      category: "Frontend",
      instructor: "Nigar Əliyeva",
      subLessons: generateSubLessons("4", "React"),
      isPopular: true,
    },
    {
      id: "5",
      title: "Next.js Full Stack",
      description: "Next.js ilə tam stack tətbiq yaratma",
      duration: "12 saat",
      difficulty: "İrəliləmiş",
      category: "Frontend",
      instructor: "Elvin Həsənov",
      subLessons: generateSubLessons("5", "Next.js"),
      isNew: true,
    },
    {
      id: "6",
      title: "Node.js Backend API",
      description: "Node.js ilə RESTful API yaratma",
      duration: "10 saat",
      difficulty: "Orta",
      category: "Backend",
      instructor: "Səbinə Məmmədova",
      subLessons: generateSubLessons("6", "Node.js"),
    },
    {
      id: "7",
      title: "Express.js Framework",
      description: "Express.js ilə veb server yaratma",
      duration: "7 saat",
      difficulty: "Orta",
      category: "Backend",
      instructor: "Tural Əliyev",
      subLessons: generateSubLessons("7", "Express.js"),
    },
    {
      id: "8",
      title: "MongoDB və Mongoose",
      description: "NoSQL verilənlər bazası idarəetməsi",
      duration: "6 saat",
      difficulty: "Orta",
      category: "Backend",
      instructor: "Aynur Həsənova",
      subLessons: generateSubLessons("8", "MongoDB"),
      isPopular: true,
    },
    {
      id: "9",
      title: "PostgreSQL və SQL",
      description: "Relational verilənlər bazası və SQL sorğuları",
      duration: "8 saat",
      difficulty: "Orta",
      category: "Backend",
      instructor: "Farid Quliyev",
      subLessons: generateSubLessons("9", "PostgreSQL"),
    },
    {
      id: "10",
      title: "Python Django Framework",
      description: "Django ilə veb tətbiq yaratma",
      duration: "15 saat",
      difficulty: "İrəliləmiş",
      category: "Backend",
      instructor: "Günel Məmmədova",
      subLessons: generateSubLessons("10", "Django"),
      isNew: true,
    },
    {
      id: "11",
      title: "UI/UX Dizayn Prinsipləri",
      description: "İstifadəçi interfeysi dizayn əsasları",
      duration: "5 saat",
      difficulty: "Başlanğıc",
      category: "Design",
      instructor: "Arzu Əliyeva",
      subLessons: generateSubLessons("11", "UI/UX"),
    },
    {
      id: "12",
      title: "Figma Masterclass",
      description: "Figma ilə professional dizayn yaratma",
      duration: "6 saat",
      difficulty: "Orta",
      category: "Design",
      instructor: "Kamran Həsənov",
      subLessons: generateSubLessons("12", "Figma"),
      isPopular: true,
    },
    {
      id: "13",
      title: "Adobe XD Prototyping",
      description: "Adobe XD ilə prototip yaratma",
      duration: "4 saat",
      difficulty: "Orta",
      category: "Design",
      instructor: "Sevda Quliyeva",
      subLessons: generateSubLessons("13", "Adobe XD"),
    },
    {
      id: "14",
      title: "React Native Mobile",
      description: "React Native ilə mobil tətbiq yaratma",
      duration: "14 saat",
      difficulty: "İrəliləmiş",
      category: "Mobile",
      instructor: "Orxan Məmmədov",
      subLessons: generateSubLessons("14", "React Native"),
      isNew: true,
    },
    {
      id: "15",
      title: "Flutter Development",
      description: "Flutter ilə cross-platform tətbiqlər",
      duration: "16 saat",
      difficulty: "İrəliləmiş",
      category: "Mobile",
      instructor: "Leyla Əliyeva",
      subLessons: generateSubLessons("15", "Flutter"),
    },
    {
      id: "16",
      title: "Docker Containerization",
      description: "Docker ilə tətbiq konteynerləşdirməsi",
      duration: "5 saat",
      difficulty: "Orta",
      category: "DevOps",
      instructor: "Vüsal Həsənov",
      subLessons: generateSubLessons("16", "Docker"),
      isPopular: true,
    },
    {
      id: "17",
      title: "Kubernetes Orchestration",
      description: "Kubernetes ilə konteyner orkestrasiyası",
      duration: "8 saat",
      difficulty: "İrəliləmiş",
      category: "DevOps",
      instructor: "Rəvan Quliyev",
      subLessons: generateSubLessons("17", "Kubernetes"),
    },
    {
      id: "18",
      title: "AWS Cloud Services",
      description: "Amazon Web Services ilə cloud həlləri",
      duration: "12 saat",
      difficulty: "İrəliləmiş",
      category: "DevOps",
      instructor: "Aida Məmmədova",
      subLessons: generateSubLessons("18", "AWS"),
      isNew: true,
    },
    {
      id: "19",
      title: "Python Data Analysis",
      description: "Python ilə məlumat analizi və vizuallaşdırma",
      duration: "10 saat",
      difficulty: "Orta",
      category: "Data Science",
      instructor: "Elnur Əliyev",
      subLessons: generateSubLessons("19", "Python Data"),
    },
    {
      id: "20",
      title: "Machine Learning Basics",
      description: "Maşın öyrənməsi alqoritmləri və tətbiqi",
      duration: "18 saat",
      difficulty: "İrəliləmiş",
      category: "Data Science",
      instructor: "Könül Həsənova",
      subLessons: generateSubLessons("20", "ML"),
      isPopular: true,
      isNew: true,
    },
  ],
  isOpen: false,
  loading: false,
}

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen
    },
    closeSidebar: (state) => {
      state.isOpen = false
    },
    openSidebar: (state) => {
      state.isOpen = true
    },
    toggleSubLesson: (state, action: PayloadAction<{ lessonId: string; subLessonId: string }>) => {
      const { lessonId, subLessonId } = action.payload
      const lesson = state.lessons.find((l) => l.id === lessonId)
      if (lesson) {
        const subLesson = lesson.subLessons.find((sl) => sl.id === subLessonId)
        if (subLesson && !subLesson.isLocked) {
          subLesson.isCompleted = !subLesson.isCompleted
        }
      }
    },
  },
})

export const { toggleSidebar, closeSidebar, openSidebar, toggleSubLesson } = navigationSlice.actions
export default navigationSlice.reducer
