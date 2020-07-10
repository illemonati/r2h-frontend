import React, {ChangeEvent, useEffect, useState} from "react";
import {FieldComponentProps} from "./shared";
import {Box, Checkbox, FormControlLabel} from "@material-ui/core";
import {CheckBoxConfig} from "../../RiskCalculatorFormat";

export default function CheckboxFieldComponent(props: FieldComponentProps) {

    const fieldConfig = props.field.fieldConfig as CheckBoxConfig;
    const [val, setVal] = useState(fieldConfig.default);

    const handleChange =((e: ChangeEvent<HTMLInputElement>) => {
        setVal(!val);
    });

    const makeCallback = () => {
        props.callBack({
            field: props.field,
            result: val
        });
    };

    useEffect(() => {
        makeCallback();
        //eslint-disable-next-line
    }, [val]);

    useEffect(() => {
        makeCallback();
        //eslint-disable-next-line
    }, []);


    return (
        <div className="NumberFieldComponent">
            <br />
            <Box>
                <FormControlLabel
                    control={<Checkbox checked={val} onChange={handleChange} name={props.field.fieldName} />}
                    label={props.field.fieldName}
                />
            </Box>
            <br />
        </div>
    )
}


