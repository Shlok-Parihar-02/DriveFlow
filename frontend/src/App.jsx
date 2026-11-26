import react from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import LoginPage from "./pages/LoginPage/LoginPage"
import DriveFlow from "./common/components/DriveFlowApp/DriveFlow"

const App = () => {
  return <>
    <BrowserRouter>
      <Routes>
        <Route 
          path="/"
          element={<LoginPage/>}
        />
        <Route 
          path="/driveflow"
          element={<DriveFlow/>}
        />
      </Routes>
    </BrowserRouter>
  </>
}
export default App