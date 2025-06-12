"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  CalendarIcon,
  SearchIcon,
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
  Download,
  Check,
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

// Sample data for payment allocations
const paymentData = [
  {
    id: "PAY-12345",
    date: "2023-06-10",
    amount: 12500.0,
    provider: "Royal Hospital Muscat",
    payer: "Daman Insurance",
    status: "Allocated",
    claimsCount: 5,
    remainingAmount: 0,
  },
  {
    id: "PAY-12346",
    date: "2023-06-09",
    amount: 8750.5,
    provider: "Royal Hospital Muscat",
    payer: "Tawuniya",
    status: "Partially Allocated",
    claimsCount: 3,
    remainingAmount: 1250.25,
  },
  {
    id: "PAY-12347",
    date: "2023-06-08",
    amount: 5200.75,
    provider: "Royal Hospital Muscat",
    payer: "BUPA Arabia",
    status: "Unallocated",
    claimsCount: 0,
    remainingAmount: 5200.75,
  },
  {
    id: "PAY-12348",
    date: "2023-06-07",
    amount: 9800.0,
    provider: "Royal Hospital Muscat",
    payer: "Daman Insurance",
    status: "Allocated",
    claimsCount: 4,
    remainingAmount: 0,
  },
  {
    id: "PAY-12349",
    date: "2023-06-06",
    amount: 15750.25,
    provider: "Royal Hospital Muscat",
    payer: "Tawuniya",
    status: "Partially Allocated",
    claimsCount: 6,
    remainingAmount: 2500.0,
  },
  {
    id: "PAY-12350",
    date: "2023-06-05",
    amount: 3200.0,
    provider: "Royal Hospital Muscat",
    payer: "BUPA Arabia",
    status: "Unallocated",
    claimsCount: 0,
    remainingAmount: 3200.0,
  },
]

// Sample data for claims to allocate
const claimsData = [
  {
    id: "CLM-78901",
    date: "2023-05-15",
    patientName: "Ahmed Al Balushi",
    mrn: "MRN-001234",
    amount: 2500.0,
    status: "Pending Payment",
  },
  {
    id: "CLM-78902",
    date: "2023-05-16",
    patientName: "Fatima Al Lawati",
    mrn: "MRN-001235",
    amount: 1800.5,
    status: "Pending Payment",
  },
  {
    id: "CLM-78903",
    date: "2023-05-17",
    patientName: "Mohammed Al Habsi",
    mrn: "MRN-001236",
    amount: 3200.25,
    status: "Pending Payment",
  },
  {
    id: "CLM-78904",
    date: "2023-05-18",
    patientName: "Aisha Al Farsi",
    mrn: "MRN-001237",
    amount: 950.0,
    status: "Pending Payment",
  },
]

// Sample data for payers
const payerOptions = [
  { value: "daman", label: "Daman Insurance" },
  { value: "tawuniya", label: "Tawuniya" },
  { value: "bupa", label: "BUPA Arabia" },
  { value: "oman", label: "Oman Insurance" },
  { value: "metlife", label: "MetLife" },
]

export default function PaymentAllocation() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [paymentDate, setPaymentDate] = useState<Date>()
  const [showAllocationDialog, setShowAllocationDialog] = useState(false)
  const [showNewPaymentDialog, setShowNewPaymentDialog] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<any>(null)
  const [selectedTab, setSelectedTab] = useState("all")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [newPaymentData, setNewPaymentData] = useState({
    payerId: "",
    amount: "",
    reference: "",
    description: "",
  })

  const sidebarItems = [
    { icon: FileText, label: "Eligibility", active: false, href: "/eligibility" },
    { icon: ClipboardList, label: "Pre-authorization", active: false, href: "/pre-authorization" },
    { icon: Users, label: "Claims coding Queue", active: false, href: "/claims-coding" },
    { icon: BarChart3, label: "Claims QC", active: false, href: "/claims-qc" },
    { icon: Settings, label: "Denial Management", active: false, href: "/denial-management" },
    { icon: Home, label: "Dashboard", active: false, href: "/dashboard" },
    { icon: BarChart3, label: "Payment allocation", active: true, href: "/payment-allocation" },
    { icon: FileText, label: "Reports", active: false, href: "/reports" },
  ]

  const filteredPayments =
    selectedTab === "all"
      ? paymentData
      : paymentData.filter((payment) => {
          if (selectedTab === "allocated") return payment.status === "Allocated"
          if (selectedTab === "partially") return payment.status === "Partially Allocated"
          if (selectedTab === "unallocated") return payment.status === "Unallocated"
          return true
        })

  const handleAllocate = (payment: any) => {
    setSelectedPayment(payment)
    setShowAllocationDialog(true)
  }

  const handleSaveAllocation = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowAllocationDialog(false)
      setShowSuccessDialog(true)

      // Auto close success dialog after 3 seconds
      setTimeout(() => {
        setShowSuccessDialog(false)
      }, 3000)
    }, 1500)
  }

  const handleNewPayment = () => {
    setShowNewPaymentDialog(true)
  }

  const handleCreatePayment = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowNewPaymentDialog(false)

      toast({
        title: "Payment Created Successfully",
        description: `Payment ${newPaymentData.reference || "PAY-" + Math.floor(10000 + Math.random() * 90000)} has been created.`,
      })

      // Reset form
      setNewPaymentData({
        payerId: "",
        amount: "",
        reference: "",
        description: "",
      })
      setPaymentDate(undefined)
    }, 1500)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Allocated":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Allocated</Badge>
      case "Partially Allocated":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Partially Allocated</Badge>
      case "Unallocated":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Unallocated</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const downloadAllocationReport = () => {
    toast({
      title: "Report Downloaded",
      description: "Allocation report has been downloaded successfully.",
    })
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
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-1 truncate">Payment Allocation</h1>
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
                  <Input placeholder="Search payments..." className="pl-10 w-64" />
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
              <Button onClick={handleNewPayment}>
                <span className="hidden md:inline">New Payment</span>
                <span className="md:hidden">+</span>
              </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="shadow-sm">
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Payments</CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-4">
                  <div className="text-2xl font-bold">55,200.50 OMR</div>
                  <p className="text-xs text-gray-500 mt-1">+12% from last month</p>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm font-medium text-gray-500">Allocated Amount</CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-4">
                  <div className="text-2xl font-bold">42,800.25 OMR</div>
                  <p className="text-xs text-gray-500 mt-1">77.5% of total</p>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm font-medium text-gray-500">Unallocated Amount</CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-4">
                  <div className="text-2xl font-bold">12,400.25 OMR</div>
                  <p className="text-xs text-gray-500 mt-1">22.5% of total</p>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm font-medium text-gray-500">Claims Processed</CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-4">
                  <div className="text-2xl font-bold">18</div>
                  <p className="text-xs text-gray-500 mt-1">+5 from yesterday</p>
                </CardContent>
              </Card>
            </div>

            {/* Payments Table */}
            <Card className="shadow-sm">
              <CardHeader className="py-3 px-4 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Payment Allocations</CardTitle>
                  <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="allocated">Allocated</TabsTrigger>
                      <TabsTrigger value="partially">Partial</TabsTrigger>
                      <TabsTrigger value="unallocated">Unallocated</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50 hover:bg-gray-50">
                        <TableHead className="py-2 px-4 text-xs font-medium">Payment ID</TableHead>
                        <TableHead className="py-2 px-4 text-xs font-medium">Date</TableHead>
                        <TableHead className="py-2 px-4 text-xs font-medium">Amount (OMR)</TableHead>
                        <TableHead className="py-2 px-4 text-xs font-medium">Payer</TableHead>
                        <TableHead className="py-2 px-4 text-xs font-medium">Status</TableHead>
                        <TableHead className="py-2 px-4 text-xs font-medium">Claims</TableHead>
                        <TableHead className="py-2 px-4 text-xs font-medium">Remaining</TableHead>
                        <TableHead className="py-2 px-4 text-xs font-medium text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPayments.map((payment) => (
                        <TableRow key={payment.id} className="hover:bg-gray-50">
                          <TableCell className="py-2 px-4 text-xs font-medium whitespace-nowrap">
                            {payment.id}
                          </TableCell>
                          <TableCell className="py-2 px-4 text-xs whitespace-nowrap">{payment.date}</TableCell>
                          <TableCell className="py-2 px-4 text-xs whitespace-nowrap">
                            {payment.amount.toFixed(2)}
                          </TableCell>
                          <TableCell className="py-2 px-4 text-xs whitespace-nowrap">{payment.payer}</TableCell>
                          <TableCell className="py-2 px-4 text-xs whitespace-nowrap">
                            {getStatusBadge(payment.status)}
                          </TableCell>
                          <TableCell className="py-2 px-4 text-xs whitespace-nowrap text-center">
                            {payment.claimsCount}
                          </TableCell>
                          <TableCell className="py-2 px-4 text-xs whitespace-nowrap">
                            {payment.remainingAmount.toFixed(2)}
                          </TableCell>
                          <TableCell className="py-2 px-4 text-xs whitespace-nowrap text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 text-xs px-2"
                              onClick={() => handleAllocate(payment)}
                              disabled={payment.status === "Allocated"}
                            >
                              Allocate
                            </Button>
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

      {/* New Payment Dialog */}
      <Dialog open={showNewPaymentDialog} onOpenChange={setShowNewPaymentDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Payment</DialogTitle>
            <DialogDescription>Enter the payment details below.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="payer" className="text-right">
                Payer
              </Label>
              <div className="col-span-3">
                <Select
                  value={newPaymentData.payerId}
                  onValueChange={(value) => setNewPaymentData({ ...newPaymentData, payerId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select payer" />
                  </SelectTrigger>
                  <SelectContent>
                    {payerOptions.map((payer) => (
                      <SelectItem key={payer.value} value={payer.value}>
                        {payer.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount (OMR)
              </Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={newPaymentData.amount}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Payment Date
              </Label>
              <div className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {paymentDate ? format(paymentDate, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={paymentDate} onSelect={setPaymentDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reference" className="text-right">
                Reference
              </Label>
              <Input
                id="reference"
                name="reference"
                placeholder="Payment reference"
                value={newPaymentData.reference}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                placeholder="Payment description"
                value={newPaymentData.description}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewPaymentDialog(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleCreatePayment} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Payment"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Allocation Dialog */}
      <Dialog open={showAllocationDialog} onOpenChange={setShowAllocationDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Allocate Payment: {selectedPayment?.id}</DialogTitle>
            <DialogDescription>
              Remaining amount: <span className="font-semibold">{selectedPayment?.remainingAmount.toFixed(2)} OMR</span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Search Claims</Label>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input placeholder="Search by claim ID, patient name, or MRN..." className="pl-10 w-full" />
                </div>
              </div>
              <div className="space-y-1">
                <Label>Filter By</Label>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter claims" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Claims</SelectItem>
                    <SelectItem value="pending">Pending Payment</SelectItem>
                    <SelectItem value="partial">Partially Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="overflow-x-auto border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="py-2 px-3 text-xs font-medium w-[30px]">
                      <input type="checkbox" className="rounded" />
                    </TableHead>
                    <TableHead className="py-2 px-3 text-xs font-medium">Claim ID</TableHead>
                    <TableHead className="py-2 px-3 text-xs font-medium">Date</TableHead>
                    <TableHead className="py-2 px-3 text-xs font-medium">Patient</TableHead>
                    <TableHead className="py-2 px-3 text-xs font-medium">MRN</TableHead>
                    <TableHead className="py-2 px-3 text-xs font-medium">Amount (OMR)</TableHead>
                    <TableHead className="py-2 px-3 text-xs font-medium">Status</TableHead>
                    <TableHead className="py-2 px-3 text-xs font-medium">Allocate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {claimsData.map((claim) => (
                    <TableRow key={claim.id} className="hover:bg-gray-50">
                      <TableCell className="py-2 px-3 text-xs">
                        <input type="checkbox" className="rounded" />
                      </TableCell>
                      <TableCell className="py-2 px-3 text-xs font-medium whitespace-nowrap">{claim.id}</TableCell>
                      <TableCell className="py-2 px-3 text-xs whitespace-nowrap">{claim.date}</TableCell>
                      <TableCell className="py-2 px-3 text-xs whitespace-nowrap">{claim.patientName}</TableCell>
                      <TableCell className="py-2 px-3 text-xs whitespace-nowrap">{claim.mrn}</TableCell>
                      <TableCell className="py-2 px-3 text-xs whitespace-nowrap">{claim.amount.toFixed(2)}</TableCell>
                      <TableCell className="py-2 px-3 text-xs whitespace-nowrap">
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs font-normal py-0.5">
                          {claim.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-2 px-3 text-xs whitespace-nowrap">
                        <Input type="number" placeholder="0.00" className="w-20 h-7 text-xs" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAllocationDialog(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleSaveAllocation} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Allocation"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="h-12 w-12 rounded-full bg-green-100 p-2 text-green-600 mb-4">
              <Check className="h-8 w-8" />
            </div>
            <DialogTitle className="text-xl">Payment Allocated Successfully</DialogTitle>
            <DialogDescription className="mt-2 mb-6">
              Payment {selectedPayment?.id} has been allocated to the selected claims.
            </DialogDescription>
            <div className="flex gap-4 w-full">
              <Button className="flex-1" onClick={() => setShowSuccessDialog(false)}>
                Close
              </Button>
              <Button variant="outline" className="flex-1" onClick={downloadAllocationReport}>
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
