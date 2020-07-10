import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { MenuButtons } from './MenuButtonsConfigFormat';
import './styles.css';
import { Link } from 'react-router-dom';

interface MenuButtonsComponentProps {
    menuButtons: MenuButtons;
}

export default function MenuButtonsComponent(props: MenuButtonsComponentProps) {
    return (
        <Grid container spacing={3}>
            {props.menuButtons.map((menuButton, i) => {
                const startIcon = (
                    <img
                        src={menuButton.buttonIconUrl}
                        alt={'startIconFor' + menuButton.buttonText}
                        className="MenuButtonComponentStartIcon"
                    />
                );
                return (
                    <Grid item xs={12} key={i}>
                        <Button
                            variant="outlined"
                            color="primary"
                            className="MenuButtonComponentButtons"
                            component={Link}
                            to={menuButton.linkTo}
                            startIcon={menuButton.buttonIconUrl && startIcon}
                        >
                            {menuButton.buttonText}
                        </Button>
                    </Grid>
                );
            })}
        </Grid>
    );
}
