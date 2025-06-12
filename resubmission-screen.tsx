"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
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
  X,
  Plus,
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

interface ResubmissionScreenProps {
  claimId: string
}

export default function ResubmissionScreen({ claimId }: ResubmissionScreenProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("resubmission")
  const { user, logout } = useAuth()
  const router = useRouter()

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

  const patientData = {
    name: "Ahmed Al-Harthy",
    civilId: "296187355",
    mrn: "345-56-349",
    dob: "10.10.1958",
    age: "65",
    nationality: "Omani",
    gender: "M",
    maritalStatus: "Married",
  }

  const visitDetails = {
    visitId: "7692468",
    category: "Acute",
    status: "Done",
    date: "10.10.2020",
    type: "Emergency",
    physician: "Dr. Fatima",
    clinician: "876542384",
  }

  const insuranceDetails = {
    provider: "Mednet",
    payer: "Orient",
    memberId: "Member ID",
    validPeriod: "01-01-2005 - 01-12-2025",
  }

  const claimDetails = {
    invoiceNo: "7692468",
    submissionDate: "10.10.2020",
    raDate: "xx-xx-xxxx",
    resubmissionDate: "11.10.2020",
    resubmissionRaDate: "xx-xx-xxxx",
    daysSinceLastRa: "",
    encounterType: "Transferred",
    encounterStart: "10.10.2020 - 11:00 AM",
    encounterEnd: "11.10.2020 - 09:00 AM",
  }

  const diagnosisFromPhysician = [
    { no: "01", icd10: "J00", description: "Acute nasopharyngitis", type: "Primary", poa: "POA" },
    { no: "02", icd10: "J10.0", description: "Influenza with pneumonia, season", type: "Secondary", poa: "POA" },
  ]

  const coderDiagnosis = [
    { no: "01", icd10: "J00", description: "Acute nasopharyngitis", type: "Primary", poa: "POA" },
    { no: "02", icd10: "J10.0", description: "Influenza with pneumonia, season", type: "Secondary", poa: "POA" },
  ]

  const serviceDetails = [
    {
      no: "01",
      category: "Drug",
      code: "J7620",
      description: "Ipratropium for nebulizer",
      quantity: "2",
      grossAmount: "2 OMR",
      patientShare: "0 OMR",
      netAmount: "2 OMR",
      paidAmount: "0 OMR",
      rejectedAmount: "2 OMR",
      denialCode: "888",
      rejectionDescription: "Regular med.",
      authorizationNumber: "749626834",
      resubmission: true,
    },
    {
      no: "02",
      category: "Diagnostic, Radiology",
      code: "71046",
      description: "X-Ray, chest",
      quantity: "1",
      grossAmount: "10 OMR",
      patientShare: "0 OMR",
      netAmount: "10 OMR",
      paidAmount: "0 OMR",
      rejectedAmount: "10 OMR",
      denialCode: "777",
      rejectionDescription: "Funds not found",
      authorizationNumber: "749626834",
      resubmission: true,
    },
  ]

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
              <Link href="/denial-management">
                <Button variant="ghost" size="sm" className="gap-2">
                  <X className="w-4 h-4" />
                </Button>
              </Link>
              <div className="min-w-0">
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-1 truncate">Resubmission screen</h1>
                <p className="text-xs lg:text-sm text-gray-500">Claim Details</p>
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
          <div className="p-4 lg:p-6">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Resubmission screen</h1>
                <div className="flex items-center gap-4">
                  <Button
                    variant={activeTab === "resubmission" ? "default" : "ghost"}
                    className={`px-4 py-2 text-sm ${
                      activeTab === "resubmission"
                        ? "bg-blue-600 text-white border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    onClick={() => setActiveTab("resubmission")}
                  >
                    Resubmission (1)
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Patient Details */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-4">{patientData.name}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Civil ID</span>
                        <span className="text-gray-900">{patientData.civilId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">MRN</span>
                        <span className="text-gray-900">{patientData.mrn}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">DOB</span>
                        <span className="text-gray-900">{patientData.dob}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Age</span>
                        <span className="text-gray-900">{patientData.age}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Nationality</span>
                        <span className="text-gray-900">{patientData.nationality}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gender</span>
                        <span className="text-gray-900">{patientData.gender}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Marital status</span>
                        <span className="text-gray-900">{patientData.maritalStatus}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Insurance Details */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Insurance details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mednet</span>
                        <span className="text-gray-900">Orient</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Member ID</span>
                        <span className="text-gray-900">{insuranceDetails.memberId}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Valid Period */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Valid period</h3>
                    <p className="text-sm text-gray-900">{insuranceDetails.validPeriod}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Middle Column */}
              <div className="space-y-6">
                {/* Visit Details */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Visit details</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="space-y-2">
                          <div>
                            <span className="text-gray-600 block">Visit ID</span>
                            <span className="text-gray-900">{visitDetails.visitId}</span>
                          </div>
                          <div>
                            <span className="text-gray-600 block">Visit status</span>
                            <span className="text-gray-900">{visitDetails.status}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="space-y-2">
                          <div>
                            <span className="text-gray-600 block">Visit Category</span>
                            <span className="text-gray-900">{visitDetails.category}</span>
                          </div>
                          <div>
                            <span className="text-gray-600 block">Speciality</span>
                            <span className="text-gray-900">Acute</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="space-y-2">
                          <div>
                            <span className="text-gray-600 block">Visit date</span>
                            <span className="text-gray-900">{visitDetails.date}</span>
                          </div>
                          <div>
                            <span className="text-gray-600 block">Visit type</span>
                            <span className="text-gray-900">{visitDetails.type}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="space-y-2">
                          <div>
                            <span className="text-gray-600 block">Physician</span>
                            <span className="text-gray-900">{visitDetails.physician}</span>
                          </div>
                          <div>
                            <span className="text-gray-600 block">Clinician ID</span>
                            <span className="text-gray-900">{visitDetails.clinician}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Claim Details */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Claim details</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div>
                          <span className="text-gray-600 block">Invoice no.</span>
                          <span className="text-gray-900">{claimDetails.invoiceNo}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 block">Submission date</span>
                          <span className="text-gray-900">{claimDetails.submissionDate}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 block">RA date</span>
                          <span className="text-gray-900">{claimDetails.raDate}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <span className="text-gray-600 block">Resubmission date</span>
                          <span className="text-gray-900">{claimDetails.resubmissionDate}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 block">Resubmission RA Date</span>
                          <span className="text-gray-900">{claimDetails.resubmissionRaDate}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 block">Days since last RA</span>
                          <span className="text-gray-900">{claimDetails.daysSinceLastRa}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div>
                          <span className="text-gray-600 block">Encounter type</span>
                          <span className="text-gray-900">{claimDetails.encounterType}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 block">Encounter start</span>
                          <span className="text-gray-900">{claimDetails.encounterStart}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <span className="text-gray-600 block">Encounter End</span>
                          <span className="text-gray-900">{claimDetails.encounterEnd}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Diagnosis Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* Diagnosis from Physician */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Diagnosis from physician</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">No.</th>
                          <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">ICD10 code</th>
                          <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Description</th>
                          <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Type</th>
                          <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">POA</th>
                        </tr>
                      </thead>
                      <tbody>
                        {diagnosisFromPhysician.map((diagnosis) => (
                          <tr key={diagnosis.no} className="border-b border-gray-100">
                            <td className="py-2 px-3 text-gray-900">{diagnosis.no}</td>
                            <td className="py-2 px-3 text-gray-900">{diagnosis.icd10}</td>
                            <td className="py-2 px-3 text-gray-900">{diagnosis.description}</td>
                            <td className="py-2 px-3 text-gray-900">{diagnosis.type}</td>
                            <td className="py-2 px-3 text-gray-900">{diagnosis.poa}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Coder Diagnosis */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Coder Diagnosis</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">No.</th>
                          <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">ICD10 code</th>
                          <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Description</th>
                          <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Type</th>
                          <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">POA</th>
                        </tr>
                      </thead>
                      <tbody>
                        {coderDiagnosis.map((diagnosis) => (
                          <tr key={diagnosis.no} className="border-b border-gray-100">
                            <td className="py-2 px-3 text-gray-900">{diagnosis.no}</td>
                            <td className="py-2 px-3 text-gray-900">{diagnosis.icd10}</td>
                            <td className="py-2 px-3 text-gray-900">{diagnosis.description}</td>
                            <td className="py-2 px-3 text-gray-900">{diagnosis.type}</td>
                            <td className="py-2 px-3 text-gray-900">{diagnosis.poa}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Button variant="ghost" size="sm" className="mt-2 text-blue-600 hover:text-blue-700">
                    <Plus className="w-4 h-4 mr-1" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Service Details */}
            <Card className="mt-6">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Service details</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[1400px]">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">No</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Category</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Code</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Description</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Quantity</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Gross amount</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Patient share</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Net amount</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Paid amount</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Rejected amount</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Denial code</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">
                          Rejection Description
                        </th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">
                          Authorization number
                        </th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Resubmission</th>
                      </tr>
                    </thead>
                    <tbody>
                      {serviceDetails.map((service) => (
                        <tr key={service.no} className="border-b border-gray-100">
                          <td className="py-2 px-3 text-gray-900">{service.no}</td>
                          <td className="py-2 px-3 text-gray-900">{service.category}</td>
                          <td className="py-2 px-3 text-gray-900">{service.code}</td>
                          <td className="py-2 px-3 text-gray-900">{service.description}</td>
                          <td className="py-2 px-3 text-gray-900">{service.quantity}</td>
                          <td className="py-2 px-3 text-gray-900">{service.grossAmount}</td>
                          <td className="py-2 px-3 text-gray-900">{service.patientShare}</td>
                          <td className="py-2 px-3 text-gray-900">{service.netAmount}</td>
                          <td className="py-2 px-3 text-gray-900">{service.paidAmount}</td>
                          <td className="py-2 px-3 text-gray-900">{service.rejectedAmount}</td>
                          <td className="py-2 px-3 text-gray-900">{service.denialCode}</td>
                          <td className="py-2 px-3 text-gray-900">{service.rejectionDescription}</td>
                          <td className="py-2 px-3 text-gray-900">{service.authorizationNumber}</td>
                          <td className="py-2 px-3">
                            <Checkbox checked={service.resubmission} />
                          </td>
                        </tr>
                      ))}
                      <tr className="border-b border-gray-200 font-semibold">
                        <td className="py-2 px-3 text-gray-900">Total</td>
                        <td className="py-2 px-3"></td>
                        <td className="py-2 px-3"></td>
                        <td className="py-2 px-3"></td>
                        <td className="py-2 px-3"></td>
                        <td className="py-2 px-3 text-gray-900">12 OMR</td>
                        <td className="py-2 px-3 text-gray-900">0 OMR</td>
                        <td className="py-2 px-3 text-gray-900">12 OMR</td>
                        <td className="py-2 px-3 text-gray-900">12 OMR</td>
                        <td className="py-2 px-3"></td>
                        <td className="py-2 px-3"></td>
                        <td className="py-2 px-3"></td>
                        <td className="py-2 px-3"></td>
                        <td className="py-2 px-3"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                  Access EMR
                </Button>
                <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                  Attach
                  <Badge className="ml-2 bg-blue-600 text-white text-xs">0</Badge>
                </Button>
                <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                  Query
                </Button>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Resubmission remarks</label>
                <Textarea placeholder="Lorem Ipsum" className="min-h-[100px]" />
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-gray-600">Resubmission prepared by</span>
                  <p className="text-sm font-medium text-gray-900">Ali Khalid</p>
                </div>
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="text-gray-600">Prepared date</span>
                    <p className="text-gray-900">11.10.2020</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Time</span>
                    <p className="text-gray-900">02:34 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Final Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              <Button className="bg-blue-600 text-white hover:bg-blue-700">Save draft</Button>
              <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                Ready for resubmission
              </Button>
              <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                Rejection accepted
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
