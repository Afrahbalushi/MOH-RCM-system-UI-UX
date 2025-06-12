"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import {
  BarChart3,
  CalendarIcon,
  ClipboardList,
  Download,
  FileText,
  Filter,
  LineChart,
  PieChart,
  SearchIcon,
  Share2,
  Users,
  Settings,
  Home,
  Menu,
  XCircle,
  LogOut,
  User,
  Loader2,
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
import { toast } from "@/hooks/use-toast"

// Sample data for reports
const reportsData = [
  {
    id: "REP-001",
    name: "Monthly Claims Summary",
    type: "Financial",
    format: "PDF",
    generatedDate: "2023-06-10",
    generatedBy: "Ahmed Al Balushi",
    status: "Completed",
    downloadUrl: "/reports/monthly-claims-summary.pdf",
  },
  {
    id: "REP-002",
    name: "Denial Analysis Q2",
    type: "Operational",
    format: "Excel",
    generatedDate: "2023-06-09",
    generatedBy: "Fatima Al Lawati",
    status: "Completed",
    downloadUrl: "/reports/denial-analysis-q2.xlsx",
  },
  {
    id: "REP-003",
    name: "Provider Performance",
    type: "Analytics",
    format: "PDF",
    generatedDate: "2023-06-08",
    generatedBy: "Mohammed Al Habsi",
    status: "Processing",
    downloadUrl: null,
  },
  {
    id: "REP-004",
    name: "Payer Reimbursement Trends",
    type: "Financial",
    format: "Excel",
    generatedDate: "2023-06-07",
    generatedBy: "Aisha Al Farsi",
    status: "Completed",
    downloadUrl: "/reports/payer-reimbursement-trends.xlsx",
  },
  {
    id: "REP-005",
    name: "Coding Accuracy Report",
    type: "Compliance",
    format: "PDF",
    generatedDate: "2023-06-06",
    generatedBy: "Khalid Al Mamari",
    status: "Failed",
    downloadUrl: null,
  },
  {
    id: "REP-006",
    name: "Claims Aging Analysis",
    type: "Financial",
    format: "Excel",
    generatedDate: "2023-06-05",
    generatedBy: "Noor Al Zadjali",
    status: "Completed",
    downloadUrl: "/reports/claims-aging-analysis.xlsx",
  },
]

// Report types
const reportTypes = [
  {
    id: "financial",
    name: "Financial Reports",
    description: "Revenue, claims, payments, and aging analysis",
    icon: BarChart3,
    count: 12,
  },
  {
    id: "operational",
    name: "Operational Reports",
    description: "Workflow efficiency, processing times, and workload",
    icon: LineChart,
    count: 8,
  },
  {
    id: "compliance",
    name: "Compliance Reports",
    description: "Audit results, coding accuracy, and documentation",
    icon: ClipboardList,
    count: 5,
  },
  {
    id: "analytics",
    name: "Analytics Reports",
    description: "Trends, patterns, and predictive insights",
    icon: PieChart,
    count: 7,
  },
]

export default function Reports() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [showGenerateDialog, setShowGenerateDialog] = useState(false)
  const [selectedReportType, setSelectedReportType] = useState<string | null>(null)
  const [selectedTab, setSelectedTab] = useState("all")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const sidebarItems = [
    { icon: FileText, label: "Eligibility", active: false, href: "/eligibility" },
    { icon: ClipboardList, label: "Pre-authorization", active: false, href: "/pre-authorization" },
    { icon: Users, label: "Claims coding Queue", active: false, href: "/claims-coding" },
    { icon: BarChart3, label: "Claims QC", active: false, href: "/claims-qc" },
    { icon: Settings, label: "Denial Management", active: false, href: "/denial-management" },
    { icon: Home, label: "Dashboard", active: false, href: "/dashboard" },
    { icon: BarChart3, label: "Payment allocation", active: false, href: "/payment-allocation" },
    { icon: FileText, label: "Reports", active: true, href: "/reports" },
  ]

  const filteredReports =
    selectedTab === "all"
      ? reportsData
      : reportsData.filter((report) => {
          if (selectedTab === "financial") return report.type === "Financial"
          if (selectedTab === "operational") return report.type === "Operational"
          if (selectedTab === "compliance") return report.type === "Compliance"
          if (selectedTab === "analytics") return report.type === "Analytics"
          return true
        })

  const handleDownload = (report: any) => {
    if (report.downloadUrl) {
      // Create a temporary link element and trigger download
      const link = document.createElement("a")
      link.href = report.downloadUrl
      link.download = `${report.name}.${report.format.toLowerCase()}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: "Download Started",
        description: `${report.name} is being downloaded.`,
      })
    } else {
      toast({
        title: "Download Failed",
        description: "Report file is not available for download.",
        variant: "destructive",
      })
    }
  }

  const handleShare = (report: any) => {
    if (navigator.share) {
      navigator.share({
        title: report.name,
        text: `Check out this report: ${report.name}`,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link Copied",
        description: "Report link has been copied to clipboard.",
      })
    }
  }

  const handleGenerateReport = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowGenerateDialog(false)

      toast({
        title: "Report Generation Started",
        description: "Your report is being generated and will be available shortly.",
      })
    }, 1500)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs font-normal py-0.5">Completed</Badge>
        )
      case "Processing":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs font-normal py-0.5">Processing</Badge>
        )
      case "Failed":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 text-xs font-normal py-0.5">Failed</Badge>
      default:
        return <Badge className="text-xs font-normal py-0.5">{status}</Badge>
    }
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "PDF":
        return <FileText className="h-3.5 w-3.5 text-red-500" />
      case "Excel":
        return <FileText className="h-3.5 w-3.5 text-green-500" />
      default:
        return <FileText className="h-3.5 w-3.5" />
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
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-1 truncate">Reports</h1>
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
          <div className="p-4 lg:p-6 space-y-5">
            {/* Action Bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input placeholder="Search reports..." className="pl-10 w-64" />
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"} className="w-[240px] justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <Button onClick={() => setShowGenerateDialog(true)}>Generate Report</Button>
            </div>

            {/* Report Type Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {reportTypes.map((type) => (
                <Card
                  key={type.id}
                  className={`cursor-pointer transition-all shadow-sm ${selectedReportType === type.id ? "ring-2 ring-blue-500" : "hover:shadow-md"}`}
                  onClick={() => setSelectedReportType(type.id === selectedReportType ? null : type.id)}
                >
                  <CardHeader className="py-3 px-4">
                    <div className="flex justify-between items-center">
                      <type.icon className="h-6 w-6 text-blue-500" />
                      <Badge variant="outline" className="text-xs font-normal">
                        {type.count}
                      </Badge>
                    </div>
                    <CardTitle className="text-base mt-2">{type.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 px-4">
                    <CardDescription className="text-xs">{type.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Reports Table */}
            <Card className="shadow-sm">
              <CardHeader className="py-3 px-4 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Generated Reports</CardTitle>
                  <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-5 gap-1">
                      <TabsTrigger value="all" className="text-xs px-3">
                        All
                      </TabsTrigger>
                      <TabsTrigger value="financial" className="text-xs px-3">
                        Financial
                      </TabsTrigger>
                      <TabsTrigger value="operational" className="text-xs px-3">
                        Operational
                      </TabsTrigger>
                      <TabsTrigger value="compliance" className="text-xs px-3">
                        Compliance
                      </TabsTrigger>
                      <TabsTrigger value="analytics" className="text-xs px-3">
                        Analytics
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50 hover:bg-gray-50">
                        <TableHead className="py-2 px-3 text-xs font-medium">Report ID</TableHead>
                        <TableHead className="py-2 px-3 text-xs font-medium">Name</TableHead>
                        <TableHead className="py-2 px-3 text-xs font-medium">Type</TableHead>
                        <TableHead className="py-2 px-3 text-xs font-medium">Format</TableHead>
                        <TableHead className="py-2 px-3 text-xs font-medium">Generated Date</TableHead>
                        <TableHead className="py-2 px-3 text-xs font-medium">Generated By</TableHead>
                        <TableHead className="py-2 px-3 text-xs font-medium">Status</TableHead>
                        <TableHead className="py-2 px-3 text-xs font-medium text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReports.map((report) => (
                        <TableRow key={report.id} className="hover:bg-gray-50">
                          <TableCell className="py-2 px-3 text-xs font-medium whitespace-nowrap">{report.id}</TableCell>
                          <TableCell className="py-2 px-3 text-xs whitespace-nowrap">{report.name}</TableCell>
                          <TableCell className="py-2 px-3 text-xs whitespace-nowrap">{report.type}</TableCell>
                          <TableCell className="py-2 px-3 text-xs whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              {getFormatIcon(report.format)}
                              <span>{report.format}</span>
                            </div>
                          </TableCell>
                          <TableCell className="py-2 px-3 text-xs whitespace-nowrap">{report.generatedDate}</TableCell>
                          <TableCell className="py-2 px-3 text-xs whitespace-nowrap">{report.generatedBy}</TableCell>
                          <TableCell className="py-2 px-3 text-xs whitespace-nowrap">
                            {getStatusBadge(report.status)}
                          </TableCell>
                          <TableCell className="py-2 px-3 text-xs whitespace-nowrap text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                disabled={report.status !== "Completed"}
                                onClick={() => handleDownload(report)}
                              >
                                <Download className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                disabled={report.status !== "Completed"}
                                onClick={() => handleShare(report)}
                              >
                                <Share2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Generate Report Dialog */}
      <Dialog open={showGenerateDialog} onOpenChange={setShowGenerateDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Generate New Report</DialogTitle>
            <DialogDescription>Select report type and parameters</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="report-type">Report Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="financial-summary">Financial Summary</SelectItem>
                  <SelectItem value="claims-aging">Claims Aging Analysis</SelectItem>
                  <SelectItem value="denial-analysis">Denial Analysis</SelectItem>
                  <SelectItem value="provider-performance">Provider Performance</SelectItem>
                  <SelectItem value="payer-analysis">Payer Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Date Range</Label>
              <div className="flex gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>Start Date</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" initialFocus />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>End Date</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="format">Format</Label>
              <Select defaultValue="pdf">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="filters">Additional Filters</Label>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="payer">Payer</SelectItem>
                    <SelectItem value="provider">Provider</SelectItem>
                    <SelectItem value="department">Department</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowGenerateDialog(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleGenerateReport} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Report"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
