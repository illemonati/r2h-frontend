


export default function serviceWorkerUpdateReducer(state=null, action: any) : ServiceWorker | null {
    switch (action.type) {
        case 'NEW_UPDATE_AVAILABLE':
            return action.payload;
        case 'UPDATED':
            return null;
        default:
            return state;
    }
}




