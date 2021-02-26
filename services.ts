
import {JobApplication,ServiceResponse} from "./common/shared-interfaces"

export function submitApplication(req: JobApplication): ServiceResponse {
    console.log(req)
    return {
        error: false,
        code: 200,
    }
}