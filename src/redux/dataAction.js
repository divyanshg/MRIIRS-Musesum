export const updateItem = (item) => {
    return {
        type: 'UPDATE_ITEM',
        payload: item,
    };
}

export const enableScanner = (enable) => {
    return {
        type: 'ENABLE_SCANNER',
        payload: enable,
    };
}