import { Routes, Route } from 'react-router-dom'
import Projects from './pages/Projects'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ProjectPage from './pages/ProjectPage'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Container from './components/Container'
import ScrollToTop from './components/ScrollToTop'

function App() {

  return (
    <div className='bg-gradient-to-b from-backgroundColorA to-backgroundColorB text-textColor min-h-screen flex flex-col'>
      <ScrollToTop />
      <Header />
      <main className='flex-grow'>
        <Container>
          <Routes>
            <Route path='/' element={<Projects />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/projects/:slug' element={<ProjectPage />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  )
}

export default App