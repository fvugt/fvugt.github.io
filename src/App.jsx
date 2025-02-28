import { Routes, Route } from 'react-router-dom'
import Projects from './pages/Projects'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ProjectPage from './pages/ProjectPage'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {

  return (
    <div className='bg-backgroundColor text-textColor min-h-screen flex flex-col'>
      <Header />
      <main className='flex-grow'>
        <div className='max-w-7xl mx-auto px-4'>
          <Routes>
            <Route path='/' element={<Projects />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/projects/:slug' element={<ProjectPage />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App