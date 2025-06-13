import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { Home } from '@/pages/Home'
import { SignIn } from '@/pages/auth/SignIn'
import { SignUp } from '@/pages/auth/SignUp'
import { Profile } from '@/pages/dashboard/Profile'
import { Onboarding } from '@/pages/auth/Onboarding'
import { ArtistProfile } from '@/pages/artists/ArtistProfile'
import { Artists } from '@/pages/artists/Artists'
import { Venues } from '@/pages/venues/Venues'
import { VenueBenefits } from '@/pages/venues/VenueBenefits'
import { VenueResources } from '@/pages/venues/VenueResources'
import { VenueFAQ } from '@/pages/venues/VenueFAQ'
import { Discover } from '@/pages/discover/Discover'
import { MusicianShows as Shows } from '@/pages/musician/Shows'
import { Donate } from '@/pages/Donate'
import { SongDonate } from '@/pages/SongDonate'
import { ProfileDonations } from '@/pages/ProfileDonations'
import { HowItWorks } from '@/pages/HowItWorks'
import { NotFound } from '@/pages/NotFound'
import { ArtistFAQ } from '@/pages/ArtistFAQ'
import { FanFAQ } from '@/pages/FanFAQ'
import { OurStory } from '@/pages/about/OurStory'
import { Careers } from '@/pages/about/Careers'
import { Contact } from '@/pages/about/Contact'
import { AffiliateProgram } from '@/pages/about/AffiliateProgram'
import { Terms } from '@/pages/about/Terms'
import { Privacy } from '@/pages/about/Privacy'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'login',
        element: <SignIn />
      },
      {
        path: 'signup',
        element: <SignUp />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'profile/donations',
        element: <ProfileDonations />
      },
      {
        path: 'onboarding',
        element: <Onboarding />
      },
      {
        path: 'musician/:id',
        element: <ArtistProfile />
      },
      {
        path: 'artists',
        element: <Artists />
      },
      {
        path: 'venues',
        element: <Venues />
      },
      {
        path: 'venue-benefits',
        element: <VenueBenefits />
      },
      {
        path: 'venue-resources',
        element: <VenueResources />
      },
      {
        path: 'venue-faq',
        element: <VenueFAQ />
      },
      {
        path: 'discover',
        element: <Discover />
      },
      {
        path: 'shows',
        element: <Shows />
      },
      {
        path: 'donate/:qrCode',
        element: <Donate />
      },
      {
        path: 'song/:songId/donate',
        element: <SongDonate />
      },
      {
        path: 'how-it-works',
        element: <HowItWorks />
      },
      {
        path: 'artist-faq',
        element: <ArtistFAQ />
      },
      {
        path: 'fan-faq',
        element: <FanFAQ />
      },
      {
        path: 'our-story',
        element: <OurStory />
      },
      {
        path: 'careers',
        element: <Careers />
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'affiliate-program',
        element: <AffiliateProgram />
      },
      {
        path: 'terms',
        element: <Terms />
      },
      {
        path: 'privacy',
        element: <Privacy />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
])

export default router
export { router }
