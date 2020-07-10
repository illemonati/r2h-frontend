import React from "react";
import {RiskCalculatorFieldResult, RiskCalculatorFields} from "../RiskCalculatorFormat";
import './styles.css';
import NumberFieldComponent from "./FieldComponents/NumberFieldComponent";
import DropdownFieldComponent from "./FieldComponents/DropdownFieldComponent";
import CheckboxFieldComponent from "./FieldComponents/CheckboxFieldComponent";
import {Grid} from "@material-ui/core";

interface RiskCalculatorConfigComponentProps {
    fields: RiskCalculatorFields,
    callBack: (result: RiskCalculatorFieldResult) => any,
    comparisonFields: RiskCalculatorFields,
    comparisonCallBack: (result: RiskCalculatorFieldResult) => any,
    comparisonModeState: boolean,
    setComparisonModeState: (state: boolean) => any
}


interface RiskCalculatorConfigComponentInnerProps {
    fields: RiskCalculatorFields,
    callBack: (result: RiskCalculatorFieldResult) => any,
}

function RiskCalculatorConfigComponentInner(props: RiskCalculatorConfigComponentInnerProps) {
    return (
      <>
          {props.fields.map((field, i) => {
              let fieldComponent: any;
              if (field.inputType === 'number') {
                  fieldComponent = (
                      <NumberFieldComponent field={field} key={i} callBack={props.callBack}/>
                  )
              } else if (field.inputType === 'dropdown') {
                  fieldComponent = (
                      <DropdownFieldComponent field={field} key={i} callBack={props.callBack} />
                  )
              } else if (field.inputType === 'checkbox') {
                  fieldComponent = (
                      <CheckboxFieldComponent field={field} key={i} callBack={props.callBack}/>
                  )
              }
              return fieldComponent;
          })}
      </>
    )
}


export default function RiskCalculatorConfigComponent(props: RiskCalculatorConfigComponentProps) {
    return (
        <div className="RiskCalculatorConfigComponent">
            <br />
            <Grid container spacing={2}>
                <Grid item xs={props.comparisonModeState ? 6 : 12}>
                    <RiskCalculatorConfigComponentInner fields={props.fields} callBack={props.callBack}/>
                </Grid>
                {props.comparisonModeState && (
                    <Grid item xs={6}>
                        <RiskCalculatorConfigComponentInner fields={props.comparisonFields} callBack={props.comparisonCallBack}/>
                    </Grid>
                )}
            </Grid>
        </div>
    )
}

