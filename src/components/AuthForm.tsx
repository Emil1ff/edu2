"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Phone, MapPin, Globe } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import toast from 'react-hot-toast'

// Country and city data
const countriesData = {
  azerbaijan: {
    name: "Azərbaycan",
    code: "+994",
    cities: [
      "Bakı",
      "Gəncə",
      "Sumqayıt",
      "Mingəçevir",
      "Qəbələ",
      "Şəki",
      "Lənkəran",
      "Naxçıvan",
      "Şamaxı",
      "Quba",
      "İsmayıllı",
      "Şuşa",
    ],
  },
  turkey: {
    name: "Türkiye",
    code: "+90",
    cities: ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Adana", "Konya", "Şanlıurfa", "Gaziantep", "Kayseri"],
  },
  usa: {
    name: "ABŞ",
    code: "+1",
    cities: [
      "New York",
      "Los Angeles",
      "Chicago",
      "Houston",
      "Phoenix",
      "Philadelphia",
      "San Antonio",
      "San Diego",
      "Dallas",
      "San Jose",
    ],
  },
  germany: {
    name: "Almaniya",
    code: "+49",
    cities: [
      "Berlin",
      "Hamburg",
      "München",
      "Köln",
      "Frankfurt",
      "Stuttgart",
      "Düsseldorf",
      "Dortmund",
      "Essen",
      "Leipzig",
    ],
  },
  france: {
    name: "Fransa",
    code: "+33",
    cities: [
      "Paris",
      "Marseille",
      "Lyon",
      "Toulouse",
      "Nice",
      "Nantes",
      "Strasbourg",
      "Montpellier",
      "Bordeaux",
      "Lille",
    ],
  },
  uk: {
    name: "Böyük Britaniya",
    code: "+44",
    cities: [
      "London",
      "Birmingham",
      "Manchester",
      "Glasgow",
      "Liverpool",
      "Leeds",
      "Sheffield",
      "Edinburgh",
      "Bristol",
      "Cardiff",
    ],
  },
  russia: {
    name: "Rusiya",
    code: "+7",
    cities: [
      "Moskva",
      "Sankt-Peterburq",
      "Novosibirsk",
      "Yekaterinburq",
      "Kazan",
      "Nizhny Novgorod",
      "Chelyabinsk",
      "Samara",
      "Omsk",
      "Rostov-na-Donu",
    ],
  },
}

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
    city: "",
    phone: "",
    gender: "",
    rememberMe: false,
  })

  const router = useRouter()


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => {
      const newData = { ...prev, [name]: value }

      // Reset city and update phone code when country changes
      if (name === "country") {
        newData.city = ""
        const countryData = countriesData[value as keyof typeof countriesData]
        if (countryData && prev.phone.startsWith("+")) {
          // Replace the country code in phone number
          const phoneWithoutCode = prev.phone.replace(/^\+\d+\s*/, "")
          newData.phone = countryData.code + " " + phoneWithoutCode
        } else if (countryData && !prev.phone.startsWith("+")) {
          newData.phone = countryData.code + " " + prev.phone
        }
      }

      return newData
    })
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    // If country is selected and phone doesn't start with country code, add it
    if (formData.country && !value.startsWith("+")) {
      const countryData = countriesData[formData.country as keyof typeof countriesData]
      if (countryData) {
        value = countryData.code + " " + value
      }
    }

    setFormData((prev) => ({ ...prev, phone: value }))
  }

  const validateForm = () => {
    if (!isLogin && !formData.firstName.trim()) {
      toast({
        title: "Xəta",
        description: "Ad daxil edin",
        variant: "destructive",
      })
      return false
    }

    if (!isLogin && !formData.lastName.trim()) {
      toast({
        title: "Xəta",
        description: "Soyad daxil edin",
        variant: "destructive",
      })
      return false
    }

    if (!formData.email.trim()) {
      toast({
        title: "Xəta",
        description: "E-mail ünvanı daxil edin",
        variant: "destructive",
      })
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Xəta",
        description: "Düzgün e-mail ünvanı daxil edin",
        variant: "destructive",
      })
      return false
    }

    if (!formData.password.trim()) {
      toast({
        title: "Xəta",
        description: "Şifrə daxil edin",
        variant: "destructive",
      })
      return false
    }

    if (formData.password.length < 6) {
      toast({
        title: "Xəta",
        description: "Şifrə ən azı 6 simvol olmalıdır",
        variant: "destructive",
      })
      return false
    }

    // Additional validation for registration
    if (!isLogin) {
      if (!formData.country) {
        toast({
          title: "Xəta",
          description: "Ölkə seçin",
          variant: "destructive",
        })
        return false
      }

      if (!formData.city) {
        toast({
          title: "Xəta",
          description: "Şəhər seçin",
          variant: "destructive",
        })
        return false
      }

      if (!formData.phone.trim()) {
        toast({
          title: "Xəta",
          description: "Telefon nömrəsi daxil edin",
          variant: "destructive",
        })
        return false
      }

      if (!formData.gender) {
        toast({
          title: "Xəta",
          description: "Cins seçin",
          variant: "destructive",
        })
        return false
      }
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)

    try {
      const endpoint = isLogin
        ? "https://edunextup3.onrender.com/auth/login"
        : "https://edunextup3.onrender.com/auth/registration"
      const requestBody = isLogin
        ? {
            email: formData.email,
            password: formData.password,
            remember_me: formData.rememberMe,
          }
        : {
            name: `${formData.firstName} ${formData.lastName}`, // Combined for API
            // Or send separately if your API supports it:
            // firstName: formData.firstName,
            // lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            country: formData.country,
            city: formData.city,
            phone: formData.phone,
            gender: formData.gender,
          }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`)
      }

      if (isLogin) {
        toast({
          title: "Uğurlu giriş!",
          description: "Xoş gəlmisiniz!",
        })
        if (data.token) {
          localStorage.setItem("authToken", data.token)
        }
      } else {
        toast({
          title: "Qeydiyyat tamamlandı!",
          description: "Hesabınız uğurla yaradıldı",
        })
      }

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        country: "",
        city: "",
        phone: "",
        gender: "",
        rememberMe: false,
      })

      router.push("/")
    } catch (error) {
      console.error("Auth error:", error)
      let errorMessage = "Bir xəta baş verdi. Yenidən cəhd edin."

      if (error instanceof Error) {
        if (error.message.includes("email")) {
          errorMessage = "Bu e-mail artıq istifadə olunur"
        } else if (error.message.includes("password")) {
          errorMessage = "Şifrə yanlışdır"
        } else if (error.message.includes("user")) {
          errorMessage = "İstifadəçi tapılmadı"
        } else {
          errorMessage = error.message
        }
      }

      toast({
        title: "Xəta",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider: string) => {
    toast({
      title: "Tezliklə!",
      description: `${provider} ilə giriş tezliklə əlavə ediləcək`,
    })
  }

  const getAvailableCities = () => {
    if (!formData.country) return []
    const countryData = countriesData[formData.country as keyof typeof countriesData]
    return countryData ? countryData.cities : []
  }

  return (
    <div className="min-h-screen flex">
      {/* Sol tərəf - Hero Section - 2/3 of screen */}
      <div className="hidden lg:flex lg:w-2/3 relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero-background.png')",
          }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Gələcəyinizi{" "}
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Təhsillə Qurun
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-lg">
              Minlərlə tələbə artıq bizimlə öyrənir və karyeralarını inkişaf etdirir
            </p>
            <div className="mt-8 grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold">15K+</div>
                <div className="text-white/80">Tələbə</div>
              </div>
              <div>
                <div className="text-3xl font-bold">150+</div>
                <div className="text-white/80">Kurs</div>
              </div>
              <div>
                <div className="text-3xl font-bold">98%</div>
                <div className="text-white/80">Məmnuniyyət</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sağ tərəf - Form - 1/3 of screen */}
      <div className="flex-1 lg:w-1/3 flex items-center justify-center p-8 bg-gradient-to-br from-background to-muted/20">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="bg-background/80 backdrop-blur-md border-primary/20 shadow-2xl">
            <CardHeader className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-primary to-primary/60 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <CardTitle className="text-2xl font-bold">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isLogin ? "login" : "register"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isLogin ? "Xoş Gəlmisiniz" : "Hesab Yaradın"}
                  </motion.span>
                </AnimatePresence>
              </CardTitle>
              <CardDescription>
                {isLogin ? "Hesabınıza daxil olun" : "Yeni hesab yaradın və öyrənməyə başlayın"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <AnimatePresence>
                  {!isLogin && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {/* First Name Field */}
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Ad</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder="Adınızı daxil edin"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="pl-10"
                            required={!isLogin}
                          />
                        </div>
                      </div>

                      {/* Last Name Field */}
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Soyad</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="lastName"
                            name="lastName"
                            type="text"
                            placeholder="Soyadınızı daxil edin"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="pl-10"
                            required={!isLogin}
                          />
                        </div>
                      </div>

                      {/* Country Field */}
                      <div className="space-y-2">
                        <Label htmlFor="country">Ölkə</Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                          <Select
                            value={formData.country}
                            onValueChange={(value) => handleSelectChange("country", value)}
                          >
                            <SelectTrigger className="pl-10">
                              <SelectValue placeholder="Ölkə seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(countriesData).map(([key, country]) => (
                                <SelectItem key={key} value={key}>
                                  {country.name} ({country.code})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* City Field */}
                      <div className="space-y-2">
                        <Label htmlFor="city">Şəhər</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                          <Select
                            value={formData.city}
                            onValueChange={(value) => handleSelectChange("city", value)}
                            disabled={!formData.country}
                          >
                            <SelectTrigger className="pl-10">
                              <SelectValue placeholder={formData.country ? "Şəhər seçin" : "Əvvəl ölkə seçin"} />
                            </SelectTrigger>
                            <SelectContent>
                              {getAvailableCities().map((city) => (
                                <SelectItem key={city} value={city}>
                                  {city}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Phone Field */}
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon nömrəsi</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder={
                              formData.country
                                ? `${countriesData[formData.country as keyof typeof countriesData]?.code || ""} 123456789`
                                : "Telefon nömrəsi"
                            }
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            className="pl-10"
                            required={!isLogin}
                          />
                        </div>
                      </div>

                      {/* Gender Field */}
                      <div className="space-y-2">
                        <Label htmlFor="gender">Cins</Label>
                        <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Cins seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Kişi</SelectItem>
                            <SelectItem value="female">Qadın</SelectItem>
                            <SelectItem value="other">Digər</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="E-mail ünvanınızı daxil edin"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password">Şifrə</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Şifrənizi daxil edin"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {isLogin && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="rememberMe"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, rememberMe: checked as boolean }))
                        }
                      />
                      <Label htmlFor="rememberMe" className="text-sm">
                        Məni xatırla
                      </Label>
                    </div>
                    <Button variant="link" className="p-0 h-auto text-sm">
                      Şifrəni unutdunuz?
                    </Button>
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Gözləyin...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {isLogin ? "Daxil ol" : "Qeydiyyat"}
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </form>

              <div className="space-y-4">
                <div className="relative">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-sm text-muted-foreground">
                    və ya
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleSocialLogin("Google")}
                    className="hover:bg-red-50 hover:border-red-200"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleSocialLogin("Apple")}
                    className="hover:bg-gray-50 hover:border-gray-200"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleSocialLogin("Facebook")}
                    className="hover:bg-blue-50 hover:border-blue-200"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </Button>
                </div>

                <div className="text-center">
                  <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="text-sm">
                    {isLogin ? "Hesabınız yoxdur? Qeydiyyat" : "Artıq hesabınız var? Daxil ol"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
