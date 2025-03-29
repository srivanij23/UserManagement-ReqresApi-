"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Edit, Trash2, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import EditUserDialog from "@/components/edit-user-dialog"

interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const { toast } = useToast()

  const fetchUsers = async (page: number) => {
    setLoading(true)
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`)
      const data = await response.json()
      setUsers(data.data)
      setFilteredUsers(data.data)
      setTotalPages(data.total_pages)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch users",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers(currentPage)
  }, [currentPage])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users)
    } else {
      const filtered = users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredUsers(filtered)
    }
  }, [searchTerm, users])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`https://reqres.in/api/users/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        // Remove user from the list (client-side)
        setUsers(users.filter((user) => user.id !== id))
        setFilteredUsers(filteredUsers.filter((user) => user.id !== id))

        toast({
          title: "Success",
          description: "User deleted successfully",
        })
      } else {
        throw new Error("Failed to delete user")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete user",
      })
    }
  }

  const handleUpdateUser = (updatedUser: User) => {
    const updatedUsers = users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    setUsers(updatedUsers)
    setFilteredUsers(
      updatedUsers.filter(
        (user) =>
          searchTerm.trim() === "" ||
          user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    )
    setEditingUser(null)
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search users..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.map((user) => (
              <Card key={user.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden">
                      <Image
                        src={user.avatar || "/placeholder.svg"}
                        alt={`${user.first_name} ${user.last_name}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{`${user.first_name} ${user.last_name}`}</h3>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" onClick={() => handleEdit(user)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(user.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No users found</p>
            </div>
          )}

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink onClick={() => handlePageChange(i + 1)} isActive={currentPage === i + 1}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}

      {editingUser && (
        <EditUserDialog user={editingUser} onClose={() => setEditingUser(null)} onUpdate={handleUpdateUser} />
      )}
    </div>
  )
}

