import React from 'react'
const _ = require("lodash");
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require("react-google-maps");
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");
const google=window.google
const Map = compose(

  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAlIT0ZP1XKf5pw3LORQjA-KMhQh6tMZi4&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
      	InputLat: null,
      	InputLng: null,
        bounds: null,
        center: {
          lat: 49.839683, lng: 24.029717  

        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();          
          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });

        {this.state.markers.map(x => {
        	this.setState({
		      	InputLat: x.position.lat(),
		      	InputLng: x.position.lng(),        		
        	})
        	console.log(this.state.InputLat, this.state.InputLng)
        })}
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}>
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}>
      <input
        type="text"
        placeholder="I want visit..."
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          marginTop: `27px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </SearchBox>
    {props.markers.map((marker, index) =>
      <Marker key={index} position={marker.position} />
    )}
        <Marker position={{ lat: 49.838593, lng: 24.024610 }}/>
        <Marker position={{ lat: 49.841629, lng: 24.024374 }}/>
        <Marker position={{ lat: 49.843179, lng: 24.034888 }}/>
        <Marker position={{ lat: 49.841028, lng: 24.027507 }}/>
        <Marker position={{ lat: 49.839381, lng: 24.029374 }}/>
        
  </GoogleMap>
);

<Map />
export default withGoogleMap(Map)
