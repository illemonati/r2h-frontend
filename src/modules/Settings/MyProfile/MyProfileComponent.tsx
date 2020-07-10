import * as React from 'react';
import {
    Grid,
    Container,
    Typography,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button,
} from '@material-ui/core';
import './styles.css';
import {useState, useEffect, ChangeEvent} from 'react';
import UserProfile from './../../../utils/UserProfile';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {updateUserProfileState} from '../../../actions/userProfileState';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import MyProfileAvatarChooserComponent from "./MyProfileAvatarChooser/MyProfileAvatarChooserComponent";
import avatars from './avatars';


export default function MyProfileComponent() {
    const [userProfile, setUserProfile] = useState(useSelector<any, UserProfile>(state => state.userProfileState));
    const [nameUpdateDialogueOpen, setNameUpdateDialogueOpen] = useState(false);
    const [avatarChooserOpen, setAvatarChooserOpen] = useState(false);
    const dispatch = useDispatch();
    const handleBirthDateChange = (newBirthDate: Date | null) => {
        setUserProfile(profile => {
            profile.birthDate = (newBirthDate === null) ? (new Date()).toString() : newBirthDate.toString();
            return {...profile};
        })
    };


    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newName = event.currentTarget.value;
        if (newName.length > 20) {
            return;
        }
        setUserProfile(profile => {
            profile.name = newName;
            return {...profile};
        })
    };

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newEmail = event.currentTarget.value;
        setUserProfile(profile => {
            profile.email = newEmail;
            return {...profile};
        })
    };

    const handleAvatarChange = (newAvatar: string) => {
        setUserProfile(profile => {
            profile.avatar = newAvatar;
            return {...profile};
        })
    };

    useEffect(() => {
        dispatch(updateUserProfileState(userProfile));
    }, [userProfile, dispatch]);


    const nameUpdateDialogue = (
        <Dialog open={nameUpdateDialogueOpen} onClose={() => setNameUpdateDialogueOpen(false)}>
            <DialogTitle>
                Change Name
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter a new Name (max 20 characters)
                </DialogContentText>
                <form className="nameChangeForm"
                      noValidate
                      autoComplete="off"
                      onSubmit={(e) => {
                          setNameUpdateDialogueOpen(false);
                          e.preventDefault();
                          return false;
                      }}>
                    <TextField autoFocus
                               margin="dense"
                               label="name"
                               fullWidth
                               onChange={handleNameChange}
                               value={userProfile.name}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setNameUpdateDialogueOpen(false)} color="primary">
                    Done!
                </Button>
            </DialogActions>

        </Dialog>
    );


    return (
        <div className="MyProfileComponent">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Container maxWidth="md">
                    <Grid className="MyProfileComponentMainGrid" container spacing={10} justify="center"
                          alignItems="center">
                        <Grid item xs={6} onClick={() => setAvatarChooserOpen(true)}>
                            <img alt="profile"
                                 src={avatars[userProfile.avatar]}
                                 className="MyProfileComponentProfileImage"
                            />
                        </Grid>
                        <Grid item xs={6} className="MyProfileComponentNameGrid">
                            <Typography className="MyProfileComponentNameDisplay" variant="h4">
                                {userProfile.name}
                            </Typography>
                            <IconButton color="primary" aria-label="change name" component="span"
                                        onClick={() => setNameUpdateDialogueOpen(true)}>
                                <CreateIcon/>
                            </IconButton>

                        </Grid>

                        <Paper className="MyProfileComponentPaper" variant="outlined">
                            <Grid item xs>
                                <KeyboardDatePicker
                                    margin="normal"
                                    label="Birth Day"
                                    format="MM/dd/yyyy"
                                    value={new Date(userProfile.birthDate)}
                                    onChange={handleBirthDateChange}
                                    className="MyProfileComponentDatePicker"
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <br/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Email"
                                           className="MyProfileComponentEmailField"
                                           value={userProfile.email || ""}
                                           onChange={handleEmailChange}
                                />
                            </Grid>
                            <br/>
                        </Paper>
                    </Grid>
                </Container>
                {nameUpdateDialogue}
                <MyProfileAvatarChooserComponent avatars={avatars} open={avatarChooserOpen}
                                                 avatarCallBack={handleAvatarChange}
                                                 avatarSelected={userProfile.avatar}
                                                 setOpenState={setAvatarChooserOpen}/>
            </MuiPickersUtilsProvider>
        </div>
    );
}


