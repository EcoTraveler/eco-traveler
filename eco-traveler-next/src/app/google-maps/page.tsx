'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { GoogleMap, useLoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox'
import '@reach/combobox/styles.css'
import { Menu, Search as SearchIcon, Clock, MapPin, RotateCcw, Compass, Hotel, Coffee, Amphora, Bus, BriefcaseMedical, Landmark } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

const libraries: ("places" | "drawing" | "geometry" | "visualization")[] = ['places']

const categories = [
  { name: 'Restoran', icon: Coffee },
  { name: 'Hotel', icon: Hotel },
  { name: 'Rekomendasi aktivitas', icon: Compass },
  { name: 'Museum', icon: Amphora },
  { name: 'Transportasi umum', icon: Bus },
  { name: 'Apotek', icon: BriefcaseMedical },
  { name: 'ATM', icon: Landmark },
]

export default function Home() {
  const searchParams = useSearchParams()
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries,
  })

  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [center, setCenter] = useState({ lat: -6.3015, lng: 106.6523 }) // Default to BSD City
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null)
  const [searchHistory, setSearchHistory] = useState<string[]>([
    'Indonesia',
    'Tangerang, Tangerang City, Banten',
    'Polarstone Indonesia',
    'Bengkel Dunia Motor',
    'Jalan Flamboyan III'
  ])

  const mapRef = useRef<google.maps.Map | null>(null)

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map
    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    mapRef.current = null
    setMap(null)
  }, [])

  const panTo = useCallback(({ lat, lng }: google.maps.LatLngLiteral) => {
    if (mapRef.current) {
      mapRef.current.panTo({ lat, lng })
      mapRef.current.setZoom(14)
    }
  }, [])

  const searchNearby = useCallback((category: string) => {
    if (mapRef.current) {
      const service = new google.maps.places.PlacesService(mapRef.current)
      service.nearbySearch(
        {
          location: center,
          radius: 5000,
          type: category.toLowerCase(),
        },
        (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            // Clear existing markers and add new ones
            mapRef.current?.setCenter(center)
            results.forEach((place) => {
              if (place.geometry && place.geometry.location) {
                new google.maps.Marker({
                  position: place.geometry.location,
                  map: mapRef.current,
                  title: place.name,
                })
              }
            })
          }
        }
      )
    }
  }, [center])

  const handleSearch = async (address: string) => {
    try {
      const results = await getGeocode({ address })
      const { lat, lng } = await getLatLng(results[0])
      panTo({ lat, lng })
      setCenter({ lat, lng })
      setSearchHistory(prev => [address, ...prev.slice(0, 4)])
    } catch (error) {
      console.error('😱 Error: ', error)
    }
  }

  useEffect(() => {
    const searchQuery = searchParams.get('search')
    if (searchQuery && isLoaded) {
      handleSearch(searchQuery)
    }
  }, [searchParams, isLoaded])

  if (loadError) {
    return <div>Error loading maps: {loadError.message}</div>
  }

  if (!isLoaded) {
    return <div>Loading maps...</div>
  }

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-lg z-10 flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2 mb-4">
            <Menu className="w-6 h-6" />
            <div className="flex-1">
              <Search panTo={panTo} setCenter={setCenter} setSearchHistory={setSearchHistory} />
            </div>
          </div>
        </div>

        {/* Search History */}
        <div className="flex-1 overflow-auto">
          <div className="p-4">
            {searchHistory.map((item, index) => (
              <div key={index} className="flex items-center gap-2 py-2 hover:bg-gray-100 cursor-pointer">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
            <button className="text-blue-500 text-sm mt-2">Lainnya dari histori terbaru</button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Categories */}
        <div className="bg-white p-2 shadow-md z-10 flex gap-2 overflow-x-auto">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <button
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-gray-100 border text-sm whitespace-nowrap"
                onClick={() => searchNearby(category.name)}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </button>
            )
          })}
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <GoogleMap
            mapContainerClassName="w-full h-full"
            center={center}
            zoom={14}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              zoomControl: true,
              mapTypeControl: true,
              scaleControl: true,
              streetViewControl: true,
              rotateControl: true,
              fullscreenControl: true,
            }}
          >
            <Marker position={center} />
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </div>
      </div>
    </div>
  )
}

function Search({ panTo, setCenter, setSearchHistory }: { 
  panTo: (position: google.maps.LatLngLiteral) => void,
  setCenter: (position: google.maps.LatLngLiteral) => void,
  setSearchHistory: React.Dispatch<React.SetStateAction<string[]>>
}) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      region: 'id',
      language: 'id',
    },
    debounce: 300,
  })

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleSelect = async (address: string) => {
    setValue(address, false)
    clearSuggestions()

    try {
      const results = await getGeocode({ address })
      const { lat, lng } = await getLatLng(results[0])
      panTo({ lat, lng })
      setCenter({ lat, lng })
      setSearchHistory(prev => [address, ...prev.slice(0, 4)])
    } catch (error) {
      console.error('😱 Error: ', error)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSelect(value)
    }
  }

  return (
    <Combobox onSelect={handleSelect}>
      <div className="relative">
        <ComboboxInput
          value={value}
          onChange={handleInput}
          onKeyPress={handleKeyPress}
          disabled={!ready}
          placeholder="Telusuri Google Maps"
          className="w-full p-2 border border-gray-300 rounded-md pl-8"
        />
        <SearchIcon className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
      </div>
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  )
}