import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    console.log('Testing database connection...')
    
    // Test basic connection
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log('Raw query result:', result)
    
    // Test if unit_pricing table exists
    const tableExists = await prisma.$queryRaw`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'unit_pricing'
      ) as exists
    `
    console.log('Table exists check:', tableExists)
    
    // Test simple count query
    const count = await prisma.project.count()
    console.log('Project count:', count)
    
    // Test unit_pricing access
    const unitPricingCount = await prisma.unit_pricing.count()
    console.log('Unit pricing count:', unitPricingCount)
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      data: {
        rawQuery: result,
        tableExists,
        projectCount: count,
        unitPricingCount
      }
    })
  } catch (error: any) {
    console.error('Database connection test failed:', error)
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 })
  }
}







