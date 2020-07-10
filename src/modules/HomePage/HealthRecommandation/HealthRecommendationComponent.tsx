import React, {useEffect, useState} from 'react';
import {Box, Container, Grid, IconButton, Paper, Typography,} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import './styles.css';
import healthRecommendations from './HealthRecommendations.json';
import {updateHealthRecommendationState} from '../../../actions/healthRecommendationState';

interface HealthRecommendationComponentProps {
}

const HealthRecommendationComponent = (props: HealthRecommendationComponentProps) => {
    const [healthRecommendationIndex, setHealthRecommendationIndex] = useState(
        useSelector<any, number>((state) => state.healthRecommendationState)
    );
    const dispatch = useDispatch();
    const handleChange = (newVal: number): number => {
        if (newVal < 0) {
            newVal = healthRecommendations.length - 1;
        } else if (newVal > healthRecommendations.length - 1) {
            newVal = 0;
        }

        setHealthRecommendationIndex(newVal);
        dispatch(updateHealthRecommendationState(newVal));
        return newVal;
    };

    const incrementHealthRecommendationIndex = () => {
        setHealthRecommendationIndex(healthRecommendationsIndex => {
            const newIndex = healthRecommendationsIndex + 1;
            return handleChange(newIndex);
        })
    }

    useEffect(() => {
        const id = setInterval(() => {
            incrementHealthRecommendationIndex();
        }, 3000);

        return () => {
            clearInterval(id);
        }
        //eslint-disable-next-line
    }, []);

    return (
        <Box className="HealthRecommendationComponent">
            <br/>
            <br/>
            <Paper variant="outlined">
                <br/>
                <br/>

                <Typography variant="h4">Health Facts</Typography>
                <br/>
                <br/>
                <Grid container alignItems="center" justify="center">
                    <Grid
                        item
                        xs={2}
                        className="HealthRecommendationComponentChangeButtonGrid"
                    >
                        <IconButton
                            onClick={() =>
                                handleChange(healthRecommendationIndex - 1)
                            }
                        >
                            <ArrowBackIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={8}>
                        <Container className="HealthRecommendationComponentMainContainer">
                            <h4>
                                {`${healthRecommendationIndex}. ${healthRecommendations[healthRecommendationIndex]}`}
                            </h4>
                        </Container>
                    </Grid>
                    <Grid
                        item
                        xs={2}
                        className="HealthRecommendationComponentChangeButtonGrid"
                    >
                        <IconButton
                            onClick={() =>
                                handleChange(healthRecommendationIndex + 1)
                            }
                        >
                            <ArrowForwardIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
                <br/>
            </Paper>
        </Box>
    );
};

export default HealthRecommendationComponent;
