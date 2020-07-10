import React from "react";
import {Box, Container, Typography} from "@material-ui/core";
import MenuButtonsComponent from "../MenuButtons/MenuButtonsComponent";
import menuButtons from './lifeStyleMenuButtons.json';


export default function LifeStyleComponent() {
    return (
        <div className="LifeStyleComponent">
            <Typography variant="h4">
                Life Style
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


