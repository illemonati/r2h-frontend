import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Container,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Step,
    StepButton,
    Stepper,
    Typography
} from "@material-ui/core";
import './styles.css';
import SwipeableViews from "react-swipeable-views";


interface RiskCalculatorIntroComponentProps {
    open: boolean,
    setOpen: (open: boolean) => any
}


function QuestionsScreen() {
    return (
        <>
            <DialogTitle>
                For questions or suggestions
            </DialogTitle>
            <DialogContent>
                Please contact Alex Sox-Harris at alexsox@stanford.edu.
            </DialogContent>
        </>
    )
}


function MoreInformationScreen() {
    return (
        <>
            <DialogTitle>
                For more information about this tool, see the following publication
            </DialogTitle>
            <DialogContent>
                <Typography variant="subtitle1">
                    Harris, AHS, Kuo, A, Nordin, D, Bowe, T, Gupta, S, Giori, NG (2018).
                </Typography>
                <Typography variant="subtitle1">
                    Prediction Models for 30-Day
                    Mortality and Complications Following Total Knee and Hip Arthroplasty for Veteran Health
                    Administration Patients with Osteoarthritis.
                </Typography>
                <Typography variant="subtitle2">
                    Journal of Arthroplasty, 33(5), 1539-1545.
                </Typography>
            </DialogContent>
        </>
    )
}

function WelcomeScreen() {
    return (
        <>
            <DialogTitle>
                Welcome!
            </DialogTitle>
            <DialogContent>
                <Typography variant="subtitle1">
                    This tool is designed to help you estimate your risk of surgical complications following elective
                    total knee or hip replacement.
                </Typography>
            </DialogContent>
        </>
    )
}

function InfoScreen() {
    return (
        <>
            <DialogTitle>
                Information
            </DialogTitle>
            <DialogContent>
                <Typography variant="subtitle1">
                    This calculator is designed to measure your risks for the next 30 days.
                </Typography>
                <Typography variant="subtitle1">
                    It is most helpful if you complete this tool with your surgeon so you can input the right values and
                    interpret the results.
                </Typography>
            </DialogContent>
        </>
    )
}


export default function RiskCalculatorIntroComponent(props: RiskCalculatorIntroComponentProps) {
    const [activeStep, setActiveStep] = useState(0);
    const open = props.open;
    const setOpen = props.setOpen;
    const steps = {
        "Welcome": (<WelcomeScreen/>),
        "Info": (<InfoScreen/>),
        "More Information": (<MoreInformationScreen/>),
        "Questions": (<QuestionsScreen/>),
    } as { [key: string]: JSX.Element };

    const handleStepChange = (stepNumber: number) => {
        setActiveStep(stepNumber);
    };

    const [nextButton, setNextButton] = useState<null | JSX.Element>(null);

    useEffect(() => {
        if (activeStep < Object.keys(steps).length - 1) {
            setNextButton(
                <Button variant="outlined" color="primary" onClick={() => setActiveStep(step => step + 1)}>
                    Next
                </Button>
            );
        } else {
            setNextButton(
                <Button variant="outlined" color="primary" onClick={() => {
                    setOpen(false)
                }}>
                    Close
                </Button>
            );
        }
        // eslint-disable-next-line
    }, [activeStep, setOpen]);

    return (
        <Dialog className="RiskCalculatorIntroComponent" open={open} onClose={() => setOpen(false)}
                aria-labelledby="Risk Calculator Intro" maxWidth="xl">
            <Stepper nonLinear activeStep={activeStep}>
                {Object.keys(steps).map((stepName, i) => {
                    return (
                        <Step key={i}>
                            <StepButton onClick={() => handleStepChange(i)}>
                                {stepName}
                            </StepButton>
                        </Step>
                    )
                })}
            </Stepper>
            <div>
                <Container>
                    <SwipeableViews index={activeStep}>
                        {Object.keys(steps).map((stepName, i) => {
                            return (
                                <Box key={i} justifyItems="center" justifyContent="center">
                                    {steps[stepName]}
                                </Box>
                            );
                        })}
                    </SwipeableViews>
                    <DialogActions>
                        {nextButton}
                    </DialogActions>
                </Container>
                <br/>
                <br/>
            </div>
        </Dialog>
    )
}


