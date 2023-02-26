const initState = {
    item: {},
    enableScanner: true,
}
const dataReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_ITEM':
            return {
                ...state,
                item: action.payload
            }
        case 'ENABLE_SCANNER':
            return {
                ...state,
                enableScanner: action.payload
            }
        default:
            return state;
    }
}
export default dataReducer;