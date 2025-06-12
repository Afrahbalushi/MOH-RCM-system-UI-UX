"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
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
  Search,
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

export default function ClaimsQCSubmission() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedClaims, setSelectedClaims] = useState<string[]>([])
  const { user, logout } = useAuth()
  const router = useRouter()
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)

  const claimsData = [
    {
      id: "1",
      slNo: "13912",
      insurance: "Mednet",
      payer: "Orient",
      clinicianId: "9859095",
      visitType: "OP",
      mrn: "345-56-349",
      name: "Ahmed Al-Harthy",
      netAmount: "12.00",
      visitId: "7692468",
      invoiceNo: "4736291",
      dateOfVisit: "10-10-2020",
      gross: "12.00",
      patientShare: "0.00",
    },
    {
      id: "2",
      slNo: "13913",
      insurance: "Nextcare",
      payer: "Orient",
      clinicianId: "9859096",
      visitType: "IP",
      mrn: "345-56-350",
      name: "Noura Al-Said",
      netAmount: "25.00",
      visitId: "7692469",
      invoiceNo: "4736292",
      dateOfVisit: "10-10-2020",
      gross: "25.00",
      patientShare: "5.00",
    },
    {
      id: "3",
      slNo: "13914",
      insurance: "Regal Insurance",
      payer: "Payer",
      clinicianId: "9859097",
      visitType: "OP",
      mrn: "345-56-351",
      name: "Zayed Al-Khalil",
      netAmount: "18.50",
      visitId: "7692470",
      invoiceNo: "4736293",
      dateOfVisit: "10-10-2020",
      gross: "18.50",
      patientShare: "2.50",
    },
  ]

  const sidebarItems = [
    { icon: FileText, label: "Eligibility", active: false, href: "/eligibility" },
    { icon: ClipboardList, label: "Pre-authorization", active: false, href: "/pre-authorization" },
    { icon: Users, label: "Claims coding Queue", active: false, href: "/claims-coding" },
    { icon: BarChart3, label: "Claims QC", active: true, href: "/claims-qc" },
    { icon: Settings, label: "Denial Management", active: false, href: "/denial-management" },
    { icon: Home, label: "Dashboard", active: false, href: "/dashboard" },
    { icon: BarChart3, label: "Payment allocation", active: false, href: "/payment-allocation" },
    { icon: FileText, label: "Reports", active: false, href: "/reports" },
  ]

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedClaims(claimsData.map((claim) => claim.id))
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

  const handleViewClaim = (claimId: string) => {
    router.push(`/claims-coding/${claimId}`)
  }

  const calculateTotals = () => {
    return claimsData.reduce(
      (totals, claim) => ({
        netAmount: totals.netAmount + Number.parseFloat(claim.netAmount),
        gross: totals.gross + Number.parseFloat(claim.gross),
        patientShare: totals.patientShare + Number.parseFloat(claim.patientShare),
      }),
      { netAmount: 0, gross: 0, patientShare: 0 },
    )
  }

  const totals = calculateTotals()

  const handleSubmitToDHAMANI = () => {
    setShowSubmitDialog(true)
    // Auto close after 2 seconds
    setTimeout(() => {
      setShowSubmitDialog(false)
    }, 2000)
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
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-1 truncate">
                  Claims QC & Submission
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
            {/* Filters - First Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 lg:gap-4">
              <Select>
                <SelectTrigger className="bg-white h-10">
                  <SelectValue placeholder="Facility ID" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xxxxx">xxxxx</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="bg-white h-10">
                  <SelectValue placeholder="Facility name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xxxxx">xxxxx</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="bg-white h-10">
                  <SelectValue placeholder="Claim type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="insurance">Insurance</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="bg-white h-10">
                  <SelectValue placeholder="Insurance / TPA" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mednet">Mednet, Cigna, A...</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="bg-white h-10">
                  <SelectValue placeholder="Payer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="orient">Orient</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="bg-white h-10">
                  <SelectValue placeholder="Search on ID type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visit-id">Visit ID</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filters - Second Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 lg:gap-4">
              <Select>
                <SelectTrigger className="bg-white h-10">
                  <SelectValue placeholder="Visit type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="bg-white h-10">
                  <SelectValue placeholder="Codified by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ali-khalid">Ali Khalid</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="bg-white h-10">
                  <SelectValue placeholder="Date selection" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discharge-date">Discharge date</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="bg-white h-10">
                  <SelectValue placeholder="From date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="from-date">From date</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="bg-white h-10">
                  <SelectValue placeholder="To date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="to-date">To date</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative">
                <Input placeholder="7692468" className="bg-white h-10 pr-20" />
                <Button size="sm" className="absolute right-1 top-1 h-8 px-3 bg-blue-600 hover:bg-blue-700">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Search Buttons */}
            <div className="flex justify-end gap-3">
              <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700 border-blue-600">
                Search
              </Button>
            </div>

            {/* Claims Table */}
            <Card className="border-0 shadow-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1400px] border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={selectedClaims.length === claimsData.length}
                              onCheckedChange={handleSelectAll}
                            />
                            <span>Select all</span>
                          </div>
                        </th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700">SI no.</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700">Insurance / TPA</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700">Payer</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700">Clinician ID</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700">Visit type</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700">MRN</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700">Name</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700">Net Amount</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700">Visit ID</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700">Invoice No.</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700">Date of visit</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700">Gross</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700">Patient share</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700">View claim</th>
                      </tr>
                    </thead>
                    <tbody>
                      {claimsData.map((claim) => (
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
                          <td className="py-3 px-3 text-xs text-gray-900">{claim.slNo}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{claim.insurance}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{claim.payer}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{claim.clinicianId}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{claim.visitType}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{claim.mrn}</td>
                          <td className="py-3 px-3 text-xs font-medium text-gray-900">{claim.name}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{claim.netAmount}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{claim.visitId}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{claim.invoiceNo}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{claim.dateOfVisit}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{claim.gross}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{claim.patientShare}</td>
                          <td className="py-3 px-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewClaim(claim.id)}
                              className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                      {/* Total Row */}
                      <tr className="bg-gray-50 border-t-2 border-gray-200 font-semibold">
                        <td className="py-3 px-3 text-xs text-gray-900" colSpan={8}>
                          Total
                        </td>
                        <td className="py-3 px-3 text-xs text-gray-900">{totals.netAmount.toFixed(2)}</td>
                        <td className="py-3 px-3 text-xs text-gray-900" colSpan={3}>
                          Total
                        </td>
                        <td className="py-3 px-3 text-xs text-gray-900">{totals.gross.toFixed(2)}</td>
                        <td className="py-3 px-3 text-xs text-gray-900">{totals.patientShare.toFixed(2)}</td>
                        <td className="py-3 px-3 text-xs text-gray-900">Total</td>
                      </tr>
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
                  Export XML / JSON file
                </Button>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Test</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
