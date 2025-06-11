"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
  Building2,
  Users,
  FileText,
  Settings,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Calendar,
  ChevronRight,
  BarChart3,
  Eye,
  Clock,
  Plus,
  Search,
  Filter,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

const stats = [
  {
    name: "Total Projects",
    value: "12",
    icon: Building2,
    description: "Active projects",
    href: "/admin/projects",
    trend: "+2.5%",
    trendUp: true,
  },
  {
    name: "Total Users",
    value: "1,234",
    icon: Users,
    description: "Registered users",
    href: "/admin/users",
    trend: "+12.3%",
    trendUp: true,
  },
  {
    name: "Blog Posts",
    value: "45",
    icon: FileText,
    description: "Published articles",
    href: "/admin/blog",
    trend: "+5.2%",
    trendUp: true,
  },
  {
    name: "Total Sales",
    value: "$12.5M",
    icon: DollarSign,
    description: "This month",
    href: "/admin/sales",
    trend: "-1.2%",
    trendUp: false,
  },
]

const quickActions = [
  {
    title: "Add New Project",
    description: "Create a new property listing",
    icon: Building2,
    href: "/admin/projects/new",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Write Blog Post",
    description: "Create new editorial content",
    icon: FileText,
    href: "/admin/blog/new",
    color: "bg-green-500/10 text-green-500",
  },
  {
    title: "Manage Users",
    description: "View and manage user accounts",
    icon: Users,
    href: "/admin/users",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "System Settings",
    description: "Configure system preferences",
    icon: Settings,
    href: "/admin/settings",
    color: "bg-orange-500/10 text-orange-500",
  },
]

const recentActivity = [
  {
    title: "New Project Added",
    description: "10 Evelyn Condominium",
    time: "2 hours ago",
    icon: Building2,
    status: "success",
  },
  {
    title: "Blog Post Published",
    description: "Singapore Property Market Outlook 2024",
    time: "5 hours ago",
    icon: FileText,
    status: "success",
  },
  {
    title: "New User Registration",
    description: "John Doe joined the platform",
    time: "1 day ago",
    icon: Users,
    status: "info",
  },
]

const upcomingEvents = [
  {
    title: "10 Evelyn Launch Event",
    description: "Property launch and preview",
    date: "March 25, 2024",
    time: "2:00 PM",
    type: "launch",
    attendees: 45,
  },
  {
    title: "Property Viewing Day",
    description: "Group viewing for multiple properties",
    date: "March 28, 2024",
    time: "10:00 AM",
    type: "viewing",
    attendees: 28,
  },
]

const topProjects = [
  {
    name: "10 Evelyn",
    location: "Newton, District 11",
    progress: 75,
    views: 1234,
    leads: 45,
  },
  {
    name: "The Landmark",
    location: "Orchard, District 9",
    progress: 60,
    views: 987,
    leads: 32,
  },
  {
    name: "Marina View",
    location: "Marina Bay, District 1",
    progress: 45,
    views: 876,
    leads: 28,
  },
]

export default function AdminPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#f7f8fa] px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-1">Welcome back, Admin</h1>
        <p className="text-muted-foreground">Here's what's happening with your properties today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.name} className="rounded-2xl shadow-md border-0 bg-white">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold mb-1">{stat.name}</CardTitle>
                <CardDescription className="text-xs text-gray-500">{stat.description}</CardDescription>
              </div>
              <div className="rounded-full bg-[#f7f8fa] p-2">
                <stat.icon className="h-6 w-6 text-orange-500" />
              </div>
            </CardHeader>
            <CardContent className="pt-0 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{stat.value}</span>
                <Badge variant={stat.trendUp ? "default" : "destructive"} className={`text-xs px-2 py-1 rounded-full ${stat.trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{stat.trend}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <Card className="rounded-2xl shadow-md border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <Button
                  key={action.title}
                  onClick={() => router.push(action.href)}
                  className={`w-full flex flex-col items-center justify-center gap-2 py-6 rounded-xl font-medium text-base shadow-sm transition hover:scale-[1.03] ${action.color || 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20'}`}
                  variant="ghost"
                >
                  <action.icon className="h-7 w-7 mb-1" />
                  {action.title}
                  <span className="text-xs font-normal text-gray-500 mt-1">{action.description}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Upcoming Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="rounded-2xl shadow-md border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-gray-100">
              {recentActivity.map((activity, idx) => (
                <li key={idx} className="py-3 flex items-start gap-3">
                  <span className="rounded-lg bg-[#f7f8fa] p-2"><activity.icon className="h-5 w-5 text-orange-500" /></span>
                  <div>
                    <div className="font-medium text-sm">{activity.title}</div>
                    <div className="text-xs text-gray-500">{activity.description}</div>
                  </div>
                  <span className="ml-auto text-xs text-gray-400">{activity.time}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        {/* Upcoming Events */}
        <Card className="rounded-2xl shadow-md border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-gray-100">
              {upcomingEvents.map((event, idx) => (
                <li key={idx} className="py-3 flex items-start gap-3">
                  <span className="rounded-lg bg-[#f7f8fa] p-2"><Calendar className="h-5 w-5 text-orange-500" /></span>
                  <div>
                    <div className="font-medium text-sm">{event.title}</div>
                    <div className="text-xs text-gray-500">{event.description}</div>
                    <div className="text-xs text-gray-400 mt-1">{event.date} • {event.time}</div>
                  </div>
                  <Badge className="ml-auto bg-orange-100 text-orange-700 rounded-full px-2 py-1 text-xs font-medium">{event.attendees} Attending</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 