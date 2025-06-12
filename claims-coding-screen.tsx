"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  Save,
  Plus,
  FileSearch,
  Paperclip,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Trash2,
  Upload,
  Download,
  File,
  ImageIcon,
  FileTextIcon,
  Send,
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
import Image from "next/image"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface ClaimsCodingScreenProps {
  claimId: string
}

export default function ClaimsCodingScreen({ claimId }: ClaimsCodingScreenProps) {
  // Add state variables for attachments and query details
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [queryOpen, setQueryOpen] = useState(false)
  const [expandedQuery, setExpandedQuery] = useState<number | null>(null)
  const [showQueryDialog, setShowQueryDialog] = useState(false)
  const [selectedQuery, setSelectedQuery] = useState<any>(null)
  const [isNewQuery, setIsNewQuery] = useState(false)
  const [attachedFiles, setAttachedFiles] = useState<File[]>([])
  const [showAttachmentViewer, setShowAttachmentViewer] = useState(false)
  const [currentAttachments, setCurrentAttachments] = useState<any[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { user, logout } = useAuth()
  const [selectedQueryForAttachments, setSelectedQueryForAttachments] = useState<any>(null)

  // Sample data - in real app this would come from API based on claimId
  const claimData = {
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
      status: "Done",
      type: "Emergency",
      physicianName: "Dr. Fatma",
      specialty: "Acute",
      clinicianId: "9859095",
      invoiceNo: "4736291",
      encounterType: "Transferred",
      encounterStart: "10.10.2020",
      encounterStartTime: "11.00 AM",
      encounterEnd: "11.10.2020",
      encounterEndTime: "09.00 AM",
    },
    diagnosisFromPhysician: [
      {
        icd10Code: "J00",
        description: "Acute nasopharyngitis",
        type: "Primary",
        poa: "",
      },
      {
        icd10Code: "J10.0",
        description: "Influenza with pneumonia, season",
        type: "Secondary",
        poa: "",
      },
    ],
    coderDiagnosis: [
      {
        icd10Code: "J00",
        description: "Acute nasopharyngitis",
        type: "Primary",
        poa: "",
      },
      {
        icd10Code: "J10.0",
        description: "Influenza with pneumonia, season",
        type: "Secondary",
        poa: "",
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
        authorizationNumber: "749626834",
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
        authorizationNumber: "749626834",
      },
    ],
    total: {
      gross: "12 OMR",
      patientShare: "0 OMR",
      net: "12 OMR",
    },
    codingStatus: {
      status: "Hold with remarks",
      codifiedDate: "10.10.2020",
      codifiedTime: "09:15 AM",
      remarks: "Patient expected to need more than insurance standard stay length.",
      codifiedBy: "Ali Khalid, MOH00111",
    },
  }

  // Add sample attachments data
  const sampleAttachments = [
    { id: 1, name: "X-Ray-Report.pdf", type: "pdf", size: "1.2 MB", date: "10-06-2020" },
    { id: 2, name: "Lab-Results.pdf", type: "pdf", size: "0.8 MB", date: "09-06-2020" },
    { id: 3, name: "Patient-Consent.jpg", type: "image", size: "2.4 MB", date: "09-06-2020" },
  ]

  // Add query form state
  const [queryForm, setQueryForm] = useState({
    professionalCategory: "Doctors",
    department: "Emergency department",
    assignedTo: "General Practitioner",
    emailId: "fatma@muscatroyal.com",
    subject: "",
    description: "",
    reply: "",
  })

  // Add handler functions for attachments and queries
  const handleAttachFile = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setAttachedFiles((prev) => [...prev, ...files])
  }

  const handleViewAttachments = () => {
    setCurrentAttachments(sampleAttachments)
    setShowAttachmentViewer(true)
  }

  const handleDeleteAttachment = (id: number) => {
    setCurrentAttachments((prev) => prev.filter((attachment) => attachment.id !== id))
  }

  const handleQueryRowClick = (query: any, index: number) => {
    if (expandedQuery === index) {
      setExpandedQuery(null)
    } else {
      setExpandedQuery(index)
    }
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

  const handleSendNewQueryFromDialog = () => {
    console.log("Sending new query:", queryForm)
    setShowQueryDialog(false)
  }

  const handleDeleteQuery = (index: number) => {
    console.log("Deleting query at index:", index)
    // In a real app, you would delete the query from the database
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

  const queryData = [
    {
      department: "Doctors",
      subject: "Procedure",
      status: "Open",
      submitted: "09-06-2020",
      queriedBy: "Coder 1",
      description: "Please clarify the specific procedure performed as documentation is unclear.",
      response: "",
      attachments: [
        { id: 1, name: "Procedure-Documentation.pdf", type: "pdf", size: "1.5 MB", date: "09-06-2020" },
        { id: 2, name: "Medical-Notes.pdf", type: "pdf", size: "0.9 MB", date: "09-06-2020" },
      ],
    },
    {
      department: "Radiology",
      subject: "X-Ray Chest",
      status: "Responded",
      submitted: "09-06-2020",
      queriedBy: "Coder 2",
      description: "Need clarification on the X-Ray findings related to the pneumonia diagnosis.",
      response: "X-Ray confirms bilateral infiltrates consistent with pneumonia diagnosis.",
      attachments: [
        { id: 3, name: "Chest-XRay-Report.pdf", type: "pdf", size: "2.1 MB", date: "09-06-2020" },
        { id: 4, name: "Radiology-Images.jpg", type: "image", size: "3.2 MB", date: "09-06-2020" },
        { id: 5, name: "Comparison-Study.pdf", type: "pdf", size: "1.8 MB", date: "08-06-2020" },
      ],
    },
    {
      department: "Pathology lab",
      subject: "Culture and antimicrobial susceptibility test",
      status: "Resolved",
      submitted: "09-06-2020",
      queriedBy: "Coder 1",
      description: "Please provide the results of the culture test to confirm appropriate antibiotic coding.",
      response: "Culture showed growth of Streptococcus pneumoniae, sensitive to prescribed antibiotics.",
      attachments: [
        { id: 6, name: "Culture-Results.pdf", type: "pdf", size: "1.1 MB", date: "09-06-2020" },
        { id: 7, name: "Sensitivity-Report.pdf", type: "pdf", size: "0.7 MB", date: "09-06-2020" },
      ],
    },
  ]

  const sidebarItems = [
    { icon: FileText, label: "Eligibility", active: false, href: "/eligibility" },
    { icon: ClipboardList, label: "Pre-authorization", active: false, href: "/pre-authorization" },
    { icon: Users, label: "Claims coding Queue", active: true, href: "/claims-coding" },
    { icon: BarChart3, label: "Claims QC", active: false, href: "/claims-qc" },
    { icon: Settings, label: "Denial Management", active: false, href: "/denial-management" },
    { icon: Home, label: "Dashboard", active: false, href: "/dashboard" },
    { icon: BarChart3, label: "Payment allocation", active: false, href: "/payment-allocation" },
    { icon: FileText, label: "Reports", active: false, href: "/reports" },
  ]

  const handleSave = () => {
    console.log("Saving coding data...")
    setShowSuccessDialog(true)
  }

  const handleQueryAttachmentClick = (query: any, queryIndex: number) => {
    setSelectedQueryForAttachments(query)
    setCurrentAttachments(query.attachments || [])
    setShowAttachmentViewer(true)
  }

  const handleCloseAttachmentViewer = () => {
    setShowAttachmentViewer(false)
    setSelectedQueryForAttachments(null)
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
              <Link href="/claims-coding">
                <Button variant="ghost" size="sm" className="gap-2">
                  <X className="w-4 h-4" />
                </Button>
              </Link>
              <div className="min-w-0">
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-1 truncate">Coding Screen</h1>
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
          <div className="p-4 lg:p-6 space-y-6 lg:space-y-8">
            {/* Patient and Visit Information */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Patient Details */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="px-6 py-4 bg-blue-50 border-b border-blue-100">
                  <CardTitle className="text-lg font-semibold text-blue-900 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    {claimData.patient.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 py-4 space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Civil ID</span>
                      <p className="font-medium text-gray-900">{claimData.patient.civilId}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">MRN</span>
                      <p className="font-medium text-gray-900">{claimData.patient.mrn}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">DOB</span>
                      <p className="font-medium text-gray-900">{claimData.patient.dob}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Age</span>
                      <p className="font-medium text-gray-900">{claimData.patient.age}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Nationality</span>
                      <p className="font-medium text-gray-900">{claimData.patient.nationality}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Gender</span>
                      <p className="font-medium text-gray-900">{claimData.patient.gender}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-500">Marital status</span>
                      <p className="font-medium text-gray-900">{claimData.patient.maritalStatus}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Insurance Details */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="px-6 py-4 bg-emerald-50 border-b border-emerald-100">
                  <CardTitle className="text-lg font-semibold text-emerald-900">Insurance details</CardTitle>
                </CardHeader>
                <CardContent className="px-6 py-4 space-y-3">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Insurance</span>
                      <span className="font-medium text-gray-900">{claimData.insurance.company}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">TPA</span>
                      <span className="font-medium text-gray-900">{claimData.insurance.tpa}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Member ID</span>
                      <span className="font-medium text-gray-900">{claimData.insurance.memberId}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-100">
                      <div className="text-gray-500 mb-2">Valid period</div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-900">{claimData.insurance.validPeriod.from}</span>
                        <span className="text-gray-900">{claimData.insurance.validPeriod.to}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Visit Information */}
              <Card className="border-0 shadow-sm">
                <CardContent className="px-6 py-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Visit ID</span>
                      <p className="font-medium text-gray-900">{claimData.visit.id}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Visit Category</span>
                      <p className="font-medium text-gray-900">{claimData.visit.category}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Visit date</span>
                      <p className="font-medium text-gray-900">{claimData.visit.date}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Invoice no.</span>
                      <p className="font-medium text-gray-900">{claimData.visit.invoiceNo}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Visit status</span>
                      <p className="font-medium text-gray-900">{claimData.visit.status}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Visit type</span>
                      <p className="font-medium text-gray-900">{claimData.visit.type}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Physician name</span>
                      <p className="font-medium text-gray-900">{claimData.visit.physicianName}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Specialty</span>
                      <p className="font-medium text-gray-900">{claimData.visit.specialty}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Clinician ID</span>
                      <p className="font-medium text-gray-900">{claimData.visit.clinicianId}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Encounter type</span>
                      <p className="font-medium text-gray-900">{claimData.visit.encounterType}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Encounter start</span>
                      <p className="font-medium text-gray-900">{claimData.visit.encounterStart}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Time</span>
                      <p className="font-medium text-gray-900">{claimData.visit.encounterStartTime}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Encounter End</span>
                      <p className="font-medium text-gray-900">{claimData.visit.encounterEnd}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Time</span>
                      <p className="font-medium text-gray-900">{claimData.visit.encounterEndTime}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Diagnosis Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Diagnosis from physician */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="px-6 py-4 bg-orange-50 border-b border-orange-100">
                  <CardTitle className="text-lg font-semibold text-orange-900">Diagnosis from physician</CardTitle>
                </CardHeader>
                <CardContent className="px-6 py-4">
                  <div className="space-y-4">
                    {claimData.diagnosisFromPhysician.map((diagnosis, index) => (
                      <div key={index} className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg text-sm">
                        <div>
                          <span className="text-gray-500">ICD10 code</span>
                          <p className="font-medium text-gray-900">{diagnosis.icd10Code}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-500">Description</span>
                          <p className="font-medium text-gray-900">{diagnosis.description}</p>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <span className="text-gray-500">Type</span>
                            <p className="font-medium text-gray-900">{diagnosis.type}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">POA</span>
                            <p className="font-medium text-gray-900">{diagnosis.poa || "-"}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Coder diagnosis */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="px-6 py-4 bg-purple-50 border-b border-purple-100">
                  <CardTitle className="text-lg font-semibold text-purple-900 flex items-center justify-between">
                    Coder diagnosis
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 py-4">
                  <div className="space-y-4">
                    {claimData.coderDiagnosis.map((diagnosis, index) => (
                      <div key={index} className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg text-sm">
                        <div>
                          <Input
                            value={diagnosis.icd10Code}
                            placeholder="ICD10 code"
                            className="h-8 text-xs"
                            readOnly
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            value={diagnosis.description}
                            placeholder="Description"
                            className="h-8 text-xs"
                            readOnly
                          />
                        </div>
                        <div className="space-y-2">
                          <div>
                            <span className="text-gray-500">Type</span>
                            <p className="font-medium text-gray-900">{diagnosis.type}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">POA</span>
                            <p className="font-medium text-gray-900">{diagnosis.poa || "-"}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 3M Button */}
            <div className="flex justify-center">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 text-lg font-semibold">
                3M
              </Button>
            </div>

            {/* Service Details */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="px-6 py-4 bg-indigo-50 border-b border-indigo-100">
                <CardTitle className="text-lg font-semibold text-indigo-900">Service details</CardTitle>
              </CardHeader>
              <CardContent className="px-6 py-4">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1200px]">
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
                        <th className="text-left p-3 text-sm font-semibold text-gray-700">Authorization Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {claimData.services.map((service, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3 text-sm text-gray-900">{service.no}</td>
                          <td className="p-3 text-sm text-gray-900">{service.category}</td>
                          <td className="p-3 text-sm text-gray-900 font-mono">{service.code}</td>
                          <td className="p-3 text-sm text-gray-900">{service.description}</td>
                          <td className="p-3 text-sm text-gray-900 text-center">{service.quantity}</td>
                          <td className="p-3 text-sm text-gray-900">{service.gross}</td>
                          <td className="p-3 text-sm text-gray-900">{service.patientShare}</td>
                          <td className="p-3 text-sm text-gray-900">{service.net}</td>
                          <td className="p-3 text-sm text-gray-900 font-mono">{service.authorizationNumber}</td>
                        </tr>
                      ))}
                      <tr className="border-t-2 border-gray-300 bg-gray-50 font-semibold">
                        <td className="p-3 text-sm text-gray-900" colSpan={5}>
                          Total
                        </td>
                        <td className="p-3 text-sm text-gray-900">{claimData.total.gross}</td>
                        <td className="p-3 text-sm text-gray-900">{claimData.total.patientShare}</td>
                        <td className="p-3 text-sm text-gray-900">{claimData.total.net}</td>
                        <td className="p-3"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Coding Status and Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Coding Status */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="px-6 py-4 bg-yellow-50 border-b border-yellow-100">
                  <CardTitle className="text-lg font-semibold text-yellow-900">Coding status</CardTitle>
                </CardHeader>
                <CardContent className="px-6 py-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Status</span>
                      <p className="font-medium text-gray-900">{claimData.codingStatus.status}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Codified date & time</span>
                      <p className="font-medium text-gray-900">
                        {claimData.codingStatus.codifiedDate} : {claimData.codingStatus.codifiedTime}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Remarks</span>
                    <p className="font-medium text-gray-900 mt-1">{claimData.codingStatus.remarks}</p>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                      Codified by : <span className="font-medium">{claimData.codingStatus.codifiedBy}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons and Remarks */}
              <Card className="border-0 shadow-sm">
                <CardContent className="px-6 py-4 space-y-4">
                  <div className="flex gap-3">
                    <Button variant="outline" className="gap-2 flex-1">
                      <FileSearch className="w-4 h-4" />
                      Access EMR
                    </Button>
                    <Button variant="outline" className="gap-2 flex-1" onClick={handleAttachFile}>
                      <Paperclip className="w-4 h-4" />
                      Attach
                      {attachedFiles.length > 0 && (
                        <Badge variant="secondary" className="ml-1">
                          {attachedFiles.length}
                        </Badge>
                      )}
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

                  {attachedFiles.length > 0 && (
                    <div className="border border-gray-200 rounded-md p-3">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium text-gray-700">Attached Files</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-blue-600"
                          onClick={handleViewAttachments}
                        >
                          View All
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {attachedFiles.slice(0, 2).map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                            <div className="flex items-center gap-2">
                              <File className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-900 truncate max-w-[200px]">{file.name}</span>
                            </div>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-red-500">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        {attachedFiles.length > 2 && (
                          <div className="text-xs text-gray-500 text-center">
                            +{attachedFiles.length - 2} more files
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
                    <Textarea
                      placeholder="Enter remarks..."
                      rows={4}
                      className="resize-none"
                      defaultValue={claimData.codingStatus.remarks}
                    />
                  </div>
                </CardContent>
              </Card>
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
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-0">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                      <h2 className="text-xl font-semibold text-gray-900">Queries</h2>
                      <Button variant="ghost" size="sm" onClick={() => setQueryOpen(false)} className="w-8 h-8 p-0">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Table */}
                    <div className="p-6">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left pb-3 text-sm font-medium text-gray-700">Department</th>
                              <th className="text-left pb-3 text-sm font-medium text-gray-700">Subject</th>
                              <th className="text-left pb-3 text-sm font-medium text-gray-700">Status</th>
                              <th className="text-left pb-3 text-sm font-medium text-gray-700">Submitted</th>
                              <th className="text-left pb-3 text-sm font-medium text-gray-700">Queried by</th>
                              <th className="w-20"></th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {queryData.map((query, index) => (
                              <>
                                <tr key={index} className="hover:bg-gray-50">
                                  <td className="py-4 text-sm text-gray-900">{query.department}</td>
                                  <td className="py-4 text-sm text-gray-900">{query.subject}</td>
                                  <td className="py-4">
                                    <span className="text-sm text-gray-600">{query.status}</span>
                                  </td>
                                  <td className="py-4 text-sm text-gray-900">{query.submitted}</td>
                                  <td className="py-4 text-sm text-gray-900">{query.queriedBy}</td>
                                  <td className="py-4">
                                    <div className="flex items-center gap-2">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-8 h-8 p-0 text-blue-500"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleQueryAttachmentClick(query, index)
                                        }}
                                      >
                                        <Paperclip className="w-4 h-4" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-8 h-8 p-0 text-blue-500"
                                        onClick={() => handleQueryRowClick(query, index)}
                                      >
                                        <ChevronDown className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                                {expandedQuery === index && (
                                  <tr className="bg-gray-50">
                                    <td colSpan={6} className="p-6">
                                      <div className="space-y-4">
                                        <div>
                                          <h4 className="text-sm font-medium text-gray-700 mb-2">Query Description</h4>
                                          <p className="text-sm text-gray-600 bg-white p-4 rounded-md border border-gray-200">
                                            {query.description}
                                          </p>
                                        </div>

                                        {query.response && (
                                          <div>
                                            <h4 className="text-sm font-medium text-gray-700 mb-2">Response</h4>
                                            <p className="text-sm text-gray-600 bg-white p-4 rounded-md border border-gray-200">
                                              {query.response}
                                            </p>
                                          </div>
                                        )}

                                        {query.status === "Open" && (
                                          <div>
                                            <h4 className="text-sm font-medium text-gray-700 mb-2">Add Response</h4>
                                            <div className="flex gap-3">
                                              <Textarea
                                                placeholder="Type your response here..."
                                                className="text-sm resize-none h-24 flex-1"
                                              />
                                              <Button className="bg-blue-600 hover:bg-blue-700 text-white self-end">
                                                <Send className="w-4 h-4" />
                                              </Button>
                                            </div>
                                          </div>
                                        )}

                                        <div className="flex justify-end">
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-red-600 border-red-200 hover:bg-red-50"
                                            onClick={() => handleDeleteQuery(index)}
                                          >
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Delete Query
                                          </Button>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Send new query button */}
                      <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6" onClick={handleNewQuery}>
                          Send new query
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white gap-2 px-8">
                <Save className="w-4 h-4" />
                Save
              </Button>
            </div>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Saved Successfully!</h3>
              <p className="text-gray-600 mb-6">Your coding changes have been saved successfully.</p>
              <Button onClick={() => setShowSuccessDialog(false)} className="bg-blue-600 hover:bg-blue-700 text-white">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add the Attachment Viewer Dialog */}
      {showAttachmentViewer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedQueryForAttachments
                  ? `Query Attachments - ${selectedQueryForAttachments.subject}`
                  : "Attachments"}
              </h2>
              <Button variant="ghost" size="sm" onClick={() => handleCloseAttachmentViewer()} className="w-8 h-8 p-0">
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
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500"
                        onClick={() => handleDeleteAttachment(attachment.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200">
              <Button variant="outline" className="gap-2" onClick={handleAttachFile}>
                <Upload className="w-4 h-4" />
                Upload New
              </Button>
              <Button onClick={() => handleCloseAttachmentViewer()} variant="outline">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add the Query Dialog */}
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
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-200">
                        <td className="p-3 text-sm text-gray-900 border-r border-gray-200">{claimData.visit.id}</td>
                        <td className="p-3 text-sm text-gray-900 border-r border-gray-200">{claimData.patient.name}</td>
                        <td className="p-3 border-r border-gray-200">
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200">New visit</Badge>
                        </td>
                        <td className="p-3 text-sm text-gray-900 border-r border-gray-200">{claimData.visit.date}</td>
                        <td className="p-3 text-sm text-gray-900 border-r border-gray-200">
                          {claimData.visit.specialty}
                        </td>
                        <td className="p-3 text-sm text-gray-900 border-r border-gray-200">
                          {claimData.visit.physicianName}
                        </td>
                        <td className="p-3 text-sm text-gray-900 border-r border-gray-200">{claimData.visit.type}</td>
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
                    placeholder="Enter query description..."
                    rows={6}
                    className="bg-white resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end p-6 border-t border-gray-200">
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowQueryDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSendNewQueryFromDialog} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Send query
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
