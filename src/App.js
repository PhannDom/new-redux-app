import React from 'react';
import './App.css';
import Map from './components/Map';
import Navbar from './components/Navbar';
import Todos from './components/Todos';

function App() {
  const key = 'AIzaSyB2aheDatfhvjDkz4f0rC4ZARZZSoooJf4'
  return (
    <div className="App">
      <Navbar />
      <Todos />
      <Map
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `90vh`, margin: `auto`, border: '2px solid black' }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}

export default App;
