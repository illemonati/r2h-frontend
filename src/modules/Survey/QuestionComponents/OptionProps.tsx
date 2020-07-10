import {Question, QuestionResult} from "../QuestionsFormat";

export interface OptionProps {
    question: Question,
    number: number,
    setResultCallback: <T extends QuestionResult>(result: T) => any
}
