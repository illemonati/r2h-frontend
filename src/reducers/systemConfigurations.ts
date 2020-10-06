import SystemConfigurations, {
    defaultSystemConfigurations,
    SystemFont,
    ThemeOption,
} from "./../utils/SystemConfigurations";

export default function systemConfigurationsReducer(
    state = defaultSystemConfigurations,
    action: any
): SystemConfigurations {
    switch (action.type) {
        case "UPDATE_SYSTEM_CONFIGURATIONS":
            return { ...defaultSystemConfigurations, ...action.payload };
        default:
            return state;
    }
}
