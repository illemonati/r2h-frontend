import React, { useState, ChangeEvent, useEffect, Fragment } from "react";
import {
    Container,
    Typography,
    Grid,
    Paper,
    Switch,
    Select,
    MenuItem,
    TextField,
} from "@material-ui/core";
import SystemConfigurations, {
    defaultSystemConfigurations,
    SystemFont,
    ThemeOption,
    ThemeOptions,
} from "../../../utils/SystemConfigurations";
import { useDispatch, useSelector } from "react-redux";
import { updateSystemConfigurations } from "../../../actions/systemConfigurations";
import { Color, ColorPicker } from "material-ui-color";

import "./styles.css";

export default function SystemConfigurationComponent() {
    const dispatch = useDispatch();
    const [systemConfigurations, setSystemConfigurations] = useState(
        useSelector<any, SystemConfigurations>(
            (state) => state.systemConfigurations
        )
    );
    const handleDarkModeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.checked;
        setSystemConfigurations((sc) => {
            sc.darkMode = newValue;
            return { ...sc };
        });
    };

    const handleSystemFontChange = (e: ChangeEvent<{ value: unknown }>) => {
        const newValue = e.target.value as string;
        let newFont: null | SystemFont = null;
        Object.keys(SystemFont).forEach((font) => {
            const sfont = SystemFont[font as keyof typeof SystemFont];
            if (sfont === newValue) {
                newFont = sfont;
            }
        });
        setSystemConfigurations((sc) => {
            newFont && (sc.systemFont = newFont);
            return { ...sc };
        });
    };

    const handleThemeChange = (e: ChangeEvent<{ value: unknown }>) => {
        const newValue = e.target.value as string;
        setSystemConfigurations((sc) => {
            sc.theme.theme = newValue as ThemeOption;
            return { ...sc };
        });
    };

    const handleColorChange = (field: unknown) => async (c: Color) => {
        const fieldName = field as keyof ThemeOptions;
        console.log(fieldName);
        console.log(c.hex);
        setSystemConfigurations((sc) => {
            sc.theme.themeOverides[fieldName] = `#${c.hex}`;
            return { ...sc };
        });
    };

    useEffect(() => {
        // console.log(systemConfigurations);
        dispatch(updateSystemConfigurations(systemConfigurations));
    }, [systemConfigurations, dispatch]);

    return (
        <div className="SystemConfigurationComponent">
            <Container maxWidth="md">
                <Typography variant="h5">Configurations</Typography>
                <br />
                <br />
                <Paper variant="outlined">
                    <br />
                    <br />
                    <Container>
                        <Grid
                            container
                            className="SystemConfigurationComponentMainGrid"
                            spacing={3}
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item xs={8}>
                                <Typography>Dark Mode (Recommended)</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Switch
                                    checked={systemConfigurations.darkMode}
                                    onChange={handleDarkModeChange}
                                />
                            </Grid>

                            <Grid item xs={8}>
                                <Typography>Font Family</Typography>
                            </Grid>

                            <Grid item xs={4}>
                                <Select
                                    value={systemConfigurations.systemFont}
                                    onChange={handleSystemFontChange}
                                    fullWidth
                                    type="text"
                                >
                                    {Object.keys(SystemFont).map((font, i) => {
                                        const ffont = font as keyof typeof SystemFont;
                                        return (
                                            <MenuItem
                                                value={SystemFont[ffont]}
                                                key={i}
                                            >
                                                {SystemFont[ffont]}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </Grid>

                            <Grid item xs={8}>
                                <Typography>Theme</Typography>
                            </Grid>

                            <Grid item xs={4}>
                                <Select
                                    value={
                                        systemConfigurations.theme.theme ||
                                        ThemeOption.default
                                    }
                                    onChange={handleThemeChange}
                                    fullWidth
                                    type="text"
                                >
                                    {Object.keys(ThemeOption).map(
                                        (theme, i) => {
                                            return (
                                                <MenuItem value={theme} key={i}>
                                                    {theme}
                                                </MenuItem>
                                            );
                                        }
                                    )}
                                </Select>
                            </Grid>

                            {systemConfigurations.theme.theme ===
                                ThemeOption.custom &&
                                Object.keys(
                                    defaultSystemConfigurations.theme
                                        .themeOverides
                                ).map((key, i) => {
                                    const value =
                                        (systemConfigurations.theme
                                            ?.themeOverides as any)[key] ||
                                        (defaultSystemConfigurations.theme
                                            .themeOverides as any)[key];
                                    return (
                                        <Fragment key={i}>
                                            <Grid item xs={8}>
                                                <Typography>{key}</Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <ColorPicker
                                                    value={value}
                                                    disableAlpha={true}
                                                    deferred={true}
                                                    palette={{}}
                                                    onChange={handleColorChange(
                                                        key
                                                    )}
                                                />
                                            </Grid>
                                        </Fragment>
                                    );
                                })}
                        </Grid>
                    </Container>
                    <br />
                    <br />
                </Paper>
            </Container>
        </div>
    );
}
