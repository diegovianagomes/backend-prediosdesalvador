"use client"

import type { Stage, ProjectProgress } from "@/lib/types"

interface ProgressIndicatorProps {
  stages: Stage[]
  projectProgress: ProjectProgress
}

// Update the progress calculation to include completed items
export default function ProgressIndicator({ stages, projectProgress }: ProgressIndicatorProps) {
  // Calculate overall progress percentage
  const totalStages = stages.length
  const totalTasks = stages.reduce((acc, stage) => acc + stage.tasks.length, 0)

  const inProgressStages = projectProgress.selectedStages.length
  const completedStages = projectProgress.completedStages.length
  const inProgressTasks = projectProgress.selectedTasks.length
  const completedTasks = projectProgress.completedTasks.length

  const stageProgress = ((inProgressStages * 0.5 + completedStages) / totalStages) * 100
  const taskProgress = ((inProgressTasks * 0.5 + completedTasks) / totalTasks) * 100

  // Calculate weighted progress (stages are 40%, tasks are 60%)
  const overallProgress = stageProgress * 0.4 + taskProgress * 0.6

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">Overall Progress</span>
          <span>{Math.round(overallProgress)}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Stages</span>
            <span>
              {inProgressStages} in progress, {completedStages} completed
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${stageProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Tasks</span>
            <span>
              {inProgressTasks} in progress, {completedTasks} completed
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${taskProgress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

