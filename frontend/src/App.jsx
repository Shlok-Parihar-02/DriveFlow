import react from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import LoginPage from "./pages/LoginPage/LoginPage"
import Dashboard from "./common/components/Dashboard/Dashboard"

const App = () => {
  return <>
    <BrowserRouter>
      <Routes>
        <Route 
          path="/"
          element={<LoginPage/>}
        />
        <Route 
          path="/dashboard"
          element={<Dashboard/>}
        />
      </Routes>
    </BrowserRouter>
  </>
}
export default App