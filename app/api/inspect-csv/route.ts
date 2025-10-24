import { NextRequest, NextResponse } from 'next/server'
import { S3Service } from '@/lib/s3-service'
import csv from 'csv-parser'
import { Readable } from 'stream'

const BUCKET = 'kwsingapore'
const BASE = 'new_launch_data'

const KEYS = {
  projects: `${BASE}/projects.csv`,
  units: `${BASE}/units.csv`,
  floor_plans: `${BASE}/floor_plans.csv`,
  site_plans: `${BASE}/site_plans.csv`,
}

type InspectResult = {
  key: string
  rowCount: number
  headers: string[]
  sample: Record<string, string>[]
}

async function parseHeadersAndSample(csvContent: string, sampleSize = 5): Promise<InspectResult> {
  return new Promise((resolve, reject) => {
    const results: Record<string, string>[] = []
    const stream = Readable.from([csvContent])
    let headers: string[] = []
    let rowCount = 0

    stream
      .pipe(csv())
      .on('headers', (h) => {
        headers = h
      })
      .on('data', (data) => {
        rowCount++
        if (results.length < sampleSize) results.push(data)
      })
      .on('end', () => {
        resolve({ key: '', rowCount, headers, sample: results })
      })
      .on('error', (err) => reject(err))
  })
}

function inferMapping(headers: string[], candidates: Record<string, string[]>): Record<string, string | null> {
  const headerSet = new Set(headers.map((h) => h.toLowerCase()))
  const mapping: Record<string, string | null> = {}
  for (const [dbField, aliases] of Object.entries(candidates)) {
    const found = aliases.find((a) => headerSet.has(a.toLowerCase()))
    mapping[dbField] = found ?? null
  }
  return mapping
}

export async function GET(_req: NextRequest) {
  try {
    const s3 = new S3Service(BUCKET)

    const [projectsCsv, unitsCsv, floorPlansCsv, sitePlansCsv] = await Promise.all([
      s3.downloadCSV(KEYS.projects),
      s3.downloadCSV(KEYS.units),
      s3.downloadCSV(KEYS.floor_plans),
      s3.downloadCSV(KEYS.site_plans),
    ])

    const [projInfo, unitInfo, fpInfo, spInfo] = await Promise.all([
      parseHeadersAndSample(projectsCsv),
      parseHeadersAndSample(unitsCsv),
      parseHeadersAndSample(floorPlansCsv),
      parseHeadersAndSample(sitePlansCsv),
    ])

    projInfo.key = KEYS.projects
    unitInfo.key = KEYS.units
    fpInfo.key = KEYS.floor_plans
    spInfo.key = KEYS.site_plans

    // Suggested mappings to Prisma models
    const projectMapping = inferMapping(projInfo.headers, {
      id: ['id'],
      name: ['name', 'project_name', 'title'],
      project_name: ['project_name', 'name'],
      slug: ['slug'],
      title: ['title', 'name'],
      location: ['location', 'district'],
      address: ['address'],
      type: ['type', 'property_type'],
      price: ['price', 'display_price'],
      price_from: ['price_from', 'lowerPrice'],
      price_per_sqft: ['price_per_sqft', 'pricePerSqFt'],
      bedrooms: ['bedrooms'],
      bathrooms: ['bathrooms'],
      size: ['size'],
      units: ['units', 'total_units'],
      developer: ['developer'],
      completion: ['completion'],
      description: ['description'],
      district: ['district'],
      tenure: ['tenure'],
      property_type: ['property_type', 'type'],
      status: ['status'],
      total_units: ['total_units'],
      total_floors: ['total_floors'],
      site_area: ['site_area'],
      image_url_banner: ['image_url_banner', 'image_banner_url'],
      latitude: ['latitude', 'lat'],
      longitude: ['longitude', 'lng', 'long'],
    })

    const unitMapping = inferMapping(unitInfo.headers, {
      id: ['id'],
      project_id: ['project_id'],
      project_name: ['project_name'],
      unit_type: ['unit_type', 'type'],
      bedrooms: ['bedrooms', 'bedroom'],
      bathrooms: ['bathrooms', 'bathroom'],
      size_sqft: ['size_sqft', 'size'],
      price_from: ['price_from', 'min_price', 'price'],
      price_to: ['price_to', 'max_price', 'price'],
      price_per_sqft: ['price_per_sqft', 'psf'],
      currency: ['currency'],
      payment_terms: ['payment_terms'],
      discount_info: ['discount_info'],
      is_available: ['is_available', 'available'],
      available_unit: ['available_unit'],
      total_unit: ['total_unit'],
    })

    const floorPlanMapping = inferMapping(fpInfo.headers, {
      id: ['id'],
      project_id: ['project_id'],
      project_name: ['project_name'],
      floor_plan_id: ['floor_plan_id'],
      floor_plan_type: ['floor_plan_type', 'unit_type'],
      floor_plan_name: ['floor_plan_name'],
      bedrooms: ['bedrooms'],
      bathrooms: ['bathrooms'],
      size_sqft: ['size_sqft', 'size'],
      price: ['price'],
      img: ['img', 'image_url'],
      floor_plan_image: ['floor_plan_image', 'image_url'],
      unit_type: ['unit_type', 'floor_plan_type'],
      description: ['description'],
    })

    const sitePlanMapping = inferMapping(spInfo.headers, {
      id: ['id'],
      project_id: ['project_id'],
      project_name: ['project_name'],
      site_plan_id: ['site_plan_id'],
      site_plan_name: ['site_plan_name'],
      image_url: ['image_url'],
      description: ['description'],
      is_primary: ['is_primary'],
      layout_info: ['layout_info'],
    })

    return NextResponse.json({
      files: [projInfo, unitInfo, fpInfo, spInfo],
      suggestedMappings: {
        project: projectMapping,
        unit_pricing: unitMapping,
        floor_plans: floorPlanMapping,
        site_plans: sitePlanMapping,
      },
    })
  } catch (err: any) {
    console.error('CSV inspect error:', err)
    return NextResponse.json({ error: 'Failed to inspect CSVs' }, { status: 500 })
  }
}







