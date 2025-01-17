import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import NoPage from "./pages/NoPage.jsx";
import Home from "./pages/Home.jsx";
import ReviewForm from "./pages/ReviewForm.jsx";
import ReviewList from "./pages/ReviewList.jsx";
import ReviewDetail from "./pages/ReviewDetail.jsx";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="/reviews/new" element={<ReviewForm/>}></Route>
                        <Route path="/reviews" element={<ReviewList/>}></Route>
                        <Route path="/review/:id" element={<ReviewDetail/>}></Route>
                        <Route path="*" element={<NoPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
