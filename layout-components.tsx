import type { FC, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface StatusPillProps {
  status: "pending" | "submitted" | "approved" | "partial" | "rejected" | "eligible"
  label?: string
  className?: string
}

export const StatusPill: FC<StatusPillProps> = ({ status, label, className }) => {
  const statusConfig = {
    pending: {
      color: "text-amber-700 bg-amber-50 border-amber-200",
      dot: "bg-amber-500",
      defaultLabel: "Pending",
    },
    submitted: {
      color: "text-blue-700 bg-blue-50 border-blue-200",
      dot: "bg-blue-500",
      defaultLabel: "Submitted",
    },
    approved: {
      color: "text-emerald-700 bg-emerald-50 border-emerald-200",
      dot: "bg-emerald-500",
      defaultLabel: "Approved",
    },
    partial: {
      color: "text-amber-700 bg-amber-50 border-amber-200",
      dot: "bg-amber-500",
      defaultLabel: "Partial Approval",
    },
    rejected: {
      color: "text-red-700 bg-red-50 border-red-200",
      dot: "bg-red-500",
      defaultLabel: "Rejected",
    },
    eligible: {
      color: "text-emerald-700 bg-emerald-50 border-emerald-200",
      dot: "bg-emerald-500",
      defaultLabel: "Eligible",
    },
  }

  const { color, dot, defaultLabel } = statusConfig[status]
  const displayLabel = label || defaultLabel

  return (
    <div
      className={cn(
        `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${color}`,
        className,
      )}
    >
      <div className={`w-1.5 h-1.5 ${dot} rounded-full mr-1.5`}></div>
      {displayLabel}
    </div>
  )
}

interface PageHeaderProps {
  title: string
  children?: ReactNode
}

export const PageHeader: FC<PageHeaderProps> = ({ title, children }) => {
  return (
    <div className="bg-white border-b border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">{title}</h1>
          <p className="text-sm text-gray-500">Updated: 09.41h</p>
        </div>
        {children}
      </div>
    </div>
  )
}
