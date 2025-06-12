"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  FileText,
  Users,
  ClipboardList,
  BarChart3,
  Settings,
  Home,
  Menu,
  XCircle,
  LogOut,
  User,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "./auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"

export default function DenialManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedClaims, setSelectedClaims] = useState<string[]>([])
  const { user, logout } = useAuth()
  const router = useRouter()

  const denialData = [
    {
      id: "1",
      slNo: "13912",
      insuranceTPA: "Mednet",
      payer: "Orient",
      claimId: "986436",
      mrn: "345-56-349",
      civilId: "29618735",
      patientName: "Ahmed Al-Harthy",
      visitType: "Emergency",
      remittedDate: "10.10.2020",
      settlementDate: "11.10.2020",
      paymentStatus: "Pending",
      visitId: "7692468",
      invoiceNo: "4736291",
      dateOfService: "09.10.2020",
      grossAmount: "12.00",
      patientShare: "0.00",
      netAmount: "12.00",
      paidAmount: "0.00",
      rejectedAmount: "12.00",
      amountInProcess: "0.00",
      claimStatus: "Ready for resubmission[1]",
    },
  ]

  const sidebarItems = [
    { icon: FileText, label: "Eligibility", active: false, href: "/eligibility" },
    { icon: ClipboardList, label: "Pre-authorization", active: false, href: "/pre-authorization" },
    { icon: Users, label: "Claims coding Queue", active: false, href: "/claims-coding" },
    { icon: BarChart3, label: "Claims QC", active: false, href: "/claims-qc" },
    { icon: Settings, label: "Denial Management", active: true, href: "/denial-management" },
    { icon: Home, label: "Dashboard", active: false, href: "/dashboard" },
    { icon: BarChart3, label: "Payment allocation", active: false, href: "/payment-allocation" },
    { icon: FileText, label: "Reports", active: false, href: "/reports" },
  ]

  const handleViewClaim = (claimId: string) => {
    router.push(`/resubmission/${claimId}`)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedClaims(denialData.map((claim) => claim.id))
    } else {
      setSelectedClaims([])
    }
  }

  const handleSelectClaim = (claimId: string, checked: boolean) => {
    if (checked) {
      setSelectedClaims([...selectedClaims, claimId])
    } else {
      setSelectedClaims(selectedClaims.filter((id) => id !== claimId))
    }
  }

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
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-1 truncate">Denial Management</h1>
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
                    {user?.avatar || "KA"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                      {user?.avatar || "KA"}
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
            {/* Filters */}
            <div className="space-y-4">
              {/* First Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
                <Select>
                  <SelectTrigger className="bg-white h-10">
                    <SelectValue placeholder="Facility ID" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xxxxxx">xxxxxx</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="bg-white h-10">
                    <SelectValue placeholder="Facility name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xxxxxx">xxxxxx</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="bg-white h-10">
                    <SelectValue placeholder="Service date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="last7days">Last 7 days</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="bg-white h-10">
                    <SelectValue placeholder="From date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10.10.2020">10.10.2020</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="bg-white h-10">
                    <SelectValue placeholder="To date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="11.10.2020">11.10.2020</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
                <Select>
                  <SelectTrigger className="bg-white h-10">
                    <SelectValue placeholder="Discharge date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="bg-white h-10">
                    <SelectValue placeholder="From date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10.10.2020">10.10.2020</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="bg-white h-10">
                    <SelectValue placeholder="To date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="11.10.2020">11.10.2020</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="bg-white h-10">
                    <SelectValue placeholder="Remittance date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="bg-white h-10">
                    <SelectValue placeholder="From date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10.10.2020">10.10.2020</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Third Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
                <Select>
                  <SelectTrigger className="bg-white h-10">
                    <SelectValue placeholder="To date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="11.10.2020">11.10.2020</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="bg-white h-10">
                    <SelectValue placeholder="Insurance / TPA" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mednet">Mednet</SelectItem>
                    <SelectItem value="orient">Orient</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="bg-white h-10">
                    <SelectValue placeholder="Claim status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="denied">Denied</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="bg-white h-10">
                    <SelectValue placeholder="Payer Orient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="orient">Orient</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="bg-white h-10">
                    <SelectValue placeholder="Payment status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Fourth Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
                <Select>
                  <SelectTrigger className="bg-white h-10">
                    <SelectValue placeholder="Visit type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="outpatient">Outpatient</SelectItem>
                    <SelectItem value="inpatient">Inpatient</SelectItem>
                  </SelectContent>
                </Select>

                <div className="lg:col-start-5">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700 h-10 px-8">Search</Button>
                </div>
              </div>
            </div>

            {/* Data Table */}
            <Card className="border-0 shadow-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[2000px] border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={selectedClaims.length === denialData.length}
                              onCheckedChange={handleSelectAll}
                            />
                            <span>Select all</span>
                          </div>
                        </th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700 min-w-[80px]">S.no.</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700 min-w-[120px]">
                          Insurance / TPA
                        </th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700 min-w-[100px]">Payer</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700 min-w-[100px]">
                          Claim ID
                        </th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700 min-w-[100px]">MRN</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700 min-w-[100px]">
                          Civil ID
                        </th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700 min-w-[150px]">
                          Patient name
                        </th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700 min-w-[100px]">
                          Visit type
                        </th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700 min-w-[120px]">
                          Remitted date
                        </th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700 min-w-[120px]">
                          Settlement date
                        </th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700 min-w-[120px]">
                          Payment status
                        </th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700 min-w-[100px]">
                          Visit ID
                        </th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700 min-w-[100px]">
                          Invoice no.
                        </th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700 min-w-[120px]">
                          Date of service
                        </th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700 min-w-[100px]">
                          Gross amount
                        </th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700 min-w-[100px]">
                          Patient share
                        </th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700 min-w-[100px]">
                          Net amount
                        </th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700 min-w-[100px]">
                          Paid amount
                        </th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700 min-w-[120px]">
                          Rejected amount
                        </th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700 min-w-[150px]">
                          Amount in Process with insurance
                        </th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700 min-w-[150px]">
                          Claim status
                        </th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700 min-w-[80px]">View</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700 min-w-[80px]">
                          Select all
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {denialData.map((claim) => (
                        <tr
                          key={claim.id}
                          className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
                        >
                          <td className="py-3 px-3">
                            <Checkbox
                              checked={selectedClaims.includes(claim.id)}
                              onCheckedChange={(checked) => handleSelectClaim(claim.id, checked as boolean)}
                            />
                          </td>
                          <td className="py-3 px-3 text-xs font-medium text-gray-900">{claim.slNo}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{claim.insuranceTPA}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{claim.payer}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{claim.claimId}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{claim.mrn}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{claim.civilId}</td>
                          <td className="py-3 px-3 text-xs font-medium text-gray-900">{claim.patientName}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{claim.visitType}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{claim.remittedDate}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{claim.settlementDate}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{claim.paymentStatus}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{claim.visitId}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{claim.invoiceNo}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{claim.dateOfService}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{claim.grossAmount}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{claim.patientShare}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{claim.netAmount}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{claim.paidAmount}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{claim.rejectedAmount}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{claim.amountInProcess}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{claim.claimStatus}</td>
                          <td className="py-3 px-3">
                            <Link href={`/resubmission/${claim.id}`}>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </Button>
                            </Link>
                          </td>
                          <td className="py-3 px-3">
                            <Checkbox
                              checked={selectedClaims.includes(claim.id)}
                              onCheckedChange={(checked) => handleSelectClaim(claim.id, checked as boolean)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                  Export Excel
                </Button>
                <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                  Export with Activity Items
                </Button>
                <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                  Export without Activity Items
                </Button>
              </div>
              <Button className="bg-blue-600 text-white hover:bg-blue-700">Assign resubmission</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
