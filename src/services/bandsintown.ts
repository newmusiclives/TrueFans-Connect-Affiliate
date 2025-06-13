import { supabase } from '@/lib/supabase/client'
import type { Show } from '@/lib/supabase/database.types'

export class BandsInTownService {
  private readonly API_BASE = 'https://rest.bandsintown.com/artists'
  private readonly APP_ID = 'truefans_connect'

  async getArtistEvents(artistName: string): Promise<any[]> {
    try {
      // In a real implementation, this would be a real API call
      // For demo purposes, we'll simulate a response
      const encodedName = encodeURIComponent(artistName)
      console.log(`Fetching events for ${encodedName} from BandsInTown API`)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Return mock data based on artist name
      return this.getMockEvents(artistName)
    } catch (error) {
      console.error('Error fetching artist events:', error)
      return []
    }
  }

  async importShows(artistName: string, musicianId: string): Promise<{ success: boolean; shows?: Show[]; error?: string }> {
    try {
      const events = await this.getArtistEvents(artistName)
      
      if (events.length === 0) {
        return { 
          success: false, 
          error: `No upcoming shows found for ${artistName}` 
        }
      }
      
      // Transform events to shows format
      const shows = events.map(event => ({
        musician_id: musicianId,
        bandsintown_event_id: event.id,
        venue_name: event.venue.name,
        venue_location: {
          city: event.venue.city,
          region: event.venue.region || event.venue.country,
          country: event.venue.country,
          latitude: event.venue.latitude,
          longitude: event.venue.longitude
        },
        datetime: event.datetime,
        ticket_url: event.offers.length > 0 ? event.offers[0].url : null,
        lineup: event.lineup,
        is_active: false
      }))
      
      // Insert shows into database
      const { data, error } = await supabase
        .from('shows')
        .upsert(shows, { 
          onConflict: 'bandsintown_event_id',
          ignoreDuplicates: false
        })
        .select()
      
      if (error) {
        console.error('Error importing shows:', error)
        return { 
          success: false, 
          error: `Failed to import shows: ${error.message}` 
        }
      }
      
      return { 
        success: true, 
        shows: data as Show[]
      }
    } catch (error: any) {
      console.error('Error in importShows:', error)
      return { 
        success: false, 
        error: `An unexpected error occurred: ${error.message}` 
      }
    }
  }

  private getMockEvents(artistName: string): any[] {
    // Generate some mock events based on artist name
    const today = new Date()
    const events = []
    
    // Create 5 upcoming events
    for (let i = 0; i < 5; i++) {
      const eventDate = new Date(today)
      eventDate.setDate(today.getDate() + (i * 7) + Math.floor(Math.random() * 3))
      
      events.push({
        id: `mock-event-${artistName.replace(/\s+/g, '-').toLowerCase()}-${i}`,
        datetime: eventDate.toISOString(),
        venue: {
          name: this.getRandomVenue(),
          city: this.getRandomCity(),
          region: this.getRandomRegion(),
          country: 'United States',
          latitude: (Math.random() * 10) + 30,
          longitude: (Math.random() * 40) - 100
        },
        lineup: [artistName, ...this.getRandomSupportingActs(2)],
        offers: [
          {
            type: 'Tickets',
            url: `https://example.com/tickets/${artistName.replace(/\s+/g, '-').toLowerCase()}-${i}`,
            status: 'available'
          }
        ]
      })
    }
    
    return events
  }

  private getRandomVenue(): string {
    const venues = [
      'The Fillmore', 'House of Blues', 'The Troubadour', 
      'Red Rocks Amphitheatre', 'The Roxy', 'Madison Square Garden',
      'The Bowery Ballroom', 'The 9:30 Club', 'The Independent',
      'Bottom of the Hill', 'Great American Music Hall', 'The Echo'
    ]
    return venues[Math.floor(Math.random() * venues.length)]
  }

  private getRandomCity(): string {
    const cities = [
      'New York', 'Los Angeles', 'Chicago', 'San Francisco', 
      'Austin', 'Nashville', 'Seattle', 'Portland', 'Denver',
      'Boston', 'Philadelphia', 'Atlanta', 'Miami', 'New Orleans'
    ]
    return cities[Math.floor(Math.random() * cities.length)]
  }

  private getRandomRegion(): string {
    const regions = [
      'NY', 'CA', 'IL', 'TX', 'TN', 'WA', 'OR', 'CO', 'MA', 'PA', 'GA', 'FL', 'LA'
    ]
    return regions[Math.floor(Math.random() * regions.length)]
  }

  private getRandomSupportingActs(count: number): string[] {
    const acts = [
      'The Openers', 'Local Band', 'Rising Stars', 'New Sound',
      'The Upcomers', 'Fresh Talent', 'Indie Rockers', 'The Newcomers',
      'Young Guns', 'Future Legends', 'The Supporters'
    ]
    
    const result = []
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * acts.length)
      result.push(acts[randomIndex])
    }
    
    return result
  }
}
