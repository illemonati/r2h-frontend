
export function swNewUpdate(waitingServiceWorker: ServiceWorker) {
    return {
        type: 'NEW_UPDATE_AVAILABLE',
        payload: waitingServiceWorker
    }
}

export function swUpdated() {
    return {
        type: 'UPDATED'
    }
}

