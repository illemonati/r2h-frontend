import { CovidInfos } from "../../../utils/CovidInfo";
import axios from "axios";

const apiEndPoint = "https://covidtracking.com/api/v1/us/daily.json";

export const fetchCovidInfos = async () => {
    try {
        const resp = await axios.get(apiEndPoint);
        const infos = resp.data as CovidInfos;
        return infos;
    } catch (e) {
        throw e;
    }
};
