"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, CheckCircle2, Save } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const propertyTypes = [
  "Condominium",
  "Mixed Development",
  "Waterfront Condominium",
  "Luxury Condominium",
  "Mass Market Condominium"
]

const statuses = [
  "Launching Soon",
  "Pre-Launch",
  "New Launch",
  "Selling Fast",
  "Last Few Units"
]

const steps = [
  {
    id: 1,
    title: "Basic Information",
    description: "Enter the project's basic details",
  },
  {
    id: 2,
    title: "Project Details",
    description: "Specify project specifications",
  },
  {
    id: 3,
    title: "Description & Features",
    description: "Add project description and features",
  },
  {
    id: 4,
    title: "Unit Types & Floor Plans",
    description: "Define available unit types and floor plans",
  },
  {
    id: 5,
    title: "Location & Facilities",
    description: "Add location details and facilities",
  },
  {
    id: 6,
    title: "Media & Reviews",
    description: "Add media reviews and similar projects",
  },
  {
    id: 7,
    title: "Review & Submit",
    description: "Review all information before submitting",
  },
]

// This would normally come from your database
const initialProjects = [
  {
    id: "1",
    title: "10 Evelyn",
    location: "Newton, District 11",
    price: "From $1.2M",
    priceRange: "$1.2M - $4.2M",
    pricePerSqFt: "$2,100 - $2,400 psf",
    image: "/placeholder.svg?key=gabjg",
    units: "56 Units",
    unitsAvailable: "56 Units",
    propertySizeRange: "484 - 1,636 sq ft",
    developer: "Amara Holdings",
    completion: "2025",
    slug: "10-evelyn",
    description: "Luxury freehold development in the heart of Newton, offering exclusive living spaces with premium finishes.",
    features: ["Freehold", "Luxury finishes", "Prime location", "Full facilities"],
    district: 11,
    tenure: "Freehold",
    propertyType: "Condominium",
    status: "Launching Soon",
    totalUnits: "56 Units",
    totalFloors: "24 Floors",
    siteArea: "12,000 sq ft",
    unitTypes: [
      { type: "1 Bedroom", size: "484 - 527 sq ft", price: "From $1.2M" },
      { type: "2 Bedroom", size: "678 - 753 sq ft", price: "From $1.8M" },
      { type: "3 Bedroom", size: "1,076 - 1,184 sq ft", price: "From $2.8M" },
      { type: "4 Bedroom", size: "1,518 - 1,636 sq ft", price: "From $4.2M" }
    ],
    locationAnalytics: {
      mrt: [
        { name: "Newton MRT", distance: "3 min walk" },
        { name: "Orchard MRT", distance: "10 min walk" }
      ],
      schools: [
        { name: "Anglo-Chinese School (Junior)", distance: "5 min walk" },
        { name: "St. Margaret's Primary School", distance: "8 min walk" }
      ],
      amenities: [
        { name: "United Square", distance: "3 min walk" },
        { name: "Goldhill Plaza", distance: "5 min walk" }
      ],
      parks: [
        { name: "Newton Green", distance: "2 min walk" }
      ]
    }
  },
  // ... other projects
]

interface EditProjectFormProps {
  id: string
}

export function EditProjectForm({ id }: EditProjectFormProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<any>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const totalSteps = steps.length

  useEffect(() => {
    // In a real app, you would fetch the project data from your API
    const project = initialProjects.find(p => p.id === id)
    if (project) {
      setFormData(project)
    } else {
      toast.error("Project not found")
      router.push("/admin/projects")
    }
  }, [id, router])

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}
    
    switch (step) {
      case 1:
        if (!formData.title) newErrors.title = "Project title is required"
        if (!formData.location) newErrors.location = "Location is required"
        if (!formData.price) newErrors.price = "Price is required"
        break
      case 2:
        if (!formData.developer) newErrors.developer = "Developer is required"
        if (!formData.completion) newErrors.completion = "Completion date is required"
        if (!formData.propertyType) newErrors.propertyType = "Property type is required"
        break
      case 3:
        if (!formData.description) newErrors.description = "Description is required"
        if (!formData.features) newErrors.features = "At least one feature is required"
        break
      case 4:
        if (!formData.unitTypes) newErrors.unitTypes = "At least one unit type is required"
        break
      case 5:
        if (!formData.mrt) newErrors.mrt = "At least one MRT station is required"
        if (!formData.schools) newErrors.schools = "At least one school is required"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      const isValid = validateStep(currentStep)
      if (isValid) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleJumpToStep = (step: number) => {
    // Only allow jumping to completed steps or the next step
    if (step <= currentStep + 1) {
      setCurrentStep(step)
    }
  }

  const handleSaveDraft = () => {
    // Save draft to localStorage
    localStorage.setItem(`projectDraft_${id}`, JSON.stringify(formData))
    toast.success("Draft saved successfully")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev: any) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const isValid = validateStep(currentStep)
    if (isValid) {
      // Here you would typically update the project in your database
      toast.success("Project updated successfully")
      router.push("/admin/projects")
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  value={formData.price || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priceRange">Price Range</Label>
                <Input
                  id="priceRange"
                  name="priceRange"
                  value={formData.priceRange || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pricePerSqFt">Price per sq ft</Label>
                <Input
                  id="pricePerSqFt"
                  name="pricePerSqFt"
                  value={formData.pricePerSqFt || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="propertySizeRange">Property Size Range</Label>
                <Input
                  id="propertySizeRange"
                  name="propertySizeRange"
                  value={formData.propertySizeRange || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">Project Images (URLs, one per line)</Label>
              <Textarea
                id="images"
                name="images"
                value={formData.images?.join("\n") || ""}
                onChange={handleInputChange}
                required
                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="developer">Developer</Label>
                <Input
                  id="developer"
                  name="developer"
                  value={formData.developer || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="completion">Completion Date</Label>
                <Input
                  id="completion"
                  name="completion"
                  value={formData.completion || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="district">District</Label>
                <Input
                  id="district"
                  name="district"
                  type="number"
                  value={formData.district || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tenure">Tenure</Label>
                <Input
                  id="tenure"
                  name="tenure"
                  value={formData.tenure || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="propertyType">Property Type</Label>
                <Select name="propertyType" value={formData.propertyType || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select name="status" value={formData.status || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="totalUnits">Total Units</Label>
                <Input
                  id="totalUnits"
                  name="totalUnits"
                  value={formData.totalUnits || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalFloors">Total Floors</Label>
                <Input
                  id="totalFloors"
                  name="totalFloors"
                  value={formData.totalFloors || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="siteArea">Site Area</Label>
              <Input
                id="siteArea"
                name="siteArea"
                value={formData.siteArea || ""}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description || ""}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="features">Features (comma-separated)</Label>
              <Input
                id="features"
                name="features"
                value={formData.features?.join(", ") || ""}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="facilities">Facilities (comma-separated)</Label>
              <Input
                id="facilities"
                name="facilities"
                value={formData.facilities?.join(", ") || ""}
                onChange={handleInputChange}
                required
                placeholder="Arrival Lobby, Pool Lounge, Gym, BBQ Pavilion, Playground, Function Room, Garden"
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="unitTypes">
                Unit Types (one per line, format: Type|Size|Price)
              </Label>
              <Textarea
                id="unitTypes"
                name="unitTypes"
                value={formData.unitTypes?.map(
                  (ut: any) => `${ut.type}|${ut.size}|${ut.price}`
                ).join("\n") || ""}
                onChange={handleInputChange}
                required
                placeholder="1 Bedroom|484 - 527 sq ft|From $1.2M&#10;2 Bedroom|678 - 753 sq ft|From $1.8M"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="floorPlans">
                Floor Plans (one per line, format: Type|Image URL)
              </Label>
              <Textarea
                id="floorPlans"
                name="floorPlans"
                value={formData.floorPlans?.map(
                  (fp: any) => `${fp.type}|${fp.image}`
                ).join("\n") || ""}
                onChange={handleInputChange}
                required
                placeholder="1 Bedroom|https://example.com/floorplan1.jpg&#10;2 Bedroom|https://example.com/floorplan2.jpg"
              />
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mrt">
                MRT Stations (one per line, format: Name|Distance)
              </Label>
              <Textarea
                id="mrt"
                name="mrt"
                value={formData.locationAnalytics?.mrt?.map(
                  (m: any) => `${m.name}|${m.distance}`
                ).join("\n") || ""}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="schools">
                Schools (one per line, format: Name|Distance)
              </Label>
              <Textarea
                id="schools"
                name="schools"
                value={formData.locationAnalytics?.schools?.map(
                  (s: any) => `${s.name}|${s.distance}`
                ).join("\n") || ""}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amenities">
                Amenities (one per line, format: Name|Distance)
              </Label>
              <Textarea
                id="amenities"
                name="amenities"
                value={formData.locationAnalytics?.amenities?.map(
                  (a: any) => `${a.name}|${a.distance}`
                ).join("\n") || ""}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="parks">
                Parks (one per line, format: Name|Distance)
              </Label>
              <Textarea
                id="parks"
                name="parks"
                value={formData.locationAnalytics?.parks?.map(
                  (p: any) => `${p.name}|${p.distance}`
                ).join("\n") || ""}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mediaReviews">
                Media Reviews (one per line, format: Source|Date|Title|Excerpt|Rating)
              </Label>
              <Textarea
                id="mediaReviews"
                name="mediaReviews"
                value={formData.mediaReviews?.map(
                  (mr: any) => `${mr.source}|${mr.date}|${mr.title}|${mr.excerpt}|${mr.rating}`
                ).join("\n") || ""}
                onChange={handleInputChange}
                required
                placeholder="The Edge Property|2024-02-15|10 Evelyn: A Rare Freehold Gem in Newton|The development offers a unique opportunity...|4.5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="similarProjects">
                Similar Projects (one per line, format: Title|Location|Price|PriceRange|Image|Units|UnitsAvailable|PropertySizeRange|Developer|Completion|Slug)
              </Label>
              <Textarea
                id="similarProjects"
                name="similarProjects"
                value={formData.similarProjects?.map(
                  (sp: any) => `${sp.title}|${sp.location}|${sp.price}|${sp.priceRange}|${sp.image}|${sp.units}|${sp.unitsAvailable}|${sp.propertySizeRange}|${sp.developer}|${sp.completion}|${sp.slug}`
                ).join("\n") || ""}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Review Project Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Basic Information</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Title:</span> {formData.title}</p>
                    <p><span className="font-medium">Location:</span> {formData.location}</p>
                    <p><span className="font-medium">Price:</span> {formData.price}</p>
                    <p><span className="font-medium">Price Range:</span> {formData.priceRange}</p>
                    <p><span className="font-medium">Price per sq ft:</span> {formData.pricePerSqFt}</p>
                    <p><span className="font-medium">Property Size Range:</span> {formData.propertySizeRange}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Project Details</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Developer:</span> {formData.developer}</p>
                    <p><span className="font-medium">Completion:</span> {formData.completion}</p>
                    <p><span className="font-medium">District:</span> {formData.district}</p>
                    <p><span className="font-medium">Tenure:</span> {formData.tenure}</p>
                    <p><span className="font-medium">Property Type:</span> {formData.propertyType}</p>
                    <p><span className="font-medium">Status:</span> {formData.status}</p>
                    <p><span className="font-medium">Total Units:</span> {formData.totalUnits}</p>
                    <p><span className="font-medium">Total Floors:</span> {formData.totalFloors}</p>
                    <p><span className="font-medium">Site Area:</span> {formData.siteArea}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Description & Features</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Description:</span> {formData.description}</p>
                  <p><span className="font-medium">Features:</span> {formData.features?.join(", ")}</p>
                  <p><span className="font-medium">Facilities:</span> {formData.facilities?.join(", ")}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Unit Types & Floor Plans</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Unit Types:</span></p>
                  <pre className="whitespace-pre-wrap">{formData.unitTypes}</pre>
                  <p><span className="font-medium">Floor Plans:</span></p>
                  <pre className="whitespace-pre-wrap">{formData.floorPlans}</pre>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Location & Facilities</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">MRT Stations:</span></p>
                  <pre className="whitespace-pre-wrap">{formData.locationAnalytics?.mrt}</pre>
                  <p><span className="font-medium">Schools:</span></p>
                  <pre className="whitespace-pre-wrap">{formData.locationAnalytics?.schools}</pre>
                  <p><span className="font-medium">Amenities:</span></p>
                  <pre className="whitespace-pre-wrap">{formData.locationAnalytics?.amenities}</pre>
                  <p><span className="font-medium">Parks:</span></p>
                  <pre className="whitespace-pre-wrap">{formData.locationAnalytics?.parks}</pre>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Media & Reviews</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Media Reviews:</span></p>
                  <pre className="whitespace-pre-wrap">{formData.mediaReviews}</pre>
                  <p><span className="font-medium">Similar Projects:</span></p>
                  <pre className="whitespace-pre-wrap">{formData.similarProjects}</pre>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Edit Project</h1>
        <Button variant="outline" onClick={() => router.push("/admin/projects")}>
          Cancel
        </Button>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className={cn(
                "flex items-center cursor-pointer",
                step.id < currentStep && "text-green-600",
                step.id === currentStep && "text-blue-600 font-medium",
                step.id > currentStep + 1 && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => handleJumpToStep(step.id)}
            >
              <div className="flex items-center">
                {step.id < currentStep ? (
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                ) : (
                  <div
                    className={cn(
                      "h-5 w-5 rounded-full border-2 mr-2 flex items-center justify-center text-sm",
                      step.id === currentStep
                        ? "border-blue-600 text-blue-600"
                        : "border-gray-300"
                    )}
                  >
                    {step.id}
                  </div>
                )}
                <span className="hidden md:inline">{step.title}</span>
              </div>
              {step.id < totalSteps && (
                <div className="h-0.5 w-8 bg-gray-200 mx-2" />
              )}
            </div>
          ))}
        </div>
        <Progress value={(currentStep / totalSteps) * 100} className="mb-2" />
        <div className="flex justify-between text-sm text-gray-500">
          <span>{steps[currentStep - 1].description}</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {renderStepContent()}

        {/* Error messages */}
        {Object.keys(errors).length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <h4 className="text-sm font-medium text-red-800 mb-2">Please fix the following errors:</h4>
            <ul className="list-disc list-inside text-sm text-red-700">
              {Object.entries(errors).map(([field, message]) => (
                <li key={field}>{message}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-between gap-4">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/projects")}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleSaveDraft}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
          </div>
          <div className="flex gap-2">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevStep}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
            )}
            {currentStep < totalSteps ? (
              <Button
                type="button"
                onClick={handleNextStep}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button type="submit">
                Update Project
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
} 