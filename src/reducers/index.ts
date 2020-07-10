import { combineReducers } from 'redux';
import {
    riskCalculatorComparisonInputsStateReducer,
    riskCalculatorInputsStateReducer,
} from './riskCalculatorInputs';
import serviceWorkerUpdateReducer from './SWUpdate';
import bottomMenuStateReducer from './bottomMenuState';
import userProfileStateReducer from './userProfileState';
import healthRecommendationStateReducer from './healthRecommendationState';
import systemConfigurationsReducer from './systemConfigurations';

const rootReducer = combineReducers({
    riskCalculatorInputs: riskCalculatorInputsStateReducer,
    riskCalculatorComparisonInputs: riskCalculatorComparisonInputsStateReducer,
    waitingSW: serviceWorkerUpdateReducer,
    bottomMenuState: bottomMenuStateReducer,
    userProfileState: userProfileStateReducer,
    healthRecommendationState: healthRecommendationStateReducer,
    systemConfigurations: systemConfigurationsReducer,
});

export default rootReducer;
