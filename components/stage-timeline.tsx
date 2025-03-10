"use client"

import { useState } from "react"
import { ChevronRight, CheckCircle2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { Stage, ProjectProgress } from "@/lib/types"

interface StageTimelineProps {
  stages: Stage[]
  selectedStage: Stage
  onSelectStage: (stage: Stage) => void
  filter: string
  projectProgress: ProjectProgress
}

export default function StageTimeline({
  stages,
  selectedStage,
  onSelectStage,
  filter,
  projectProgress,
}: StageTimelineProps) {
  const [hoveredStage, setHoveredStage] = useState<Stage | null>(null)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Architectural Design Timeline</h2>

      <div className="relative">
        <div className="flex h-20 items-stretch">
          {stages.map((stage, index) => {
            const isStageSelected = projectProgress.selectedStages.includes(stage.id)
            const isStageCompleted = projectProgress.completedStages.includes(stage.id)

            return (
              <TooltipProvider key={stage.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={cn(
                        "group relative flex-1 cursor-pointer transition-all duration-200 ease-in-out",
                        selectedStage.id === stage.id ? "flex-[1.5]" : "hover:flex-[1.2]",
                        index === 0 ? "rounded-l-lg" : "",
                        index === stages.length - 1 ? "rounded-r-lg" : "",
                        isStageCompleted ? "opacity-80" : "",
                      )}
                      style={{
                        backgroundColor: stage.color,
                        opacity: hoveredStage && hoveredStage.id !== stage.id ? 0.7 : 1,
                      }}
                      onClick={() => onSelectStage(stage)}
                      onMouseEnter={() => setHoveredStage(stage)}
                      onMouseLeave={() => setHoveredStage(null)}
                    >
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-white">
                        <div className="text-2xl font-bold">{stage.id}</div>
                        <div className="text-xs font-medium text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                          {stage.name}
                        </div>

                        {/* Add indicator for selected and completed stages */}
                        {isStageCompleted && (
                          <div className="absolute top-1 right-1">
                            <CheckCircle2 className="h-4 w-4 text-white fill-white" />
                          </div>
                        )}
                        {isStageSelected && !isStageCompleted && (
                          <div className="absolute top-1 right-1">
                            <CheckCircle2 className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                      {index < stages.length - 1 && (
                        <div className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 text-white">
                          <ChevronRight className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs">
                    <div className="space-y-2">
                      <p className="font-bold">
                        Stage {stage.id}: {stage.name}
                      </p>
                      <p className="text-sm">{stage.description}</p>
                      <p className="text-xs font-medium">Expected outcome: {stage.outcome}</p>
                      {isStageCompleted && <p className="text-xs font-medium text-green-600">Status: Completed</p>}
                      {isStageSelected && !isStageCompleted && (
                        <p className="text-xs font-medium text-blue-600">Status: In Progress</p>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )
          })}
        </div>

        <div className="mt-4 flex">
          {stages.map((stage) => {
            const isStageSelected = projectProgress.selectedStages.includes(stage.id)
            const isStageCompleted = projectProgress.completedStages.includes(stage.id)

            return (
              <div
                key={stage.id}
                className="flex-1 px-2 text-center"
                style={{
                  flexGrow: selectedStage.id === stage.id ? 1.5 : 1,
                  opacity: hoveredStage && hoveredStage.id !== stage.id ? 0.7 : 1,
                }}
              >
                <div className="text-xs font-medium flex items-center justify-center gap-1">
                  Stage {stage.id}
                  {isStageCompleted && <CheckCircle2 className="h-3 w-3 text-green-600 fill-green-600" />}
                  {isStageSelected && !isStageCompleted && <CheckCircle2 className="h-3 w-3 text-blue-600" />}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

