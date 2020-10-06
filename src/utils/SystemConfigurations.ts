export default interface SystemConfigurations {
    darkMode: boolean;
    systemFont: SystemFont;
    theme: {
        theme: ThemeOption;
        themeOverides: ThemeOptions;
    };
}

export interface ThemeOptions {
    primary?: string;
    secondary?: string;
    background?: string;
    paper?: string;
}

export enum SystemFont {
    Roboto = "Roboto",
    Arial = "Arial",
    Inconsolata = "Inconsolata",
    ComicNeue = "Comic Neue",
}

export enum ThemeOption {
    default = "default",
    solarized = "solarized",
    custom = "custom",
}

export const defaultSystemConfigurations = {
    darkMode: true,
    systemFont: SystemFont.Roboto,
    theme: {
        theme: ThemeOption.default,
        themeOverides: {
            primary: "#0d7aa6",
            secondary: "#fd9395",
            background: "#f0f0f0",
            paper: "#e0e0e0",
        },
    },
};
