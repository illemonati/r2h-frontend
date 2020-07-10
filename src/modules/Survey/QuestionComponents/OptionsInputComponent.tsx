import React, {ChangeEvent, useEffect, useState} from "react";
import {Box, FormControlLabel, Radio, RadioGroup, TextField} from "@material-ui/core";
import {OptionProps} from "./OptionProps";
import {ChoicesQuestion, QuestionResult, QuestionResults, Questions} from "../QuestionsFormat";
import SurveyQuestionsComponent from "../SurveyQuestionsComponent";


interface OptionsInputComponentProps extends OptionProps {
    question: ChoicesQuestion
}


export default function OptionsInputsComponent(props: OptionsInputComponentProps) {
    const question = props.question;
    const questionNumber = props.number;
    const setResultCallback = props.setResultCallback;
    const [value, setValue] = useState(props.question.choices![0]);
    const [optionalQuestions, setOptionalQuestions] = useState([] as Questions);
    const [optionalQuestionResults, setOptionalQuestionResults] = useState([] as QuestionResults);

    const [extraInfo, setExtraInfo] = useState("");

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue((e.target as HTMLInputElement).value);
    };

    const textFieldChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setExtraInfo(e.target.value);
    };

    const makeCallback = () => {
        setResultCallback({
            questionNumber: questionNumber,
            choiceType: question.choiceType,
            choice: value,
            extraInfo: extraInfo.length > 0 ? extraInfo : undefined,
            optionalQuestionResults: optionalQuestionResults
        })
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
                if (value === choiceNeeded) {
                    opQuests.push(props.question.optionalQuestions![choiceNeeded])
                }
            });
            setOptionalQuestions(opQuests);
        }

    }, [props.question.optionalQuestions, value]);


    useEffect(() => {
        makeCallback();
        // eslint-disable-next-line
    }, []);


    useEffect(() => {
        makeCallback();
        // eslint-disable-next-line
    }, [value, extraInfo]);

    return (
        <Box>
            <RadioGroup aria-label="Choices" value={value} onChange={changeHandler}>
                {question.choices!.map((choice, i) => {
                    if (typeof choice === "string") {
                        return (
                            <FormControlLabel control={<Radio />} label={choice} value={choice} key={i}/>
                        )
                    } else if (choice.type === "textfield") {

                        const textInput = (
                            <TextField style={{width: "100%"}} multiline label={choice.name} disabled={value !== choice.name} key={i}  onChange={textFieldChangeHandler}/>
                        );

                        return (
                            <FormControlLabel control={<Radio/>} style={{width: "100%"}} label={textInput} value={choice.name} key={i}/>
                        )
                    }
                    return null;

                })}
            </RadioGroup>
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
