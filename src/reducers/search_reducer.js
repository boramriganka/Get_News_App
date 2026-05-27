const initialState = {
    searchResults: [],
    loading: false,
    error: null
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SEARCH_NEWS_LOADING':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'SEARCH_NEWS_SUCCESS':
            return {
                ...state,
                searchResults: action.payload,
                loading: false
            };
        case 'SEARCH_NEWS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default searchReducer;
