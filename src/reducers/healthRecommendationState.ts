


export default function healthRecommendationStateReducer(state=0, action: any) : number {
    switch (action.type) {
        case 'UPDATE_HEALTH_RECOMMENDATION_STATE':
            return action.payload;
        default:
            return state;
    }
}




