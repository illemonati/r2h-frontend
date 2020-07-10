
export type RiskCalculatorFieldResults = Array<RiskCalculatorFieldResult>;

// Interface for the result returned from a field
export interface RiskCalculatorFieldResult {
    field: RiskCalculatorField,
    result: number | boolean
}





export type RiskCalculatorFields = Array<RiskCalculatorField>;

// Interface for the an field on the calculator input
export interface RiskCalculatorField {
    fieldNumber: number,
    fieldName: string,
    inputType: string,
    fieldConfig: FieldConfig
}

export interface FieldConfig {
    default: number | boolean
}

export interface NumberFieldConfig extends FieldConfig {
    default: number
}

export interface DropdownFieldConfig extends FieldConfig {
    default: number
    options: Array<String>
}

export interface CheckBoxConfig extends FieldConfig {
    default: boolean
}
