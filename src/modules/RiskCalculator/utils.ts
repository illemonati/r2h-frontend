import {RiskCalculatorFieldResults} from "./RiskCalculatorFormat";




function generateVariablesFromResults(results: RiskCalculatorFieldResults) {
    let variables = {} as any;
    results.forEach((result) => {

        let fieldResult = 0;

        if (typeof result.result === 'boolean') {
            fieldResult = (result.result) ? 1 : 0;
        } else {
            fieldResult = result.result;
        }

        variables[result.field.fieldName] = fieldResult;
    });
    return variables;
}



export function calculateMortalityRate(inputs: RiskCalculatorFieldResults) : number {
    const variables = generateVariablesFromResults(inputs);
    let result = -6.4855;
    result += ((variables['Age (yrs)']-64)*0.0420);
    result += ((variables['Cerebrovascular accident with neurological deficit'])*.0109);
    result += (((variables['Dypsnea'] === 1) ? 1 : 0) *.3394);
    result += (((variables['Dypsnea'] === 2) ? 1 : 0) * 1.3392);
    result += ((variables['Previous percutaneous transluminal coronary artery angioplasty (PTCA) or percutaneous coronary intervention (PCI)'])*.7915);
    result += ((variables['Hemiplegia that has not been treated or patient has not recovered from (also if associated with CVA/Stroke)'])*1.0695);
    result += ((variables['Open Wound (with or without infection)']) * 0.6922);
    result += ((variables['Dementia Diagnosis'])*0.6411) ;
    result += ((variables['History of Angina (in past 30 days)']) * 0.7451) ;
    result += ((variables['History of revascularization/amputation of periph. vasuclar dissease (PVD)']) * 0.3934) ;
    result += ((variables['Any Ulcer']) * 0.0085);
    result += ((variables['Any Malignancy']) * 0.0441);
    result += (((variables['ASA Class'] === 3) ? 1 : 0) * 1.1930);
    result += ((variables['Pre-operative serum albumin (g/dl)']-4.1) * -0.3652);
    result += ((variables['Pre-operative partial thromboplastin time (s)']-29.6) * 0.0449);
    return result;
}

export function calculateMortalityRisk(inputs: RiskCalculatorFieldResults) : number {
    const mortalityRate = calculateMortalityRate(inputs);
    return 100 * Math.exp(mortalityRate) / (1 + Math.exp(mortalityRate));
}


export function calculateCardiacRate(inputs: RiskCalculatorFieldResults) : number {
    // debugger;
    const variables = generateVariablesFromResults(inputs);
    let result = -5.1846;
    result += ((variables['Age (yrs)']-64) * 0.0561);
    result += ((variables['Cerebrovascular accident with neurological deficit']) * .0028);
    result += ((variables['Cerebrovascular Disease']) * 0.0618);
    result += (((variables['Dypsnea'] === 1) ? 1 : 0) * 0.1985);
    result += ((variables['History of mycoardial infarction (in past 6 months)']) * 0.0978);
    result += ((variables['Pain Medication Use']) * -0.2465);
    result += ((variables['Chemotherapy for malignancy within 30 days pre-op']) * 1.3760);
    result += ((variables['Rest pain/gangrene within 30 days pre-op']) * 0.4938);
    result += ((variables['Previous percutaneous transluminal coronary artery angioplasty (PTCA) or percutaneous coronary intervention (PCI)']) * 1.0021);
    result += ((variables['Pre-operative BUN (mg/dl)']-17.15)*.0028);
    return result;
}

export function calculateCardiacRisk(inputs: RiskCalculatorFieldResults) : number {
    const cardiacRate = calculateCardiacRate(inputs);
    return 100 * Math.exp(cardiacRate) / (1 + Math.exp(cardiacRate));
}




