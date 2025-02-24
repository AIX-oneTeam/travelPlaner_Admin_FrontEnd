import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./assets/css/common/variables.css";
import Layout from "./components/layout/Layout";
import AxiosIntercepter from "./components/intercept/AxiosIntercepter";
import Question from "./pages/question/Question";
import QuestionList from "./pages/question/QuestionList";
import MemberGraph from "./pages/member/Member"

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div>
      <AxiosIntercepter />
      <Layout navigate={navigate} currentPath={location.pathname}>
        <Routes>
          <Route path="/question/:inquiry_id" element={<Question />} />
          <Route path="/question" element={<QuestionList />} />
          <Route path="/graph/member" element={<MemberGraph />} />
        </Routes>
      </Layout>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
