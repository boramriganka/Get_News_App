import {combineReducers} from "redux";
import fetchTech from "../reducers/fetch_tech";
import customSearch from "../reducers/custom_search";
import categoryReducer from "../reducers/category_reducer";
import searchReducer from "../reducers/search_reducer";
import bookmarksReducer from "../reducers/bookmarks_reducer";
import readQueueReducer from "../store/readQueueSlice";


//combine reducers
//remember you need to export the reducers to use them
const reducers= combineReducers({
    FetchTech: fetchTech,
    CustomSearch: customSearch,
    CategoryNews: categoryReducer,
    Search: searchReducer,
    Bookmarks: bookmarksReducer,
    ReadQueue: readQueueReducer
});

export default reducers;