import React from "react";
import "./App.css";
import "typeface-roboto";
import "typeface-inconsolata";
import "@openfonts/comic-neue_latin";
import firebaseConfig from "./configs/firebase.json";
import { BrowserRouter as Router } from "react-router-dom";
import pageLinks from "./configs/links.json";
import NavDrawerComponent from "./modules/NavDrawer/NavDrawerComponent";
import {
    Box,
    ThemeProvider,
    createMuiTheme,
    CssBaseline,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import SWUpdateSnackbarComponent from "./modules/SWUpdateSnackbar/SWUpdateSnackbarComponent";
import { initFirebase } from "./firebase/auth";
import BottomMenuBarComponent from "./modules/BottomMenuBar/BottomMenuBarComponent";
import RouterComponent from "./Router";
import SystemConfigurations, {
    ThemeOption,
} from "./utils/SystemConfigurations";
import themes from "./configs/themes.json";

function App() {
    const waitingSW = useSelector<any, ServiceWorker | null>(
        (state) => state.waitingSW
    );
    const systemConfigurations = useSelector<any, SystemConfigurations>(
        (state) => state.systemConfigurations
    );

    let theme = null;

    if (systemConfigurations?.theme?.theme === ThemeOption.custom) {
        const themeOption = ThemeOption.default;
        const defaultThemeOptionValues =
            themes[themeOption][
                systemConfigurations.darkMode ? "dark" : "light"
            ];
        theme = createMuiTheme({
            palette: {
                type: systemConfigurations.darkMode ? "dark" : "light",
                primary: {
                    main:
                        systemConfigurations.theme.themeOverides.primary ||
                        defaultThemeOptionValues.primary,
                },
                secondary: {
                    main:
                        systemConfigurations.theme.themeOverides.secondary ||
                        defaultThemeOptionValues.secondary,
                },
                background: {
                    default:
                        systemConfigurations.theme.themeOverides.background ||
                        defaultThemeOptionValues.background,
                    paper:
                        systemConfigurations.theme.themeOverides.paper ||
                        defaultThemeOptionValues.paper,
                },
            },
            typography: {
                fontFamily: systemConfigurations.systemFont,
            },
        });
    } else {
        const themeOption =
            systemConfigurations?.theme?.theme || ThemeOption.default;
        const themeOptionValues =
            themes[themeOption][
                systemConfigurations.darkMode ? "dark" : "light"
            ];

        theme = createMuiTheme({
            palette: {
                type: systemConfigurations.darkMode ? "dark" : "light",
                primary: {
                    main: themeOptionValues.primary,
                },
                secondary: {
                    main: themeOptionValues.secondary,
                },
                background: {
                    default: themeOptionValues.background,
                    paper: themeOptionValues.paper,
                },
            },
            typography: {
                fontFamily: systemConfigurations.systemFont,
            },
        });
    }

    const metaThemeColor = document.querySelector("meta[name=theme-color]")!;
    metaThemeColor.setAttribute("content", theme.palette.primary.main);

    initFirebase(firebaseConfig);
    return (
        <ThemeProvider theme={theme!}>
            <CssBaseline />
            <Router basename={process.env.PUBLIC_URL}>
                <div className="App">
                    <Box className="AppBox">
                        <NavDrawerComponent pageLinks={pageLinks} />
                        <div className="AppMainComponent">
                            <RouterComponent />
                        </div>
                        <br />
                        <br />
                        <br />
                        <BottomMenuBarComponent />
                    </Box>
                </div>
                <SWUpdateSnackbarComponent waitingSW={waitingSW} />
            </Router>
        </ThemeProvider>
    );
}

export default App;
