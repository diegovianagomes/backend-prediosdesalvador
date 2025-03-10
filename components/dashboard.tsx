"use client"

import { useState, useEffect } from "react"
import { Filter, Info, Maximize2, PanelLeft, ListChecks, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { ribaData } from "@/lib/data"
import type { ProjectProgress } from "@/lib/types"
import { loadProgress, saveProgress } from "@/lib/storage"
import StageTimeline from "./stage-timeline"
import StageDetail from "./stage-detail"
import SankeyDiagram from "./sankey-diagram"
import RadarChart from "./radar-chart"
import ResponsibilityMatrix from "./responsibility-matrix"
import TaskSelection from "./task-selection"
import ProgressIndicator from "./progress-indicator"
import ProjectSettings from "./project-settings"
import ConfettiCelebration from "./confetti-celebration"

export default function Dashboard() {
  const [selectedStage, setSelectedStage] = useState(ribaData.stages[0])
  const [selectedView, setSelectedView] = useState("timeline")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [showConfetti, setShowConfetti] = useState(false)

  // Initialize with empty progress state
  const [projectProgress, setProjectProgress] = useState<ProjectProgress>({
    selectedStages: [],
    completedStages: [],
    selectedTasks: [],
    completedTasks: [],
  })

  // Load saved progress from localStorage when component mounts
  useEffect(() => {
    const savedProgress = loadProgress()
    if (savedProgress) {
      setProjectProgress(savedProgress)
    }
  }, [])

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    saveProgress(projectProgress)
  }, [projectProgress])

  // Handle toggling a task's selection
  const handleTaskToggle = (stageId: number, taskName: string, selected: boolean) => {
    setProjectProgress((prev) => {
      // Update selected tasks
      let newSelectedTasks = [...prev.selectedTasks]

      if (selected) {
        // Add task if not already in the list
        if (!newSelectedTasks.some((t) => t.stageId === stageId && t.taskName === taskName)) {
          newSelectedTasks.push({ stageId, taskName })
        }
      } else {
        // Remove task if in the list
        newSelectedTasks = newSelectedTasks.filter((t) => !(t.stageId === stageId && t.taskName === taskName))
      }

      return {
        ...prev,
        selectedTasks: newSelectedTasks,
      }
    })
  }

  // Handle toggling a stage's selection
  const handleStageToggle = (stageId: number, selected: boolean) => {
    setProjectProgress((prev) => {
      // Update selected stages
      let newSelectedStages = [...prev.selectedStages]

      if (selected) {
        // Add stage if not already in the list
        if (!newSelectedStages.includes(stageId)) {
          newSelectedStages.push(stageId)
        }
      } else {
        // Remove stage if in the list
        newSelectedStages = newSelectedStages.filter((id) => id !== stageId)

        // Also remove all tasks from this stage
        const newSelectedTasks = prev.selectedTasks.filter((task) => task.stageId !== stageId)

        return {
          ...prev,
          selectedStages: newSelectedStages,
          selectedTasks: newSelectedTasks,
          completedStages: prev.completedStages,
          completedTasks: prev.completedTasks,
        }
      }

      return {
        ...prev,
        selectedStages: newSelectedStages,
      }
    })
  }

  // Add handler for completing a task
  const handleTaskComplete = (stageId: number, taskName: string, completed: boolean) => {
    if (completed) {
      // Trigger confetti animation when completing a task
      setShowConfetti(true)
    }

    setProjectProgress((prev) => {
      // Update completed tasks
      let newCompletedTasks = [...prev.completedTasks]

      if (completed) {
        // Add task if not already in the list
        if (!newCompletedTasks.some((t) => t.stageId === stageId && t.taskName === taskName)) {
          newCompletedTasks.push({ stageId, taskName })
        }

        // Remove from selected tasks if it's there
        const newSelectedTasks = prev.selectedTasks.filter((t) => !(t.stageId === stageId && t.taskName === taskName))

        return {
          ...prev,
          completedTasks: newCompletedTasks,
          selectedTasks: newSelectedTasks,
        }
      } else {
        // Remove task if in the list
        newCompletedTasks = newCompletedTasks.filter((t) => !(t.stageId === stageId && t.taskName === taskName))

        return {
          ...prev,
          completedTasks: newCompletedTasks,
        }
      }
    })
  }

  // Add handler for completing a stage
  const handleStageComplete = (stageId: number, completed: boolean) => {
    if (completed) {
      // Trigger confetti animation when completing a stage
      // Use more confetti for stage completion
      setShowConfetti(true)
    }

    setProjectProgress((prev) => {
      // Update completed stages
      let newCompletedStages = [...prev.completedStages]

      if (completed) {
        // Add stage if not already in the list
        if (!newCompletedStages.includes(stageId)) {
          newCompletedStages.push(stageId)
        }

        // Remove from selected stages if it's there
        const newSelectedStages = prev.selectedStages.filter((id) => id !== stageId)

        // Also complete all tasks from this stage
        const stageTasks = ribaData.stages.find((s) => s.id === stageId)?.tasks || []
        const taskNames = stageTasks.map((t) => t.name)

        // Add all stage tasks to completed tasks if not already there
        const newCompletedTasks = [...prev.completedTasks]
        taskNames.forEach((taskName) => {
          if (!newCompletedTasks.some((t) => t.stageId === stageId && t.taskName === taskName)) {
            newCompletedTasks.push({ stageId, taskName })
          }
        })

        // Remove all stage tasks from selected tasks
        const newSelectedTasks = prev.selectedTasks.filter((task) => task.stageId !== stageId)

        return {
          selectedStages: newSelectedStages,
          completedStages: newCompletedStages,
          selectedTasks: newSelectedTasks,
          completedTasks: newCompletedTasks,
        }
      } else {
        // Remove stage if in the list
        newCompletedStages = newCompletedStages.filter((id) => id !== stageId)

        // Also remove all tasks from this stage from completed tasks
        const newCompletedTasks = prev.completedTasks.filter((task) => task.stageId !== stageId)

        return {
          ...prev,
          completedStages: newCompletedStages,
          completedTasks: newCompletedTasks,
        }
      }
    })
  }

  return (
    <SidebarProvider>
      {/* Confetti celebration component */}
      <ConfettiCelebration active={showConfetti} duration={4000} onComplete={() => setShowConfetti(false)} />

      <div className="flex h-screen overflow-hidden">
        <Sidebar variant="sidebar" collapsible="icon">
          <SidebarHeader className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
              <div>
                <h2 className="text-lg font-bold">ArchPlanner</h2>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Stages</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {ribaData.stages.map((stage) => {
                    const isStageSelected = projectProgress.selectedStages.includes(stage.id)

                    return (
                      <SidebarMenuItem key={stage.id}>
                        <SidebarMenuButton
                          isActive={selectedStage.id === stage.id}
                          onClick={() => setSelectedStage(stage)}
                          tooltip={stage.name}
                        >
                          <div className="h-4 w-4 rounded-full mr-2" style={{ backgroundColor: stage.color }}></div>
                          <span>
                            Stage {stage.id}: {stage.name}
                          </span>
                          {isStageSelected && (
                            <div className="ml-auto">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            </div>
                          )}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Visualizations</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={selectedView === "timeline"}
                      onClick={() => setSelectedView("timeline")}
                      tooltip="Timeline View"
                    >
                      <PanelLeft className="h-4 w-4 mr-2" />
                      <span>Timeline</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={selectedView === "progress"}
                      onClick={() => setSelectedView("progress")}
                      tooltip="Progress Tracking"
                    >
                      <ListChecks className="h-4 w-4 mr-2" />
                      <span>Progress Tracking</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={selectedView === "sankey"}
                      onClick={() => setSelectedView("sankey")}
                      tooltip="Information Flow"
                    >
                      <Maximize2 className="h-4 w-4 mr-2" />
                      <span>Information Flow</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={selectedView === "radar"}
                      onClick={() => setSelectedView("radar")}
                      tooltip="Discipline Intensity"
                    >
                      <Info className="h-4 w-4 mr-2" />
                      <span>Discipline Intensity</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={selectedView === "matrix"}
                      onClick={() => setSelectedView("matrix")}
                      tooltip="Responsibility Matrix"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      <span>RACI Matrix</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={selectedView === "settings"}
                      onClick={() => setSelectedView("settings")}
                      tooltip="Project Settings"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 overflow-auto">
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center px-4">
              <SidebarTrigger />

              {/* Add progress indicator in header */}
              <div className="ml-4 flex-1 max-w-md">
                <ProgressIndicator stages={ribaData.stages} projectProgress={projectProgress} />
              </div>

              <div className="ml-auto flex items-center space-x-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Filter className="h-4 w-4 mr-2" />
                            Filter View
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => setSelectedFilter("all")}>All Elements</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSelectedFilter("sustainability")}>
                              Sustainability Strategy
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSelectedFilter("procurement")}>
                              Procurement Routes
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSelectedFilter("core")}>
                              Core Tasks Only
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSelectedFilter("selected")}>
                              Selected Tasks Only
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Filter dashboard view</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </header>
          <main className="p-4 md:p-6">
            <div className="grid gap-6">
              {selectedView === "timeline" && (
                <>
                  <Card>
                    <CardContent className="p-6">
                      <StageTimeline
                        stages={ribaData.stages}
                        selectedStage={selectedStage}
                        onSelectStage={setSelectedStage}
                        filter={selectedFilter}
                        projectProgress={projectProgress}
                      />
                    </CardContent>
                  </Card>
                  <StageDetail
                    stage={selectedStage}
                    filter={selectedFilter}
                    projectProgress={projectProgress}
                    onTaskToggle={handleTaskToggle}
                    onTaskComplete={handleTaskComplete}
                  />
                </>
              )}

              {selectedView === "progress" && (
                <TaskSelection
                  stages={ribaData.stages}
                  projectProgress={projectProgress}
                  onTaskToggle={handleTaskToggle}
                  onStageToggle={handleStageToggle}
                  onTaskComplete={handleTaskComplete}
                  onStageComplete={handleStageComplete}
                />
              )}

              {selectedView === "sankey" && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Information Flow Between Stages</h2>
                    <SankeyDiagram stages={ribaData.stages} filter={selectedFilter} />
                  </CardContent>
                </Card>
              )}

              {selectedView === "radar" && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Discipline Intensity by Stage</h2>
                    <Tabs defaultValue={selectedStage.id.toString()}>
                      <TabsList className="mb-4">
                        {ribaData.stages.map((stage) => (
                          <TabsTrigger key={stage.id} value={stage.id.toString()}>
                            Stage {stage.id}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      {ribaData.stages.map((stage) => (
                        <TabsContent key={stage.id} value={stage.id.toString()}>
                          <RadarChart stage={stage} />
                        </TabsContent>
                      ))}
                    </Tabs>
                  </CardContent>
                </Card>
              )}

              {selectedView === "matrix" && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">RACI Responsibility Matrix</h2>
                    <ResponsibilityMatrix stages={ribaData.stages} filter={selectedFilter} />
                  </CardContent>
                </Card>
              )}
              {selectedView === "settings" && (
                <ProjectSettings projectProgress={projectProgress} onProgressChange={setProjectProgress} />
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

