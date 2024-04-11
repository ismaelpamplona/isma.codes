export type WorkExperience = {
  title: string
  show: boolean
  company: string
  link: string
  from: string
  to: string
  city: string
  state: string
  country: string
  description: string[]
  duties: {
    title: string
    data: string[]
  }
  jobs?: {
    title: string
    data: Job[]
  }
}

type techsTools = {
  title: string
  data: string[][]
}

type Job = {
  title: string
  description: string
  technologies: techsTools
  tools?: techsTools
  roles: {
    title: string
    data: string[]
  }
}
