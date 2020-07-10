import React, {ChangeEvent, useEffect, useState} from "react";
import {FieldComponentProps} from "./shared";
import {Box, TextField} from "@material-ui/core";

export default function NumberFieldComponent(props: FieldComponentProps) {

    const [val, setVal] = useState(props.field.fieldConfig.default);

    const handleChange =((e: ChangeEvent<HTMLInputElement>) => {
        setVal(parseFloat(e.target.value) || 0);
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
                <TextField label={props.field.fieldName}
                           type="number"
                           variant="outlined"
                           value={val}
                           onChange={handleChange}
                />
            </Box>
            <br />
        </div>
    )
}


