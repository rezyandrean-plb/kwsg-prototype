"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"


// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
}

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8
    }
  }
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
}

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8
    }
  }
}

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8
    }
  }
}

interface Recipient {
  id: number
  name: string
  title?: string
  image: string
}

interface AwardCategory {
  id: number
  title: string
  description: string
  recipients: Recipient[]
}

interface AwardEvent {
  id: string
  name: string
  quarter: string
  year: string
  categories: AwardCategory[]
}

const awardEvents: AwardEvent[] = [
  {
    id: "q1-2024",
    name: "Q1 2024 Awards",
    quarter: "Q1",
    year: "2024",
    categories: [
      {
        id: 1,
        title: "TOP Exclusive Listers",
        description:
          "In recognition of securing the highest number of exclusive seller listings and demonstrating exceptional seller trust.",
        recipients: [
          { id: 1, name: "Sarah Chen", title: "Senior Agent", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop" },
          { id: 2, name: "Michael Torres", title: "Team Leader", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop" },
          { id: 3, name: "Emily Watson", title: "Sales Director", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 2,
        title: "TOP Leasing Transactors",
        description:
          "In recognition of the outstanding Leasing Velocity, successfully closing the highest number of Residential & Commercial rental transactions.",
        recipients: [
          { id: 1, name: "David Kim", title: "Associate Agent", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop" },
          { id: 2, name: "Jessica Martinez", title: "Junior Agent", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 3,
        title: "TOP HDB Transactors",
        description:
          "In recognition of your exceptional performance as an HDB Volume Leader, driving high-frequency transactions in HDB Sales & Purchase.",
        recipients: [
          { id: 1, name: "Robert Anderson", title: "Client Relations", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop" },
          { id: 2, name: "Lisa Thompson", title: "Senior Consultant", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop" },
          { id: 3, name: "James Wilson", title: "Account Manager", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop" },
          { id: 4, name: "Maria Garcia", title: "Client Advisor", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 4,
        title: "TOP Private Property Transactors",
        description:
          "In recognition of the Market Dominance in Private Resale (Condo, Apartment) Sales & Purchase, achieving top transaction volume in this premium segment.",
        recipients: [
          { id: 1, name: "Amanda Foster", title: "Regional Director", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=600&fit=crop" },
          { id: 2, name: "Kevin Patel", title: "Team Manager", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 5,
        title: "TOP Growth Share Evangelist",
        description:
          "In recognition of the commitment to sharing the KW Model and Value, evidenced by the highest number of new associates joining KW Singapore this quarter.",
        recipients: [
          { id: 1, name: "Sophie Zhang", title: "Innovation Lead", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop" },
          { id: 2, name: "Marcus Johnson", title: "Strategy Director", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop" },
          { id: 3, name: "Nina Patel", title: "Digital Specialist", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 6,
        title: "TOP Project Specialist",
        description:
          "In recognition of your outstanding success in New Launch Project Sales, achieving the highest GCI through expert analysis and successful client advisory.",
        recipients: [
          {
            id: 1,
            name: "Victoria Laurent",
            title: "Luxury Consultant",
            image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=600&fit=crop",
          },
          { id: 2, name: "Alexander Chen", title: "Premium Agent", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 7,
        title: "Consultant Achievement Award",
        description:
          "In recognition of your accelerated performance and achieving promotion to the 90% commission tier this quarter.",
        recipients: [
          { id: 1, name: "Daniel Lee", title: "Market Analyst", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop" },
          { id: 2, name: "Rachel Green", title: "Research Director", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop" },
          { id: 3, name: "Thomas Wright", title: "Senior Advisor", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 8,
        title: "TOP Rookie",
        description:
          "In recognition of achieving the highest transacted GCI among all the new RES Associates in your first year with KW Singapore.",
        recipients: [
          { id: 1, name: "Jennifer Lopez", title: "Community Lead", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop" },
          { id: 2, name: "Chris Taylor", title: "Outreach Director", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop" },
          { id: 3, name: "Priya Sharma", title: "Social Impact", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop" },
          {
            id: 4,
            name: "Brandon Lee",
            title: "Volunteer Coordinator",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop",
          },
        ],
      },
      {
        id: 9,
        title: "TOP Manager",
        description:
          "In recognition of exceptional leadership, team development, and outstanding management performance this quarter.",
        recipients: [
          { id: 1, name: "Emma Davis", title: "New Agent", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop" },
          { id: 2, name: "Ryan Mitchell", title: "Associate", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 10,
        title: "THE Achiever Award",
        description: "In recognition of your excellent sales performance and GCI achievement this quarter.",
        recipients: [
          { id: 1, name: "Olivia Brown", title: "Listing Specialist", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop" },
          { id: 2, name: "Nathan Park", title: "Marketing Lead", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop" },
          { id: 3, name: "Isabella Rodriguez", title: "Brand Manager", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 11,
        title: "The SuperStar Realtor Award",
        description: "In recognition of your exceptional GCI sales achievement for the quarter.",
        recipients: [
          { id: 1, name: "William Chang", title: "Sales Director", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop" },
          { id: 2, name: "Catherine Moore", title: "VP Sales", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 12,
        title: "The Rainmaker Consultant Award",
        description:
          "In recognition of generating exceptional revenue and consistently bringing in high-value transactions.",
        recipients: [
          { id: 1, name: "Richard Harris", title: "Ethics Officer", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop" },
          { id: 2, name: "Michelle Nguyen", title: "Compliance Lead", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop" },
          { id: 3, name: "Andrew Scott", title: "Standards Director", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 13,
        title: "TOP 20 Producers",
        description:
          "In recognition of ranking among the top 20 highest-performing agents in overall production and GCI this quarter.",
        recipients: [
          { id: 1, name: "Samantha White", title: "Performance Lead", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop" },
          { id: 2, name: "Jason Kumar", title: "Target Manager", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop" },
          { id: 3, name: "Laura Martinez", title: "Achievement Coach", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop" },
          { id: 4, name: "Eric Thompson", title: "Success Manager", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 14,
        title: "MREA Millionaire In The Making",
        description:
          "In recognition of your commitment to building wealth through real estate and demonstrating the potential to achieve millionaire status.",
        recipients: [
          {
            id: 1,
            name: "Patricia Lee",
            title: "Business Development",
            image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=600&fit=crop",
          },
          { id: 2, name: "Gregory Adams", title: "Growth Director", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop" },
        ],
      },
    ],
  },
  {
    id: "annual-2023",
    name: "Annual Awards 2023",
    quarter: "Annual",
    year: "2023",
    categories: [
      {
        id: 1,
        title: "TOP Exclusive Listers",
        description:
          "In recognition of securing the highest number of exclusive seller listings and demonstrating exceptional seller trust.",
        recipients: [
          { id: 1, name: "Jennifer Park", title: "Top Agent", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 2,
        title: "TOP Leasing Transactors",
        description:
          "In recognition of the outstanding Leasing Velocity, successfully closing the highest number of Residential & Commercial rental transactions.",
        recipients: [
          { id: 1, name: "Carlos Rivera", title: "Rising Star", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop" },
          { id: 2, name: "Aisha Mohammed", title: "Growth Leader", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 3,
        title: "TOP HDB Transactors",
        description:
          "In recognition of your exceptional performance as an HDB Volume Leader, driving high-frequency transactions in HDB Sales & Purchase.",
        recipients: [
          { id: 1, name: "Robert Hamilton", title: "Industry Veteran", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop" },
          { id: 2, name: "Patricia Wong", title: "Legacy Leader", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 4,
        title: "TOP Private Property Transactors",
        description:
          "In recognition of the Market Dominance in Private Resale (Condo, Apartment) Sales & Purchase, achieving top transaction volume in this premium segment.",
        recipients: [
          {
            id: 1,
            name: "The Elite Squad",
            title: "Team Lead: Mark Stevens",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
          },
          { id: 2, name: "Sarah Kim", title: "Co-Lead", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop" },
          { id: 3, name: "David Brown", title: "Senior Member", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 5,
        title: "TOP Growth Share Evangelist",
        description:
          "In recognition of the commitment to sharing the KW Model and Value, evidenced by the highest number of new associates joining KW Singapore this quarter.",
        recipients: [
          { id: 1, name: "Dr. Lisa Chen", title: "Tech Director", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop" },
          {
            id: 2,
            name: "James Anderson",
            title: "Innovation Officer",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
          },
        ],
      },
      {
        id: 6,
        title: "TOP Project Specialist",
        description:
          "In recognition of your outstanding success in New Launch Project Sales, achieving the highest GCI through expert analysis and successful client advisory.",
        recipients: [
          { id: 1, name: "Sophia Beaumont", title: "Luxury Director", image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=600&fit=crop" },
          {
            id: 2,
            name: "Christopher Laurent",
            title: "Premium Specialist",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop",
          },
          {
            id: 3,
            name: "Isabella Rossi",
            title: "High-End Consultant",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop",
          },
        ],
      },
      {
        id: 7,
        title: "Consultant Achievement Award",
        description:
          "In recognition of your accelerated performance and achieving promotion to the 90% commission tier this quarter.",
        recipients: [
          { id: 1, name: "Dr. Michael Zhang", title: "Chief Analyst", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop" },
          { id: 2, name: "Rebecca Stone", title: "Research Head", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 8,
        title: "TOP Rookie",
        description:
          "In recognition of achieving the highest transacted GCI among all the new RES Associates in your first year with KW Singapore.",
        recipients: [
          {
            id: 1,
            name: "Maria Santos",
            title: "Community Director",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop",
          },
          { id: 2, name: "Ahmed Hassan", title: "Social Impact Lead", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop" },
          { id: 3, name: "Grace Liu", title: "Outreach Manager", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop" },
          { id: 4, name: "Daniel O'Brien", title: "Volunteer Chief", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 9,
        title: "TOP Manager",
        description:
          "In recognition of exceptional leadership, team development, and outstanding management performance this quarter.",
        recipients: [
          { id: 1, name: "Tyler Johnson", title: "Rookie Agent", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop" },
          { id: 2, name: "Maya Patel", title: "First Year Star", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 10,
        title: "THE Achiever Award",
        description: "In recognition of your excellent sales performance and GCI achievement this quarter.",
        recipients: [
          {
            id: 1,
            name: "Alexandra Reed",
            title: "Marketing Director",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop",
          },
          { id: 2, name: "Kevin Tan", title: "Brand Strategist", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop" },
          { id: 3, name: "Natalie Brooks", title: "Creative Lead", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 11,
        title: "The SuperStar Realtor Award",
        description: "In recognition of your exceptional GCI sales achievement for the quarter.",
        recipients: [
          { id: 1, name: "Richard Chen", title: "Sales Champion", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop" },
          { id: 2, name: "Victoria Morgan", title: "Revenue Leader", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 12,
        title: "The Rainmaker Consultant Award",
        description:
          "In recognition of generating exceptional revenue and consistently bringing in high-value transactions.",
        recipients: [
          {
            id: 1,
            name: "Judge Harold Mitchell",
            title: "Ethics Chair",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop",
          },
          {
            id: 2,
            name: "Dr. Susan Lee",
            title: "Compliance Director",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop",
          },
          {
            id: 3,
            name: "Thomas Bradford",
            title: "Standards Officer",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop",
          },
        ],
      },
      {
        id: 13,
        title: "TOP 20 Producers",
        description:
          "In recognition of ranking among the top 20 highest-performing agents in overall production and GCI this quarter.",
        recipients: [
          {
            id: 1,
            name: "Angela Martinez",
            title: "Performance Director",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop",
          },
          { id: 2, name: "Brian Kim", title: "Achievement Lead", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop" },
          { id: 3, name: "Rachel Cohen", title: "Excellence Manager", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop" },
          { id: 4, name: "Marcus Williams", title: "Target Champion", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 14,
        title: "MREA Millionaire In The Making",
        description:
          "In recognition of your commitment to building wealth through real estate and demonstrating the potential to achieve millionaire status.",
        recipients: [
          {
            id: 1,
            name: "Elizabeth Taylor",
            title: "Growth Executive",
            image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=600&fit=crop",
          },
          { id: 2, name: "Jonathan Wu", title: "Development Director", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop" },
        ],
      },
    ],
  },
  {
    id: "regional-2023",
    name: "Regional Awards 2023",
    quarter: "Regional",
    year: "2023",
    categories: [
      {
        id: 1,
        title: "TOP Exclusive Listers",
        description:
          "In recognition of securing the highest number of exclusive seller listings and demonstrating exceptional seller trust.",
        recipients: [
          { id: 1, name: "Henry Lim", title: "Central Lead", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop" },
          { id: 2, name: "Melissa Tan", title: "District Manager", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 2,
        title: "TOP Leasing Transactors",
        description:
          "In recognition of the outstanding Leasing Velocity, successfully closing the highest number of Residential & Commercial rental transactions.",
        recipients: [
          { id: 1, name: "Benjamin Wong", title: "East Director", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop" },
          { id: 2, name: "Stephanie Koh", title: "Regional Agent", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 3,
        title: "TOP HDB Transactors",
        description:
          "In recognition of your exceptional performance as an HDB Volume Leader, driving high-frequency transactions in HDB Sales & Purchase.",
        recipients: [
          { id: 1, name: "Raymond Ng", title: "West Manager", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop" },
          { id: 2, name: "Christine Lee", title: "Area Specialist", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop" },
          { id: 3, name: "Marcus Tan", title: "Senior Agent", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 4,
        title: "TOP Private Property Transactors",
        description:
          "In recognition of the Market Dominance in Private Resale (Condo, Apartment) Sales & Purchase, achieving top transaction volume in this premium segment.",
        recipients: [
          { id: 1, name: "Sharon Lim", title: "North Director", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=600&fit=crop" },
          { id: 2, name: "Daniel Chua", title: "Territory Lead", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 5,
        title: "TOP Growth Share Evangelist",
        description:
          "In recognition of the commitment to sharing the KW Model and Value, evidenced by the highest number of new associates joining KW Singapore this quarter.",
        recipients: [
          { id: 1, name: "Vanessa Chong", title: "Marina Expert", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop" },
          { id: 2, name: "Adrian Teo", title: "Waterfront Specialist", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop" },
          { id: 3, name: "Felicia Kwan", title: "Luxury Consultant", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 6,
        title: "TOP Project Specialist",
        description:
          "In recognition of your outstanding success in New Launch Project Sales, achieving the highest GCI through expert analysis and successful client advisory.",
        recipients: [
          { id: 1, name: "Kenneth Sim", title: "Orchard Director", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop" },
          { id: 2, name: "Jasmine Yeo", title: "District Agent", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 7,
        title: "Consultant Achievement Award",
        description:
          "In recognition of your accelerated performance and achieving promotion to the 90% commission tier this quarter.",
        recipients: [
          { id: 1, name: "Victoria Tan", title: "Sentosa Specialist", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=600&fit=crop" },
          { id: 2, name: "Nicholas Lim", title: "Cove Expert", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop" },
          { id: 3, name: "Samantha Goh", title: "Waterfront Lead", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 8,
        title: "TOP Rookie",
        description:
          "In recognition of achieving the highest transacted GCI among all the new RES Associates in your first year with KW Singapore.",
        recipients: [
          { id: 1, name: "Peter Ang", title: "HDB Specialist", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop" },
          { id: 2, name: "Michelle Ong", title: "Resale Expert", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop" },
          { id: 3, name: "David Loh", title: "HDB Director", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop" },
          { id: 4, name: "Grace Tan", title: "Market Lead", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 9,
        title: "TOP Manager",
        description:
          "In recognition of exceptional leadership, team development, and outstanding management performance this quarter.",
        recipients: [
          { id: 1, name: "Richard Koh", title: "Landed Expert", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop" },
          { id: 2, name: "Audrey Lim", title: "Property Consultant", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 10,
        title: "THE Achiever Award",
        description: "In recognition of your excellent sales performance and GCI achievement this quarter.",
        recipients: [
          { id: 1, name: "Steven Ng", title: "Condo Director", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop" },
          { id: 2, name: "Cheryl Tan", title: "Condo Specialist", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop" },
          { id: 3, name: "Brandon Lee", title: "Sales Manager", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 11,
        title: "The SuperStar Realtor Award",
        description: "In recognition of your exceptional GCI sales achievement for the quarter.",
        recipients: [
          {
            id: 1,
            name: "Lawrence Wong",
            title: "Commercial Director",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
          },
          {
            id: 2,
            name: "Vivian Chew",
            title: "Business Property Lead",
            image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=600&fit=crop",
          },
        ],
      },
      {
        id: 12,
        title: "The Rainmaker Consultant Award",
        description:
          "In recognition of generating exceptional revenue and consistently bringing in high-value transactions.",
        recipients: [
          { id: 1, name: "Dr. Alan Tan", title: "Investment Advisor", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop" },
          { id: 2, name: "Jennifer Lim", title: "Portfolio Manager", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop" },
          { id: 3, name: "William Chen", title: "Investment Director", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 13,
        title: "TOP 20 Producers",
        description:
          "In recognition of ranking among the top 20 highest-performing agents in overall production and GCI this quarter.",
        recipients: [
          { id: 1, name: "Evelyn Koh", title: "Rental Director", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=600&fit=crop" },
          { id: 2, name: "Timothy Ng", title: "Leasing Expert", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop" },
          { id: 3, name: "Serena Lim", title: "Rental Manager", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop" },
          { id: 4, name: "Patrick Tan", title: "Lease Specialist", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop" },
        ],
      },
      {
        id: 14,
        title: "MREA Millionaire In The Making",
        description:
          "In recognition of your commitment to building wealth through real estate and demonstrating the potential to achieve millionaire status.",
        recipients: [
          { id: 1, name: "Jacqueline Teo", title: "Launch Director", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop" },
          { id: 2, name: "Edmund Lim", title: "New Projects Lead", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop" },
        ],
      },
    ],
  },
]

export function AwardsFilter() {
  const [selectedEvent, setSelectedEvent] = useState<string>(awardEvents[0].id)
  const currentEvent = awardEvents.find((event) => event.id === selectedEvent) || awardEvents[0]

  return (
    <div className="bg-background">
      <section className="py-12 px-6 border-b border-border/30">
        <div className="container mx-auto max-w-7xl">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-sans">Select Award Event</h2>
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">{currentEvent.categories.length} categories</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {awardEvents.map((event) => (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => setSelectedEvent(event.id)}
                  className={`px-6 py-3 text-sm border transition-all duration-300 cursor-pointer ${
                    selectedEvent === event.id
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-white border-white/30 hover:border-white hover:bg-white/10"
                  }`}
                >
                  {event.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-6 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="space-y-16">
            {currentEvent.categories.map((category, index) => (
              <div
                key={category.id}
                className={`pb-16 ${index !== currentEvent.categories.length - 1 ? "border-b border-border/30" : ""}`}
              >
                {/* Category header */}
                <div className="mb-8 space-y-1.5">
                  <h3 className="text-foreground leading-tight text-2xl leading-6 tracking-normal font-sans font-bold">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl font-medium">
                    {category.description}
                  </p>
                </div>
                {/* Recipients grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {category.recipients.map((recipient) => (
                    <div key={recipient.id} className="group relative overflow-hidden bg-muted aspect-[3/4]">
                      {/* Profile Image */}
                      <img
                        src={recipient.image || "/placeholder.svg"}
                        alt={recipient.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {/* Name overlay with hover animation */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <p className="font-serif text-lg leading-tight mb-1">{recipient.name}</p>
                          {recipient.title && <p className="text-xs text-white/80 tracking-wide">{recipient.title}</p>}
                        </div>
                      </div>
                      {/* Static name label */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                        <p className="font-serif text-white text-sm leading-tight">{recipient.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default function ModelPage() {
  const [scrollY, setScrollY] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    document.title = 'KW Awards - KW Singapore'
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSubmit = (data: any) => {
    console.log("Form submitted:", data)
    // The form submission is handled within the JoinFormDialog component
  }

  return (
    <motion.main 
      className="min-h-screen bg-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section */}
      <section className="relative min-h-[50vh] sm:min-h-[40vh] md:min-h-[60vh] lg:min-h-[60vh] flex items-center justify-center pt-20 sm:pt-20 md:pt-12">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />

        <motion.div 
          className="relative z-10 text-center max-w-6xl mx-auto px-6 pt-8 sm:pt-12 md:pt-16 lg:pt-32"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
            variants={itemVariants}
          >
            Awards & Recognition
            <span className="block text-red-700 italic">of Excellence.</span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
           Celebrating excellence in Quarter 3 2025. 
           KW Singapore recognizes outstanding consultants who demonstrated exceptional performance in media production, AI automation, and training systems—building brands, growing businesses, and scaling sustainably.
          </motion.p>
        </motion.div>
      </section>

      

      {/* Awards Grid Section */}
      <AwardsFilter />
      
    </motion.main>
  )
} 