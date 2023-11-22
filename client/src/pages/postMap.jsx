import { useEffect, useRef, useState } from 'react';
import { MapMarker, Map } from 'react-kakao-maps-sdk';
import COLOR from '../utility/Color';
import { useNavigate } from 'react-router-dom';

function PostMap(props) {
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const navigate = useNavigate();
  const coordinateRef = useRef({
    lat: 37.56421,
    lon: 127.00169,
  });
  const [position, setPosition] = useState();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const bounds = new window.kakao.maps.LatLngBounds();
        coordinateRef.current = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        console.log(coordinateRef.current);
        bounds.extend(
          new window.kakao.maps.LatLng(
            coordinateRef.current.lat,
            coordinateRef.current.lon
          )
        );
        map.setBounds(bounds);
      });
    }
  }, [map]);

  useEffect(() => {
    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(props.searchKeyword, (data, status) => {
      props.sendData(data);
      if (status === window.kakao.maps.services.Status.OK) {
        const bounds = new window.kakao.maps.LatLngBounds();
        let marker = [];

        for (let i = 0; i < data.length; i++) {
          marker.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
            storeAddress: data[i].road_address_name,
          });
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(marker);
        map.setBounds(bounds);
      }
    });
  }, [props.searchKeyword]);

  const MapClickEventWithMarker = (_t, mouseEvent) => {
    setPosition({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    });
    console.log(mouseEvent);
  };

  return (
    <>
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: '420px', height: '60vh' }}
        level={3}
        onCreate={setMap}
        onClick={MapClickEventWithMarker}
      >
        {position && <MapMarker position={position} />}
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => setInfo(marker)}
          >
            {info && info.content === marker.content && (
              <div style={{ color: `${COLOR.BLACK}` }}>{marker.content}</div>
            )}
          </MapMarker>
        ))}
      </Map>
    </>
  );
}

export default PostMap;
