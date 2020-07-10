
import UserProfile from './../utils/UserProfile';
export function updateUserProfileState(newState: UserProfile) {
    return {
        type: 'UPDATE_USER_PROFILE_STATE',
        payload: newState
    }
}

