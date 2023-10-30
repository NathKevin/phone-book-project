import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ContactListPage from "./components/ContactListPage"
import AddContact from './components/AddContact'
import Navbar from "./components/Navbar"

function App() {

  return (
    <Router>
      <div className="mainLayout">
        <Navbar />
        <Routes>
          <Route path='/' element={<ContactListPage />} />
          <Route path='/add' element={<AddContact />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
