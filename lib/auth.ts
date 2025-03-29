"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function useAuth() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/")
    }
  }, [router])

  const logout = () => {
    localStorage.removeItem("token")
    router.push("/")
  }

  return { logout }
}

