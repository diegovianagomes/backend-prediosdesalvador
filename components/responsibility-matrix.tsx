"use client"

import type { Stage } from "@/lib/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ResponsibilityMatrixProps {
  stages: Stage[]
  filter: string
}

export default function ResponsibilityMatrix({ stages, filter }: ResponsibilityMatrixProps) {
  // These would be your actual roles
  const roles = [
    "Client",
    "Architect",
    "Structural Engineer",
    "MEP Engineer",
    "Cost Consultant",
    "Project Manager",
    "Contractor",
  ]

  // This is placeholder data - in a real app, this would come from your data source
  const getResponsibility = (stage: Stage, role: string): "R" | "A" | "C" | "I" | "-" => {
    // This is just a placeholder implementation
    if (role === "Client") {
      return stage.id < 2 ? "A" : stage.id < 5 ? "C" : "I"
    }
    if (role === "Architect") {
      return stage.id < 5 ? "R" : "C"
    }
    if (role === "Contractor") {
      return stage.id > 4 ? "R" : stage.id > 2 ? "C" : "-"
    }

    // Random assignment for other roles
    const options: Array<"R" | "A" | "C" | "I" | "-"> = ["R", "A", "C", "I", "-"]
    return options[Math.floor(Math.random() * options.length)]
  }

  const getResponsibilityColor = (resp: "R" | "A" | "C" | "I" | "-") => {
    switch (resp) {
      case "R":
        return "bg-green-100 dark:bg-green-900"
      case "A":
        return "bg-blue-100 dark:bg-blue-900"
      case "C":
        return "bg-yellow-100 dark:bg-yellow-900"
      case "I":
        return "bg-gray-100 dark:bg-gray-800"
      default:
        return ""
    }
  }

  const getResponsibilityTooltip = (resp: "R" | "A" | "C" | "I" | "-") => {
    switch (resp) {
      case "R":
        return "Responsible: Does the work"
      case "A":
        return "Accountable: Ultimately answerable"
      case "C":
        return "Consulted: Opinion is sought"
      case "I":
        return "Informed: Kept up-to-date"
      default:
        return "No involvement"
    }
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Role</TableHead>
            {stages.map((stage) => (
              <TableHead key={stage.id} className="text-center">
                Stage {stage.id}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role}>
              <TableCell className="font-medium">{role}</TableCell>
              {stages.map((stage) => {
                const resp = getResponsibility(stage, role)
                return (
                  <TableCell key={stage.id} className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span
                            className={`inline-block w-8 h-8 rounded-full ${getResponsibilityColor(resp)} flex items-center justify-center font-bold`}
                          >
                            {resp}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{getResponsibilityTooltip(resp)}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 flex items-center justify-center space-x-4">
        <div className="flex items-center">
          <span className="inline-block w-4 h-4 rounded-full bg-green-100 dark:bg-green-900 mr-2"></span>
          <span className="text-sm">R: Responsible</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900 mr-2"></span>
          <span className="text-sm">A: Accountable</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-4 h-4 rounded-full bg-yellow-100 dark:bg-yellow-900 mr-2"></span>
          <span className="text-sm">C: Consulted</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-4 h-4 rounded-full bg-gray-100 dark:bg-gray-800 mr-2"></span>
          <span className="text-sm">I: Informed</span>
        </div>
      </div>
    </div>
  )
}

