import React from "react";
import {Box, Container, Typography} from "@material-ui/core";
import MenuButtonsComponent from "../MenuButtons/MenuButtonsComponent";
import menuButtons from './HealthMenuButtons.json';


export default function HealthComponent() {
    return (
        <div className="HealthComponent">
            <Typography variant="h4">
                Health
                <br />
                <br />
                <Container maxWidth="sm">
                    <Box>
                        <MenuButtonsComponent menuButtons={menuButtons} />
                    </Box>
                </Container>
            </Typography>
        </div>
    )
}


