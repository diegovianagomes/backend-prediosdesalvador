"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Stage, ProjectProgress } from "@/lib/types"
import { exportProgress } from "@/lib/storage"
import { CheckCircle2 } from "lucide-react"

// Update the interface to include completion handlers
interface TaskSelectionProps {
  stages: Stage[]
  projectProgress: ProjectProgress
  onTaskToggle: (stageId: number, taskName: string, selected: boolean) => void
  onStageToggle: (stageId: number, selected: boolean) => void
  onTaskComplete: (stageId: number, taskName: string, completed: boolean) => void
  onStageComplete: (stageId: number, completed: boolean) => void
}

// Update the component to handle task and stage completion
export default function TaskSelection({
  stages,
  projectProgress,
  onTaskToggle,
  onStageToggle,
  onTaskComplete,
  onStageComplete,
}: TaskSelectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Progress Tracking</CardTitle>
        <CardDescription>Select the stages and tasks you are currently working on or have completed</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="stages">
          <TabsList className="mb-4">
            <TabsTrigger value="stages">Stages</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="stages" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {stages.map((stage) => {
                const isStageSelected = projectProgress.selectedStages.includes(stage.id)
                const isStageCompleted = projectProgress.completedStages.includes(stage.id)

                return (
                  <div
                    key={stage.id}
                    className={`rounded-lg border p-4 transition-colors ${
                      isStageCompleted
                        ? "border-green-500 bg-green-50"
                        : isStageSelected
                          ? "border-primary bg-primary/5"
                          : ""
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`stage-${stage.id}`}
                        checked={isStageSelected || isStageCompleted}
                        onCheckedChange={(checked) => {
                          if (!isStageCompleted) {
                            onStageToggle(stage.id, checked as boolean)
                          }
                        }}
                      />
                      <Label
                        htmlFor={`stage-${stage.id}`}
                        className={`flex items-center gap-2 font-medium cursor-pointer ${
                          isStageCompleted ? "line-through text-muted-foreground" : ""
                        }`}
                      >
                        <div className="h-4 w-4 rounded-full" style={{ backgroundColor: stage.color }}></div>
                        Stage {stage.id}: {stage.name}
                      </Label>
                    </div>

                    <div className="mt-2 text-sm text-muted-foreground">{stage.description}</div>

                    <div className="mt-2 flex items-center justify-between">
                      <Badge
                        variant={isStageCompleted ? "outline" : isStageSelected ? "default" : "outline"}
                        className={
                          isStageCompleted ? "bg-green-100 text-green-800 border-green-200 flex items-center gap-1" : ""
                        }
                      >
                        {isStageCompleted && <CheckCircle2 className="h-3 w-3" />}
                        {isStageCompleted ? "Completed" : isStageSelected ? "In Progress" : "Not Started"}
                      </Badge>

                      <div className="flex gap-2">
                        {isStageSelected && !isStageCompleted && (
                          <Button variant="outline" size="sm" onClick={() => onStageComplete(stage.id, true)}>
                            Mark Complete
                          </Button>
                        )}
                        {isStageCompleted && (
                          <Button variant="outline" size="sm" onClick={() => onStageComplete(stage.id, false)}>
                            Reopen
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            {stages.map((stage) => {
              const isStageSelected = projectProgress.selectedStages.includes(stage.id)
              const isStageCompleted = projectProgress.completedStages.includes(stage.id)
              const stageTasks = stage.tasks.map((task) => ({
                ...task,
                selected: projectProgress.selectedTasks.some((t) => t.stageId === stage.id && t.taskName === task.name),
                completed: projectProgress.completedTasks.some(
                  (t) => t.stageId === stage.id && t.taskName === task.name,
                ),
              }))

              return (
                <div key={stage.id} className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full" style={{ backgroundColor: stage.color }}></div>
                    <h3 className="text-lg font-medium">
                      Stage {stage.id}: {stage.name}
                    </h3>
                    <Badge
                      variant={isStageCompleted ? "outline" : isStageSelected ? "default" : "outline"}
                      className={
                        isStageCompleted ? "bg-green-100 text-green-800 border-green-200 flex items-center gap-1" : ""
                      }
                    >
                      {isStageCompleted && <CheckCircle2 className="h-3 w-3" />}
                      {isStageCompleted ? "Completed" : isStageSelected ? "In Progress" : "Not Started"}
                    </Badge>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    {stageTasks.map((task, index) => (
                      <div
                        key={index}
                        className={`rounded-lg border p-3 transition-colors ${
                          task.completed
                            ? "border-green-500 bg-green-50"
                            : task.selected
                              ? "border-primary bg-primary/5"
                              : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`task-${stage.id}-${index}`}
                              checked={task.selected || task.completed}
                              onCheckedChange={(checked) => {
                                if (!task.completed) {
                                  onTaskToggle(stage.id, task.name, checked as boolean)
                                }
                              }}
                            />
                            <Label
                              htmlFor={`task-${stage.id}-${index}`}
                              className={`font-medium cursor-pointer ${
                                task.completed ? "line-through text-muted-foreground" : ""
                              }`}
                            >
                              {task.name}
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            {task.selected && !task.completed && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 text-xs"
                                onClick={() => onTaskComplete(stage.id, task.name, true)}
                              >
                                Complete
                              </Button>
                            )}
                            {task.completed && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 text-xs"
                                onClick={() => onTaskComplete(stage.id, task.name, false)}
                              >
                                Reopen
                              </Button>
                            )}
                            <Badge
                              variant={
                                task.category === "Core Task"
                                  ? "default"
                                  : task.category === "Statutory Process"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {task.category}
                            </Badge>
                          </div>
                        </div>

                        <div className="mt-2 pl-6 text-sm text-muted-foreground">{task.description}</div>

                        {(task.selected || task.completed) && (
                          <div className="mt-2 pl-6">
                            <Badge
                              variant="outline"
                              className={
                                task.completed
                                  ? "text-green-600 border-green-600 flex items-center gap-1"
                                  : "text-blue-600 border-blue-600"
                              }
                            >
                              {task.completed && <CheckCircle2 className="h-3 w-3" />}
                              {task.completed ? "Completed" : "In Progress"}
                            </Badge>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </TabsContent>

          <TabsContent value="summary" className="space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-medium mb-4">Project Progress Summary</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Stages In Progress ({projectProgress.selectedStages.length})</h4>
                  {projectProgress.selectedStages.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {projectProgress.selectedStages.map((stageId) => {
                        const stage = stages.find((s) => s.id === stageId)
                        if (!stage) return null

                        return (
                          <Badge key={stageId} className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: stage.color }}></div>
                            Stage {stageId}: {stage.name}
                          </Badge>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No stages in progress</p>
                  )}
                </div>

                <div>
                  <h4 className="font-medium mb-2">Completed Stages ({projectProgress.completedStages.length})</h4>
                  {projectProgress.completedStages.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {projectProgress.completedStages.map((stageId) => {
                        const stage = stages.find((s) => s.id === stageId)
                        if (!stage) return null

                        return (
                          <Badge
                            key={stageId}
                            variant="outline"
                            className="flex items-center gap-1 bg-green-100 text-green-800 border-green-200"
                          >
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: stage.color }}></div>
                            Stage {stageId}: {stage.name}
                          </Badge>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No completed stages</p>
                  )}
                </div>

                <div>
                  <h4 className="font-medium mb-2">Tasks In Progress ({projectProgress.selectedTasks.length})</h4>
                  {projectProgress.selectedTasks.length > 0 ? (
                    <div className="space-y-2">
                      {stages.map((stage) => {
                        const stageTasks = projectProgress.selectedTasks.filter((task) => task.stageId === stage.id)

                        if (stageTasks.length === 0) return null

                        return (
                          <div key={stage.id} className="rounded border p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: stage.color }}></div>
                              <h5 className="font-medium">
                                Stage {stage.id}: {stage.name}
                              </h5>
                            </div>

                            <ul className="space-y-1 pl-5 list-disc">
                              {stageTasks.map((task, index) => (
                                <li key={index} className="text-sm">
                                  {task.taskName}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No tasks in progress</p>
                  )}
                </div>

                <div>
                  <h4 className="font-medium mb-2">Completed Tasks ({projectProgress.completedTasks.length})</h4>
                  {projectProgress.completedTasks.length > 0 ? (
                    <div className="space-y-2">
                      {stages.map((stage) => {
                        const stageTasks = projectProgress.completedTasks.filter((task) => task.stageId === stage.id)

                        if (stageTasks.length === 0) return null

                        return (
                          <div key={stage.id} className="rounded border p-3 bg-green-50">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: stage.color }}></div>
                              <h5 className="font-medium">
                                Stage {stage.id}: {stage.name}
                              </h5>
                            </div>

                            <ul className="space-y-1 pl-5 list-disc">
                              {stageTasks.map((task, index) => (
                                <li key={index} className="text-sm">
                                  {task.taskName}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No completed tasks</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => exportProgress(projectProgress)}>Export Progress Report</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

