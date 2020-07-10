import React from "react";
import {Box, Container, Typography} from "@material-ui/core";
import MenuButtonsComponent from "../../MenuButtons/MenuButtonsComponent";
import menuButtons from "./NearMeMenuButtons";

export default function NearMeComponent() {
    return (
        <div className="NearMeComponent">
            <Typography variant="h4">
                Please choose the type of services below
                <br />
                <br />
                <Container maxWidth="sm">
                    <Box>
                        <MenuButtonsComponent menuButtons={menuButtons} />
                    </Box>
                </Container>
            </Typography>
        </div>
    );
}


