import type { ProjectProgress } from "./types"

// Key used for storing progress data in localStorage
const STORAGE_KEY = "archplanner-progress"

/**
 * Saves project progress data to localStorage
 */
export function saveProgress(progress: ProjectProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch (error) {
    console.error("Failed to save progress to localStorage:", error)
  }
}

/**
 * Loads project progress data from localStorage
 * Returns null if no data is found or if there's an error
 */
export function loadProgress(): ProjectProgress | null {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (!savedData) return null

    return JSON.parse(savedData) as ProjectProgress
  } catch (error) {
    console.error("Failed to load progress from localStorage:", error)
    return null
  }
}

/**
 * Clears all saved progress data from localStorage
 */
export function clearProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error("Failed to clear progress from localStorage:", error)
  }
}

/**
 * Exports the current progress as a JSON file for the user to download
 */
export function exportProgress(progress: ProjectProgress): void {
  try {
    const dataStr = JSON.stringify(progress, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = `archplanner-progress-${new Date().toISOString().slice(0, 10)}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  } catch (error) {
    console.error("Failed to export progress:", error)
  }
}

/**
 * Imports progress data from a JSON file
 * Returns the parsed progress data or null if there's an error
 */
export function importProgress(jsonString: string): ProjectProgress | null {
  try {
    const progress = JSON.parse(jsonString) as ProjectProgress

    // Validate the imported data has the expected structure
    if (!progress.selectedStages || !progress.completedStages || !progress.selectedTasks || !progress.completedTasks) {
      throw new Error("Invalid progress data format")
    }

    return progress
  } catch (error) {
    console.error("Failed to import progress:", error)
    return null
  }
}

