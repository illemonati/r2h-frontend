import {RiskCalculatorFieldResults} from "../modules/RiskCalculator/RiskCalculatorFormat";



export function riskCalculatorInputsStateReducer(state=[], action: any) : RiskCalculatorFieldResults {
    switch (action.type) {
        case 'UPDATE_RISK_CALC_STATE':
            return [...action.payload] as RiskCalculatorFieldResults;
        default:
            return state.slice();
    }
}

export function riskCalculatorComparisonInputsStateReducer(state=[], action: any) : RiskCalculatorFieldResults {
    switch (action.type) {
        case 'UPDATE_RISK_CALC_COMP_STATE':
            return [...action.payload] as RiskCalculatorFieldResults;
        default:
            return state.slice();
    }
}







