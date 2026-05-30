import React from "react";
import { Routes, Route} from "react-router-dom";

//import the components
import Main from "./components/main";
import Tech from "./components/tech";
import ArticleDetail from "./components/ArticleDetail";
import CategoryNews from "./components/CategoryNews";
import SearchResults from "./components/SearchResults";
import SavedArticles from "./components/SavedArticles";
import ReadQueuePage from "./components/ReadQueuePage";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/tech" element={<Tech />} />
        <Route path="/category/:id" element={<CategoryNews />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/saved" element={<SavedArticles />} />
        <Route path="/queue" element={<ReadQueuePage />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
    </Routes>
)

export default AppRoutes;
