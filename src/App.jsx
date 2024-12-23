import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./pages/layout.jsx";
import NoPage from "./pages/NoPage.jsx";
import Home from "./pages/Home.jsx";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="*" element={<NoPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
