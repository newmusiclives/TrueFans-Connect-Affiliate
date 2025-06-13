import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { MusicianShows } from '@/pages/musician/Shows'
import { Home } from '@/pages/Home'
import { Layout } from '@/components/Layout'
import { ShowTip } from '@/pages/tip/ShowTip'
import { FanFAQ } from '@/pages/FanFAQ'
import { ArtistFAQ } from '@/pages/ArtistFAQ'
import { HowItWorks } from '@/pages/HowItWorks'
import { Venues } from '@/pages/venues/Venues'
import { VenueBenefits } from '@/pages/venues/VenueBenefits'
import { VenueResources } from '@/pages/venues/VenueResources'
import { VenueFAQ } from '@/pages/venues/VenueFAQ'

// Import other components as needed

function ProtectedRoute({ 
  children, 
  requiredRole 
}: { 
  children: React.ReactNode, 
  requiredRole?: string 
}) {
  const { user, profile, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && profile?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />
  }

  return <>{children}</>
}

function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "tip/show/:qrCode",
          element: <ShowTip />
        },
        {
          path: "artists",
          element: <div className="py-20 text-center"><h1 className="text-3xl font-bold">Artists Page</h1><p className="mt-4">Coming soon</p></div>
        },
        {
          path: "venues",
          element: <Venues />
        },
        {
          path: "how-it-works",
          element: <HowItWorks />
        },
        {
          path: "login",
          element: <div className="py-20 text-center"><h1 className="text-3xl font-bold">Login Page</h1><p className="mt-4">Coming soon</p></div>
        },
        {
          path: "signup",
          element: <div className="py-20 text-center"><h1 className="text-3xl font-bold">Sign Up Page</h1><p className="mt-4">Coming soon</p></div>
        },
        {
          path: "dashboard",
          element: <ProtectedRoute><div className="py-20 text-center"><h1 className="text-3xl font-bold">Dashboard</h1><p className="mt-4">Coming soon</p></div></ProtectedRoute>
        },
        {
          path: "artist-resources",
          element: <div className="py-20 text-center"><h1 className="text-3xl font-bold">Artist Resources</h1><p className="mt-4">Coming soon</p></div>
        },
        {
          path: "success-stories",
          element: <div className="py-20 text-center"><h1 className="text-3xl font-bold">Success Stories</h1><p className="mt-4">Coming soon</p></div>
        },
        {
          path: "artist-faq",
          element: <ArtistFAQ />
        },
        {
          path: "fans",
          element: <div className="py-20 text-center"><h1 className="text-3xl font-bold">Fans Page</h1><p className="mt-4">Coming soon</p></div>
        },
        {
          path: "discover",
          element: <div className="py-20 text-center"><h1 className="text-3xl font-bold">Discover Artists</h1><p className="mt-4">Coming soon</p></div>
        },
        {
          path: "affiliate-program",
          element: <div className="py-20 text-center"><h1 className="text-3xl font-bold">Affiliate Program</h1><p className="mt-4">Coming soon</p></div>
        },
        {
          path: "fan-faq",
          element: <FanFAQ />
        },
        {
          path: "venue-benefits",
          element: <VenueBenefits />
        },
        {
          path: "venue-resources",
          element: <VenueResources />
        },
        {
          path: "venue-faq",
          element: <VenueFAQ />
        },
        {
          path: "terms",
          element: <div className="py-20 text-center"><h1 className="text-3xl font-bold">Terms of Service</h1><p className="mt-4">Coming soon</p></div>
        },
        {
          path: "privacy",
          element: <div className="py-20 text-center"><h1 className="text-3xl font-bold">Privacy Policy</h1><p className="mt-4">Coming soon</p></div>
        },
        {
          path: "contact",
          element: <div className="py-20 text-center"><h1 className="text-3xl font-bold">Contact Us</h1><p className="mt-4">Coming soon</p></div>
        },
        {
          path: "unauthorized",
          element: <div className="py-20 text-center"><h1 className="text-3xl font-bold text-red-600">Unauthorized</h1><p className="mt-4">You don't have permission to access this page</p></div>
        },
        {
          path: "our-story",
          element: <div className="py-20 text-center"><h1 className="text-3xl font-bold">Our Story</h1><p className="mt-4">Coming soon</p></div>
        },
        {
          path: "careers",
          element: <div className="py-20 text-center"><h1 className="text-3xl font-bold">Careers</h1><p className="mt-4">Coming soon</p></div>
        }
      ]
    },
    {
      path: "/musician/shows",
      element: (
        <ProtectedRoute requiredRole="musician">
          <MusicianShows />
        </ProtectedRoute>
      ),
    },
    // Add other routes as needed
  ])

  return <RouterProvider router={router} />
}

export default AppRoutes
