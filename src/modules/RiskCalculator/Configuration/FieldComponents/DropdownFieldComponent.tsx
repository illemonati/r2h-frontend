import React, {ChangeEvent, useEffect, useState} from "react";
import {FieldComponentProps} from "./shared";
import {Box, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {DropdownFieldConfig} from "../../RiskCalculatorFormat";

export default function DropdownFieldComponent(props: FieldComponentProps) {

    const [val, setVal] = useState(props.field.fieldConfig.default);
    const fieldConfig = props.field.fieldConfig as DropdownFieldConfig;

    const handleChange =((e: ChangeEvent<{value: unknown}>) => {
        setVal((e.target.value) as number || 0);
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
                <FormControl variant="outlined" style={{display: "flex"}}>
                    <InputLabel >{props.field.fieldName}</InputLabel>
                    <Select
                        value={val}
                        onChange={handleChange}
                        label="Age"
                    >
                        {fieldConfig.options.map((option, i) => {
                            return (
                                <MenuItem value={i} key={i}>
                                    {fieldConfig.options[i]}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Box>
            <br />
        </div>
    )
}


