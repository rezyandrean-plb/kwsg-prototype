import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    // Use raw SQL query since the table might not be in Prisma schema
    const launches = await prisma.$queryRaw<Array<any>>(
      Prisma.sql`SELECT * FROM new_launch_collection ORDER BY id ASC`
    )

    // Transform the data to match the expected format
    const transformedLaunches = (launches as any[]).map((launch: any) => {
      const priceRaw = launch.price ?? launch.price_display ?? null
      const priceFromRaw = launch.price_from ?? launch.priceFrom ?? null

      let price = ''
      if (priceRaw) {
        price = String(priceRaw)
      } else if (priceFromRaw) {
        const priceFromStr = String(priceFromRaw).trim()
        price = /^from\b/i.test(priceFromStr) ? priceFromStr : `From ${priceFromStr}`
      }

      const urlRaw = launch.url ?? launch.slug ?? null
      let url = ''
      if (urlRaw) {
        const urlStr = String(urlRaw).trim()
        url = urlStr.startsWith('http') || urlStr.startsWith('/') ? urlStr : `/${urlStr}`
      }

      return {
        id: launch.id,
        title: launch.title || launch.name || '',
        summary: launch.summary || launch.description || '',
        image: launch.image || launch.image_url || launch.image_url_banner || '',
        location: launch.location || '',
        district: launch.district || '',
        status: launch.status || 'Launched',
        type: launch.type || launch.property_type || 'Condo',
        bedrooms: launch.bedrooms || '',
        price,
        url,
        launchDate: launch.launch_date || launch.launchDate || null,
      }
    })

    return NextResponse.json({
      data: transformedLaunches,
      success: true,
    })
  } catch (error: any) {
    console.error('Error fetching new launch collection:', error)
    
    // If table doesn't exist, return empty array with a helpful message
    if (error.message?.includes('does not exist') || error.code === '42P01') {
      console.warn('Table "new_launch_collection" does not exist. Returning empty array.')
      return NextResponse.json({
        data: [],
        success: true,
        message: 'Table not found - returning empty array',
      })
    }

    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error.message,
        data: [] 
      },
      { status: 500 }
    )
  }
}

