"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { Stage, ProjectProgress } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

// Update the interface to include the onTaskComplete handler
interface StageDetailProps {
  stage: Stage
  filter: string
  projectProgress: ProjectProgress
  onTaskToggle: (stageId: number, taskName: string, selected: boolean) => void
  onTaskComplete: (stageId: number, taskName: string, completed: boolean) => void
}

// Update the component to handle task completion
export default function StageDetail({
  stage,
  filter,
  projectProgress,
  onTaskToggle,
  onTaskComplete,
}: StageDetailProps) {
  // Filter tasks based on the selected filter
  const filteredTasks = stage.tasks.filter((task) => {
    if (filter === "all") return true
    if (filter === "core") return task.category === "Core Task"
    if (filter === "sustainability") return task.name.toLowerCase().includes("sustain")
    if (filter === "selected") {
      return (
        projectProgress.selectedTasks.some((t) => t.stageId === stage.id && t.taskName === task.name) ||
        projectProgress.completedTasks.some((t) => t.stageId === stage.id && t.taskName === task.name)
      )
    }
    return true
  })

  // Check if stage is selected or completed
  const isStageSelected = projectProgress.selectedStages.includes(stage.id)
  const isStageCompleted = projectProgress.completedStages.includes(stage.id)

  return (
    <Card>
      <CardHeader style={{ backgroundColor: `${stage.color}20` }}>
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full" style={{ backgroundColor: stage.color }}></div>
          <CardTitle>
            Stage {stage.id}: {stage.name}
          </CardTitle>
          {isStageCompleted && (
            <Badge
              variant="outline"
              className="ml-2 bg-green-100 text-green-800 border-green-200 flex items-center gap-1"
            >
              <CheckCircle2 className="h-3 w-3" />
              Completed
            </Badge>
          )}
          {isStageSelected && !isStageCompleted && <Badge className="ml-2">In Progress</Badge>}
        </div>
        <CardDescription>{stage.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="tasks">
          <TabsList className="mb-4">
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
            <TabsTrigger value="procurement">Procurement Routes</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {filteredTasks.map((task, index) => {
                const isTaskSelected = projectProgress.selectedTasks.some(
                  (t) => t.stageId === stage.id && t.taskName === task.name,
                )
                const isTaskCompleted = projectProgress.completedTasks.some(
                  (t) => t.stageId === stage.id && t.taskName === task.name,
                )

                return (
                  <div
                    key={index}
                    className={`rounded-lg border p-4 ${
                      isTaskCompleted
                        ? "border-green-500 bg-green-50"
                        : isTaskSelected
                          ? "border-primary bg-primary/5"
                          : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`task-${stage.id}-${index}`}
                          checked={isTaskSelected || isTaskCompleted}
                          onCheckedChange={(checked) => {
                            if (!isTaskCompleted) {
                              onTaskToggle(stage.id, task.name, checked as boolean)
                            }
                          }}
                        />
                        <Label
                          htmlFor={`task-${stage.id}-${index}`}
                          className={`font-medium cursor-pointer ${isTaskCompleted ? "line-through text-muted-foreground" : ""}`}
                        >
                          {task.name}
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        {isTaskSelected && !isTaskCompleted && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => onTaskComplete(stage.id, task.name, true)}
                          >
                            Mark Complete
                          </Button>
                        )}
                        {isTaskCompleted && (
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
                    <p className="mt-2 ml-6 text-sm text-muted-foreground">{task.description}</p>
                    {(isTaskSelected || isTaskCompleted) && (
                      <div className="mt-2 ml-6">
                        <Badge
                          variant="outline"
                          className={
                            isTaskCompleted
                              ? "text-green-600 border-green-600 flex items-center gap-1"
                              : "text-blue-600 border-blue-600"
                          }
                        >
                          {isTaskCompleted && <CheckCircle2 className="h-3 w-3" />}
                          {isTaskCompleted ? "Completed" : "In Progress"}
                        </Badge>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="deliverables" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {stage.deliverables.map((deliverable, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{deliverable.name}</h3>
                    <Badge variant={deliverable.required ? "default" : "outline"}>
                      {deliverable.required ? "Required" : "Optional"}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{deliverable.description}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Type: {deliverable.type}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="procurement" className="space-y-4">
            <div className="grid gap-4">
              {stage.procurement.map((route, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <h3 className="font-medium">{route.name}</h3>
                  <p className="mt-2 text-sm">{route.description}</p>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Timeline Impact:</h4>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${route.timeline[stage.id] * 100}%` }}
                      ></div>
                    </div>
                    <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                      <span>Less Involvement</span>
                      <span>More Involvement</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

