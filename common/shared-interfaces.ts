import { bool, boolean } from "joi"

export interface JobApplication {
    firstname: string
    lastname: string
    phone: string
    location: string
    linkedin: string
    resume: string
}

export interface ServiceResponse {
    error: boolean
    code: number
}