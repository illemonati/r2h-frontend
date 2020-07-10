import {Box, TextField} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {OptionProps} from "./OptionProps";
import {TextFieldQuestion} from "../QuestionsFormat";


interface TextFieldInputComponentProps extends OptionProps {
    question: TextFieldQuestion,
    defaultValue?: string,
    color?: string
}


export default function TextfieldInputComponent(props: TextFieldInputComponentProps) {

    const [val, setVal] = useState(props.defaultValue || '');

    const makeCallback = () => {
        props.setResultCallback({
            questionNumber: props.number,
            choiceType: props.question.choiceType,
            textInputValue: val
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
        <Box>
            <TextField multiline style={{width: "100%"}}
                /*
                //@ts-ignore */
                       color={props.color || "primary"}
                       label={props.question.textfieldLabel || "answer"}
                       value={val}
                       required={props.question.required}
                       onChange={e => setVal(e.target.value)}/>
        </Box>
    )
}
