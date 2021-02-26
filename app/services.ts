
import {JobApplication,ServiceResponse} from "./common/shared-interfaces"
import roboSumbit from "./robot"

export async function submitApplication(data: JobApplication): Promise<ServiceResponse> {
    const response = await roboSumbit(data)
    if (response.error) {
        return {
            error: true,
            code: 500,
        }
    }
    return {
        error: false,
        code: 200,
    }
    
}