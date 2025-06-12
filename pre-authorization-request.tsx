"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  X,
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
  ChevronDown,
  ChevronUp,
  Paperclip,
  Save,
  Send,
  Plus,
  Calendar,
  FileSearch,
  CheckCircle,
  ChevronRight,
  Upload,
  Download,
  File,
  ImageIcon,
  FileTextIcon,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "./auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import NextImage from "next/image"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PreAuthorizationRequestProps {
  requestId: string
}

export default function PreAuthorizationRequest({ requestId }: PreAuthorizationRequestProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [queryOpen, setQueryOpen] = useState(false)
  const [queryText, setQueryText] = useState("")
  const { user, logout } = useAuth()
  const [attachedFiles, setAttachedFiles] = useState<File[]>([])
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const queryAttachmentInputRef = useRef<HTMLInputElement>(null)

  const [showQueryDialog, setShowQueryDialog] = useState(false)
  const [selectedQuery, setSelectedQuery] = useState<any>(null)
  const [isNewQuery, setIsNewQuery] = useState(false)

  const [showAttachmentViewer, setShowAttachmentViewer] = useState(false)
  const [currentAttachments, setCurrentAttachments] = useState<any[]>([])

  const [queryForm, setQueryForm] = useState({
    professionalCategory: "Doctors",
    department: "Emergency department",
    assignedTo: "General Practitioner",
    emailId: "fatma@muscatroyal.com",
    subject: "Procedure",
    description: "",
    reply: "",
  })

  // Sample data - in real app this would come from API based on requestId
  const requestData = {
    patient: {
      name: "Ahmed Al-Harthy",
      civilId: "29618735",
      mrn: "345-56-349",
      dob: "10.10.1958",
      age: "66",
      nationality: "Omani",
      gender: "Male",
      maritalStatus: "Married",
    },
    insurance: {
      company: "Mednet",
      tpa: "Orient",
      memberId: "123456789",
      validPeriod: {
        from: "01-01-2005",
        to: "01-12-2025",
      },
    },
    visit: {
      id: "7692468",
      category: "Acute",
      date: "10.10.2020",
      encounterType: "Transferred",
      encounterStart: "10.10.2020",
      encounterStartTime: "11.00 AM",
      encounterEnd: "10.10.2020",
      encounterEndTime: "09.00 AM",
      visitType: "Emergency",
      physicianName: "Dr. Fatma",
      specialty: "Acute",
      clinicianId: "9859095",
      priorAuthRef: "--------",
    },
    diagnosis: [
      {
        icd10Code: "J00",
        description: "Acute nasopharyngitis",
      },
      {
        icd10Code: "J10.0",
        description: "Influenza with pneumonia, season",
      },
    ],
    services: [
      {
        no: "01",
        category: "Drug",
        code: "J7620",
        description: "Ipratropium - for nebulizer",
        quantity: 2,
        gross: "2 OMR",
        patientShare: "0 OMR",
        net: "2 OMR",
        status: "Approved",
        observation: "",
      },
      {
        no: "02",
        category: "Diagnostic, Radiology",
        code: "71046",
        description: "X-Ray, chest",
        quantity: 1,
        gross: "10 OMR",
        patientShare: "0 OMR",
        net: "10 OMR",
        status: "Approved",
        observation: "",
      },
    ],
    total: {
      gross: "12 OMR",
      patientShare: "0 OMR",
      net: "12 OMR",
    },
  }

  // Sample attachments data
  const sampleAttachments = [
    { id: 1, name: "X-Ray-Report.pdf", type: "pdf", size: "1.2 MB", date: "10-06-2020" },
    { id: 2, name: "Lab-Results.pdf", type: "pdf", size: "0.8 MB", date: "09-06-2020" },
    { id: 3, name: "Patient-Consent.jpg", type: "image", size: "2.4 MB", date: "09-06-2020" },
  ]

  const sidebarItems = [
    { icon: FileText, label: "Eligibility", active: false, href: "/eligibility" },
    { icon: ClipboardList, label: "Pre-authorization", active: true, href: "/pre-authorization" },
    { icon: Users, label: "Claims coding Queue", active: false, href: "/claims-coding" },
    { icon: BarChart3, label: "Claims QC", active: false, href: "/claims-qc" },
    { icon: Settings, label: "Denial Management", active: false, href: "/denial-management" },
    { icon: Home, label: "Dashboard", active: false, href: "/dashboard" },
    { icon: BarChart3, label: "Payment allocation", active: false, href: "/payment-allocation" },
    { icon: FileText, label: "Reports", active: false, href: "/reports" },
  ]

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleSave = () => {
    // Handle save functionality
    console.log("Saving request...")
  }

  const handleSubmit = () => {
    // Handle submit functionality
    console.log("Submitting request...")
    setShowSuccessDialog(true)
  }

  const handleAttachFile = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setAttachedFiles((prev) => [...prev, ...files])
  }

  const handleSendQuery = () => {
    // Handle send query functionality
    console.log("Sending query:", queryText)
    setQueryText("")
    setQueryOpen(false)
  }

  const handleQueryRowClick = (query: any) => {
    setSelectedQuery(query)
    setIsNewQuery(false)
    setShowQueryDialog(true)
  }

  const handleNewQuery = () => {
    setSelectedQuery(null)
    setIsNewQuery(true)
    setQueryForm({
      professionalCategory: "Doctors",
      department: "Emergency department",
      assignedTo: "General Practitioner",
      emailId: "fatma@muscatroyal.com",
      subject: "",
      description: "",
      reply: "",
    })
    setShowQueryDialog(true)
  }

  const handleResolveQuery = () => {
    console.log("Resolving query...")
    setShowQueryDialog(false)
  }

  const handleSendNewQueryFromDialog = () => {
    console.log("Sending new query:", queryForm)
    setShowQueryDialog(false)
  }

  const handleViewAttachments = () => {
    setCurrentAttachments(sampleAttachments)
    setShowAttachmentViewer(true)
  }

  const handleQueryAttachment = () => {
    queryAttachmentInputRef.current?.click()
  }

  const handleQueryAttachmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    console.log("Attaching files to query:", files)
    // In a real app, you would upload these files and add them to the query
  }

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return <FileTextIcon className="w-8 h-8 text-red-500" />
      case "image":
      case "jpg":
      case "jpeg":
      case "png":
        return <ImageIcon className="w-8 h-8 text-blue-500" />
      default:
        return <File className="w-8 h-8 text-gray-500" />
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
                <NextImage
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
              <Link href="/pre-authorization">
                <Button variant="ghost" size="sm" className="gap-2">
                  <X className="w-4 h-4" />
                </Button>
              </Link>
              <div className="min-w-0">
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-1 truncate">
                  Pre-authorization Request
                </h1>
                <p className="text-xs lg:text-sm text-gray-500">Pre-authorization request</p>
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
            {/* Patient Information */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Patient Details */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="px-6 py-4 bg-blue-50 border-b border-blue-100">
                  <CardTitle className="text-lg font-semibold text-blue-900 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    {requestData.patient.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 py-4 space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Civil ID</span>
                      <p className="font-medium text-gray-900">{requestData.patient.civilId}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">MRN</span>
                      <p className="font-medium text-gray-900">{requestData.patient.mrn}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">DOB</span>
                      <p className="font-medium text-gray-900">{requestData.patient.dob}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Age</span>
                      <p className="font-medium text-gray-900">{requestData.patient.age}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Nationality</span>
                      <p className="font-medium text-gray-900">{requestData.patient.nationality}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Gender</span>
                      <p className="font-medium text-gray-900">{requestData.patient.gender}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-500">Marital status</span>
                      <p className="font-medium text-gray-900">{requestData.patient.maritalStatus}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Insurance Details */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="px-6 py-4 bg-emerald-50 border-b border-emerald-100">
                  <CardTitle className="text-lg font-semibold text-emerald-900 flex items-center gap-2">
                    <ClipboardList className="w-5 h-5" />
                    Insurance details
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 py-4 space-y-3">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Insurance</span>
                      <span className="font-medium text-gray-900">{requestData.insurance.company}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">TPA</span>
                      <span className="font-medium text-gray-900">{requestData.insurance.tpa}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Member ID</span>
                      <span className="font-medium text-gray-900">{requestData.insurance.memberId}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-100">
                      <div className="text-gray-500 mb-2">Valid period</div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-900">{requestData.insurance.validPeriod.from}</span>
                        <span className="text-gray-900">{requestData.insurance.validPeriod.to}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Visit Information */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="px-6 py-4 bg-purple-50 border-b border-purple-100">
                  <CardTitle className="text-lg font-semibold text-purple-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Visit Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 py-4 space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Visit ID</span>
                      <p className="font-medium text-gray-900">{requestData.visit.id}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Visit Category</span>
                      <p className="font-medium text-gray-900">{requestData.visit.category}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Visit date</span>
                      <p className="font-medium text-gray-900">{requestData.visit.date}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Encounter type</span>
                      <p className="font-medium text-gray-900">{requestData.visit.encounterType}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Encounter start</span>
                      <p className="font-medium text-gray-900">{requestData.visit.encounterStart}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Time</span>
                      <p className="font-medium text-gray-900">{requestData.visit.encounterStartTime}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Encounter End</span>
                      <p className="font-medium text-gray-900">{requestData.visit.encounterEnd}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Time</span>
                      <p className="font-medium text-gray-900">{requestData.visit.encounterEndTime}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Visit type</span>
                      <p className="font-medium text-gray-900">{requestData.visit.visitType}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Physician name</span>
                      <p className="font-medium text-gray-900">{requestData.visit.physicianName}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Speciality</span>
                      <p className="font-medium text-gray-900">{requestData.visit.specialty}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Clinician ID</span>
                      <p className="font-medium text-gray-900">{requestData.visit.clinicianId}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-500">Prior Authorization Ref / ID</span>
                      <p className="font-medium text-gray-900">{requestData.visit.priorAuthRef}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Diagnosis Section */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="px-6 py-4 bg-orange-50 border-b border-orange-100">
                <CardTitle className="text-lg font-semibold text-orange-900 flex items-center gap-2">
                  <FileSearch className="w-5 h-5" />
                  Diagnosis from physician
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 py-4">
                <div className="space-y-4">
                  {requestData.diagnosis.map((diagnosis, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <span className="text-gray-500 text-sm">ICD10 code</span>
                        <p className="font-medium text-gray-900">{diagnosis.icd10Code}</p>
                      </div>
                      <div className="md:col-span-2">
                        <span className="text-gray-500 text-sm">Description</span>
                        <p className="font-medium text-gray-900">{diagnosis.description}</p>
                      </div>
                    </div>
                  ))}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg">
                    <div>
                      <span className="text-gray-500 text-sm">Type</span>
                      <p className="font-medium text-gray-900">Primary</p>
                      <span className="text-gray-500 text-sm mt-2 block">Type</span>
                      <p className="font-medium text-gray-900">Secondary</p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">POA</span>
                      <p className="font-medium text-gray-900">-</p>
                      <span className="text-gray-500 text-sm mt-2 block">POA</span>
                      <p className="font-medium text-gray-900">-</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Diagnosis
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Service Details */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="px-6 py-4 bg-indigo-50 border-b border-indigo-100">
                <CardTitle className="text-lg font-semibold text-indigo-900">Service details</CardTitle>
              </CardHeader>
              <CardContent className="px-6 py-4">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1000px]">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left p-3 text-sm font-semibold text-gray-700">No</th>
                        <th className="text-left p-3 text-sm font-semibold text-gray-700">Category</th>
                        <th className="text-left p-3 text-sm font-semibold text-gray-700">Code</th>
                        <th className="text-left p-3 text-sm font-semibold text-gray-700">Description</th>
                        <th className="text-left p-3 text-sm font-semibold text-gray-700">Quantity</th>
                        <th className="text-left p-3 text-sm font-semibold text-gray-700">Gross</th>
                        <th className="text-left p-3 text-sm font-semibold text-gray-700">Patient share</th>
                        <th className="text-left p-3 text-sm font-semibold text-gray-700">Net</th>
                        <th className="text-left p-3 text-sm font-semibold text-gray-700">Status</th>
                        <th className="text-left p-3 text-sm font-semibold text-gray-700">Observation text</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requestData.services.map((service, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3 text-sm text-gray-900">{service.no}</td>
                          <td className="p-3 text-sm text-gray-900">{service.category}</td>
                          <td className="p-3 text-sm text-gray-900 font-mono">{service.code}</td>
                          <td className="p-3 text-sm text-gray-900">{service.description}</td>
                          <td className="p-3 text-sm text-gray-900 text-center">{service.quantity}</td>
                          <td className="p-3 text-sm text-gray-900">{service.gross}</td>
                          <td className="p-3 text-sm text-gray-900">{service.patientShare}</td>
                          <td className="p-3 text-sm text-gray-900">{service.net}</td>
                          <td className="p-3">
                            <Badge className={`${getStatusColor(service.status)} border`}>{service.status}</Badge>
                          </td>
                          <td className="p-3 text-sm text-gray-900">{service.observation || "-"}</td>
                        </tr>
                      ))}
                      <tr className="border-t-2 border-gray-300 bg-gray-50 font-semibold">
                        <td className="p-3 text-sm text-gray-900" colSpan={5}>
                          Total
                        </td>
                        <td className="p-3 text-sm text-gray-900">{requestData.total.gross}</td>
                        <td className="p-3 text-sm text-gray-900">{requestData.total.patientShare}</td>
                        <td className="p-3 text-sm text-gray-900">{requestData.total.net}</td>
                        <td className="p-3" colSpan={2}></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="gap-2">
                  <FileSearch className="w-4 h-4" />
                  Access EMR
                </Button>
                <Button variant="outline" className="gap-2" onClick={handleAttachFile}>
                  <Paperclip className="w-4 h-4" />
                  Attach
                  <Badge variant="secondary" className="ml-1">
                    {attachedFiles.length}
                  </Badge>
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="gap-2" onClick={handleSave}>
                  <Save className="w-4 h-4" />
                  Save
                </Button>
                <Button className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={handleSubmit}>
                  <Send className="w-4 h-4" />
                  Submit
                </Button>
              </div>
            </div>

            {/* Queries Section */}
            <Collapsible open={queryOpen} onOpenChange={setQueryOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-4 h-auto border border-gray-200 rounded-lg">
                  <span className="text-lg font-semibold text-gray-900">Queries</span>
                  {queryOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[800px]">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="text-left p-4 text-sm font-semibold text-gray-700 whitespace-nowrap">
                              Department
                            </th>
                            <th className="text-left p-4 text-sm font-semibold text-gray-700 whitespace-nowrap">
                              Subject
                            </th>
                            <th className="text-left p-4 text-sm font-semibold text-gray-700 whitespace-nowrap">
                              Status
                            </th>
                            <th className="text-left p-4 text-sm font-semibold text-gray-700 whitespace-nowrap">
                              Submitted
                            </th>
                            <th className="text-left p-4 text-sm font-semibold text-gray-700 whitespace-nowrap">
                              Queried by
                            </th>
                            <th className="text-left p-4 text-sm font-semibold text-gray-700 whitespace-nowrap w-20"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="p-4 text-sm text-gray-900">Doctors</td>
                            <td className="p-4 text-sm text-gray-900">Procedure</td>
                            <td className="p-4">
                              <Badge className="bg-blue-100 text-blue-800 border-blue-200">Open</Badge>
                            </td>
                            <td className="p-4 text-sm text-gray-900">09-06-2020</td>
                            <td className="p-4 text-sm text-gray-900">Coder 1</td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="w-8 h-8 p-0"
                                  onClick={handleViewAttachments}
                                >
                                  <Paperclip className="w-4 h-4 text-blue-600" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="w-8 h-8 p-0"
                                  onClick={() =>
                                    handleQueryRowClick({
                                      department: "Doctors",
                                      subject: "Procedure",
                                      status: "Open",
                                      submitted: "09-06-2020",
                                      queriedBy: "Coder 1",
                                    })
                                  }
                                >
                                  <ChevronRight className="w-4 h-4 text-gray-400" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="p-4 text-sm text-gray-900">Radiology</td>
                            <td className="p-4 text-sm text-gray-900">X-Ray Chest</td>
                            <td className="p-4">
                              <Badge className="bg-green-100 text-green-800 border-green-200">Responded</Badge>
                            </td>
                            <td className="p-4 text-sm text-gray-900">09-06-2020</td>
                            <td className="p-4 text-sm text-gray-900">Coder 2</td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="w-8 h-8 p-0"
                                  onClick={handleViewAttachments}
                                >
                                  <Paperclip className="w-4 h-4 text-blue-600" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="w-8 h-8 p-0"
                                  onClick={() =>
                                    handleQueryRowClick({
                                      department: "Radiology",
                                      subject: "X-Ray Chest",
                                      status: "Responded",
                                      submitted: "09-06-2020",
                                      queriedBy: "Coder 2",
                                    })
                                  }
                                >
                                  <ChevronRight className="w-4 h-4 text-gray-400" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="p-4 text-sm text-gray-900">Pathology lab</td>
                            <td className="p-4 text-sm text-gray-900">Culture and antimicrobial susceptibility test</td>
                            <td className="p-4">
                              <Badge className="bg-gray-100 text-gray-800 border-gray-200">Resolved</Badge>
                            </td>
                            <td className="p-4 text-sm text-gray-900">09-06-2020</td>
                            <td className="p-4 text-sm text-gray-900">Coder 1</td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="w-8 h-8 p-0"
                                  onClick={handleViewAttachments}
                                >
                                  <Paperclip className="w-4 h-4 text-blue-600" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="w-8 h-8 p-0"
                                  onClick={() =>
                                    handleQueryRowClick({
                                      department: "Pathology lab",
                                      subject: "Culture and antimicrobial susceptibility test",
                                      status: "Resolved",
                                      submitted: "09-06-2020",
                                      queriedBy: "Coder 1",
                                    })
                                  }
                                >
                                  <ChevronRight className="w-4 h-4 text-gray-400" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="p-4 border-t border-gray-200">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleNewQuery}>
                        Send new query
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      {showSuccessDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Submitted Successfully!</h3>
              <p className="text-gray-600 mb-6">Your pre-authorization request has been submitted for review.</p>
              <Button onClick={() => setShowSuccessDialog(false)} className="bg-blue-600 hover:bg-blue-700 text-white">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Attachment Viewer Dialog */}
      {showAttachmentViewer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Attachments</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowAttachmentViewer(false)} className="w-8 h-8 p-0">
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="space-y-4">
                {currentAttachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-4">
                      {getFileIcon(attachment.type)}
                      <div>
                        <p className="font-medium text-gray-900">{attachment.name}</p>
                        <p className="text-sm text-gray-500">
                          {attachment.size} • {attachment.date}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end p-6 border-t border-gray-200">
              <Button onClick={() => setShowAttachmentViewer(false)} variant="outline">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Query Details Dialog */}
      {showQueryDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Query details</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowQueryDialog(false)} className="w-8 h-8 p-0">
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Patient Information Table */}
              <div className="mb-8">
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-3 text-sm font-semibold text-gray-700 border-r border-gray-200 whitespace-nowrap">
                          Visit ID
                        </th>
                        <th className="text-left p-3 text-sm font-semibold text-gray-700 border-r border-gray-200 whitespace-nowrap">
                          Name
                        </th>
                        <th className="text-left p-3 text-sm font-semibold text-gray-700 border-r border-gray-200 whitespace-nowrap">
                          Status
                        </th>
                        <th className="text-left p-3 text-sm font-semibold text-gray-700 border-r border-gray-200 whitespace-nowrap">
                          Visit date
                        </th>
                        <th className="text-left p-3 text-sm font-semibold text-gray-700 border-r border-gray-200 whitespace-nowrap">
                          Speciality
                        </th>
                        <th className="text-left p-3 text-sm font-semibold text-gray-700 border-r border-gray-200 whitespace-nowrap">
                          Physician
                        </th>
                        <th className="text-left p-3 text-sm font-semibold text-gray-700 border-r border-gray-200 whitespace-nowrap">
                          Visit type
                        </th>
                        <th className="text-left p-3 text-sm font-semibold text-gray-700 border-r border-gray-200 whitespace-nowrap">
                          Created by
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-200">
                        <td className="p-3 text-sm text-gray-900 border-r border-gray-200">7692468</td>
                        <td className="p-3 text-sm text-gray-900 border-r border-gray-200">Ahmed Al-Harthy</td>
                        <td className="p-3 border-r border-gray-200">
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200">New visit</Badge>
                        </td>
                        <td className="p-3 text-sm text-gray-900 border-r border-gray-200">10.10.2020</td>
                        <td className="p-3 text-sm text-gray-900 border-r border-gray-200">Acute medicine</td>
                        <td className="p-3 text-sm text-gray-900 border-r border-gray-200">Dr. Fatma</td>
                        <td className="p-3 text-sm text-gray-900 border-r border-gray-200">Emergency</td>
                        <td className="p-3 text-sm text-gray-900 border-r border-gray-200">
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs text-white">
                            KA
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-8">
                {/* Dropdown Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Professional category</label>
                    <Select
                      value={queryForm.professionalCategory}
                      onValueChange={(value) => setQueryForm({ ...queryForm, professionalCategory: value })}
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Doctors">Doctors</SelectItem>
                        <SelectItem value="Nurses">Nurses</SelectItem>
                        <SelectItem value="Technicians">Technicians</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department/Speciality</label>
                    <Select
                      value={queryForm.department}
                      onValueChange={(value) => setQueryForm({ ...queryForm, department: value })}
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Emergency department">Emergency department</SelectItem>
                        <SelectItem value="Internal Medicine">Internal Medicine</SelectItem>
                        <SelectItem value="Surgery">Surgery</SelectItem>
                        <SelectItem value="Radiology">Radiology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Assigned to</label>
                    <Select
                      value={queryForm.assignedTo}
                      onValueChange={(value) => setQueryForm({ ...queryForm, assignedTo: value })}
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General Practitioner">General Practitioner</SelectItem>
                        <SelectItem value="Specialist">Specialist</SelectItem>
                        <SelectItem value="Consultant">Consultant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email ID</label>
                    <Select
                      value={queryForm.emailId}
                      onValueChange={(value) => setQueryForm({ ...queryForm, emailId: value })}
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fatma@muscatroyal.com">fatma@muscatroyal.com</SelectItem>
                        <SelectItem value="admin@muscatroyal.com">admin@muscatroyal.com</SelectItem>
                        <SelectItem value="support@muscatroyal.com">support@muscatroyal.com</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Query Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Query Subject</label>
                  <Input
                    value={queryForm.subject}
                    onChange={(e) => setQueryForm({ ...queryForm, subject: e.target.value })}
                    placeholder="Enter query subject"
                    className="bg-white"
                  />
                </div>

                {/* Query Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Query Description</label>
                  <Textarea
                    value={queryForm.description}
                    onChange={(e) => setQueryForm({ ...queryForm, description: e.target.value })}
                    placeholder={
                      isNewQuery
                        ? "Enter query description..."
                        : "Lorem ipsum dolor sit amet. Quo assumenda voluptas eos porro perferendis eos nihil omnis. Quo pariatur dolorem eum nulla soluta ad aliquid dolorum sed magni blanditiis. Qui delectus dolor et magnam dolorum ut cupiditate incidunt id minus sapiente et nihil commodi.\n\n33 expedita nihil aut obcaecati accusamus eos dolores voluptatibus et commodi ullam ea justo repellendus est magni aperiam At dignissimos doloribus. Ut perferendis unde non magni voluptatem qui unde nesciunt.\n\nEum suscipit dolore ab galisum galisum aut facere eligendi ut saepe eligendi. Ea distinctio nihil vel quia fugiat et numquam fugit et quaerat enim cum consequatur sequi ut quis blanditiis."
                    }
                    rows={6}
                    className="bg-white resize-none"
                  />
                </div>

                {/* Query Reply */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Query Reply</label>
                  <Textarea
                    value={queryForm.reply}
                    onChange={(e) => setQueryForm({ ...queryForm, reply: e.target.value })}
                    placeholder="Enter your reply..."
                    rows={4}
                    className="bg-white resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between p-6 pb-10 border-t border-gray-200 bg-gray-50">
              <Button onClick={handleResolveQuery} className="bg-blue-600 hover:bg-blue-700 text-white">
                Resolve
              </Button>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="gap-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                  onClick={handleQueryAttachment}
                >
                  <Upload className="w-4 h-4" />
                  Upload Attachment
                </Button>
                <input
                  ref={queryAttachmentInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleQueryAttachmentChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <Button onClick={handleSendNewQueryFromDialog} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Send new query
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
