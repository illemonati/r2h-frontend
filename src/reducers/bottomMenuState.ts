


export default function bottomMenuStateReducer(state=0, action: any) : number {
    switch (action.type) {
        case 'UPDATE_BOTTOM_MENU_STATE':
            return action.payload;
        default:
            return state;
    }
}




