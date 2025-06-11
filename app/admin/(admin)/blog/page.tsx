"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Plus, Pencil, Trash2, Search, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

// This would normally come from your database
const initialPosts = [
  {
    id: "1",
    title: "Singapore Property Market Outlook 2024",
    author: "John Doe",
    category: "Market Analysis",
    status: "Published",
    publishDate: "2024-03-15",
    views: 1234,
    slug: "singapore-property-market-outlook-2024",
  },
  {
    id: "2",
    title: "Top 5 Luxury Condos in District 9",
    author: "Jane Smith",
    category: "Property Guide",
    status: "Draft",
    publishDate: null,
    views: 0,
    slug: "top-5-luxury-condos-district-9",
  },
]

export default function AdminBlogPage() {
  const router = useRouter()
  const [posts, setPosts] = useState(initialPosts)
  const [searchQuery, setSearchQuery] = useState("")

  const handleDeletePost = (postId: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter(p => p.id !== postId))
    }
  }

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#f7f8fa] px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Blog Posts</h1>
        <Button onClick={() => router.push("/admin/blog/new")} className="rounded-lg bg-orange-500 text-white hover:bg-orange-600 px-5 py-2 font-semibold shadow">
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search posts..."
            className="pl-10 rounded-lg bg-white shadow-sm border border-gray-200 focus:ring-orange-500 focus:border-orange-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#f7f8fa]">
              <TableHead className="font-semibold text-gray-700">Title</TableHead>
              <TableHead className="font-semibold text-gray-700">Author</TableHead>
              <TableHead className="font-semibold text-gray-700">Category</TableHead>
              <TableHead className="font-semibold text-gray-700">Status</TableHead>
              <TableHead className="font-semibold text-gray-700">Publish Date</TableHead>
              <TableHead className="font-semibold text-gray-700">Views</TableHead>
              <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-400">No posts found.</TableCell>
              </TableRow>
            ) : (
              filteredPosts.map((post) => (
                <TableRow key={post.id} className="hover:bg-orange-50/40 transition">
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>
                    <Badge variant={post.status === "Published" ? "default" : "secondary"} className={`rounded-full px-3 py-1 text-xs font-medium ${post.status === "Published" ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'} border-0`}>
                      {post.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{post.publishDate || "Not published"}</TableCell>
                  <TableCell>{post.views}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => router.push(`/blog/${post.slug}`)}
                      className="hover:bg-orange-100"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => router.push(`/admin/blog/${post.id}/edit`)}
                      className="hover:bg-orange-100"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeletePost(post.id)}
                      className="hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 