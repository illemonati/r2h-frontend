import { combineReducers } from "redux";
import {
    riskCalculatorComparisonInputsStateReducer,
    riskCalculatorInputsStateReducer,
} from "./riskCalculatorInputs";
import serviceWorkerUpdateReducer from "./SWUpdate";
import bottomMenuStateReducer from "./bottomMenuState";
import userProfileStateReducer from "./userProfileState";
import healthRecommendationStateReducer from "./healthRecommendationState";
import systemConfigurationsReducer from "./systemConfigurations";
import { covidInfosReducer } from "./covidInfos";

const rootReducer = combineReducers({
    riskCalculatorInputs: riskCalculatorInputsStateReducer,
    riskCalculatorComparisonInputs: riskCalculatorComparisonInputsStateReducer,
    waitingSW: serviceWorkerUpdateReducer,
    bottomMenuState: bottomMenuStateReducer,
    userProfileState: userProfileStateReducer,
    healthRecommendationState: healthRecommendationStateReducer,
    systemConfigurations: systemConfigurationsReducer,
    covidInfos: covidInfosReducer,
});

export default rootReducer;
