import { CovidInfos } from "../utils/CovidInfo";

export function covidInfosReducer(state = [], action: any): CovidInfos {
    switch (action.type) {
        case "UPDATE_COVID_INFOS":
            return [...action.payload] as CovidInfos;
        default:
            return state.slice();
    }
}
