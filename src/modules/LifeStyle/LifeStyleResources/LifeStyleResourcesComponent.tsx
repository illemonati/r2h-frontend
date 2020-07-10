import React from "react";
import {Box, Container, Typography} from "@material-ui/core";
import MenuButtonsComponent from "../../MenuButtons/MenuButtonsComponent";
import menuButtons from './LifeStyleResourcesMenuButtons.json';


export default function LifeStyleResourcesComponent() {
    return (
        <div className="LifeStyleResourcesComponent">
            <Typography variant="h4">
                Helpful Information
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


