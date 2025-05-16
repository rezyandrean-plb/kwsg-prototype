"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, Calendar, MessageCircle } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactPage() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"
  ]

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[40vh] w-full">
        <Image
          src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80"
          alt="Contact Us"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-xl text-gray-100 max-w-3xl">
              Get in touch with our team for any inquiries about new launches, partnerships, or career opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-white">Get in Touch</h2>
                <p className="text-gray-300 mb-8">
                  Have questions about new launches or interested in joining our team? We're here to help.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-red/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary-red" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Email Us</h3>
                    <a href="mailto:info@kwnewlaunches.com" className="text-gray-300 hover:text-primary-red transition-colors">
                      info@kwnewlaunches.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary-red/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary-red" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Call Us</h3>
                    <a href="tel:+6561234567" className="text-gray-300 hover:text-primary-red transition-colors">
                      +65 6123 4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary-red/10 p-3 rounded-full">
                    <MessageCircle className="h-6 w-6 text-primary-red" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">WhatsApp</h3>
                    <a 
                      href="https://wa.me/6561234567" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-primary-red transition-colors"
                    >
                      Chat with us on WhatsApp
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary-red/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-primary-red" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">Visit Us</h3>
                    <p className="text-gray-300">8 Marina View, Singapore</p>
                    <div className="mt-4 h-[300px] rounded-lg overflow-hidden border border-gray-700">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8191683777!2d103.8513!3d1.2823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19a936c551cd%3A0x7fb4e58ad9cd826e!2s8%20Marina%20View%2C%20Singapore!5e0!3m2!1sen!2ssg!4v1647881234567!5m2!1sen!2ssg"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary-red/10 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-primary-red" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Business Hours</h3>
                    <p className="text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-300">Saturday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="space-y-8">
              <div className="bg-gray-900 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-white">Send Us a Message</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium text-white">
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        name="firstName"
                        className="bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium text-white">
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        name="lastName"
                        className="bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-white">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-white">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-white">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-white">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      className="bg-gray-800 border-gray-700 text-white min-h-[150px]"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary-red text-white hover:bg-primary-red/90">
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Appointment Scheduling */}
              <div className="bg-gray-900 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-white">Schedule an Appointment</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Select Date</label>
                    <div className="bg-white rounded-md p-4">
                      <div className="max-w-[400px] mx-auto">
                        <CalendarComponent
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          className="w-full"
                          classNames={{
                            months: "w-full",
                            month: "w-full",
                            caption: "flex justify-center pt-1 relative items-center",
                            caption_label: "text-base font-medium",
                            nav: "space-x-1 flex items-center",
                            nav_button: "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100",
                            nav_button_previous: "absolute left-1",
                            nav_button_next: "absolute right-1",
                            table: "w-full border-collapse space-y-1",
                            head_row: "flex justify-between",
                            head_cell: "text-gray-500 rounded-md w-10 font-normal text-sm text-center",
                            row: "flex justify-between mt-2",
                            cell: "w-10 text-center text-base p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-100/50 [&:has([aria-selected])]:bg-gray-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                            day: "h-10 w-10 p-0 font-normal aria-selected:opacity-100 text-base flex items-center justify-center",
                            day_range_end: "day-range-end",
                            day_selected: "bg-primary-red text-white hover:bg-primary-red hover:text-white focus:bg-primary-red focus:text-white",
                            day_today: "bg-gray-100 text-gray-900",
                            day_outside: "day-outside text-gray-400 opacity-50",
                            day_disabled: "text-gray-400 opacity-50",
                            day_range_middle: "aria-selected:bg-gray-100 aria-selected:text-gray-900",
                            day_hidden: "invisible",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Select Time</label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select a time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    className="w-full bg-primary-red text-white hover:bg-primary-red/90"
                    disabled={!selectedDate || !selectedTime}
                  >
                    Schedule Appointment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 