import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Dashboard } from './pages/Dashboard'
import { ArtistProfile } from './pages/ArtistProfile'
import { HowItWorks } from './pages/HowItWorks'
import { Artists } from './pages/Artists'
import { Venues } from './pages/venues/Venues'
import { ArtistResources } from './pages/ArtistResources'
import { SuccessStories } from './pages/SuccessStories'
import { ArtistFAQ } from './pages/ArtistFAQ'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/artist/:id" element={<ArtistProfile />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/venues" element={<Venues />} />
              <Route path="/artist-resources" element={<ArtistResources />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/artist-faq" element={<ArtistFAQ />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
