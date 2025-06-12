"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
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
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  Calendar,
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
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Bar,
  BarChart,
  Pie,
  PieChart,
  Cell,
  Area,
  AreaChart,
  Legend,
} from "recharts"
import { toast } from "@/components/ui/use-toast"

export default function PreAuthorizationAnalytics() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [timeRange, setTimeRange] = useState("30d")
  const [isExporting, setIsExporting] = useState(false)
  const { user, logout } = useAuth()
  const contentRef = useRef<HTMLDivElement>(null)

  // Sample data for different time ranges
  const allData = {
    "7d": {
      trendData: [
        { date: "Mon", submitted: 20, approved: 15, rejected: 3, pending: 2 },
        { date: "Tue", submitted: 25, approved: 18, rejected: 5, pending: 2 },
        { date: "Wed", submitted: 30, approved: 22, rejected: 5, pending: 3 },
        { date: "Thu", submitted: 28, approved: 20, rejected: 6, pending: 2 },
        { date: "Fri", submitted: 35, approved: 25, rejected: 7, pending: 3 },
        { date: "Sat", submitted: 15, approved: 10, rejected: 3, pending: 2 },
        { date: "Sun", submitted: 10, approved: 7, rejected: 2, pending: 1 },
      ],
      statusData: [
        { name: "Approved", value: 70, color: "#10b981" },
        { name: "Pending", value: 10, color: "#f59e0b" },
        { name: "Rejected", value: 20, color: "#ef4444" },
      ],
      responseTimeData: [
        { timeRange: "< 1 hour", count: 50, percentage: 30 },
        { timeRange: "1-4 hours", count: 65, percentage: 40 },
        { timeRange: "4-24 hours", count: 40, percentage: 25 },
        { timeRange: "> 24 hours", count: 8, percentage: 5 },
      ],
      physicianData: [
        { name: "Dr. Fatma", total: 25, approved: 20, rejected: 5 },
        { name: "Dr. Ali", total: 22, approved: 18, rejected: 4 },
        { name: "Dr. Sarah", total: 20, approved: 16, rejected: 4 },
        { name: "Dr. Ahmed", total: 18, approved: 14, rejected: 4 },
        { name: "Dr. Maryam", total: 15, approved: 12, rejected: 3 },
      ],
      metrics: {
        totalRequests: 163,
        approvalRate: 70,
        avgResponseTime: "2.1h",
        pendingReview: 10,
        growth: "+8.2%",
        timeImprovement: "-12min",
        pendingChange: "+2",
      },
    },
    "30d": {
      trendData: [
        { date: "Week 1", submitted: 120, approved: 85, rejected: 25, pending: 10 },
        { date: "Week 2", submitted: 135, approved: 95, rejected: 30, pending: 10 },
        { date: "Week 3", submitted: 150, approved: 110, rejected: 25, pending: 15 },
        { date: "Week 4", submitted: 140, approved: 105, rejected: 20, pending: 15 },
      ],
      statusData: [
        { name: "Approved", value: 65, color: "#10b981" },
        { name: "Pending", value: 15, color: "#f59e0b" },
        { name: "Rejected", value: 20, color: "#ef4444" },
      ],
      responseTimeData: [
        { timeRange: "< 1 hour", count: 45, percentage: 25 },
        { timeRange: "1-4 hours", count: 72, percentage: 40 },
        { timeRange: "4-24 hours", count: 54, percentage: 30 },
        { timeRange: "> 24 hours", count: 9, percentage: 5 },
      ],
      physicianData: [
        { name: "Dr. Fatma", total: 45, approved: 38, rejected: 7 },
        { name: "Dr. Ali", total: 38, approved: 32, rejected: 6 },
        { name: "Dr. Sarah", total: 42, approved: 35, rejected: 7 },
        { name: "Dr. Ahmed", total: 35, approved: 28, rejected: 7 },
        { name: "Dr. Maryam", total: 40, approved: 34, rejected: 6 },
      ],
      metrics: {
        totalRequests: 890,
        approvalRate: 78.5,
        avgResponseTime: "2.4h",
        pendingReview: 15,
        growth: "+12.5%",
        timeImprovement: "-18min",
        pendingChange: "+3",
      },
    },
    "90d": {
      trendData: [
        { date: "Apr", submitted: 350, approved: 260, rejected: 65, pending: 25 },
        { date: "May", submitted: 420, approved: 320, rejected: 75, pending: 25 },
        { date: "Jun", submitted: 480, approved: 370, rejected: 80, pending: 30 },
      ],
      statusData: [
        { name: "Approved", value: 68, color: "#10b981" },
        { name: "Pending", value: 12, color: "#f59e0b" },
        { name: "Rejected", value: 20, color: "#ef4444" },
      ],
      responseTimeData: [
        { timeRange: "< 1 hour", count: 380, percentage: 30 },
        { timeRange: "1-4 hours", count: 510, percentage: 40 },
        { timeRange: "4-24 hours", count: 320, percentage: 25 },
        { timeRange: "> 24 hours", count: 65, percentage: 5 },
      ],
      physicianData: [
        { name: "Dr. Fatma", total: 120, approved: 100, rejected: 20 },
        { name: "Dr. Ali", total: 110, approved: 92, rejected: 18 },
        { name: "Dr. Sarah", total: 115, approved: 95, rejected: 20 },
        { name: "Dr. Ahmed", total: 105, approved: 85, rejected: 20 },
        { name: "Dr. Maryam", total: 100, approved: 82, rejected: 18 },
      ],
      metrics: {
        totalRequests: 1250,
        approvalRate: 76.8,
        avgResponseTime: "2.6h",
        pendingReview: 30,
        growth: "+15.8%",
        timeImprovement: "-22min",
        pendingChange: "+5",
      },
    },
    "1y": {
      trendData: [
        { date: "Jan", submitted: 120, approved: 85, rejected: 25, pending: 10 },
        { date: "Feb", submitted: 135, approved: 95, rejected: 30, pending: 10 },
        { date: "Mar", submitted: 150, approved: 110, rejected: 25, pending: 15 },
        { date: "Apr", submitted: 140, approved: 105, rejected: 20, pending: 15 },
        { date: "May", submitted: 165, approved: 125, rejected: 25, pending: 15 },
        { date: "Jun", submitted: 180, approved: 140, rejected: 30, pending: 10 },
        { date: "Jul", submitted: 175, approved: 135, rejected: 25, pending: 15 },
        { date: "Aug", submitted: 190, approved: 150, rejected: 30, pending: 10 },
        { date: "Sep", submitted: 200, approved: 160, rejected: 30, pending: 10 },
        { date: "Oct", submitted: 210, approved: 165, rejected: 35, pending: 10 },
        { date: "Nov", submitted: 220, approved: 175, rejected: 35, pending: 10 },
        { date: "Dec", submitted: 230, approved: 185, rejected: 35, pending: 10 },
      ],
      statusData: [
        { name: "Approved", value: 72, color: "#10b981" },
        { name: "Pending", value: 8, color: "#f59e0b" },
        { name: "Rejected", value: 20, color: "#ef4444" },
      ],
      responseTimeData: [
        { timeRange: "< 1 hour", count: 580, percentage: 30 },
        { timeRange: "1-4 hours", count: 770, percentage: 40 },
        { timeRange: "4-24 hours", count: 480, percentage: 25 },
        { timeRange: "> 24 hours", count: 95, percentage: 5 },
      ],
      physicianData: [
        { name: "Dr. Fatma", total: 220, approved: 180, rejected: 40 },
        { name: "Dr. Ali", total: 200, approved: 165, rejected: 35 },
        { name: "Dr. Sarah", total: 210, approved: 175, rejected: 35 },
        { name: "Dr. Ahmed", total: 190, approved: 155, rejected: 35 },
        { name: "Dr. Maryam", total: 180, approved: 150, rejected: 30 },
      ],
      metrics: {
        totalRequests: 2115,
        approvalRate: 80.2,
        avgResponseTime: "2.2h",
        pendingReview: 25,
        growth: "+18.5%",
        timeImprovement: "-30min",
        pendingChange: "-5",
      },
    },
  }

  // Get current data based on selected time range
  const currentData = allData[timeRange as keyof typeof allData]
  const { trendData, statusData, responseTimeData, physicianData, metrics } = currentData

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

  // Function to handle time range change
  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value)
  }

  // Function to handle PDF export
  const handleExport = () => {
    setIsExporting(true)

    // Generate PDF-optimized report content
    const generatePDFReportContent = () => {
      const reportDate = new Date().toLocaleDateString()
      const reportTime = new Date().toLocaleTimeString()

      return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pre-authorization Analytics Report</title>
    <style>
        @page {
            size: A4;
            margin: 1in;
        }
        
        @media print {
            body { 
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
                print-color-adjust: exact;
            }
            .page-break {
                page-break-before: always;
            }
            .no-break {
                page-break-inside: avoid;
            }
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            line-height: 1.6;
            color: #333;
            font-size: 12px;
        }
        
        .header {
            text-align: center;
            border-bottom: 3px solid #1e40af;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        
        .logo {
            font-size: 28px;
            font-weight: bold;
            color: #1e40af;
            margin-bottom: 10px;
        }
        
        .hospital-name {
            font-size: 18px;
            color: #64748b;
            margin-bottom: 5px;
        }
        
        .report-title {
            font-size: 24px;
            font-weight: bold;
            color: #1e40af;
            margin: 15px 0;
        }
        
        .report-info {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            border: 1px solid #cbd5e1;
        }
        
        .report-info h3 {
            margin-top: 0;
            color: #1e40af;
            font-size: 16px;
        }
        
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .metric-card {
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .metric-value {
            font-size: 36px;
            font-weight: bold;
            color: #1e40af;
            margin-bottom: 8px;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
        }
        
        .metric-label {
            color: #64748b;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 5px;
        }
        
        .metric-change {
            font-size: 12px;
            font-weight: bold;
            padding: 4px 8px;
            border-radius: 4px;
            background: #dcfce7;
            color: #166534;
        }
        
        .section {
            margin-bottom: 40px;
            page-break-inside: avoid;
        }
        
        .section-title {
            font-size: 20px;
            font-weight: bold;
            color: #1e40af;
            margin-bottom: 15px;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 8px;
            background: linear-gradient(90deg, #1e40af 0%, #3b82f6 100%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            border-radius: 8px;
            overflow: hidden;
        }
        
        th, td {
            border: 1px solid #e2e8f0;
            padding: 12px;
            text-align: left;
        }
        
        th {
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            color: white;
            font-weight: bold;
            font-size: 13px;
        }
        
        tr:nth-child(even) {
            background: #f8fafc;
        }
        
        tr:hover {
            background: #e2e8f0;
        }
        
        .status-approved { 
            color: #059669; 
            font-weight: bold;
            background: #dcfce7;
            padding: 4px 8px;
            border-radius: 4px;
        }
        
        .status-pending { 
            color: #d97706; 
            font-weight: bold;
            background: #fef3c7;
            padding: 4px 8px;
            border-radius: 4px;
        }
        
        .status-rejected { 
            color: #dc2626; 
            font-weight: bold;
            background: #fee2e2;
            padding: 4px 8px;
            border-radius: 4px;
        }
        
        .insight-box {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border-left: 6px solid #0ea5e9;
            padding: 20px;
            margin: 15px 0;
            border-radius: 0 8px 8px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .insight-box h4 {
            margin-top: 0;
            color: #0c4a6e;
            font-size: 16px;
        }
        
        .footer {
            text-align: center;
            margin-top: 50px;
            padding-top: 20px;
            border-top: 2px solid #e2e8f0;
            color: #64748b;
            font-size: 11px;
            background: #f8fafc;
            padding: 20px;
            border-radius: 8px;
        }
        
        .chart-placeholder {
            background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
            border: 2px dashed #94a3b8;
            border-radius: 8px;
            padding: 40px;
            text-align: center;
            color: #64748b;
            font-style: italic;
            margin: 20px 0;
        }
        
        .summary-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin: 20px 0;
        }
        
        .summary-stat {
            background: #f8fafc;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            border: 1px solid #e2e8f0;
        }
        
        .summary-stat-value {
            font-size: 24px;
            font-weight: bold;
            color: #1e40af;
        }
        
        .summary-stat-label {
            font-size: 12px;
            color: #64748b;
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <div class="header no-break">
        <div class="logo">Ministry of Health - Oman</div>
        <div class="hospital-name">Royal Hospital Muscat</div>
        <h1 class="report-title">Pre-authorization Analytics Report</h1>
    </div>

    <div class="report-info no-break">
        <h3>📊 Report Information</h3>
        <p><strong>Time Period:</strong> ${timeRange === "7d" ? "Last 7 days" : timeRange === "30d" ? "Last 30 days" : timeRange === "90d" ? "Last 90 days" : "Last year"}</p>
        <p><strong>Generated:</strong> ${reportDate} at ${reportTime}</p>
        <p><strong>Generated by:</strong> ${user?.name || "System User"}</p>
        <p><strong>Report ID:</strong> PA-${Date.now().toString().slice(-6)}</p>
    </div>

    <div class="section no-break">
        <h2 class="section-title">📈 Key Performance Indicators</h2>
        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-value">${metrics.totalRequests.toLocaleString()}</div>
                <div class="metric-label">Total Requests</div>
                <div class="metric-change">${metrics.growth} vs last period</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${metrics.approvalRate}%</div>
                <div class="metric-label">Approval Rate</div>
                <div class="metric-change">+3.2% improvement</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${metrics.avgResponseTime}</div>
                <div class="metric-label">Avg Response Time</div>
                <div class="metric-change">${metrics.timeImprovement} faster</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${metrics.pendingReview}</div>
                <div class="metric-label">Pending Review</div>
                <div class="metric-change">${metrics.pendingChange} from yesterday</div>
            </div>
        </div>
    </div>

    <div class="page-break"></div>

    <div class="section">
        <h2 class="section-title">📊 Request Trends Analysis</h2>
        <div class="chart-placeholder">
            📈 Chart: Request trends showing submitted, approved, rejected, and pending requests over time
        </div>
        <table>
            <thead>
                <tr>
                    <th class="whitespace-nowrap">Period</th>
                    <th class="whitespace-nowrap">Submitted</th>
                    <th class="whitespace-nowrap">Approved</th>
                    <th class="whitespace-nowrap">Rejected</th>
                    <th class="whitespace-nowrap">Pending</th>
                    <th class="whitespace-nowrap">Approval Rate</th>
                </tr>
            </thead>
            <tbody>
                ${trendData
                  .map(
                    (item) => `
                    <tr>
                        <td><strong>${item.date}</strong></td>
                        <td>${item.submitted}</td>
                        <td><span class="status-approved">${item.approved}</span></td>
                        <td><span class="status-rejected">${item.rejected}</span></td>
                        <td><span class="status-pending">${item.pending}</span></td>
                        <td>${((item.approved / item.submitted) * 100).toFixed(1)}%</td>
                    </tr>
                `,
                  )
                  .join("")}
            </tbody>
        </table>
    </div>

    <div class="section">
        <h2 class="section-title">🎯 Status Distribution</h2>
        <div class="chart-placeholder">
            🥧 Chart: Pie chart showing distribution of approved, pending, and rejected requests
        </div>
        <div class="summary-stats">
            ${statusData
              .map(
                (item) => `
                <div class="summary-stat">
                    <div class="summary-stat-value">${item.value}%</div>
                    <div class="summary-stat-label">${item.name}</div>
                    <div style="font-size: 11px; color: #64748b;">${Math.round((item.value / 100) * metrics.totalRequests)} requests</div>
                </div>
            `,
              )
              .join("")}
        </div>
    </div>

    <div class="section">
        <h2 class="section-title">⏱️ Response Time Analysis</h2>
        <table>
            <thead>
                <tr>
                    <th class="whitespace-nowrap">Time Range</th>
                    <th class="whitespace-nowrap">Count</th>
                    <th class="whitespace-nowrap">Percentage</th>
                    <th class="whitespace-nowrap">Performance</th>
                </tr>
            </thead>
            <tbody>
                ${responseTimeData
                  .map(
                    (item) => `
                    <tr>
                        <td><strong>${item.timeRange}</strong></td>
                        <td>${item.count}</td>
                        <td>${item.percentage}%</td>
                        <td>${item.percentage >= 30 ? "🟢 Good" : item.percentage >= 20 ? "🟡 Average" : "🔴 Needs Improvement"}</td>
                    </tr>
                `,
                  )
                  .join("")}
            </tbody>
        </table>
    </div>

    <div class="page-break"></div>

    <div class="section">
        <h2 class="section-title">👨‍⚕️ Physician Performance</h2>
        <table>
            <thead>
                <tr>
                    <th class="whitespace-nowrap">Physician</th>
                    <th class="whitespace-nowrap">Total Requests</th>
                    <th class="whitespace-nowrap">Approved</th>
                    <th class="whitespace-nowrap">Rejected</th>
                    <th class="whitespace-nowrap">Approval Rate</th>
                    <th class="whitespace-nowrap">Performance</th>
                </tr>
            </thead>
            <tbody>
                ${physicianData
                  .map((item) => {
                    const approvalRate = ((item.approved / item.total) * 100).toFixed(1)
                    const performance =
                      Number.parseFloat(approvalRate) >= 85
                        ? "🟢 Excellent"
                        : Number.parseFloat(approvalRate) >= 75
                          ? "🟡 Good"
                          : "🔴 Needs Review"
                    return `
                    <tr>
                        <td><strong>${item.name}</strong></td>
                        <td>${item.total}</td>
                        <td><span class="status-approved">${item.approved}</span></td>
                        <td><span class="status-rejected">${item.rejected}</span></td>
                        <td><strong>${approvalRate}%</strong></td>
                        <td>${performance}</td>
                    </tr>
                `
                  })
                  .join("")}
            </tbody>
        </table>
    </div>

    <div class="section">
        <h2 class="section-title">❌ Top Rejection Reasons</h2>
        <table>
            <thead>
                <tr>
                    <th class="whitespace-nowrap">Rejection Reason</th>
                    <th class="whitespace-nowrap">Count</th>
                    <th class="whitespace-nowrap">Percentage</th>
                    <th class="whitespace-nowrap">Impact</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>Incomplete documentation</td><td>45</td><td>35%</td><td>🔴 High</td></tr>
                <tr><td>Medical necessity not established</td><td>32</td><td>25%</td><td>🟡 Medium</td></tr>
                <tr><td>Prior authorization required</td><td>25</td><td>20%</td><td>🟡 Medium</td></tr>
                <tr><td>Service not covered</td><td>18</td><td>14%</td><td>🟢 Low</td></tr>
                <tr><td>Other</td><td>8</td><td>6%</td><td>🟢 Low</td></tr>
            </tbody>
        </table>
    </div>

    <div class="section">
        <h2 class="section-title">💡 Performance Insights</h2>
        
        <div class="insight-box">
            <h4>✅ Positive Trend</h4>
            <p>Approval rate increased by 3.2% this month, indicating improved documentation quality and better adherence to pre-authorization guidelines.</p>
        </div>
        
        <div class="insight-box">
            <h4>⚡ Efficiency Gain</h4>
            <p>Average response time reduced by ${metrics.timeImprovement.replace("-", "")}, improving patient satisfaction and reducing administrative burden on healthcare providers.</p>
        </div>
        
        <div class="insight-box">
            <h4>⚠️ Action Required</h4>
            <p><strong>${metrics.pendingReview} requests</strong> are pending review for more than 24 hours. Consider prioritizing these cases to maintain service quality and patient care standards.</p>
        </div>
    </div>

    <div class="footer">
        <p><strong>This report was generated automatically by the Insurance Platform Analytics System</strong></p>
        <p>© ${new Date().getFullYear()} Ministry of Health - Oman. All rights reserved.</p>
        <p>For questions about this report, contact the Analytics Department</p>
        <p>Report generated on ${reportDate} at ${reportTime}</p>
    </div>
</body>
</html>
    `
    }

    // Simulate processing time
    setTimeout(() => {
      try {
        const reportContent = generatePDFReportContent()

        // Create a new window for PDF generation
        const printWindow = window.open("", "_blank")
        if (printWindow) {
          printWindow.document.write(reportContent)
          printWindow.document.close()

          // Wait for content to load, then trigger print
          printWindow.onload = () => {
            setTimeout(() => {
              printWindow.print()
              // Close the window after printing
              setTimeout(() => {
                printWindow.close()
              }, 1000)
            }, 500)
          }
        } else {
          // Fallback: create downloadable HTML file
          const blob = new Blob([reportContent], { type: "text/html" })
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement("a")
          link.href = url
          link.download = `Pre-authorization_Analytics_Report_${timeRange}_${new Date().toISOString().split("T")[0]}.html`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          window.URL.revokeObjectURL(url)
        }

        setIsExporting(false)
        toast({
          title: "PDF Report Generated",
          description: `Pre-authorization Analytics Report (${timeRange}) is ready for download. Please use your browser's print dialog to save as PDF.`,
        })
      } catch (error) {
        setIsExporting(false)
        toast({
          title: "Export Failed",
          description: "There was an error generating the report. Please try again.",
          variant: "destructive",
        })
      }
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
              <Link href="/pre-authorization">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              </Link>
              <div className="min-w-0">
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-1 truncate">
                  Pre-authorization Analytics
                </h1>
                <p className="text-xs lg:text-sm text-gray-500">Comprehensive insights and performance metrics</p>
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
        <div className="flex-1 overflow-auto" ref={contentRef}>
          <div className="p-4 lg:p-6 space-y-6 lg:space-y-8">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <Select value={timeRange} onValueChange={handleTimeRangeChange}>
                  <SelectTrigger className="w-40 bg-white">
                    <Calendar className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                    <SelectItem value="1y">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" className="gap-2" onClick={handleExport} disabled={isExporting}>
                {isExporting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Export PDF Report
                  </>
                )}
              </Button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center gap-3 lg:gap-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <ClipboardList className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xl lg:text-2xl font-bold text-gray-900">{metrics.totalRequests}</div>
                      <div className="text-sm text-gray-600 truncate">Total Requests</div>
                      <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                        <TrendingUp className="w-3 h-3" />
                        {metrics.growth} vs last period
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-gradient-to-br from-emerald-50 to-green-50">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center gap-3 lg:gap-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xl lg:text-2xl font-bold text-emerald-600">{metrics.approvalRate}%</div>
                      <div className="text-sm text-gray-600 truncate">Approval Rate</div>
                      <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                        <TrendingUp className="w-3 h-3" />
                        +3.2% improvement
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-violet-50">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center gap-3 lg:gap-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xl lg:text-2xl font-bold text-purple-600">{metrics.avgResponseTime}</div>
                      <div className="text-sm text-gray-600 truncate">Avg Response Time</div>
                      <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                        <TrendingDown className="w-3 h-3" />
                        {metrics.timeImprovement} faster
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-amber-50">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center gap-3 lg:gap-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xl lg:text-2xl font-bold text-orange-600">{metrics.pendingReview}</div>
                      <div className="text-sm text-gray-600 truncate">Pending Review</div>
                      <div className="flex items-center gap-1 text-xs text-red-600 font-medium">
                        <TrendingUp className="w-3 h-3" />
                        {metrics.pendingChange} from yesterday
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Trend Chart */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="px-6 py-4">
                  <CardTitle className="text-lg font-semibold text-gray-900">Request Trends</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="h-[350px] w-full">
                    <ChartContainer
                      config={{
                        submitted: { label: "Submitted", color: "hsl(var(--chart-1))" },
                        approved: { label: "Approved", color: "hsl(var(--chart-2))" },
                        rejected: { label: "Rejected", color: "hsl(var(--chart-3))" },
                        pending: { label: "Pending", color: "hsl(var(--chart-4))" },
                      }}
                      className="h-full w-full"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="submitted"
                            stackId="1"
                            stroke="var(--color-submitted)"
                            fill="var(--color-submitted)"
                            fillOpacity={0.6}
                          />
                          <Area
                            type="monotone"
                            dataKey="approved"
                            stackId="1"
                            stroke="var(--color-approved)"
                            fill="var(--color-approved)"
                            fillOpacity={0.6}
                          />
                          <Area
                            type="monotone"
                            dataKey="rejected"
                            stackId="1"
                            stroke="var(--color-rejected)"
                            fill="var(--color-rejected)"
                            fillOpacity={0.6}
                          />
                          <Area
                            type="monotone"
                            dataKey="pending"
                            stackId="1"
                            stroke="var(--color-pending)"
                            fill="var(--color-pending)"
                            fillOpacity={0.6}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Status Distribution */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="px-6 py-4">
                  <CardTitle className="text-lg font-semibold text-gray-900">Status Distribution</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="flex flex-col items-center justify-center h-[350px]">
                    <div className="h-[280px] w-full max-w-[280px]">
                      <ChartContainer
                        config={{
                          approved: { label: "Approved", color: "#10b981" },
                          pending: { label: "Pending", color: "#f59e0b" },
                          rejected: { label: "Rejected", color: "#ef4444" },
                        }}
                        className="h-full w-full"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={statusData}
                              cx="50%"
                              cy="50%"
                              innerRadius={70}
                              outerRadius={120}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {statusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <ChartTooltip content={<ChartTooltipContent />} />
                          </PieChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4 w-full">
                      {statusData.map((item, index) => (
                        <div key={index} className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-1">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                            <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                          </div>
                          <div className="text-xs text-gray-600">{item.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Response Time Analysis */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="px-6 py-4">
                  <CardTitle className="text-lg font-semibold text-gray-900">Response Time Analysis</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="h-[350px] w-full">
                    <ChartContainer
                      config={{
                        count: { label: "Count", color: "hsl(var(--chart-1))" },
                      }}
                      className="h-full w-full"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={responseTimeData}
                          layout="horizontal"
                          margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="timeRange" type="category" width={70} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Bar
                            dataKey="count"
                            name="Number of Requests"
                            fill="var(--color-count)"
                            radius={[0, 4, 4, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Physician Performance */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="px-6 py-4">
                  <CardTitle className="text-lg font-semibold text-gray-900">Top Physicians by Volume</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="h-[350px] w-full">
                    <ChartContainer
                      config={{
                        approved: { label: "Approved", color: "hsl(var(--chart-2))" },
                        rejected: { label: "Rejected", color: "hsl(var(--chart-3))" },
                      }}
                      className="h-full w-full"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={physicianData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} interval={0} />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Bar
                            dataKey="approved"
                            name="Approved"
                            stackId="a"
                            fill="var(--color-approved)"
                            radius={[0, 0, 0, 0]}
                          />
                          <Bar
                            dataKey="rejected"
                            name="Rejected"
                            stackId="a"
                            fill="var(--color-rejected)"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Rejection Reasons */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="px-6 py-4">
                  <CardTitle className="text-lg font-semibold text-gray-900">Top Rejection Reasons</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="space-y-4">
                    {[
                      { reason: "Incomplete documentation", count: 45, percentage: 35 },
                      { reason: "Medical necessity not established", count: 32, percentage: 25 },
                      { reason: "Prior authorization required", count: 25, percentage: 20 },
                      { reason: "Service not covered", count: 18, percentage: 14 },
                      { reason: "Other", count: 8, percentage: 6 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{item.reason}</div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div className="bg-red-500 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                          </div>
                        </div>
                        <div className="ml-4 text-right">
                          <div className="text-sm font-semibold text-gray-900">{item.count}</div>
                          <div className="text-xs text-gray-500">{item.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Insights */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="px-6 py-4">
                  <CardTitle className="text-lg font-semibold text-gray-900">Performance Insights</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">Positive Trend</span>
                      </div>
                      <p className="text-sm text-green-700">
                        Approval rate increased by 3.2% this month, indicating improved documentation quality and better
                        adherence to pre-authorization guidelines.
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">Efficiency Gain</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        Average response time reduced by ${metrics.timeImprovement.replace("-", "")}, improving patient
                        satisfaction and reducing administrative burden on healthcare providers.
                      </p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-medium text-red-800">Action Required</span>
                      </div>
                      <p className="text-sm text-red-700">
                        <strong>{metrics.pendingReview} requests</strong> are pending review for more than 24 hours.
                        Consider prioritizing these cases to maintain service quality and patient care standards.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
