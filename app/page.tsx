import LoginForm from "@/components/login-form"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">EmployWise</h1>
          <p className="text-muted-foreground mt-2">User Management System</p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}

