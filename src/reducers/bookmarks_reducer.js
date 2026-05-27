const initialState = {
    bookmarks: JSON.parse(localStorage.getItem('journal_bookmarks')) || []
};

const bookmarksReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_BOOKMARK':
            const article = action.payload;
            const isBookmarked = state.bookmarks.find(b => b.title === article.title);
            let newBookmarks;

            if (isBookmarked) {
                newBookmarks = state.bookmarks.filter(b => b.title !== article.title);
            } else {
                newBookmarks = [...state.bookmarks, article];
            }

            localStorage.setItem('journal_bookmarks', JSON.stringify(newBookmarks));
            return {
                ...state,
                bookmarks: newBookmarks
            };
        default:
            return state;
    }
};

export default bookmarksReducer;
