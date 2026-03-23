import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Search, MapPin, Navigation, Home, Briefcase, Map as MapIcon, Loader2 } from 'lucide-react';
import L from 'leaflet';

// Fix leaflet default icon issue in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Helper to update map center
function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center && center.lat !== undefined && center.lng !== undefined) {
      map.flyTo([center.lat, center.lng], 15);
    }
  }, [center, map]);
  return null;
}

// Marker component that handles dragging and clicking
function LocationMarker({ position, setPosition, onLocationUpdate }) {
  const markerRef = useRef(null);

  useMapEvents({
    click(e) {
      if (e.latlng && e.latlng.lat && e.latlng.lng) {
        setPosition(e.latlng);
        onLocationUpdate(e.latlng.lat, e.latlng.lng);
      }
    },
  });

  const eventHandlers = React.useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const latlng = marker.getLatLng();
          if (latlng && latlng.lat && latlng.lng) {
            setPosition(latlng);
            onLocationUpdate(latlng.lat, latlng.lng);
          }
        }
      },
    }),
    [setPosition, onLocationUpdate],
  );

  return position === null ? null : (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    />
  );
}

export default function AddressSection({ address, pincode, addressLabel = 'other', onChange }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Default to a central location (e.g., India center)
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 });
  const [markerPosition, setMarkerPosition] = useState(null);

  const searchTimeoutRef = useRef(null);

  // Initial geocoding based on existing address if present, but defer if empty
  useEffect(() => {
    if (address && !markerPosition) {
      // Just a simple attempt to place marker if we have an address string initially
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`)
        .then(res => res.json())
        .then(data => {
          if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            setMapCenter({ lat, lng: lon });
            setMarkerPosition({ lat, lng: lon });
          }
        })
        .catch(err => console.error("Initial geocode error:", err));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reverseGeocode = async (lat, lng) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`);
      const data = await res.json();
      
      if (data && data.address) {
        const addr = data.address;
        
        // Construct natural address string
        const street = addr.road || addr.suburb || addr.neighbourhood || '';
        const city = addr.city || addr.town || addr.village || addr.county || '';
        const state = addr.state || '';
        const post = addr.postcode || '';
        
        const fullAddressParts = [street, city, state].filter(Boolean);
        const fullStr = fullAddressParts.join(', ');
        
        onChange('address', fullStr);
        if (post) {
          onChange('pincode', post);
        }
        setSearchQuery(data.display_name || fullStr);
      }
    } catch (err) {
      console.error("Reverse geocoding failed", err);
    }
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    if (val.trim().length > 2) {
      setIsSearching(true);
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(val)}&addressdetails=1&limit=5`);
          const data = await res.json();
          setSuggestions(data || []);
          setShowSuggestions(true);
        } catch (err) {
          console.error("Search failed", err);
        } finally {
          setIsSearching(false);
        }
      }, 600);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    const lat = parseFloat(suggestion.lat);
    const lon = parseFloat(suggestion.lon);
    
    setMapCenter({ lat, lng: lon });
    setMarkerPosition({ lat, lng: lon });
    
    const addr = suggestion.address || {};
    const street = addr.road || addr.suburb || addr.neighbourhood || '';
    const city = addr.city || addr.town || addr.village || addr.county || '';
    const state = addr.state || '';
    const post = addr.postcode || '';
    
    const fullAddressParts = [street, city, state].filter(Boolean);
    const fullStr = fullAddressParts.join(', ');
    
    onChange('address', fullStr || suggestion.display_name);
    if (post) {
      onChange('pincode', post);
    }
    
    setSearchQuery(suggestion.display_name);
    setShowSuggestions(false);
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMapCenter({ lat: latitude, lng: longitude });
        setMarkerPosition({ lat: latitude, lng: longitude });
        reverseGeocode(latitude, longitude);
        setIsLocating(false);
      },
      (error) => {
        console.error("Error getting location", error);
        alert("Unable to retrieve your location. Check permissions.");
        setIsLocating(false);
      }
    );
  };

  const labels = [
    { id: 'home', label: 'Home', icon: <Home size={16} /> },
    { id: 'work', label: 'Work', icon: <Briefcase size={16} /> },
    { id: 'other', label: 'Other', icon: <MapPin size={16} /> },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      
      {/* Label Selection */}
      <div style={{ display: 'flex', gap: 12 }}>
        {labels.map(l => (
          <button
            key={l.id}
            type="button"
            onClick={() => onChange('addressLabel', l.id)}
            style={{
              padding: '8px 16px', borderRadius: 20, border: '1px solid',
              borderColor: addressLabel === l.id ? '#3b82f6' : '#e5e7eb',
              background: addressLabel === l.id ? '#eff6ff' : '#fff',
              color: addressLabel === l.id ? '#1d4ed8' : '#64748b',
              fontWeight: addressLabel === l.id ? 600 : 500,
              fontSize: 13, cursor: 'pointer', transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', gap: 6
            }}
          >
            {l.icon} {l.label}
          </button>
        ))}
      </div>

      {/* Map & Search Container */}
      <div style={{
        borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden',
        background: '#fff', display: 'flex', flexDirection: 'column',
        boxShadow: '0 2px 12px rgba(0,0,0,0.03)'
      }}>
        
        {/* Search Bar & Current Location */}
        <div style={{
          padding: 12, borderBottom: '1px solid #e2e8f0', background: '#f8fafc',
          display: 'flex', gap: 8, position: 'relative'
        }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <div style={{
              position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
              color: '#94a3b8', display: 'flex', alignItems: 'center'
            }}>
              {isSearching ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
            </div>
            <input
              type="text"
              placeholder="Search for an area, street, or city..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => { if(suggestions.length > 0) setShowSuggestions(true); }}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              style={{
                width: '100%', padding: '10px 12px 10px 38px', borderRadius: 8,
                border: '1px solid #cbd5e1', fontSize: 14, outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            
            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div style={{
                position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
                background: '#fff', borderRadius: 8, border: '1px solid #e2e8f0',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)', zIndex: 1000,
                maxHeight: 240, overflowY: 'auto'
              }}>
                {suggestions.map((suggestion, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelectSuggestion(suggestion)}
                    style={{
                      padding: '10px 12px', fontSize: 13, color: '#334155',
                      cursor: 'pointer', borderBottom: idx < suggestions.length - 1 ? '1px solid #f1f5f9' : 'none',
                      display: 'flex', alignItems: 'flex-start', gap: 8
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
                  >
                    <MapIcon size={16} color="#64748b" style={{ marginTop: 2, flexShrink: 0 }} />
                    <span>{suggestion.display_name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <button
            type="button"
            onClick={getCurrentLocation}
            disabled={isLocating}
            style={{
              padding: '0 16px', borderRadius: 8, border: 'none',
              background: '#3b82f6', color: '#fff', fontWeight: 600,
              fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
              transition: 'background 0.2s'
            }}
          >
            {isLocating ? <Loader2 size={16} className="animate-spin" /> : <Navigation size={16} />}
            Locate Me
          </button>
        </div>

        {/* Map */}
        <div style={{ height: 280, width: '100%', position: 'relative', zIndex: 1 }}>
          <MapContainer 
            center={mapCenter} 
            zoom={13} 
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapUpdater center={mapCenter} />
            <LocationMarker 
              position={markerPosition} 
              setPosition={setMarkerPosition} 
              onLocationUpdate={reverseGeocode}
            />
          </MapContainer>
        </div>
      </div>
      
      {/* Manual Address Inputs Form */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
        padding: 16, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: '1 / -1' }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>Full Address</label>
          <input 
            value={address || ''} 
            onChange={(e) => onChange('address', e.target.value)}
            placeholder="Street, City, State"
            style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>PIN Code</label>
          <input 
            value={pincode || ''} 
            onChange={(e) => onChange('pincode', e.target.value)}
            placeholder="e.g. 522001"
            style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}
          />
        </div>
      </div>
    </div>
  );
}
