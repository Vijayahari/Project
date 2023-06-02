import React from "react";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Landing from "../components/landing/Landing";
import NewPost from "../components/Post/New/NewPost";

import NewForm from "../components/Post/New/NewForm";
const AppRouters = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/postview" element={<NewPost />} />
          <Route path="/postview/newform" element={<NewForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouters;
