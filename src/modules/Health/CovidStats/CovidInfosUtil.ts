import { CovidInfos } from "../../../utils/CovidInfo";
import axios from "axios";

// Old and deprecated
// const apiEndPoint = "https://covidtracking.com/api/v1/us/daily.json";

const apiEndPoint = "https://api.covidtracking.com/v1/us/daily.json";

export const fetchCovidInfos = async () => {
    try {
        const resp = await axios.get(apiEndPoint, {
            maxRedirects: 10,
        });
        const infos = resp.data as CovidInfos;
        console.log(infos);
        return infos;
    } catch (e) {
        throw e;
    }
};
