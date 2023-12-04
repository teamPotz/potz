import { useEffect, useRef, useState } from 'react';
import '../App.css';
import { MapMarker, Map } from 'react-kakao-maps-sdk';
import COLOR from '../utility/Color';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;

const SubmitBtn = styled.button`
  border: 0;
  background-color: transparent;
  font-size: 18px;
  transition: 0.2s;
  display: flex;
  justify-content: center;
  color: ${COLOR.GRAY_300};
  &: hover {
    color: ${COLOR.GRAY_500};
    cursor: pointer;
  }
`;

function PostMap(props) {
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState('');
  const [latLon, setLatLon] = useState();
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
        console.log('현재 위치', coordinateRef.current);

        bounds.extend(
          new window.kakao.maps.LatLng(
            coordinateRef.current.lat,
            coordinateRef.current.lon
          )
        );
        if (map) {
          map.setBounds(bounds);
        }
      });
    }
  }, [map]);

  useEffect(() => {
    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(props.currentLocation, (data, status) => {
      console.log('props.currentLocation:', props.currentLocation);
      if (status === window.kakao.maps.services.Status.OK) {
        console.log('currentLocation search result:', status, data);
        const bounds = new window.kakao.maps.LatLngBounds();
        const firstResult = data[0];

        let marker = [
          {
            position: {
              lat: firstResult.y,
              lng: firstResult.x,
            },
            content: firstResult.place_name,
            storeAddress: firstResult.road_address_name,
          },
        ];

        bounds.extend(
          new window.kakao.maps.LatLng(firstResult.y, firstResult.x)
        );
        setMarkers(marker);
        if (map) {
          map.setBounds(bounds);
        }
      }
    });
  }, [props.currentLocation]);

  useEffect(() => {
    console.log('props.searchKeyword:', props.searchKeyword);
    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(props.searchKeyword, (data, status) => {
      console.log('Keyword search result:', status, data);

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

  const handleMarkerClick = (clickedMarker) => {
    setInfo(clickedMarker);
    console.log('현재 위치', clickedMarker.position);
    setLatLon(clickedMarker.position);
  };

  const MapClickEventWithMarker = (_t, mouseEvent) => {
    setPosition({
      position: {
        lat: mouseEvent.latLng.getLat(),
        lng: mouseEvent.latLng.getLng(),
      },
    });
    setLatLon({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    });
  };

  useEffect(() => {
    console.log(latLon);
  }, [latLon]);

  return (
    <>
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: '420px', height: '100vh' }}
        level={3}
        onCreate={setMap}
        onClick={MapClickEventWithMarker}
      >
        {position
          ? position && (
              <MapMarker
                position={position.position}
                onClick={() => handleMarkerClick(position)}
                image={{
                  src: `${PF}Logo/Potz_Logo.png`,
                  size: {
                    width: 64,
                    height: 69,
                  },
                  options: {
                    offset: {
                      x: 31,
                      y: 69,
                    },
                  }
                }}
              >
                <div
                  style={{
                    padding: '7px',
                    display: 'flex',
                    margin: '0 auto',
                  }}
                >
                  <SubmitBtn
                    onClick={() =>
                      navigate('/community/lists', {
                        state: { latLon: latLon },
                      })
                    }
                  >
                    이 위치 선택하기
                  </SubmitBtn>
                </div>
              </MapMarker>
            )
          : markers.map((marker) => (
              <MapMarker
                key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                position={marker.position}
                onClick={() => handleMarkerClick(marker)}
                image={{
                  src: `${PF}Logo/Potz_Logo.png`,
                  size: {
                    width: 64,
                    height: 69,
                  },
                  options: {
                    offset: {
                      x: 27,
                      y: 69,
                    },
                  },
                }}
              >
                {latLon
                  ? info &&
                    info.content === marker.content && (
                      <div style={{ color: `${COLOR.BLACK}` }}>
                        <div style={{ padding: '5px' }}>
                          <SubmitBtn
                            onClick={() =>
                              navigate('/community/lists', {
                                state: { latLon: latLon },
                              })
                            }
                          >
                            이 위치 선택하기
                          </SubmitBtn>
                        </div>
                      </div>
                    )
                  : null}
              </MapMarker>
            ))}
      </Map>
    </>
  );
}

export default PostMap;
