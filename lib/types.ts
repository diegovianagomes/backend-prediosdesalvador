export interface Task {
  name: string
  category: "Core Task" | "Statutory Process" | "Information Exchange"
  description: string
  order: number
  selected?: boolean // Track if task is selected
}

export interface Deliverable {
  name: string
  type: string
  required: boolean
  description: string
}

export interface ProcurementRoute {
  name: string
  description: string
  timeline: Record<number, number> // Stage ID to relative duration/involvement
}

export interface DisciplineIntensity {
  architecture: number
  structural: number
  mep: number
  cost: number
  projectManagement: number
  sustainability: number
}

export interface Stage {
  id: number
  name: string
  description: string
  color: string
  icon: string
  outcome: string
  relativeLength: number
  tasks: Task[]
  deliverables: Deliverable[]
  procurement: ProcurementRoute[]
  disciplineIntensity: DisciplineIntensity
  selected?: boolean // Track if stage is selected
}

export interface RibaData {
  stages: Stage[]
  strategies: {
    name: string
    applicability: boolean[]
    description: string
    importance: "High" | "Medium" | "Low"
  }[]
}

// Update the ProjectProgress interface to include completed tasks and stages
export interface ProjectProgress {
  selectedStages: number[]
  completedStages: number[]
  selectedTasks: {
    stageId: number
    taskName: string
  }[]
  completedTasks: {
    stageId: number
    taskName: string
  }[]
}

