"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, DollarSign, TrendingUp } from "lucide-react"

const stats = [
  {
    name: "Total Projects",
    value: "12",
    icon: Building2,
    description: "Active projects",
  },
  {
    name: "Total Users",
    value: "1,234",
    icon: Users,
    description: "Registered users",
  },
  {
    name: "Total Sales",
    value: "$12.5M",
    icon: DollarSign,
    description: "This month",
  },
  {
    name: "Growth",
    value: "+12.5%",
    icon: TrendingUp,
    description: "From last month",
  },
]

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.name}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg mr-4" />
                  <div>
                    <div className="font-medium">Project {i}</div>
                    <div className="text-sm text-muted-foreground">
                      Added 2 days ago
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center">
                  <div className="w-8 h-8 bg-gray-100 rounded-full mr-4" />
                  <div>
                    <div className="font-medium">User {i}</div>
                    <div className="text-sm text-muted-foreground">
                      Viewed Project {i}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 