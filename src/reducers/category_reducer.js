const categoryReducer = (state = {
    categoryNews: {},
    loading: false
}, action) => {
    switch (action.type) {
        case 'FETCH_CATEGORY_NEWS':
            return {
                ...state,
                categoryNews: {
                    ...state.categoryNews,
                    [action.payload.category.toLowerCase()]: action.payload.articles
                },
                loading: false
            };
        case 'SET_CATEGORY_LOADING':
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
};

export default categoryReducer;
