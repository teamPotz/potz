import { useEffect, useRef, useState } from 'react';
import '../App.css';
import { MapMarker, Map } from 'react-kakao-maps-sdk';
import COLOR from '../utility/Color';
import { useNavigate } from 'react-router-dom';

function UserLoactionMap(props) {
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const navigate = useNavigate();
  const coordinateRef = useRef({
    lat: 37.56421,
    lon: 127.00169,
  });

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
  }, []);

  useEffect(() => {
    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(props.searchKeyword, (data, status) => {
      console.log(data);
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
  }, [props]);

  return (
    <>
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: '420px', height: '100vh' }}
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => setInfo(marker)}
          >
            {info && info.content === marker.content && (
              <div style={{ color: `${COLOR.BLACK}` }}>
                {marker.content}
                <button
                  onClick={() =>
                    navigate('#', {
                      // state: {
                      //   name: marker.content,
                      //   address: marker.storeAddress,
                      // },
                    })
                  }
                >
                  선택
                </button>
              </div>
            )}
          </MapMarker>
        ))}
      </Map>
    </>
  );
}

export default UserLoactionMap;
