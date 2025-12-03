"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Building2, Calculator, TrendingUp, BarChart3, MapPin, DollarSign, Smartphone, Home, ChevronRight, Play } from "lucide-react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useUser } from '@clerk/nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import AuthDialog from "@/components/auth-dialog"

// Tool data based on the image
const tools = [
  {
    id: 1,
    title: "KW PropSage",
    description: "Handle the entire transaction process smoothly from start to finish, paperwork-free.",
    icon: Building2,
    category: "Business Tools",
    url: "app.propsage.com",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-propsage.webp"
  },
  {
    id: 2,
    title: "KW Command",
    description: "Manage your real estate business easily from anywhere with one central hub.",
    icon: Calculator,
    category: "Business Tools",
    url: "agent.kw.com",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-command.webp"
  },
  {
    id: 101,
    title: "KW Contacts",
    description: "Organize leads and contacts intelligently, never forget important follow-ups again.",
    icon: Building2,
    category: "Business Tools",
    url: "https://console.command.kw.com/command/contacts",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-contacts.webp"
  },
  {
    id: 102,
    title: "KW Tasks",
    description: "Track every client’s to-do list carefully, ensuring no task gets missed.",
    icon: Calculator,
    category: "Business Tools",
    url: "https://console.command.kw.com/command/task-manager",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-tasks.webp"
  },
  {
    id: 103,
    title: "KW Campaigns",
    description: "Generate steady social media leads without needing complex ad platform expertise.",
    icon: TrendingUp,
    category: "Business Tools",
    url: "https://campaigns.kw.com/",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-campaigns.webp"
  },
  {
    id: 104,
    title: "KW Opportunities",
    description: "Track deals from new leads to closings, ensuring payments never missed.",
    icon: BarChart3,
    category: "Business Tools",
    url: "https://console.command.kw.com/command/opportunities",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-opportunities.webp"
  },
  {
    id: 105,
    title: "KW SmartPlans",
    description: "Automate client follow-ups and marketing campaigns, saving time while staying connected.",
    icon: Smartphone,
    category: "Business Tools",
    url: "https://console.command.kw.com/command/smart-plans",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-smartplans.webp"
  },
  {
    id: 106,
    title: "KW Listings",
    description: "Showcase properties beautifully with professional listing pages that attract serious buyers.",
    icon: Home,
    category: "Business Tools",
    url: "https://console.command.kw.com/command/listings",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-listings.webp"
  },
  {
    id: 107,
    title: "KW Website",
    description: "Create branded, user-friendly websites in minutes to capture online inquiries.",
    icon: MapPin,
    category: "Business Tools",
    url: "https://console.command.kw.com/command/websites",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-website.webp"
  },
  {
    id: 3,
    title: "KW University",
    description: "Access world-class real estate training and mentorship to sharpen skills continuously.",
    icon: TrendingUp,
    category: "Learnings",
    subtitle: "Business Mastery & Growth",
    url: "https://agent.kw.com/connect/learning/categories",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-university.webp"
  },
  // External Tools items
  {
    id: 12,
    title: "Real Insights",
    description: "Get instant, data-driven insights on property value, market trends, and history.",
    icon: BarChart3,
    category: "External Tools",
    url: "https://rea-insight.com/",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/rea-insights.webp"
  },
  {
    id: 13,
    title: "EdgeProp Inspector",
    description: "Access URA planning, school details, and transaction data quickly, all in one place.",
    icon: TrendingUp,
    category: "External Tools",
    url: "https://www.edgeprop.sg/analytic/inspector",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/edgeprop-pro.webp"
  },
  {
    id: 108,
    title: "KW Canva",
    description: "Design stunning brochures, posts, and materials easily, no design experience required.",
    icon: Building2,
    category: "Business Tools",
    url: "canva.kw.com",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-canva.webp"
  },
  {
    id: 118,
    title: "Squarefoot",
    description: "Easily check recent transaction prices of HDBs, condos, and landed properties to ensure your clients get the best deal.",
    icon: Home,
    category: "External Tools",
    url: "squarefoot.com.sg/component/users/login",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/squarefoot.webp"
  },
  {
    id: 120,
    title: "SpiderGate DNC Subscription",
    description: "Verify phone numbers instantly against the Do Not Call registry database.",
    icon: Smartphone,
    category: "External Tools",
    url: "https://drive.google.com/file/d/1GcNpqifBzKSurSmz7qkpIMjrjaVOD1Pm/view",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/spidergate.webp"
  },
  // Deal Submission items
  {
    id: 52,
    title: "(PDF Guide) Step-by-Step Deal Submission on PropSage",
    description: "Detailed guide for submitting deals through PropSage for compliance and processing.",
    icon: Play,
    category: "Deal Submission",
    url: "https://drive.google.com/file/d/16cchZAfFgjikLjhC8xciqEw9IHdhI_qu/view?usp=drive_link",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/deal-submission.webp"
  },
  {
    id: 53,
    title: "Video: Step-by-Step Deal Submission on PropSage",
    description: "Mandatory video reference for accurate and compliant property transaction submissions.",
    icon: Play,
    category: "Deal Submission",
    url: "https://www.youtube.com/watch?v=lyJefj0-dx0",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/deal-submission.webp"
  },
  {
    id: 54,
    title: "Deal Submission Checklist",
    description: "A complete list to ensure full compliance and prompt commission approval for every deal.",
    icon: Play,
    category: "Deal Submission",
    url: "https://drive.google.com/file/d/1oXBR76AOK029S6O0KBZm4SL6qzjT64HR/view?pli=1",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/deal-submission.webp"
  },
  {
    id: 55,
    title: "How to generate AML Report",
    description: "Instructional video on the process for generating the Anti-Money Laundering report.",
    icon: Play,
    category: "Deal Submission",
    url: "https://youtube.com/watch?si=shT8BQkgRwG-gM6U&v=c_kiw6IgAIA&feature=youtu.be",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/report.webp"
  },
  {
    id: 56,
    title: "Transaction Forms",
    description: "Access the necessary official forms required for all property transactions.",
    icon: Play,
    category: "Deal Submission",
    url: "https://drive.google.com/drive/folders/1aECiyfAUfuF2eTYmLNb7w1MscAGX2kJs",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/transaction-form.webp"
  },
  {
    id: 57,
    title: "Access PropSage here",
    description: "Handle the entire transaction process smoothly from start to finish, paperwork-free.",
    icon: Building2,
    category: "Deal Submission",
    url: "https://app.propsage.com",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-propsage.webp"
  },

  // Branding & Marketing items
  {
    id: 58,
    title: "KW Singapore Official Logo",
    description: "Access the official, high-quality KW Singapore logo for branding and marketing.",
    icon: Building2,
    category: "Branding & Marketing",
    url: "https://drive.google.com/drive/folders/1n4BXrZiVPYE0ha9mkglITLGvNYaE6IvM?usp=sharing",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw.webp"
  },
  {
    id: 59,
    title: "KW x Canva",
    description: "Design stunning brochures, posts, and materials easily, no design experience required.",
    icon: TrendingUp,
    category: "Branding & Marketing",
    url: "http://canva.kw.com/",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-canva.webp"
  },

  // Getting Started items
  {
    id: 60,
    title: "KW Singapore Policies & Standard Operating Procedure",
    description: "The official guide governing every administrative, operational, and compliance function within KW Singapore.",
    icon: Building2,
    category: "Getting Started",
    subtitle: "Operations",
    url: "https://drive.google.com/drive/folders/1MY4obJ1dZy1b27OqUc9Tt-IeqgPRQg5B",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/quick-start-guide.webp"
  },
  {
    id: 61,
    title: "KW Command & KW Email Onboarding Guide",
    description: "Step-by-step instructions for your first successful login to KW Command and KW Email.",
    icon: Play,
    category: "Getting Started",
    url: "https://drive.google.com/file/d/1-ExsOVDNSZkB-HDR9849piT6ba_qKHg1/view?usp=sharing",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/quick-start-guide.webp"
  },
  {
    id: 62,
    title: "KW Email Tips",
    description: "Consolidate multiple inboxes instantly to eliminate email overload and save time.",
    icon: Play,
    category: "Getting Started",
    url: "https://support.google.com/mail/answer/10957?hl=en",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-email.webp"
  },
  {
    id: 63,
    title: "DocuSign Quick Start Guide",
    description: "Simple, step-by-step instructions for 1st-time users to master DocuSign e-signatures.",
    icon: Play,
    category: "Getting Started",
    url: "https://drive.google.com/file/d/1FyCrr539PFp0O5-0JZS13PQFjOWCUG8Z/view?usp=drive_link",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/quick-start-guide.webp"
  },
  {
    id: 64,
    title: "PropSage Quick Start Guide",
    description: "Instantly set up your account and learn the essential steps to submit a deal or download your required AML report.",
    icon: Play,
    category: "Getting Started",
    url: "https://drive.google.com/file/d/1NmYKDXMNT93SjxvqyKSME-kIYiqPVaYg/view?usp=drive_link",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/quick-start-guide.webp"
  },
  {
    id: 65,
    title: "KW x Canva Q&A",
    description: "Answers to frequently asked questions about integrating KW and Canva for marketing.",
    icon: Play,
    category: "Getting Started",
    url: "https://answers.kw.com/hc/en-us/articles/43692313552787-KW-Canva-FAQs",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-canva.webp"
  },
  {
    id: 66,
    title: "Access KW x Canva",
    description: "A direct guide to getting and setting up your KW-branded Canva account.",
    icon: Play,
    category: "Getting Started",
    url: "https://answers.kw.com/hc/en-us/articles/44040408220819-Get-Started-with-Your-KW-Canva-Account",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-canva.webp"
  },
  {
    id: 67,
    title: "KW x Canva Team Sharing Guide",
    description: "Instructions for team leaders on how to efficiently share Canva access with team members.",
    icon: Play,
    category: "Getting Started",
    url: "https://answers.kw.com/hc/en-us/articles/44040758619027-Collaborate-and-Share-Canva-Folders-Designs",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-canva.webp"
  },
  
  // Compass Tools items - Sales Proceed
  {
    id: 14,
    title: "Sales Proceed",
    description: "Instantly calculate net cash proceeds after property sale and costs.",
    icon: Calculator,
    category: "Compass Tools",
    subtitle: "Sales Proceed",
    url: "https://proptech.kwsingapore.com/calculator/sales-proceed",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/sales-proceed.webp"
  },
  {
    id: 15,
    title: "Timeline Planning",
    description: "Plan key property transaction milestones with clear, date-based scheduling tool.",
    icon: TrendingUp,
    category: "Compass Tools",
    subtitle: "Sales Proceed",
    url: "https://proptech.kwsingapore.com/calculator/timeline-planning",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/timeline-planning.webp"
  },
  {
    id: 16,
    title: "Decoupling",
    description: "Assess cost and benefits of transferring ownership for future property purchase.",
    icon: Building2,
    category: "Compass Tools",
    subtitle: "Sales Proceed",
    url: "https://proptech.kwsingapore.com/calculator/decoupling",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/decoupling.webp"
  },
  {
    id: 17,
    title: "Equity Term Loan",
    description: "Estimate how much equity you can unlock through refinancing options.",
    icon: DollarSign,
    category: "Compass Tools",
    subtitle: "Sales Proceed",
    url: "https://proptech.kwsingapore.com/calculator/equity-term-loan",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/equity-term-loan.webp"
  },
  // Compass Tools items - Buyer Affordability
  {
    id: 18,
    title: "TDSR/MSR",
    description: "Evaluate buyer affordability using government-mandated loan ratio and income guidelines.",
    icon: Calculator,
    category: "Compass Tools",
    subtitle: "Buyer Affordability",
    url: "https://proptech.kwsingapore.com/calculator/tdsr-msr",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/tdsr-msr.webp"
  },
  {
    id: 19,
    title: "New Project Purchase (BUC)",
    description: "Project progressive payment schedule for building-under-construction properties before completion.",
    icon: Home,
    category: "Compass Tools",
    subtitle: "Buyer Affordability",
    url: "https://proptech.kwsingapore.com/calculator/buc",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/buc-calculator.webp"
  },
  {
    id: 20,
    title: "New EC Purchase (BUC)",
    description: "Calculate EC affordability with income ceiling, grant eligibility, and staged payments.",
    icon: Home,
    category: "Compass Tools",
    subtitle: "Buyer Affordability",
    url: "https://proptech.kwsingapore.com/calculator/ec",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/buc-calculator.webp"
  },
  {
    id: 21,
    title: "Resale Purchase",
    description: "Estimate upfront costs, loan structure, and timeline for resale property purchase.",
    icon: Building2,
    category: "Compass Tools",
    subtitle: "Buyer Affordability",
    url: "https://proptech.kwsingapore.com/calculator/timeline-payment"
  },
  {
    id: 22,
    title: "Mortgage Loan",
    description: "Compute monthly repayments and interest impact based on loan tenure and rates.",
    icon: Calculator,
    category: "Compass Tools",
    subtitle: "Buyer Affordability",
    url: "https://proptech.kwsingapore.com/calculator/mortgage-loan",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/mortgage-loan.webp"
  },
  {
    id: 23,
    title: "Pledge/Unpledge",
    description: "Assess affordability impact when pledging or unpledging funds for property loan.",
    icon: DollarSign,
    category: "Compass Tools",
    subtitle: "Buyer Affordability",
    url: "https://proptech.kwsingapore.com/calculator/pledge-unpledge",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/pledge-unpledge.webp"
  },
  // Compass Tools items - Stamp Duty
  {
    id: 24,
    title: "ABSD/BSD",
    description: "Calculate Buyer's and Additional Buyer's Stamp Duties for property transactions.",
    icon: Calculator,
    category: "Compass Tools",
    subtitle: "Stamp Duty",
    url: "https://proptech.kwsingapore.com/calculator/absd-bsd",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/absd-bsd.webp"
  },
  {
    id: 25,
    title: "SSD",
    description: "Determine payable Seller's Stamp Duty based on property holding duration and rules.",
    icon: Calculator,
    category: "Compass Tools",
    subtitle: "Stamp Duty",
    url: "https://proptech.kwsingapore.com/calculator/ssd",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/ssd.webp"
  },
  {
    id: 26,
    title: "Rental Stamp Duty",
    description: "Instantly compute rental stamp duty payable on signed tenancy agreements.",
    icon: Calculator,
    category: "Compass Tools",
    subtitle: "Stamp Duty",
    url: "https://proptech.kwsingapore.com/calculator/rental-stamp-duty",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/rental-stamp-duty.webp"
  },
  // Compass Tools items - Research Charts
  {
    id: 27,
    title: "Disparity Effect",
    description: "Analyse property price gaps across different markets through charts to identify undervalued opportunities.",
    icon: BarChart3,
    category: "Compass Tools",
    subtitle: "Research Charts",
    url: "https://proptech.kwsingapore.com/tech-tools/disparity-effect/charts?type=all",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/disparity-effect.webp"
  },
  // Compass Tools items - Concept Calculators
  {
    id: 28,
    title: "Property Comparison",
    description: "Compare multiple properties side-by-side using price, size, and yield metrics.",
    icon: BarChart3,
    category: "Compass Tools",
    subtitle: "Concept Calculators",
    url: "https://proptech.kwsingapore.com/calculator/property-comparison",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/buc-calculator.webp"
  },
  // Research Tools items
  {
    id: 30,
    title: "Research Chart Vault",
    description: "A repository of essential data and charts for property research and analysis.",
    icon: BarChart3,
    category: "Compass Tools",
    subtitle: "Research Charts",
    url: "https://docs.google.com/document/d/1uk3jAELNmL9cHZp1oEboYPTQfDdmd8lZAm--zB9e9xs/edit?usp=sharing",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/research-charts.webp"
  },
  {
    id: 29,
    title: "Research Chart Mega Vault",
    description: "An extensive collection of data and charts for comprehensive property research and analysis.",
    icon: BarChart3,
    category: "Compass Tools",
    subtitle: "Research Charts",
    url: "https://drive.google.com/drive/folders/19EfpKRyyVuak1V_P8Vq0EU_zNy1-CJ3h?usp=sharing",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/research-charts.webp"
  },
  // Training Resource items
  {
    id: 30,
    title: "Training Recording: KW PropTech Calculator, EdgeProp Inspector, Real Insights, etc.",
    description: "Learn PropTech calculators, EdgeProp Inspector, and Real Insights through recorded training.",
    icon: Play,
    category: "Learnings",
    subtitle: "Tech",
    url: "https://www.youtube.com/playlist?list=PLLAXUUZdAmAqEH3-QDXlGc4Opm9i3lGa0",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-tutorial.webp"
  },
  {
    id: 31,
    title: "Training Recording: KW PropSage Deal Submission",
    description: "Watch step-by-step process for submitting and managing deals using PropSage.",
    icon: Play,
    category: "Learnings",
    subtitle: "Tech",
    url: "https://www.youtube.com/playlist?list=PLLAXUUZdAmAoqtN5dPkjshZgUhF735R9x",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-tutorial.webp"
  },
  {
    id: 32,
    title: "Video Guide: KW Command",
    description: "Get a visual walkthrough of KW Command's main tools and features.",
    icon: Play,
    category: "Learnings",
    subtitle: "Tech",
    url: "https://www.youtube.com/playlist?list=PLLAXUUZdAmAr-TbCVIjwGGCItRE-mQ3Vg",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-tutorial.webp"
  },
  {
    id: 33,
    title: "Step-by-step Guide: KW Command",
    description: "Follow detailed written steps to navigate KW Command confidently and effectively.",
    icon: Play,
    category: "Learnings",
    subtitle: "Tech",
    url: "https://answers.kw.com/hc/en-us/categories/26283417706515-Command",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-tutorial.webp"
  },
  {
    id: 34,
    title: "Step-by-step Guide: KW Command Mobile App",
    description: "Master KW Command mobile app functions with clear, easy instructions provided.",
    icon: Play,
    category: "Learnings",
    subtitle: "Tech",
    url: "https://answers.kw.com/hc/en-us/categories/4402619174931-Command-App",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-tutorial.webp"
  },
  {
    id: 35,
    title: "Step-by-step Guide: Real Insights",
    description: "Leverage Real Insights step-by-step for effective property research and analysis.",
    icon: Play,
    category: "Learnings",
    subtitle: "Tech",
    url: "https://drive.google.com/file/d/1YkRJJebAJhWilzd2mvTMwMGbIvzvBzWY/view?usp=drive_link",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-tutorial.webp"
  },
  {
    id: 36,
    title: "Step-by-step Guide: Real Insights Valuation Report",
    description: "Generate and interpret valuation reports from Real Insights with simple steps.",
    icon: Play,
    category: "Learnings",
    subtitle: "Tech",
    url: "https://drive.google.com/file/d/1KnOVVO_2YtvDta0vS_t0nxCIlo1K0AK3/view?usp=drive_link",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-tutorial.webp"
  },
  {
    id: 37,
    title: "Video: Founder's Market Insights",
    description: "Essential learning video series featuring market perspectives directly from the Founder.",
    icon: Play,
    category: "Learnings",
    subtitle: "Business Mastery & Growth",
    url: "https://www.youtube.com/playlist?list=PLLAXUUZdAmArXLm197-kQEuhzgDEadVSi",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-tutorial.webp"
  },
  {
    id: 38,
    title: "Deck: Founder's Market Insights",
    description: "Companion slides to the Founder's Market Insights for review and study.",
    icon: Play,
    category: "Learnings",
    subtitle: "Business Mastery & Growth",
    url: "https://drive.google.com/file/d/1Em3X8taxvI6b_MpYwCSPYNsgGCbAyzYL/view?usp=drive_link",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-tutorial.webp"
  },
  {
    id: 39,
    title: "Video: KW Multiplier Weekly Training Series",
    description: "Weekly video training designed to amplify your business and skill set.",
    icon: Play,
    category: "Learnings",
    subtitle: "Business Mastery & Growth",
    url: "https://drive.google.com/drive/folders/1s6_nOdJDnyXGq2aWyN0AyXnP3hK8Nlgk",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-tutorial.webp"
  },
  {
    id: 40,
    title: "Deck: KW Multiplier Weekly Training Series",
    description: "Presentation slides for the weekly KW Multiplier training sessions.",
    icon: Play,
    category: "Learnings",
    subtitle: "Business Mastery & Growth",
    url: "https://drive.google.com/drive/folders/1r44l7nX3_gMMm1X0c_i78plor7bNnSFQ?usp=drive_link",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-tutorial.webp"
  },
  {
    id: 41,
    title: "New Launch Training Series",
    description: "A comprehensive training series focused on executing successful new property launches.",
    icon: Play,
    category: "Learnings",
    subtitle: "New Launch & Market Experties",
    url: "https://www.youtube.com/playlist?list=PLLAXUUZdAmApeARL8goKWDxm6dmycq8SN",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-tutorial.webp"
  },
  {
    id: 42,
    title: "Landed Properties Training Series",
    description: "Specialized training content for understanding and transacting landed properties in Singapore.",
    icon: Play,
    category: "Learnings",
    subtitle: "Business Mastery & Growth",
    url: "https://www.youtube.com/watch?v=W1VksHrLlC4",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-tutorial.webp"
  },
  {
    id: 43,
    title: "Penrith CES Seminar",
    description: "Data-backed comparative analysis to validate investment decisions and master the new launch market.",
    icon: Play,
    category: "Learnings",
    subtitle: "New Launch & Market Experties",
    url: "https://youtu.be/IU91vbl5PLo",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-tutorial.webp"
  },
  {
    id: 44,
    title: "KW Consultant Scripts",
    description: "Your playbook for confident conversations and mastering consultation dialogues.",
    icon: Play,
    category: "Learnings",
    subtitle: "Business Mastery & Growth",
    url: "https://drive.google.com/drive/folders/1MNb6kilD_fJ1BNjfmq71fxPp1fLHpudd",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-tutorial.webp"
  },
  {
    id: 45,
    title: "How to use the KW Price Disparity and Stack Analysis",
    description: "Utilise KW tools for price comparison and project analysis.",
    icon: Play,
    category: "Learnings",
    subtitle: "Business Mastery & Growth",
    url: "https://youtu.be/2OAgkT3V0H8",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-tutorial.webp"
  },
  {
    id: 46,
    title: "Consultant Pitch Mastery by Melvin Lim - 15 Jul 2025",
    description: "Expert-led session focused on elevating consultant presentation and sales skills.",
    icon: Play,
    category: "Learnings",
    subtitle: "Business Mastery & Growth",
    url: "https://www.youtube.com/watch?v=WIxOx8cK-qQ",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-tutorial.webp"
  },
  {
    id: 47,
    title: "New Launch Condo vs Resale Condo: Which is the Right Choice for You?",
    description: "A webinar comparing the pros and cons of new launch and resale condominium purchases.",
    icon: Play,
    category: "Learnings",
    subtitle: "New Launch & Market Experties",
    url: "https://www.youtube.com/watch?v=sCx7w3cwu6g",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-tutorial.webp"
  },
  {
    id: 48,
    title: "Framework based webinars",
    description: "Training sessions that utilize structured frameworks to convey complex concepts.",
    icon: Play,
    category: "Learnings",
    subtitle: "New Launch & Market Experties",
    url: "https://youtu.be/ORwYDVhfoG4?si=eD7JPssCfGBfC7X_",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-tutorial.webp"
  },
  {
    id: 49,
    title: "Landed vs Two Condos? How to Optimise CPF and Apply 99-1 Ownership for Better Growth",
    description: "Guidance on leveraging the 99-1 ownership strategy to optimize property growth.",
    icon: Play,
    category: "Learnings",
    subtitle: "Business Mastery & Growth",
    url: "https://youtu.be/Pr_P72fJ71I?si=jid5AFALJiTzy68d",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-tutorial.webp"
  },
  {
    id: 50,
    title: "14 Reasons Why Some Investors Invest in New Projects with Analysis and Market Psychology",
    description: "An analysis of investor motivation, market data, and psychological factors driving new project investment.",
    icon: Play,
    category: "Learnings",
    subtitle: "New Launch & Market Experties",
    url: "https://youtu.be/jJU4uVRfcnk?si=X2IwjzLXiW8xOtdX",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-tutorial.webp"
  },
  {
    id: 51,
    title: "KW Singapore x PLB Springleaf Residence Training",
    description: "A detailed guide or training session specific to the Springleaf Residence in Singapore.",
    icon: Play,
    category: "Learnings",
    subtitle: "New Launch & Market Experties",
    url: "https://youtube.com/playlist?list=PLtRO1DKUwiFjcpQOyMIA-vd9ftIcTNgqU&si=yOhijL-H4xUdP-hm",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/kw-tutorial.webp"
  },
]

const compassTools = [
  {
    id: 200,
    title: "Property Analysis",
    description: "Your All-In-One Property Deep Dive — Every Detail, Every Metric",
    icon: BarChart3,
    category: "Compass Tools",
    subtitle: "Tech Tools",
    url: "https://compass.kwsingapore.com/tech-tools/property-analysis/research",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/property-analysis.webp"
  },
  {
    id: 203,
    title: "MegaMap",
    description: "A powerful map that lets you shortlist listings, study supply-demand, compare past deals, and run instant CMAs in one place.",
    icon: MapPin,
    category: "Compass Tools",
    subtitle: "Tech Tools",
    url: "https://compass.kwsingapore.com/tech-tools/megamap",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/mega-map.webp"
  },
  {
    id: 2001,
    title: "Compass10",
    description: "Smart Property Scoring Framework condenses investment potential into one intuitive visual chart.",
    icon: BarChart3,
    category: "Compass Tools",
    subtitle: "Tech Tools",
    url: "https://compass.kwsingapore.com/tech-tools/compass-10",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/compass-10.webp"
  },
  {
    id: 2002,
    title: "Disparity Effect",
    description: "Analyse property price gaps across different markets through charts to identify undervalued opportunities.",
    icon: BarChart3,
    category: "Compass Tools",
    subtitle: "Tech Tools",
    url: "https://proptech.kwsingapore.com/tech-tools/disparity-effect/charts?type=all",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/disparity-effect.webp"
  },
  {
    id: 201,
    title: "Supply & Demand Analysis",
    description: "Aggregates market activity data to reveal real-time property demand and supply trends.",
    icon: TrendingUp,
    category: "Compass Tools",
    subtitle: "Tech Tools",
    url: "https://compass.kwsingapore.com/tech-tools/supply-demand-analysis",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/supply-demand-analysis.webp"
  },
  {
    id: 205,
    title: "Handover Hero",
    description: "The AI-powered tool that auto-scans unit photos, detects inventory, and generates full handover reports in seconds.",
    icon: Home,
    category: "Compass Tools",
    subtitle: "Tech Tools",
    url: "https://compass.kwsingapore.com/tech-tools/furniture-inventory",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/handover.webp"
  },
  {
    id: 28,
    title: "Property Comparison",
    description: "Compare multiple properties side-by-side using price, size, and yield metrics.",
    icon: BarChart3,
    category: "Compass Tools",
    subtitle: "Concept Calculators",
    url: "https://proptech.kwsingapore.com/calculator/property-comparison",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/buc-calculator.webp"
  },
  {
    id: 14,
    title: "Sales Proceed",
    description: "Instantly calculate net cash proceeds after property sale and costs.",
    icon: Calculator,
    category: "Compass Tools",
    subtitle: "Sales Proceed",
    url: "https://proptech.kwsingapore.com/calculator/sales-proceed",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/sales-proceed.webp"
  },
  {
    id: 15,
    title: "Timeline Planning",
    description: "Plan key property transaction milestones with clear, date-based scheduling tool.",
    icon: TrendingUp,
    category: "Compass Tools",
    subtitle: "Sales Proceed",
    url: "https://proptech.kwsingapore.com/calculator/timeline-planning",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/timeline-planning.webp"
  },
  {
    id: 16,
    title: "Decoupling",
    description: "Assess cost and benefits of transferring ownership for future property purchase.",
    icon: Building2,
    category: "Compass Tools",
    subtitle: "Sales Proceed",
    url: "https://proptech.kwsingapore.com/calculator/decoupling",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/decoupling.webp"
  },
  {
    id: 17,
    title: "Equity Term Loan",
    description: "Estimate how much equity you can unlock through refinancing options.",
    icon: DollarSign,
    category: "Compass Tools",
    subtitle: "Sales Proceed",
    url: "https://proptech.kwsingapore.com/calculator/equity-term-loan",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/equity-term-loan.webp"
  },
  {
    id: 18,
    title: "TDSR/MSR",
    description: "Evaluate buyer affordability using government-mandated loan ratio and income guidelines.",
    icon: Calculator,
    category: "Compass Tools",
    subtitle: "Buyer Affordability",
    url: "https://proptech.kwsingapore.com/calculator/tdsr-msr",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/tdsr-msr.webp"
  },
  {
    id: 19,
    title: "New Project Purchase (BUC)",
    description: "Project progressive payment schedule for building-under-construction properties before completion.",
    icon: Home,
    category: "Compass Tools",
    subtitle: "Buyer Affordability",
    url: "https://proptech.kwsingapore.com/calculator/buc",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/buc-calculator.webp"
  },
  {
    id: 20,
    title: "New EC Purchase (BUC)",
    description: "Calculate EC affordability with income ceiling, grant eligibility, and staged payments.",
    icon: Home,
    category: "Compass Tools",
    subtitle: "Buyer Affordability",
    url: "https://proptech.kwsingapore.com/calculator/ec",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/buc-calculator.webp"
  },
  {
    id: 21,
    title: "Resale Purchase",
    description: "Estimate upfront costs, loan structure, and timeline for resale property purchase.",
    icon: Building2,
    category: "Compass Tools",
    subtitle: "Buyer Affordability",
    url: "https://proptech.kwsingapore.com/calculator/timeline-payment"
  },
  {
    id: 22,
    title: "Mortgage Loan",
    description: "Compute monthly repayments and interest impact based on loan tenure and rates.",
    icon: Calculator,
    category: "Compass Tools",
    subtitle: "Buyer Affordability",
    url: "https://proptech.kwsingapore.com/calculator/mortgage-loan",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/mortgage-loan.webp"
  },
  {
    id: 23,
    title: "Pledge/Unpledge",
    description: "Assess affordability impact when pledging or unpledging funds for property loan.",
    icon: DollarSign,
    category: "Compass Tools",
    subtitle: "Buyer Affordability",
    url: "https://proptech.kwsingapore.com/calculator/pledge-unpledge",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/pledge-unpledge.webp"
  },
  {
    id: 24,
    title: "ABSD/BSD",
    description: "Calculate Buyer's and Additional Buyer's Stamp Duties for property transactions.",
    icon: Calculator,
    category: "Compass Tools",
    subtitle: "Stamp Duty",
    url: "https://proptech.kwsingapore.com/calculator/absd-bsd",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/absd-bsd.webp"
  },
  {
    id: 25,
    title: "SSD",
    description: "Determine payable Seller's Stamp Duty based on property holding duration and rules.",
    icon: Calculator,
    category: "Compass Tools",
    subtitle: "Stamp Duty",
    url: "https://proptech.kwsingapore.com/calculator/ssd",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/ssd.webp"
  },
  {
    id: 26,
    title: "Rental Stamp Duty",
    description: "Instantly compute rental stamp duty payable on signed tenancy agreements.",
    icon: Calculator,
    category: "Compass Tools",
    subtitle: "Stamp Duty",
    url: "https://proptech.kwsingapore.com/calculator/rental-stamp-duty",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/rental-stamp-duty.webp"
  },
  {
    id: 30,
    title: "Research Chart Vault",
    description: "A repository of essential data and charts for property research and analysis.",
    icon: BarChart3,
    category: "Compass Tools",
    subtitle: "Research Charts",
    url: "https://docs.google.com/document/d/1uk3jAELNmL9cHZp1oEboYPTQfDdmd8lZAm--zB9e9xs/edit?usp=sharing",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/research-charts.webp"
  },
  {
    id: 29,
    title: "Research Chart Mega Vault",
    description: "An extensive collection of data and charts for comprehensive property research and analysis.",
    icon: BarChart3,
    category: "Compass Tools",
    subtitle: "Research Charts",
    url: "https://drive.google.com/drive/folders/19EfpKRyyVuak1V_P8Vq0EU_zNy1-CJ3h?usp=sharing",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/tech-tools/research-charts.webp"
  },
]

const categories = [
  "All",
  "Getting Started",
  "Compass Tools",
  "Business Tools",
  "Deal Submission",
  "External Tools",
  "Branding & Marketing",
  "Learnings",
]

type Tool = (typeof tools)[number] | (typeof compassTools)[number]

const getToolKey = (tool: Tool) => `${tool.category ?? "Uncategorized"}-${tool.title}`

export default function TechToolPage() {
  const { isSignedIn, user, isLoaded } = useUser()
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')
  const initialCategory = tabParam && categories.includes(tabParam) ? tabParam : "All"
  const [activeCategory, setActiveCategory] = useState(initialCategory)

  useEffect(() => {
    const nextCategory = tabParam && categories.includes(tabParam) ? tabParam : "All"
    setActiveCategory(nextCategory)
  }, [tabParam])
  const [searchQuery, setSearchQuery] = useState("")
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const [selectedTool, setSelectedTool] = useState<any>(null)
  const [hoveredTool, setHoveredTool] = useState<any>(null)
 
  const { scrollYProgress, scrollY } = useScroll()
  const scrollYValue = useTransform(scrollY, (value) => value * 0.5)

  // Refs for intersection observer
  const heroRef = useRef(null)
  const navigationRef = useRef(null)
  const toolsRef = useRef(null)
  const roadmapRef = useRef(null)

  // Intersection observer hooks
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" })
  const navigationInView = useInView(navigationRef, { once: true, margin: "-50px" })
  const toolsInView = useInView(toolsRef, { once: true, margin: "-100px" })
  const roadmapInView = useInView(roadmapRef, { once: true, margin: "-100px" })

  const normalizedQuery = searchQuery.trim().toLowerCase()

  const nonCompassTools = tools.filter(tool => tool.category !== "Compass Tools")

  const includeCompassInMainList = activeCategory === "All"

  const toolPool: Tool[] =
    activeCategory === "All"
      ? [...nonCompassTools, ...compassTools]
      : activeCategory === "Compass Tools"
        ? compassTools
        : nonCompassTools

  const filteredTools = toolPool.filter(tool => {
    const matchesCategory =
      activeCategory === "All"
        ? true
        : activeCategory === "Compass Tools"
          ? tool.category === "Compass Tools"
          : tool.category === activeCategory
    const matchesSearch = normalizedQuery.length === 0 ||
      tool.title.toLowerCase().includes(normalizedQuery) ||
      tool.description.toLowerCase().includes(normalizedQuery)
    return matchesCategory && matchesSearch
  })

  const displayedTools = filteredTools

  const compassSearchResults = normalizedQuery.length === 0 
    ? [] 
    : compassTools.filter(tool => 
        tool.title.toLowerCase().includes(normalizedQuery) ||
        tool.description.toLowerCase().includes(normalizedQuery)
      )

  const hasDisplayedTools = displayedTools.length > 0
  const showCompassSearchResults = !includeCompassInMainList && compassSearchResults.length > 0

  const onSearchChange = (value: string) => {
    setSearchQuery(value)
  }

  const handleCardClick = (tool: any) => {
    if (tool.url) {
      if (isSignedIn) {
        // User is authenticated, directly open the tool
        const url = tool.url.startsWith('http') ? tool.url : `https://${tool.url}`
        window.open(url, '_blank')
      } else {
        // User is not authenticated, show auth dialog
        setSelectedTool(tool)
        setAuthDialogOpen(true)
      }
    }
  }

  const handleAuthSuccess = () => {
    // After successful authentication, open the selected tool
    if (selectedTool?.url) {
      const url = selectedTool.url.startsWith('http') ? selectedTool.url : `https://${selectedTool.url}`
      window.open(url, '_blank')
    }
    setAuthDialogOpen(false)
    setSelectedTool(null)
  }

  const handleCategoryClick = (category: string) => {
    if (category === "Compass Tools") {
      router.push('/compass')
      return
    }

    setActiveCategory(category)
    const query = category === "All" ? "" : `?tab=${encodeURIComponent(category)}`
    router.push(`/tools${query}`)
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col"
    >
      {/* Hero Banner */}
      <section ref={heroRef} className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
        {/* Geometric Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <motion.div 
            className="absolute top-20 left-20 w-32 h-32 border-2 border-[#b40101] rotate-45"
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={heroInView ? { opacity: 1, scale: 1, rotate: 45 } : { opacity: 0, scale: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.div 
            className="absolute top-40 right-32 w-24 h-24 border border-red-400 rotate-12"
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={heroInView ? { opacity: 1, scale: 1, rotate: 12 } : { opacity: 0, scale: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <motion.div 
            className="absolute bottom-32 left-1/4 w-40 h-40 border border-[#b40101] rotate-45"
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={heroInView ? { opacity: 1, scale: 1, rotate: 45 } : { opacity: 0, scale: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
          <motion.div 
            className="absolute top-1/3 right-1/4 w-20 h-20 border-2 border-red-400 rotate-12"
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={heroInView ? { opacity: 1, scale: 1, rotate: 12 } : { opacity: 0, scale: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />
          <motion.div 
            className="absolute bottom-20 right-20 w-28 h-28 border border-[#b40101] rotate-45"
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={heroInView ? { opacity: 1, scale: 1, rotate: 45 } : { opacity: 0, scale: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          />

          {/* Hexagonal shapes */}
          <motion.svg
            className="absolute top-16 right-1/3 w-16 h-16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={heroInView ? { opacity: 1, scale: 1, rotate: 360 } : { opacity: 0, scale: 0, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <polygon points="13 2 3 14 12 22 22 14" className="text-[#b40101]" />
          </motion.svg>
          <motion.svg
            className="absolute bottom-1/4 left-1/3 w-12 h-12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={heroInView ? { opacity: 1, scale: 1, rotate: -360 } : { opacity: 0, scale: 0, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.7 }}
          >
            <polygon points="13 2 3 14 12 22 22 14" className="text-red-400" />
          </motion.svg>

          {/* Dots */}
          <motion.div 
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#b40101] rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          />
          <motion.div 
            className="absolute top-1/4 left-1/4 w-1 h-1 bg-red-400 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          />
          <motion.div 
            className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-[#b40101] rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 sm:pb-32">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-balance"
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            KW Singapore Tech Tools & Resources
          </motion.h1>
        </div>
      </section>


      {/* Navigation Filters */}
      <section ref={navigationRef} className="relative py-8 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex gap-3 flex-nowrap overflow-x-auto pb-2 md:flex-nowrap md:overflow-x-auto lg:flex-wrap lg:overflow-visible"
            initial={{ opacity: 0, y: 30 }}
            animate={navigationInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category, index) => (
              <motion.button 
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                  activeCategory === category
                    ? "bg-[#B40101] text-white shadow-lg shadow-[#B40101]/30"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:shadow-md"
                }`}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={navigationInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tech Tool Dashboard */}
      <div ref={toolsRef} className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Title and Search Desktop */}
          <motion.div 
            className="hidden md:flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={toolsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h2 
              className="text-3xl font-bold text-white"
              initial={{ opacity: 0, x: -30 }}
              animate={toolsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {activeCategory} ({filteredTools.length})
            </motion.h2>
            <motion.div 
              className="relative max-w-md"
              initial={{ opacity: 0, x: 30 }}
              animate={toolsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search Tools..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-[#b40101] focus:ring-[#b40101]/20 transition-all duration-300"
              />
            </motion.div>
          </motion.div>

          {/* Mobile-only stacked Title and Search */}
          <motion.div 
            className="mobile-only-header flex flex-col items-start gap-4 mb-8 md:hidden lg:hidden xl:hidden 2xl:hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={toolsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h2 
              className="text-3xl font-bold text-white"
              initial={{ opacity: 0, x: -30 }}
              animate={toolsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {activeCategory} ({filteredTools.length})
            </motion.h2>
            <motion.div 
              className="relative w-full md:max-w-md"
              initial={{ opacity: 0, x: 30 }}
              animate={toolsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search Tools..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-[#b40101] focus:ring-[#b40101]/20 transition-all duration-300"
              />
            </motion.div>
          </motion.div>

          {!hasDisplayedTools && !showCompassSearchResults ? (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={toolsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className="text-gray-400 text-lg">No tools found matching your criteria.</p>
            </motion.div>
          ) : (
            <>
              {hasDisplayedTools && (
                <>
                  {activeCategory === "Compass Tools" || activeCategory === "Getting Started" || activeCategory === "Learnings" ? (
                    // Special rendering for Compass Tools and Getting Started with subtitles
                    <div className="space-y-12">
                      {(() => {
                        const categoryToolsDisplayed = displayedTools.filter(tool => tool.category === activeCategory)
                        const subtitleGroups = categoryToolsDisplayed.reduce((groups, tool) => {
                          const subtitle = tool.subtitle || "Other"
                          if (!groups[subtitle]) {
                            groups[subtitle] = []
                          }
                          groups[subtitle].push(tool)
                          return groups
                        }, {} as Record<string, typeof categoryToolsDisplayed>)

                        // Sort subtitle groups.
                        // - For most categories: Tech/Operations first, Other last, others alphabetical.
                        // - For Getting Started: show Operations AFTER other groups.
                        const sortedSubtitleEntries = Object.entries(subtitleGroups).sort(([a], [b]) => {
                          const isGettingStartedCategory = activeCategory === "Getting Started"

                          if (isGettingStartedCategory) {
                            // Getting Started:
                            // - Operations should appear after other groups
                            // - Other (no subtitle) should come first
                            if (a === "Operations") return 1
                            if (b === "Operations") return -1
                            if (a === "Other") return -1
                            if (b === "Other") return 1
                            return a.localeCompare(b)
                          }

                          // Default behaviour (Compass Tools, Learnings, etc.)
                          // Priority subtitles come first
                          if (a === "Tech" || a === "Operations") return -1
                          if (b === "Tech" || b === "Operations") return 1
                          // Other comes last
                          if (a === "Other") return 1
                          if (b === "Other") return -1
                          // Everything else alphabetically
                          return a.localeCompare(b)
                        })

                        return sortedSubtitleEntries.map(([subtitle, tools], groupIndex) => (
                          <motion.div
                            key={subtitle}
                            initial={{ opacity: 0, y: 30 }}
                            animate={toolsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.6, delay: 0.5 + groupIndex * 0.2 }}
                          >
                            {subtitle !== "Other" && (
                              <motion.h3 
                                className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={toolsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                transition={{ duration: 0.6, delay: 0.6 + groupIndex * 0.2 }}
                              >
                                {subtitle}
                              </motion.h3>
                            )}
                            <motion.div 
                              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                              initial={{ opacity: 0 }}
                              animate={toolsInView ? { opacity: 1 } : { opacity: 0 }}
                              transition={{ duration: 0.6, delay: 0.7 + groupIndex * 0.2 }}
                            >
                          {tools.map((tool, index) => {
                                const IconComponent = tool.icon
                                const hasImage = Boolean(tool.image)
                                return (
                                  <motion.div
                            key={`${subtitle}-${tool.id}-${tool.title}`}
                                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                    animate={toolsInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
                                    transition={{ 
                                      duration: 0.5, 
                                      delay: 0.8 + groupIndex * 0.2 + index * 0.1,
                                      ease: "easeOut"
                                    }}
                                    whileHover={{ 
                                      y: -5, 
                                      scale: 1.02,
                                      transition: { duration: 0.2 }
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <Card
                                      className={`bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-[#b40101]/20 transition-all duration-300 hover:border-[#b40101] h-full ${
                                        tool.url ? 'cursor-pointer' : 'cursor-default'
                                      }`}
                                      onClick={() => handleCardClick(tool)}
                                      onMouseEnter={() => tool.url && setHoveredTool(tool)}
                                      onMouseLeave={() => setHoveredTool(null)}
                                    >
                                      <CardContent className="p-6 px-3 py-3 h-full flex flex-col">
                                        <div className="flex items-start space-x-4 h-full">
                                          <div className="flex-shrink-0">
                                            <motion.div 
                                              className={`w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden relative ${
                                                hasImage ? 'bg-[#b40101]/20' : 'bg-white'
                                              }`}
                                              whileHover={{ 
                                                backgroundColor: hasImage 
                                                  ? "rgba(180, 1, 1, 0.3)" 
                                                  : "rgba(255, 255, 255, 0.8)",
                                                scale: 1.1,
                                                transition: { duration: 0.2 }
                                              }}
                                            >
                                              {hasImage ? (
                                                <Image
                                                  src={tool.image as string}
                                                  alt={tool.title}
                                                  fill
                                                  className="object-cover"
                                                  sizes="48px"
                                                />
                                              ) : (
                                                <IconComponent className="w-6 h-6 text-[#b40101]" />
                                              )}
                                            </motion.div>
                                          </div>
                                          <div className="flex-1 min-w-0 flex flex-col">
                                            <h3 className="text-lg font-semibold text-white mb-2">{tool.title}</h3>
                                            <p className="text-sm text-gray-300 leading-relaxed flex-1">{tool.description}</p>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </motion.div>
                                )
                              })}
                            </motion.div>
                          </motion.div>
                        ))
                      })()}
                    </div>
                  ) : (
                    // Regular rendering for other categories
                    <>
                      <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                        initial={{ opacity: 0 }}
                        animate={toolsInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                      >
                        {displayedTools.map((tool, index) => {
                          const IconComponent = tool.icon
                          const hasImage = Boolean(tool.image)
                          return (
                            <motion.div
                          key={`${tool.category}-${tool.id}-${tool.title}`}
                              initial={{ opacity: 0, y: 30, scale: 0.95 }}
                              animate={toolsInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
                              transition={{ 
                                duration: 0.5, 
                                delay: 0.6 + index * 0.1,
                                ease: "easeOut"
                              }}
                              whileHover={{ 
                                y: -5, 
                                scale: 1.02,
                                transition: { duration: 0.2 }
                              }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Card
                                className={`bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-[#b40101]/20 transition-all duration-300 hover:border-[#b40101] h-full ${
                                  tool.url ? 'cursor-pointer' : 'cursor-default'
                                }`}
                                onClick={() => handleCardClick(tool)}
                                onMouseEnter={() => tool.url && setHoveredTool(tool)}
                                onMouseLeave={() => setHoveredTool(null)}
                              >
                                <CardContent className="p-6 px-3 py-3 h-full flex flex-col">
                                  <div className="flex items-start space-x-4 h-full">
                                    <div className="flex-shrink-0">
                                      <motion.div 
                                        className={`w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden relative ${
                                          hasImage ? 'bg-[#b40101]/20' : 'bg-white'
                                        }`}
                                        whileHover={{ 
                                          backgroundColor: hasImage 
                                            ? "rgba(180, 1, 1, 0.3)" 
                                            : "rgba(255, 255, 255, 0.8)",
                                          scale: 1.1,
                                          transition: { duration: 0.2 }
                                        }}
                                      >
                                        {hasImage ? (
                                          <Image
                                            src={tool.image as string}
                                            alt={tool.title}
                                            fill
                                            className="object-cover"
                                            sizes="48px"
                                          />
                                        ) : (
                                          <IconComponent className="w-6 h-6 text-[#b40101]" />
                                        )}
                                      </motion.div>
                                    </div>
                                    <div className="flex-1 min-w-0 flex flex-col">
                                      <h3 className="text-lg font-semibold text-white mb-2">{tool.title}</h3>
                                      <p className="text-sm text-gray-300 leading-relaxed flex-1">{tool.description}</p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          )
                        })}
                      </motion.div>
                    </>
                  )}
                </>
              )}

              {showCompassSearchResults && (
                <motion.div
                  className="mt-12"
                  initial={{ opacity: 0, y: 30 }}
                  animate={toolsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <motion.h3
                    className="text-2xl font-bold text-white mb-4 border-b border-gray-700 pb-2 flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={toolsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    Compass Tools ({compassSearchResults.length} match{compassSearchResults.length > 1 ? "es" : ""})
                  </motion.h3>
                  <motion.p
                    className="text-sm text-gray-400 mb-6"
                    initial={{ opacity: 0 }}
                    animate={toolsInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    These tools live inside Compass. Clicking them opens the relevant Compass experience in a new tab.
                  </motion.p>
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial={{ opacity: 0 }}
                    animate={toolsInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    {compassSearchResults.map((tool, index) => {
                      const IconComponent = tool.icon
                      const hasImage = Boolean(tool.image)
                      return (
                        <motion.div
                      key={`compass-${tool.id}-${tool.title}`}
                          initial={{ opacity: 0, y: 30, scale: 0.95 }}
                          animate={toolsInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: 1.1 + index * 0.1,
                            ease: "easeOut"
                          }}
                          whileHover={{ 
                            y: -5, 
                            scale: 1.02,
                            transition: { duration: 0.2 }
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Card
                            className={`bg-gray-800 border border-[#b40101]/40 hover:border-[#b40101] hover:shadow-lg hover:shadow-[#b40101]/30 transition-all duration-300 h-full ${
                              tool.url ? 'cursor-pointer' : 'cursor-default'
                            }`}
                            onClick={() => handleCardClick(tool)}
                            onMouseEnter={() => tool.url && setHoveredTool(tool)}
                            onMouseLeave={() => setHoveredTool(null)}
                          >
                            <CardContent className="p-6 h-full flex flex-col">
                              <div className="flex items-start space-x-4 h-full">
                                <div className="flex-shrink-0">
                                  <motion.div 
                                    className={`w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden relative ${
                                      hasImage ? 'bg-[#b40101]/20' : 'bg-white'
                                    }`}
                                    whileHover={{ 
                                      backgroundColor: hasImage 
                                        ? "rgba(180, 1, 1, 0.3)" 
                                        : "rgba(255, 255, 255, 0.8)",
                                      scale: 1.1,
                                      transition: { duration: 0.2 }
                                    }}
                                  >
                                    {hasImage ? (
                                      <Image
                                        src={tool.image as string}
                                        alt={tool.title}
                                        fill
                                        className="object-cover"
                                        sizes="48px"
                                      />
                                    ) : (
                                      <IconComponent className="w-6 h-6 text-[#b40101]" />
                                    )}
                                  </motion.div>
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col">
                                  <p className="text-xs uppercase tracking-wide text-[#b40101] font-semibold mb-1">Compass Tool</p>
                                  <h3 className="text-lg font-semibold text-white mb-2">{tool.title}</h3>
                                  <p className="text-sm text-gray-300 leading-relaxed flex-1">{tool.description}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Next 90 Days Section */}
      <section ref={roadmapRef} className="bg-black py-8 sm:py-12 lg:py-16">
        <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl w-full">
            {/* Header with Logo */}
            <motion.div 
              className="flex items-center justify-center gap-4 sm:gap-8 mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={roadmapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-center">
                <motion.h2 
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={roadmapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Next 90 Days – What's Coming
                </motion.h2>
                <motion.p 
                  className="text-sm sm:text-base lg:text-lg text-gray-300 px-4 max-w-4xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={roadmapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  What's ahead is even more exciting. Here's our line-up for the next quarter:
                </motion.p>
              </div>
            </motion.div>

            {/* Three Column Layout */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8 lg:mt-10"
              initial={{ opacity: 0 }}
              animate={roadmapInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {/* October */}
              <motion.div 
                className="bg-gray-900/30 rounded-lg p-4 sm:p-6 border border-gray-800"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={roadmapInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ 
                  y: -5, 
                  scale: 1.02,
                  borderColor: "#b40101",
                  transition: { duration: 0.2 }
                }}
              >
                <h3 className="text-lg sm:text-xl font-bold text-white border-b border-gray-700 pb-2 mb-3 sm:mb-4">October</h3>
                <div className="space-y-2 sm:space-y-3">
                  <motion.div 
                    className="text-green-400 text-sm sm:text-base font-medium"
                    initial={{ opacity: 0, x: -20 }}
                    animate={roadmapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                  >
                    Property Comparison Tool
                  </motion.div>
                  <motion.div 
                    className="text-green-400 text-sm sm:text-base font-medium"
                    initial={{ opacity: 0, x: -20 }}
                    animate={roadmapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                  >
                    Property Analysis
                  </motion.div>
                  <motion.div 
                    className="text-white text-sm sm:text-base"
                    initial={{ opacity: 0, x: -20 }}
                    animate={roadmapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 1.0 }}
                  >
                    MegaMap
                  </motion.div>
                  <motion.div 
                    className="text-white text-sm sm:text-base"
                    initial={{ opacity: 0, x: -20 }}
                    animate={roadmapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 1.1 }}
                  >
                    KW Compass10
                  </motion.div>
                </div>
              </motion.div>

              {/* December */}
              <motion.div 
                className="bg-gray-900/30 rounded-lg p-4 sm:p-6 border border-gray-800"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={roadmapInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                whileHover={{ 
                  y: -5, 
                  scale: 1.02,
                  borderColor: "#b40101",
                  transition: { duration: 0.2 }
                }}
              >
                <h3 className="text-lg sm:text-xl font-bold text-white border-b border-gray-700 pb-2 mb-3 sm:mb-4">November</h3>
                <div className="space-y-2 sm:space-y-3">
                  <motion.div 
                    className="text-white text-sm sm:text-base"
                    initial={{ opacity: 0, x: -20 }}
                    animate={roadmapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                  >
                    Landed MOAT
                  </motion.div>
                  <motion.div 
                    className="text-white text-sm sm:text-base"
                    initial={{ opacity: 0, x: -20 }}
                    animate={roadmapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 1.0 }}
                  >
                    Valuation Tool
                  </motion.div>
                  <motion.div 
                    className="text-white text-sm sm:text-base"
                    initial={{ opacity: 0, x: -20 }}
                    animate={roadmapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 1.1 }}
                  >
                    School-based Property Finder
                  </motion.div>
                  <motion.div 
                    className="text-white text-sm sm:text-base"
                    initial={{ opacity: 0, x: -20 }}
                    animate={roadmapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 1.2 }}
                  >
                    KW Resource Hub
                  </motion.div>
                </div>
              </motion.div>

              {/* November */}
              <motion.div 
                className="bg-gray-900/30 rounded-lg p-4 sm:p-6 border border-gray-800 sm:col-span-2 lg:col-span-1"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={roadmapInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ 
                  y: -5, 
                  scale: 1.02,
                  borderColor: "#b40101",
                  transition: { duration: 0.2 }
                }}
              >
                <h3 className="text-lg sm:text-xl font-bold text-white border-b border-gray-700 pb-2 mb-3 sm:mb-4">December</h3>
                <div className="space-y-2 sm:space-y-3">
                  <motion.div 
                    className="text-white text-sm sm:text-base"
                    initial={{ opacity: 0, x: -20 }}
                    animate={roadmapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 1.0 }}
                  >
                    Time Machine (Concept Tool)
                  </motion.div>
                  <motion.div 
                    className="text-white text-sm sm:text-base"
                    initial={{ opacity: 0, x: -20 }}
                    animate={roadmapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 1.1 }}
                  >
                    ProCharts
                  </motion.div>
                  <motion.div 
                    className="text-white text-sm sm:text-base"
                    initial={{ opacity: 0, x: -20 }}
                    animate={roadmapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 1.2 }}
                  >
                    AI Chatbot 2.0
                  </motion.div>
                  <motion.div 
                    className="text-white text-sm sm:text-base"
                    initial={{ opacity: 0, x: -20 }}
                    animate={roadmapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 1.3 }}
                  >
                    MyInfo Integration (Singpass)
                  </motion.div>
                  <motion.div 
                    className="text-white text-sm sm:text-base"
                    initial={{ opacity: 0, x: -20 }}
                    animate={roadmapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 1.4 }}
                  >
                    DisparityEffect 2.0
                  </motion.div>
                  <motion.div 
                    className="text-white text-sm sm:text-base"
                    initial={{ opacity: 0, x: -20 }}
                    animate={roadmapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 1.5 }}
                  >
                    Condo Ranker 2.0
                  </motion.div>
                  <motion.div 
                    className="text-gray-400 text-sm sm:text-base italic"
                    initial={{ opacity: 0, x: -20 }}
                    animate={roadmapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 1.6 }}
                  >
                    … and more
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* URL Display on Hover */}
      <AnimatePresence>
        {hoveredTool && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 left-4 z-50 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 shadow-lg"
          >
            <p className="text-sm text-gray-300">
              <span className="text-white font-mono text-xs">
                {hoveredTool.url.startsWith('http') ? hoveredTool.url : `https://${hoveredTool.url}`}
              </span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Authentication Dialog */}
      <AuthDialog 
        open={authDialogOpen} 
        onOpenChange={setAuthDialogOpen}
        toolTitle={selectedTool?.title}
        redirectUrl="/tools"
      />
    </motion.main>
  )
}
