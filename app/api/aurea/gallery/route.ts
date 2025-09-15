import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

export async function GET() {
  try {
    const galleryDir = path.join(process.cwd(), 'public', 'images', 'aurea', 'gallery')
    const exists = fs.existsSync(galleryDir)
    if (!exists) {
      return NextResponse.json({ images: [] }, { status: 200 })
    }

    const files = fs.readdirSync(galleryDir)
    const allowed = new Set(['.webp', '.jpg', '.jpeg', '.png'])
    const images = files
      .filter((f) => allowed.has(path.extname(f).toLowerCase()))
      .map((f) => `/images/aurea/gallery/${encodeURIComponent(f)}`)

    return NextResponse.json({ images }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ images: [] }, { status: 200 })
  }
}


