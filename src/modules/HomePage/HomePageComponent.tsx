import React from "react";
import {Box, Container, Typography} from "@material-ui/core";
import {PageLinks} from "../../utils/links";
import logoPng from '../../static-assets/ASHA_logo_2.png';
import './styles.css';
import HealthRecommendationComponent from "./HealthRecommandation/HealthRecommendationComponent";

interface HomePageComponentProps {
    pageLinks?: PageLinks
}


export default function HomePageComponent(props: HomePageComponentProps) {
    return (
        <div className="homepage">
            <Container maxWidth="md">
                <Box margin="auto" justifyContent="center">
                    <Typography variant="h3">
                        Advocating for Self Health Awareness
                    </Typography>
                    <br />
                    <br />

                    <img className="logoImage" src={logoPng} alt="logo" />
                    <br />
                    <br />

                    <Typography className="homePageTitle" variant="h4">
                        Live Well
                    </Typography>
                    <br />
                    <Container maxWidth="sm">
                        <Box>
                            <HealthRecommendationComponent />
                        </Box>
                    </Container>
                </Box>
            </Container>
        </div>
    )
}


