export interface JobApplication {
    firstname: string
    lastname: string
    phone: string
    location: string
    email: string;
    linkedin: string
    resume: string
}

export interface AsyncJobApplication extends JobApplication {
    callback_url: string
}

export interface ServiceResponse {
    error: boolean
    code: number
}

export interface RoboResponse {
    error: boolean
}

export interface RoboConfig {
    data: JobApplication
    headless: boolean, 
    slowMo: number
  }