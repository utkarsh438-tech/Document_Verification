import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header/Header'
import DocumentUpload from './components/documents/DocumentUpload/DocumentUpload'
import Footer from './components/layout/Footer/Footer'
import Home from './pages/Home/Home'
import Results from './components/documents/ResultDisplay/ResultDisplay'
// import History from './pages/History/History'
import './App.css';


const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<DocumentUpload/>} />
          <Route path="/results/:id" element={<Results />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App