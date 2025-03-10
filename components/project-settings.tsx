"use client"

import type React from "react"

import { useState } from "react"
import { Save, Upload, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import type { ProjectProgress } from "@/lib/types"
import { clearProgress, exportProgress, importProgress } from "@/lib/storage"

interface ProjectSettingsProps {
  projectProgress: ProjectProgress
  onProgressChange: (progress: ProjectProgress) => void
}

export default function ProjectSettings({ projectProgress, onProgressChange }: ProjectSettingsProps) {
  const [importError, setImportError] = useState<string | null>(null)
  const [showResetDialog, setShowResetDialog] = useState(false)

  // Handle file import
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImportError(null)
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const importedProgress = importProgress(content)

        if (importedProgress) {
          onProgressChange(importedProgress)
        } else {
          setImportError("Invalid progress data format")
        }
      } catch (error) {
        setImportError("Failed to parse the imported file")
        console.error(error)
      }
    }
    reader.readAsText(file)

    // Reset the input value so the same file can be selected again
    event.target.value = ""
  }

  // Handle export
  const handleExport = () => {
    exportProgress(projectProgress)
  }

  // Handle reset
  const handleReset = () => {
    clearProgress()
    onProgressChange({
      selectedStages: [],
      completedStages: [],
      selectedTasks: [],
      completedTasks: [],
    })
    setShowResetDialog(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Settings</CardTitle>
        <CardDescription>Manage your project progress data</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="import-export">
          <TabsList className="mb-4">
            <TabsTrigger value="import-export">Import/Export</TabsTrigger>
            <TabsTrigger value="reset">Reset Data</TabsTrigger>
          </TabsList>

          <TabsContent value="import-export" className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="import-file">Import Progress Data</Label>
                <div className="flex items-center gap-2">
                  <Input id="import-file" type="file" accept=".json" onChange={handleImport} />
                  <Button variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Import a previously exported JSON file to restore your progress
                </p>
              </div>

              {importError && (
                <Alert variant="destructive">
                  <AlertTitle>Import Error</AlertTitle>
                  <AlertDescription>{importError}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label>Export Progress Data</Label>
                <div className="flex items-center gap-2">
                  <Button onClick={handleExport} className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Export Progress as JSON
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Save your current progress to a file that you can import later
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reset" className="space-y-4">
            <div className="space-y-4">
              <Alert>
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Resetting your progress will permanently delete all your selected and completed tasks and stages. This
                  action cannot be undone.
                </AlertDescription>
              </Alert>

              <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Reset All Progress
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                      This will permanently delete all your progress data. This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => setShowResetDialog(false)}>
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleReset}>
                      Yes, Reset Everything
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <p className="text-xs text-muted-foreground">
                Consider exporting your data before resetting, so you can restore it if needed.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <p className="text-xs text-muted-foreground">
          Your progress is automatically saved to your browser's local storage.
        </p>
      </CardFooter>
    </Card>
  )
}

