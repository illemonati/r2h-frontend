import SystemConfigurations from '../utils/SystemConfigurations';

export function updateSystemConfigurations(newState: SystemConfigurations) {
    return {
        type: 'UPDATE_SYSTEM_CONFIGURATIONS',
        payload: newState,
    };
}
