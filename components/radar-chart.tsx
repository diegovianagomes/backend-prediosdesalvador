"use client"

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartsRadarChart,
  ResponsiveContainer,
} from "recharts"
import type { Stage } from "@/lib/types"

interface RadarChartProps {
  stage: Stage
}

export default function RadarChart({ stage }: RadarChartProps) {
  // This data would come from your actual data source
  // It represents the intensity of different disciplines in this stage
  const data = [
    { discipline: "Architecture", value: stage.disciplineIntensity.architecture },
    { discipline: "Structural", value: stage.disciplineIntensity.structural },
    { discipline: "MEP", value: stage.disciplineIntensity.mep },
    { discipline: "Cost", value: stage.disciplineIntensity.cost },
    { discipline: "Project Management", value: stage.disciplineIntensity.projectManagement },
    { discipline: "Sustainability", value: stage.disciplineIntensity.sustainability },
  ]

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="discipline" />
          <PolarRadiusAxis angle={30} domain={[0, 10]} />
          <Radar
            name={`Stage ${stage.id} Intensity`}
            dataKey="value"
            stroke={stage.color}
            fill={stage.color}
            fillOpacity={0.6}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  )
}

