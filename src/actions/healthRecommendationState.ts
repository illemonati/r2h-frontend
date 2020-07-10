
export function updateHealthRecommendationState(newState: number) {
    return {
        type: 'UPDATE_HEALTH_RECOMMENDATION_STATE',
        payload: newState
    }
}

