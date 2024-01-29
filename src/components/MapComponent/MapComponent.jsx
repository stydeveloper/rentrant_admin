import React, { useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getReverseGeocodingData } from "../../utils/mapbox";

const MapComponent = ({
  pins,
  setShowButton,
  setNewAddress,
  setNewLocation,
  viewport,
  setViewport,
  mapRef,
}) => {
  useEffect(() => {
    // Persist pins in local storage when pins change
    localStorage.setItem("allPins", JSON.stringify(pins));
  }, [pins]);

  // Update the viewport based on the first pin's lat and lng when the component mounts
  useEffect(() => {
    if (pins.length > 0) {
      setViewport((prevViewport) => ({
        ...prevViewport,
        latitude: pins[0].lat,
        longitude: pins[0].lng,
      }));
    }
  }, []); // Empty dependency array, runs once when component mounts

  const hanldeFocusPin = (lat, lng) => {
    setViewport((prevViewport) => ({
      ...prevViewport,
      latitude: lat,
      longitude: lng,
    }));
  };

  const handleAddClick = async (e) => {
    try {
      e.preventDefault();
      const { lat, lng } = e.lngLat;
      console.log("handleAddClick running");

      // Reverse Geocoding
      const geocodingData = await getReverseGeocodingData(lat, lng);
      const address = geocodingData.features[0].place_name;

      setNewAddress(address);
      setNewLocation({
        lat,
        lng,
      });
      setShowButton(true);
      mapRef.current?.flyTo({ center: [lng, lat], duration: 1000 });

      // Update the viewport on add click
      setViewport((prevViewport) => ({
        ...prevViewport,
        latitude: lat,
        longitude: lng,
      }));
    } catch (error) {
      console.error("Error in handleAddClick:", error.message);
      // Handle errors gracefully, for example, show a notification to the user
      // or log the error to a centralized logging system
    }
  };

  return (
    <div className="map-container w-full h-full">
      {viewport.latitude !== null && viewport.longitude !== null && (
        <Map
          ref={mapRef}
          mapboxAccessToken={import.meta.env.VITE_REACT_MAPBOX_ACCESS_TOKEN}
          initialViewState={viewport}
          style={{
            minHeight: "100%",
            borderRadius: "8px",
          }}
          onDblClick={handleAddClick}
          mapStyle="mapbox://styles/rentrant/clonv875w00a401qn6go32yyg"
        >
          {pins.length > 0 &&
            pins.map((pin, index) => (
              <Marker
                key={index}
                latitude={pin.lat}
                longitude={pin.lng}
                anchor="bottom"
              >
                <div className="marker-container">
                  <img
                    src={
                      pin.lat === viewport.latitude &&
                      pin.lng === viewport.longitude
                        ? "/assets/whiteMarker.png"
                        : "/assets/blueMarker.png"
                    }
                    alt="Custom Marker"
                    style={{
                      width: `${60}px`,
                      height: `${60}px`,
                      cursor: "pointer",
                    }}
                    onClick={() => hanldeFocusPin(pin.lat, pin.lng)}
                  />
                  <span
                    className="rating-value"
                    style={{
                      color:
                        pin.lat === viewport.latitude &&
                        pin.lng === viewport.longitude
                          ? "white"
                          : "blue",
                      position: "absolute",
                      top: "11px",
                      left: "17.5px",
                      fontSize: "14px",
                      fontWeight: "bolder",
                    }}
                  >
                    {pin.avgrating}
                  </span>
                </div>
              </Marker>
            ))}
        </Map>
      )}
    </div>
  );
};

export default MapComponent;
