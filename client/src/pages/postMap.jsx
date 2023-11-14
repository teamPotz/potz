import { useEffect, useRef, useState } from 'react';
import '../App.css';
import { MapMarker, Map } from 'react-kakao-maps-sdk';
import COLOR from '../utility/Color';

//contents_container 안에 UI 구현 하시면 됩니다!

function PostMap(props) {
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const coordinateRef = useRef({
    lat: 33.5563,
    lon: 126.79581,
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
        bounds.extend(new window.kakao.maps.LatLng(...coordinateRef.current));
        map.setBounds(bounds);
      });
      //setMap(coordinateRef.current);
      // setMap(new window.kakao.maps.Map(document.getElementById('map'), {
      //   center: coordinateRef.current, // 현재 위치를 center로 설정
      // }));
    }
  }, [map]);

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
        //center={{...coordinateRef.current}}
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
                <button onClick={() => console.log(marker.storeAddress)}>
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

export default PostMap;
