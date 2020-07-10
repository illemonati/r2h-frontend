import {Box, Checkbox, FormControlLabel, FormGroup, TextField} from "@material-ui/core";
import React, {ChangeEvent, useEffect, useState} from "react";
import {OptionProps} from "./OptionProps";
import {ChoicesQuestion, ChoiceType, QuestionResult, QuestionResults, Questions} from "../QuestionsFormat";
import SurveyQuestionsComponent from "../SurveyQuestionsComponent";


interface CheckboxsInputComponentProps extends OptionProps {
    question: ChoicesQuestion
}


export default function CheckBoxsInputComponent(props: CheckboxsInputComponentProps) {
    const [choices, setChoices] = useState([] as Array<string | ChoiceType>);
    const [extraInfo, setExtraInfo] = useState("");
    const [optionalQuestions, setOptionalQuestions] = useState([] as Questions);
    const [optionalQuestionResults, setOptionalQuestionResults] = useState([] as QuestionResults);

    const textFieldChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setExtraInfo(e.target.value);
    };

    const makeCallback = () => {
        props.setResultCallback({
            questionNumber: props.number,
            choiceType: props.question.choiceType,
            choices: choices,
            extraInfo: extraInfo.length > 0 ? extraInfo : undefined,
            optionalQuestionResults: optionalQuestionResults
        });
    };

    const updateOptionalQuestionResults = <T extends QuestionResult>(result: T) => {
        setOptionalQuestionResults(prevState => {
            prevState[result.questionNumber] = result;
            return prevState;
        });
    };


    useEffect(() => {
        if (props.question.optionalQuestions) {
            const opQuests = [] as Questions;
            Object.keys(props.question.optionalQuestions).forEach((choiceNeeded) => {
                if (choices.includes(choiceNeeded)) {
                    opQuests.push(props.question.optionalQuestions![choiceNeeded])
                }
            });
            setOptionalQuestions(opQuests);
        }

    }, [props.question.optionalQuestions, choices]);

    useEffect(() => {
        makeCallback();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        makeCallback();
        // eslint-disable-next-line
    }, [choices]);



    const handleChange = (e: ChangeEvent<HTMLInputElement>, choice: string | ChoiceType) => {
        let c = choices.slice();
        if (e.target.checked) {
            if (!c.includes(choice)) {
                c.push(choice)
            }
        } else {
            c = c.filter((val, i) => val !== choice);
        }
        setChoices(c);
    };

    return (
        <Box>
            <FormGroup>
                {props.question.choices!.map((choice, i) => {
                    if (typeof choice === "string") {
                        return (
                            <FormControlLabel
                                control={< Checkbox onChange={(e) => handleChange(e, choice)}/>}
                                label={choice}
                                key={i}
                            />
                        )
                    } else if (choice.type === "textfield") {

                        const textInput = (
                            <TextField style={{width: "100%"}} multiline label={choice.name} key={i} onChange={textFieldChangeHandler}/>
                        );

                        return (
                            <FormControlLabel control={<Checkbox onChange={(e) => handleChange(e, choice)}/>} label={textInput} value={choice.name} key={i}/>
                        )
                    }
                    return null;
                })}
            </FormGroup>
            {(optionalQuestions.length > 0) ? (
                <Box>
                    <br />
                    <br />
                    <SurveyQuestionsComponent questions={optionalQuestions} updateQuestionResults={updateOptionalQuestionResults} displayNumbers={false}/>
                </Box>
            ) : null}
        </Box>
    )


}
