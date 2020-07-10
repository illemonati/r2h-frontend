import {RiskCalculatorFieldResults} from "../modules/RiskCalculator/RiskCalculatorFormat";

export function updateRiskCalculatorInputs(newInputs: RiskCalculatorFieldResults) {
    return {
        type: 'UPDATE_RISK_CALC_STATE',
        payload: newInputs.slice()
    }
}


export function updateRiskCalculatorComparisonInputs(newInputs: RiskCalculatorFieldResults) {
    return {
        type: 'UPDATE_RISK_CALC_COMP_STATE',
        payload: newInputs.slice()
    }
}



