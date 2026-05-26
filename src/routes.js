import React from "react";
import { Routes, Route} from "react-router-dom";

//import the components
import Main from "./components/main";
import Tech from "./components/tech";
import ArticleDetail from "./components/ArticleDetail";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/tech" element={<Tech />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
    </Routes>
) 

export default AppRoutes;
