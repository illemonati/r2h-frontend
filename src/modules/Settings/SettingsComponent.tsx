import React from "react";
import {Box, Container, Typography} from "@material-ui/core";
import MenuButtonsComponent from "../MenuButtons/MenuButtonsComponent";
import menuButtons from './SettingsMenuButtons.json';


export default function SettingsComponent() {
    return (
        <div className="SettingsComponent">
            <Typography variant="h4">
                Settings
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


