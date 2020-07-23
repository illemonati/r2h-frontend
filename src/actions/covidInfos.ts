import { CovidInfos } from "../utils/CovidInfo";

export function updateCovidInfos(newState: CovidInfos) {
    return {
        type: "UPDATE_COVID_INFOS",
        payload: newState,
    };
}
