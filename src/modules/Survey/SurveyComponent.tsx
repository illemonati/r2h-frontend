import React, {useState} from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText, DialogActions
} from "@material-ui/core";
import {Questions, QuestionResults, QuestionResult} from "./QuestionsFormat";
import 'firebase/analytics';
import 'firebase/firestore';
import firebase from 'firebase/app';
import './styles.css';
import ContactsInputComponent from "./ContactsInputComponent";
import SurveyQuestionsComponent from "./SurveyQuestionsComponent";
import {useSelector} from "react-redux";
import UserProfile from "../../utils/UserProfile";


interface SurveyComponentProps {
    questions: Questions,
    dbCollectionName?: string,
}


export default function SurveyComponent(props: SurveyComponentProps) {
    const [submitted, setSubmitted] = useState(false);
    const [questionResults, setQuestionResults] = useState([] as QuestionResults);
    const userProfile = useSelector<any, UserProfile>(state => state.userProfileState);
    const [contacts, setContacts] = useState({
        name: userProfile.name,
        email: userProfile.email || '',
    });

    const [submitErrorDialogState, setSubmitErrorDialogState] = useState(false);

    const updateQuestionResults = <T extends QuestionResult>(result: T) => {
        setQuestionResults(prevState => {
            prevState[result.questionNumber] = result;
            return prevState;
        });
    };

    const saveToDatabase = async () => {

        if (firebase.firestore() && props.dbCollectionName) {

            const document = await firebase.firestore().collection(props.dbCollectionName).add({
                name: contacts.name,
                email: contacts.email,
                time: Date.now()
            });

            const batch = firebase.firestore().batch();
            await saveToDatabaseDocument(document, 'questionResults', questionResults, batch);

        }
    };

    const saveToDatabaseDocument = async (document: firebase.firestore.DocumentReference, collectionName: string, questionResults: QuestionResults, batch: firebase.firestore.WriteBatch) => {
        questionResults.forEach((questionResult, i) => {
            const questionResultsCollection = document.collection(collectionName);
            //@ts-ignore
            Object.keys(questionResult).forEach(key => questionResult[key] === undefined && delete questionResult[key]);
            const doc = questionResultsCollection.doc(`question-${questionResult.questionNumber}`);
            batch.set(doc, questionResult);
        });
        await batch.commit();
    };

    const handleSubmit = () => {
        if (submitted) {
            setSubmitted(false);
            return;
        }

        for (let contact of Object.keys(contacts)) {
            // @ts-ignore
            if (!contacts[contact]) {
                setSubmitErrorDialogState(true);
                return;
            }
        }

        saveToDatabase().then();
        const analytics = firebase.analytics();
        console.log(analytics);
        analytics.logEvent(`survey_submitted`, {
            collectionName: props.dbCollectionName,
        });

        setSubmitted(true);
    };


    const submitErrorDialog = (
        <Dialog open={submitErrorDialogState}
                onClose={() => setSubmitErrorDialogState(false)}
        >
            <DialogTitle>
                Please fill in all required information correctly
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You did not correctly fill out
                    <div>
                        <ul>
                            {Object.keys(contacts).map((contact, i) => {
                                //@ts-ignore
                                if (contacts[contact]) return null;

                                return (
                                    <li key={i}>{contact}</li>
                                )
                            })}
                        </ul>
                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setSubmitErrorDialogState(false)} color="primary" />
            </DialogActions>
        </Dialog>
    );

    const survey = (
        <div className="SurveyComponent">
            {submitErrorDialog}
            <Container maxWidth="md">
                <Typography variant="h3">
                    Survey
                </Typography>
                <br />
                <br />
                <ContactsInputComponent setContactsCallback={setContacts}/>
                <br />
                <br />
                <SurveyQuestionsComponent questions={props.questions} updateQuestionResults={updateQuestionResults}/>

            </Container>
        </div>
    );
    const thankyou = (
        <Container maxWidth="md">
            <Typography variant="h3">Thank you</Typography>
            <Box>
                <Typography variant="caption" style={{width: '25vw'}}>
                    {JSON.stringify(questionResults)}
                </Typography>
            </Box>
            <br />
            <br />
        </Container>
    );

    return (
        <div className="SurveyComponent">
            {submitted ? thankyou : survey}
            <Button variant="outlined" color="primary" onClick={handleSubmit}>
                {submitted ? 'Back' : 'Submit'}
            </Button>
            <br />
            <br />
        </div>
    )
}

