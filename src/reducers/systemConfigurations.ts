import SystemConfigurations, {SystemFont} from './../utils/SystemConfigurations';

const defaultConfig = {
    darkMode: true,
    systemFont: SystemFont.ComicNeue,
};

export default function systemConfigurationsReducer(
    state = defaultConfig,
    action: any
): SystemConfigurations {

    switch (action.type) {
        case 'UPDATE_SYSTEM_CONFIGURATIONS':
            return {...defaultConfig, ...action.payload};
        default:
            return state;
    }
}
