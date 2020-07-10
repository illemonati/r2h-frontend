import React from "react";
import {Box, Typography} from "@material-ui/core";
import TextfieldInputComponent from "./QuestionComponents/TextFieldInputComponent";
import {TextFieldQuestionResult} from "./QuestionsFormat";
import {useSelector} from "react-redux";
import UserProfile from "../../utils/UserProfile";


interface ContactsInputComponentProps {
    setContactsCallback: (contacts: any) => any
}


const emailRegex = RegExp(`[a-z0-9]+([-+._][a-z0-9]+){0,2}@.*?(\\.(a(?:[cdefgilmnoqrstuwxz]|ero|(?:rp|si)a)|b(?:[abdefghijmnorstvwyz]iz)|c(?:[acdfghiklmnoruvxyz]|at|o(?:m|op))|d[ejkmoz]|e(?:[ceghrstu]|du)|f[ijkmor]|g(?:[abdefghilmnpqrstuwy]|ov)|h[kmnrtu]|i(?:[delmnoqrst]|n(?:fo|t))|j(?:[emop]|obs)|k[eghimnprwyz]|l[abcikrstuvy]|m(?:[acdeghklmnopqrstuvwxyz]|il|obi|useum)|n(?:[acefgilopruz]|ame|et)|o(?:m|rg)|p(?:[aefghklmnrstwy]|ro)|qa|r[eosuw]|s[abcdeghijklmnortuvyz]|t(?:[cdfghjklmnoprtvwz]|(?:rav)?el)|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw])\\b){1,2}`);


export default function ContactsInputComponent(props: ContactsInputComponentProps) {
    const setContacts = props.setContactsCallback;
    const userProfile = useSelector<any, UserProfile>(state => state.userProfileState);

    return (
        <Box>
            <Typography variant="h5">What is your name and email?</Typography>
            <br />
            <TextfieldInputComponent
                question={{question: "What is your name?", choiceType: "textfield", textfieldLabel: 'Name', required: true}}
                number={0}
                defaultValue={userProfile.name}
                setResultCallback={(result: TextFieldQuestionResult)=>{setContacts((contacts: any)=> {
                    contacts.name = result.textInputValue || '';
                    return contacts;
                })}}
            />
            <br />
            <br />
            <TextfieldInputComponent
                question={{question: "What is your email?", choiceType: "textfield", textfieldLabel: 'Email', required: true}}
                number={1}
                defaultValue={userProfile.email}
                setResultCallback={(result: TextFieldQuestionResult)=>{setContacts((contacts: any) => {
                    if(result.textInputValue && emailRegex.test(result.textInputValue)) {
                        contacts.email = result.textInputValue
                    }

                    return contacts;
                })}}
            />
            <br />
            <br />
            <br />
        </Box>
    )
}



