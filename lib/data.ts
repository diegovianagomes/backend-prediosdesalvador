import type { RibaData } from "./types"

export const ribaData: RibaData = {
  stages: [
    {
      id: 0,
      name: "Strategic Definition",
      description: "Identify client requirements and develop Strategic Brief.",
      color: "#E53935", // Red
      icon: "strategy",
      outcome: "Strategic Brief",
      relativeLength: 0.5,
      tasks: [
        {
          name: "Business Case",
          category: "Core Task",
          description:
            "Develop the business case for the project, including objectives, constraints, and success criteria.",
          order: 1,
        },
        {
          name: "Strategic Brief",
          category: "Core Task",
          description: "Develop the strategic brief outlining the client's requirements and project objectives.",
          order: 2,
        },
        {
          name: "Sustainability Aspirations",
          category: "Core Task",
          description: "Define sustainability aspirations and targets for the project.",
          order: 3,
        },
        {
          name: "Site Evaluation",
          category: "Information Exchange",
          description: "Initial evaluation of potential sites or existing buildings.",
          order: 4,
        },
      ],
      deliverables: [
        {
          name: "Strategic Brief",
          type: "Document",
          required: true,
          description: "Document outlining the client's strategic requirements and project objectives.",
        },
        {
          name: "Project Budget",
          type: "Document",
          required: true,
          description: "Initial budget assessment and financial parameters for the project.",
        },
        {
          name: "Site Information",
          type: "Report",
          required: false,
          description: "Preliminary site analysis and information gathering.",
        },
      ],
      procurement: [
        {
          name: "Traditional",
          description: "Client appoints consultants for full design before appointing a contractor.",
          timeline: { 0: 0.3, 1: 0.4, 2: 0.5, 3: 0.7, 4: 0.8, 5: 0.5, 6: 0.3, 7: 0.2 },
        },
        {
          name: "Design & Build",
          description: "Client appoints a contractor who is responsible for both design and construction.",
          timeline: { 0: 0.3, 1: 0.4, 2: 0.6, 3: 0.8, 4: 0.4, 5: 0.3, 6: 0.3, 7: 0.2 },
        },
      ],
      disciplineIntensity: {
        architecture: 5,
        structural: 1,
        mep: 1,
        cost: 6,
        projectManagement: 8,
        sustainability: 7,
      },
    },
    {
      id: 1,
      name: "Preparation and Briefing",
      description: "Develop Project Brief and feasibility studies.",
      color: "#FB8C00", // Orange
      icon: "preparation",
      outcome: "Project Brief",
      relativeLength: 0.7,
      tasks: [
        {
          name: "Project Brief",
          category: "Core Task",
          description: "Develop detailed project brief based on the strategic brief and client requirements.",
          order: 1,
        },
        {
          name: "Feasibility Studies",
          category: "Core Task",
          description: "Conduct feasibility studies to assess viability of the project.",
          order: 2,
        },
        {
          name: "Site Investigations",
          category: "Information Exchange",
          description: "Detailed site investigations and surveys.",
          order: 3,
        },
        {
          name: "Project Execution Plan",
          category: "Core Task",
          description: "Develop the project execution plan outlining how the project will be delivered.",
          order: 4,
        },
      ],
      deliverables: [
        {
          name: "Project Brief",
          type: "Document",
          required: true,
          description: "Comprehensive document detailing the client's requirements for the project.",
        },
        {
          name: "Feasibility Report",
          type: "Report",
          required: true,
          description: "Assessment of project viability including technical, financial, and regulatory considerations.",
        },
        {
          name: "Site Investigation Report",
          type: "Report",
          required: true,
          description: "Detailed analysis of site conditions and constraints.",
        },
      ],
      procurement: [
        {
          name: "Traditional",
          description: "Client appoints consultants for full design before appointing a contractor.",
          timeline: { 0: 0.3, 1: 0.7, 2: 0.8, 3: 0.9, 4: 0.7, 5: 0.5, 6: 0.3, 7: 0.2 },
        },
        {
          name: "Design & Build",
          description: "Client appoints a contractor who is responsible for both design and construction.",
          timeline: { 0: 0.3, 1: 0.7, 2: 0.9, 3: 0.5, 4: 0.3, 5: 0.3, 6: 0.3, 7: 0.2 },
        },
      ],
      disciplineIntensity: {
        architecture: 7,
        structural: 3,
        mep: 3,
        cost: 7,
        projectManagement: 8,
        sustainability: 6,
      },
    },
    {
      id: 2,
      name: "Concept Design",
      description:
        "Prepare Concept Design including outline proposals for structural design, building services, and cost information.",
      color: "#FFB300", // Amber
      icon: "concept",
      outcome: "Concept Design",
      relativeLength: 0.8,
      tasks: [
        {
          name: "Architectural Concept",
          category: "Core Task",
          description: "Develop architectural concept design based on the project brief.",
          order: 1,
        },
        {
          name: "Structural Concept",
          category: "Core Task",
          description: "Develop outline structural design proposals.",
          order: 2,
        },
        {
          name: "Building Services Concept",
          category: "Core Task",
          description: "Develop outline building services design proposals.",
          order: 3,
        },
        {
          name: "Cost Plan",
          category: "Core Task",
          description: "Develop initial cost plan based on the concept design.",
          order: 4,
        },
        {
          name: "Planning Pre-Application",
          category: "Statutory Process",
          description: "Initial discussions with planning authorities.",
          order: 5,
        },
      ],
      deliverables: [
        {
          name: "Concept Design Report",
          type: "Document",
          required: true,
          description: "Comprehensive document detailing the concept design proposals.",
        },
        {
          name: "Initial Cost Plan",
          type: "Document",
          required: true,
          description: "Preliminary cost estimates based on the concept design.",
        },
        {
          name: "Sustainability Strategy",
          type: "Document",
          required: true,
          description: "Strategy for achieving sustainability objectives.",
        },
      ],
      procurement: [
        {
          name: "Traditional",
          description: "Client appoints consultants for full design before appointing a contractor.",
          timeline: { 0: 0.3, 1: 0.5, 2: 0.9, 3: 0.9, 4: 0.7, 5: 0.5, 6: 0.3, 7: 0.2 },
        },
        {
          name: "Design & Build",
          description: "Client appoints a contractor who is responsible for both design and construction.",
          timeline: { 0: 0.3, 1: 0.5, 2: 0.9, 3: 0.6, 4: 0.3, 5: 0.3, 6: 0.3, 7: 0.2 },
        },
      ],
      disciplineIntensity: {
        architecture: 9,
        structural: 6,
        mep: 6,
        cost: 7,
        projectManagement: 6,
        sustainability: 8,
      },
    },
    {
      id: 3,
      name: "Spatial Coordination",
      description:
        "Prepare Spatial Coordination including coordinated and updated proposals for structural design, building services, and cost information.",
      color: "#7CB342", // Light Green
      icon: "spatial",
      outcome: "Spatially Coordinated Design",
      relativeLength: 0.9,
      tasks: [
        {
          name: "Coordinated Architectural Design",
          category: "Core Task",
          description: "Develop spatially coordinated architectural design.",
          order: 1,
        },
        {
          name: "Coordinated Structural Design",
          category: "Core Task",
          description: "Develop spatially coordinated structural design.",
          order: 2,
        },
        {
          name: "Coordinated Building Services Design",
          category: "Core Task",
          description: "Develop spatially coordinated building services design.",
          order: 3,
        },
        {
          name: "Updated Cost Plan",
          category: "Core Task",
          description: "Update cost plan based on the spatially coordinated design.",
          order: 4,
        },
        {
          name: "Planning Application",
          category: "Statutory Process",
          description: "Prepare and submit planning application.",
          order: 5,
        },
      ],
      deliverables: [
        {
          name: "Spatially Coordinated Design",
          type: "Document",
          required: true,
          description: "Coordinated design showing how all building elements fit together spatially.",
        },
        {
          name: "Planning Application",
          type: "Submission",
          required: true,
          description: "Formal application for planning permission.",
        },
        {
          name: "Updated Cost Plan",
          type: "Document",
          required: true,
          description: "Refined cost estimates based on the spatially coordinated design.",
        },
      ],
      procurement: [
        {
          name: "Traditional",
          description: "Client appoints consultants for full design before appointing a contractor.",
          timeline: { 0: 0.3, 1: 0.5, 2: 0.7, 3: 0.9, 4: 0.8, 5: 0.6, 6: 0.4, 7: 0.2 },
        },
        {
          name: "Design & Build",
          description: "Client appoints a contractor who is responsible for both design and construction.",
          timeline: { 0: 0.3, 1: 0.5, 2: 0.7, 3: 0.9, 4: 0.5, 5: 0.4, 6: 0.3, 7: 0.2 },
        },
      ],
      disciplineIntensity: {
        architecture: 8,
        structural: 8,
        mep: 8,
        cost: 6,
        projectManagement: 7,
        sustainability: 7,
      },
    },
    {
      id: 4,
      name: "Technical Design",
      description:
        "Prepare Technical Design including all architectural, structural, and building services information, specialist subcontractor design, and specifications.",
      color: "#039BE5", // Light Blue
      icon: "technical",
      outcome: "Technical Design",
      relativeLength: 1.0,
      tasks: [
        {
          name: "Detailed Architectural Design",
          category: "Core Task",
          description: "Develop detailed architectural design and specifications.",
          order: 1,
        },
        {
          name: "Detailed Structural Design",
          category: "Core Task",
          description: "Develop detailed structural design and specifications.",
          order: 2,
        },
        {
          name: "Detailed Building Services Design",
          category: "Core Task",
          description: "Develop detailed building services design and specifications.",
          order: 3,
        },
        {
          name: "Specialist Subcontractor Design",
          category: "Information Exchange",
          description: "Coordinate specialist subcontractor design inputs.",
          order: 4,
        },
        {
          name: "Building Regulations Submission",
          category: "Statutory Process",
          description: "Prepare and submit building regulations application.",
          order: 5,
        },
      ],
      deliverables: [
        {
          name: "Technical Design Package",
          type: "Document",
          required: true,
          description: "Complete technical design information for all building elements.",
        },
        {
          name: "Specifications",
          type: "Document",
          required: true,
          description: "Detailed specifications for all building elements and systems.",
        },
        {
          name: "Building Regulations Submission",
          type: "Submission",
          required: true,
          description: "Formal application for building regulations approval.",
        },
      ],
      procurement: [
        {
          name: "Traditional",
          description: "Client appoints consultants for full design before appointing a contractor.",
          timeline: { 0: 0.2, 1: 0.3, 2: 0.5, 3: 0.7, 4: 0.9, 5: 0.7, 6: 0.5, 7: 0.3 },
        },
        {
          name: "Design & Build",
          description: "Client appoints a contractor who is responsible for both design and construction.",
          timeline: { 0: 0.2, 1: 0.3, 2: 0.5, 3: 0.7, 4: 0.9, 5: 0.7, 6: 0.5, 7: 0.3 },
        },
      ],
      disciplineIntensity: {
        architecture: 9,
        structural: 9,
        mep: 9,
        cost: 7,
        projectManagement: 6,
        sustainability: 6,
      },
    },
    {
      id: 5,
      name: "Manufacturing and Construction",
      description: "Offsite manufacturing and onsite construction in accordance with the Construction Programme.",
      color: "#8E24AA", // Purple
      icon: "construction",
      outcome: "Manufactured and Constructed Building",
      relativeLength: 1.2,
      tasks: [
        {
          name: "Offsite Manufacturing",
          category: "Core Task",
          description: "Manufacture building components offsite.",
          order: 1,
        },
        {
          name: "Onsite Construction",
          category: "Core Task",
          description: "Construct the building onsite according to the construction programme.",
          order: 2,
        },
        {
          name: "Construction Administration",
          category: "Core Task",
          description: "Administer the construction contract.",
          order: 3,
        },
        {
          name: "Quality Control",
          category: "Core Task",
          description: "Monitor and control the quality of construction work.",
          order: 4,
        },
        {
          name: "Health and Safety Compliance",
          category: "Statutory Process",
          description: "Ensure compliance with health and safety regulations during construction.",
          order: 5,
        },
      ],
      deliverables: [
        {
          name: "Construction Progress Reports",
          type: "Report",
          required: true,
          description: "Regular reports on construction progress.",
        },
        {
          name: "Quality Control Reports",
          type: "Report",
          required: true,
          description: "Reports on quality control inspections and tests.",
        },
        {
          name: "Health and Safety File",
          type: "Document",
          required: true,
          description: "Documentation of health and safety information for the project.",
        },
      ],
      procurement: [
        {
          name: "Traditional",
          description: "Client appoints consultants for full design before appointing a contractor.",
          timeline: { 0: 0.1, 1: 0.2, 2: 0.3, 3: 0.4, 4: 0.6, 5: 0.9, 6: 0.7, 7: 0.4 },
        },
        {
          name: "Design & Build",
          description: "Client appoints a contractor who is responsible for both design and construction.",
          timeline: { 0: 0.1, 1: 0.2, 2: 0.3, 3: 0.4, 4: 0.6, 5: 0.9, 6: 0.7, 7: 0.4 },
        },
      ],
      disciplineIntensity: {
        architecture: 5,
        structural: 6,
        mep: 7,
        cost: 8,
        projectManagement: 9,
        sustainability: 4,
      },
    },
    {
      id: 6,
      name: "Handover",
      description: "Handover of building and conclusion of Building Contract.",
      color: "#00897B", // Teal
      icon: "handover",
      outcome: "Building Handed Over",
      relativeLength: 0.5,
      tasks: [
        {
          name: "Practical Completion",
          category: "Core Task",
          description: "Certify practical completion of the building.",
          order: 1,
        },
        {
          name: "Building Handover",
          category: "Core Task",
          description: "Hand over the building to the client.",
          order: 2,
        },
        {
          name: "Building User Guide",
          category: "Information Exchange",
          description: "Provide guidance on building operation and maintenance.",
          order: 3,
        },
        {
          name: "Final Account",
          category: "Core Task",
          description: "Prepare and agree final account for the project.",
          order: 4,
        },
      ],
      deliverables: [
        {
          name: "Practical Completion Certificate",
          type: "Document",
          required: true,
          description: "Formal certification of practical completion.",
        },
        {
          name: "Operation and Maintenance Manuals",
          type: "Document",
          required: true,
          description: "Comprehensive manuals for building operation and maintenance.",
        },
        {
          name: "As-Built Drawings",
          type: "Document",
          required: true,
          description: "Drawings showing the building as actually constructed.",
        },
        {
          name: "Building User Guide",
          type: "Document",
          required: true,
          description: "Guide for building users on how to operate and maintain the building.",
        },
      ],
      procurement: [
        {
          name: "Traditional",
          description: "Client appoints consultants for full design before appointing a contractor.",
          timeline: { 0: 0.1, 1: 0.1, 2: 0.2, 3: 0.3, 4: 0.4, 5: 0.7, 6: 0.9, 7: 0.5 },
        },
        {
          name: "Design & Build",
          description: "Client appoints a contractor who is responsible for both design and construction.",
          timeline: { 0: 0.1, 1: 0.1, 2: 0.2, 3: 0.3, 4: 0.4, 5: 0.7, 6: 0.9, 7: 0.5 },
        },
      ],
      disciplineIntensity: {
        architecture: 6,
        structural: 4,
        mep: 8,
        cost: 7,
        projectManagement: 9,
        sustainability: 5,
      },
    },
    {
      id: 7,
      name: "Use",
      description: "Building use, operation, and aftercare.",
      color: "#5E35B1", // Deep Purple
      icon: "use",
      outcome: "Building in Use",
      relativeLength: 0.6,
      tasks: [
        {
          name: "Post-Occupancy Evaluation",
          category: "Core Task",
          description: "Evaluate building performance and user satisfaction after occupancy.",
          order: 1,
        },
        {
          name: "Aftercare",
          category: "Core Task",
          description: "Provide aftercare services to address any issues after handover.",
          order: 2,
        },
        {
          name: "Building Performance Review",
          category: "Information Exchange",
          description: "Review actual building performance against design targets.",
          order: 3,
        },
        {
          name: "Facilities Management",
          category: "Core Task",
          description: "Ongoing management of building facilities.",
          order: 4,
        },
      ],
      deliverables: [
        {
          name: "Post-Occupancy Evaluation Report",
          type: "Report",
          required: true,
          description: "Assessment of building performance and user satisfaction after occupancy.",
        },
        {
          name: "Building Performance Report",
          type: "Report",
          required: true,
          description: "Analysis of actual building performance against design targets.",
        },
        {
          name: "Aftercare Report",
          type: "Report",
          required: false,
          description: "Documentation of aftercare activities and resolution of issues.",
        },
      ],
      procurement: [
        {
          name: "Traditional",
          description: "Client appoints consultants for full design before appointing a contractor.",
          timeline: { 0: 0.1, 1: 0.1, 2: 0.1, 3: 0.2, 4: 0.3, 5: 0.4, 6: 0.6, 7: 0.9 },
        },
        {
          name: "Design & Build",
          description: "Client appoints a contractor who is responsible for both design and construction.",
          timeline: { 0: 0.1, 1: 0.1, 2: 0.1, 3: 0.2, 4: 0.3, 5: 0.4, 6: 0.6, 7: 0.9 },
        },
      ],
      disciplineIntensity: {
        architecture: 4,
        structural: 2,
        mep: 6,
        cost: 3,
        projectManagement: 5,
        sustainability: 8,
      },
    },
  ],
  strategies: [
    {
      name: "Sustainability",
      applicability: [true, true, true, true, true, true, true, true],
      description: "Strategy for achieving sustainability objectives throughout the project lifecycle.",
      importance: "High",
    },
    {
      name: "Fire Safety",
      applicability: [false, true, true, true, true, true, true, true],
      description: "Strategy for ensuring fire safety in the building design and operation.",
      importance: "High",
    },
    {
      name: "Inclusive Design",
      applicability: [true, true, true, true, true, false, false, true],
      description: "Strategy for ensuring the building is accessible and inclusive for all users.",
      importance: "Medium",
    },
  ],
}

