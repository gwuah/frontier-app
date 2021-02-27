
import {JobApplication,ServiceResponse, RoboConfig} from "./common/shared-interfaces"
import roboSumbit from "./robot"

export async function submitApplication(params: RoboConfig): Promise<ServiceResponse> {
    await roboSumbit(params)
    return {
        error: false,
        code: 200,
    }
    
}