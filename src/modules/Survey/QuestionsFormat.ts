
// Alias for an array of QuestionResult
export type QuestionResults = Array<QuestionResult>;

// Interface for the result of a question
export interface QuestionResult {
    questionNumber: number,
    choiceType: string,
    extraInfo?: string
}


// Interface for the result of a Slider question
export interface SliderQuestionResult extends QuestionResult{
    sliderValue?: number
}

export interface ChoicesQuestionResult extends QuestionResult {
    optionalQuestionResults?: QuestionResults
}

export interface OptionsQuestionResult extends ChoicesQuestionResult {
    choice?: string|ChoiceType
}

export interface CheckboxesQuestionsResult extends ChoicesQuestionResult {
    choices?: Array<string|ChoiceType>,
}

export interface TextFieldQuestionResult extends QuestionResult{
    textInputValue?: string
}




// Alias for an array of questions
export type Questions = Array<Question>;


// Interface for one question, with optional fields depending on the question type
export interface Question {
    question: string,
    choiceType: string,
    required?: boolean
}

// Interface for slider question
export interface SliderQuestion extends Question {
    sliderConfig?: SliderConfig
}

// Interface for Options and Checkboxes question
export interface ChoicesQuestion extends Question {
    choices?: Array<string|ChoiceType>,
    optionalQuestions?: OptionalQuestions
}

// Interface for Optional-sub question
export interface OptionalQuestions {
    [key: string] : Question
}

// Interface for TextField question
export interface TextFieldQuestion extends Question{
    textfieldLabel?: string
}


// Interface for an options in a Question with the choiceType "options"
// Used for non string choices (eg. text input)
export interface ChoiceType {
    type: string,
    name: string
}

// Interface for the configuration of an slider
export interface SliderConfig {
    start: number,
    end: number,
    step: number,
    default?: number,
    noRange?: boolean,
    textOptions?: Array<string>,
    marks?: boolean
}

// Interface for the mark along a slider
// Used for custom Labels
export interface SliderMark {
    value: number,
    label: string,
}
