import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import Login from "../page.tsx/Login";
import Join from "../page.tsx/Join";
import DiaryList from "../page.tsx/DiaryList";
import Header from "../common/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="join" element={<Join />} />
        <Route element={<Layout />}>
          <Route path="diarylist" element={<DiaryList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
