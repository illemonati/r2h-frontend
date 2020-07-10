import React from "react";
import {QuestionResult, Questions} from "./QuestionsFormat";
import OptionsInputComponent from "./QuestionComponents/OptionsInputComponent";
import TextfieldInputComponent from "./QuestionComponents/TextFieldInputComponent";
import SliderInputComponent from "./QuestionComponents/SliderInputComponent";
import CheckBoxsInputComponent from "./QuestionComponents/CheckboxsInputComponent";
import {Box, Typography} from "@material-ui/core";
import './styles.css';


interface SurveyQuestionsComponentProps {
    questions: Questions,
    updateQuestionResults: (result: QuestionResult) => any,
    displayNumbers? : boolean
}

export default function SurveyQuestionsComponent(props: SurveyQuestionsComponentProps) {
    const updateQuestionResults = props.updateQuestionResults;
    const displayNumbers = (props.displayNumbers !== undefined) ? props.displayNumbers : true;
    return (
        <>
            {props.questions.map((question, i) => {

                let optionsElement: any = null;


                if (question.choiceType === "options") {
                    optionsElement = (
                        <OptionsInputComponent question={question} number={i} setResultCallback={updateQuestionResults}/>
                    );
                } else if (question.choiceType === "textfield") {
                    optionsElement = (
                        <TextfieldInputComponent question={question} number={i} setResultCallback={updateQuestionResults}/>
                    );
                } else if (question.choiceType === "slider") {
                    optionsElement = (
                        <SliderInputComponent question={question} number={i} setResultCallback={updateQuestionResults}/>
                    );
                } else if (question.choiceType === "checkboxs") {
                    optionsElement = (
                        <CheckBoxsInputComponent question={question} number={i} setResultCallback={updateQuestionResults}/>
                    );
                }



                return (
                    <Box key={i}>
                        <Typography variant="h5" className="questionText">{` ${(displayNumbers) ? (i+1) : ''}. ${question.question}`}</Typography>
                        <br />

                        {optionsElement}
                        <br />
                        <br />
                        <br />
                    </Box>
                )


            }) }
            <br />
            <br />
        </>
    )
}

