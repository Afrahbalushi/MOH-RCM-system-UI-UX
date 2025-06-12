"use client"

import { useState } from "react"
import { FileText, Users, ClipboardList, BarChart3, Settings, Home, Menu, XCircle, LogOut, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "./auth-context"
import Link from "next/link"
import Image from "next/image"

const sidebarItems = [
  { icon: FileText, label: "Eligibility", active: false, href: "/eligibility" },
  { icon: ClipboardList, label: "Pre-authorization", active: false, href: "/pre-authorization" },
  { icon: Users, label: "Claims coding Queue", active: false, href: "/claims-coding" },
  { icon: BarChart3, label: "Claims QC", active: false, href: "/claims-qc" },
  { icon: Settings, label: "Denial Management", active: false, href: "/denial-management" },
  { icon: Home, label: "Dashboard", active: true, href: "/dashboard" },
  { icon: BarChart3, label: "Payment allocation", active: false, href: "/payment-allocation" },
  { icon: FileText, label: "Reports", active: false, href: "/reports" },
]

export default function DashboardAnalytics() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 lg:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Image
                  src="/moh-english-logo.png"
                  alt="Ministry of Health Oman"
                  width={120}
                  height={48}
                  className="h-8 w-auto"
                />
              </div>
            </div>
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <XCircle className="w-4 h-4" />
            </Button>
          </div>

          <nav className="flex-1 px-4 lg:px-6 pb-4 space-y-1">
            {sidebarItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <Button
                  variant={item.active ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 h-10 px-3 text-sm ${
                    item.active ? "bg-blue-50 text-blue-700 hover:bg-blue-50" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Button>
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="px-4 lg:px-6 pb-6">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-10 px-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={logout}
            >
              <LogOut className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">Logout</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-5 h-5" />
              </Button>
              <div className="min-w-0">
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-1 truncate">
                  Graph-designs for Dashboard
                </h1>
                <p className="text-xs lg:text-sm text-gray-500">Updated: 09.41h</p>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-4">
              <span className="hidden sm:block text-sm lg:text-lg font-medium text-gray-900 truncate">
                Royal hospital Muscat
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-8 h-8 rounded-full bg-blue-600 p-0 text-white hover:bg-blue-700">
                    KA
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                      KA
                    </div>
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-sm font-medium">{user?.name || "User"}</p>
                      <p className="text-xs text-gray-500">{user?.email || "user@example.com"}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 lg:p-6 space-y-6 lg:space-y-8">
            {/* Top Row - Modern Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Modern Arc Graph */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    Arc Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="relative w-52 h-52 mb-6">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {/* Background circle with gradient */}
                      <defs>
                        <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#1d4ed8" />
                        </linearGradient>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                          <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#e2e8f0" strokeWidth="6" />
                      <circle
                        cx="50"
                        cy="50"
                        r="35"
                        fill="none"
                        stroke="url(#arcGradient)"
                        strokeWidth="6"
                        strokeDasharray={`${65 * 2.2} ${(100 - 65) * 2.2}`}
                        strokeLinecap="round"
                        filter="url(#glow)"
                        className="drop-shadow-lg"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        65%
                      </span>
                      <span className="text-sm text-gray-500 mt-1">Completion</span>
                    </div>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Strategic initiatives are progressing well with strong momentum across all key areas.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Modern Pie Chart */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    Distribution Analysis
                  </CardTitle>
                  <p className="text-sm text-gray-500">Performance breakdown by category</p>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="relative w-52 h-52 mb-6">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <defs>
                        <linearGradient id="pieGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#7c3aed" />
                        </linearGradient>
                        <linearGradient id="pieGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#c084fc" />
                          <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                        <filter id="pieShadow">
                          <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
                        </filter>
                      </defs>
                      {/* Pie slice 1 - 67% */}
                      <path
                        d="M 50 50 L 50 10 A 40 40 0 1 1 18.4 73.2 Z"
                        fill="url(#pieGradient1)"
                        filter="url(#pieShadow)"
                      />
                      {/* Pie slice 2 - 33% */}
                      <path
                        d="M 50 50 L 18.4 73.2 A 40 40 0 0 1 50 10 Z"
                        fill="url(#pieGradient2)"
                        filter="url(#pieShadow)"
                      />
                    </svg>
                    <div className="absolute top-6 right-6 space-y-1">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                        <div className="text-lg font-bold text-purple-600">33%</div>
                      </div>
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                        <div className="text-2xl font-bold text-purple-800">67%</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-6 text-sm bg-white/70 backdrop-blur-sm rounded-lg px-4 py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full shadow-sm"></div>
                      <span className="font-medium">Primary</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full shadow-sm"></div>
                      <span className="font-medium">Secondary</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Modern Gauge Chart */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-teal-50 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                    Performance Gauge
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="relative w-52 h-32 mb-6">
                    <svg className="w-full h-full" viewBox="0 0 200 120">
                      <defs>
                        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#ef4444" />
                          <stop offset="50%" stopColor="#f59e0b" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                        <filter id="gaugeShadow">
                          <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.3" />
                        </filter>
                      </defs>
                      {/* Background arc */}
                      <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                      {/* Gradient arc */}
                      <path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke="url(#gaugeGradient)"
                        strokeWidth="4"
                        opacity="0.3"
                      />
                      {/* Progress arc */}
                      <path
                        d="M 20 100 A 80 80 0 0 1 140 40"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="8"
                        strokeLinecap="round"
                        filter="url(#gaugeShadow)"
                      />
                      {/* Needle */}
                      <line x1="100" y1="100" x2="140" y2="40" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
                      <circle cx="100" cy="100" r="6" fill="#374151" />
                    </svg>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
                        <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                          320.4K
                        </div>
                        <div className="text-xs text-gray-500">Current Value</div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm w-full">
                    <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 text-center">
                      <div className="text-gray-500 text-xs">Minimum</div>
                      <div className="font-bold text-gray-700">0</div>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 text-center">
                      <div className="text-gray-500 text-xs">Maximum</div>
                      <div className="font-bold text-gray-700">400.2K</div>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-xs w-full">
                    <div className="text-center bg-white/50 rounded-lg p-2">
                      <div className="text-gray-500">Current</div>
                      <div className="font-semibold text-emerald-600">18.765</div>
                    </div>
                    <div className="text-center bg-white/50 rounded-lg p-2">
                      <div className="text-gray-500">Average</div>
                      <div className="font-semibold text-blue-600">24.5K</div>
                    </div>
                    <div className="text-center bg-white/50 rounded-lg p-2">
                      <div className="text-gray-500">Target</div>
                      <div className="font-semibold text-orange-600">45.2K</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bottom Row - Modern Bar Chart */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-50 to-gray-50 hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                      Revenue Analytics
                    </CardTitle>
                    <div className="bg-white/70 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                      <div className="text-sm text-gray-500">Total Revenue</div>
                      <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-700 to-gray-700 bg-clip-text text-transparent">
                        23.564K
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 lg:gap-4 text-sm">
                    <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-lg px-3 py-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded shadow-sm"></div>
                      <span className="font-medium text-xs lg:text-sm">Q1 Revenue</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-lg px-3 py-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded shadow-sm"></div>
                      <span className="font-medium text-xs lg:text-sm">Q2 Revenue</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-lg px-3 py-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded shadow-sm"></div>
                      <span className="font-medium text-xs lg:text-sm">Q3 Revenue</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3 lg:p-6">
                  {/* Y-axis labels and chart container */}
                  <div className="flex gap-2 lg:gap-4">
                    {/* Y-axis */}
                    <div className="flex flex-col justify-between h-64 lg:h-80 py-2 text-xs text-gray-500">
                      <span>60</span>
                      <span>50</span>
                      <span>40</span>
                      <span>30</span>
                      <span>20</span>
                      <span>10</span>
                      <span>0</span>
                    </div>

                    {/* Chart area */}
                    <div className="flex-1 relative">
                      {/* Grid lines */}
                      <div className="absolute inset-0 flex flex-col justify-between h-64 lg:h-80 py-2">
                        {[...Array(7)].map((_, i) => (
                          <div key={i} className="border-t border-gray-200/50 w-full"></div>
                        ))}
                      </div>

                      {/* Bars container */}
                      <div className="h-64 lg:h-80 flex items-end justify-between gap-0.5 lg:gap-1 px-1 lg:px-2 relative z-10">
                        {[
                          [20, 25, 15],
                          [30, 20, 25],
                          [25, 35, 20],
                          [40, 30, 25],
                          [35, 25, 30],
                          [45, 40, 35],
                          [50, 35, 25],
                          [30, 45, 20],
                          [35, 30, 40],
                          [25, 20, 15],
                          [40, 35, 30],
                          [45, 50, 35],
                          [35, 40, 25],
                          [30, 25, 35],
                          [25, 30, 20],
                          [40, 35, 45],
                          [35, 40, 30],
                          [30, 25, 20],
                          [45, 50, 40],
                          [50, 45, 35],
                        ].map((values, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center gap-1 flex-1 group cursor-pointer relative"
                          >
                            <div className="flex items-end gap-0.5 lg:gap-1 h-full transition-all duration-300 group-hover:scale-105">
                              <div
                                className="bg-gradient-to-t from-purple-600 to-purple-500 rounded-t shadow-sm hover:shadow-md transition-all duration-300 w-1.5 lg:w-2.5"
                                style={{
                                  height: `${Math.max((values[0] / 60) * 240, 4)}px`,
                                }}
                              ></div>
                              <div
                                className="bg-gradient-to-t from-blue-600 to-blue-500 rounded-t shadow-sm hover:shadow-md transition-all duration-300 w-1.5 lg:w-2.5"
                                style={{
                                  height: `${Math.max((values[1] / 60) * 240, 4)}px`,
                                }}
                              ></div>
                              <div
                                className="bg-gradient-to-t from-orange-600 to-orange-500 rounded-t shadow-sm hover:shadow-md transition-all duration-300 w-1.5 lg:w-2.5"
                                style={{
                                  height: `${Math.max((values[2] / 60) * 240, 4)}px`,
                                }}
                              ></div>
                            </div>

                            {/* Tooltip on hover */}
                            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 whitespace-nowrap">
                              <div className="text-center">
                                <div>Week {index + 1}</div>
                                <div className="flex gap-2 mt-1">
                                  <span className="text-purple-300">{values[0]}K</span>
                                  <span className="text-blue-300">{values[1]}K</span>
                                  <span className="text-orange-300">{values[2]}K</span>
                                </div>
                              </div>
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* X-axis labels */}
                  <div className="flex justify-between mt-2 lg:mt-4 px-2 lg:px-6 text-xs text-gray-500">
                    <span>Jan</span>
                    <span className="hidden sm:inline">Feb</span>
                    <span>Mar</span>
                    <span className="hidden sm:inline">Apr</span>
                    <span>May</span>
                    <span className="hidden sm:inline">Jun</span>
                    <span>Jul</span>
                    <span className="hidden sm:inline">Aug</span>
                    <span>Sep</span>
                    <span className="hidden sm:inline">Oct</span>
                    <span>Nov</span>
                    <span className="hidden sm:inline">Dec</span>
                  </div>

                  {/* Interactive hint */}
                  <div className="mt-4 lg:mt-6 flex justify-center">
                    <div className="bg-white/70 backdrop-blur-sm rounded-lg px-3 lg:px-4 py-2 text-xs lg:text-sm text-gray-600">
                      <span className="font-medium">Hover over bars for detailed values</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
