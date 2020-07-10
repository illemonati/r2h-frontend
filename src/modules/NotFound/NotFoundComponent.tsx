import { Button, Container, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default () => {
    const handleBackHome = () => {};
    return (
        <div className="NotFoundComponent">
            <Container maxWidth="md">
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <Typography variant="h2">404, you know what to do.</Typography>
                <br />
                <br />
                <Button
                    variant="outlined"
                    onClick={handleBackHome}
                    component={Link}
                    to="/"
                >
                    Back Home
                </Button>
            </Container>
        </div>
    );
};
