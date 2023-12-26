import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MapMarker, Map } from 'react-kakao-maps-sdk';
import COLOR from '../../utility/Color';
import logoImg from '../../../public/images/logo.png';

function UserLocationMap({ currentLocation, searchKeyword }) {
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState('');
  const [latLon, setLatLon] = useState();
  const [position, setPosition] = useState();
  const [newCoordinates, setNewCoordinates] = useState({
    lat: 37.56421,
    lon: 127.00169,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setNewCoordinates({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        console.log('현재 위치', newCoordinates);
      });
    }
  }, []);

  useEffect(() => {
    const bounds = new window.kakao.maps.LatLngBounds();
    bounds.extend(
      new window.kakao.maps.LatLng(newCoordinates.lat, newCoordinates.lon)
    );
    if (map) {
      map.setBounds(bounds);
    }
  }, [map, newCoordinates]);

  useEffect(() => {
    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(currentLocation, (data, status) => {
      console.log('currentLocation:', currentLocation);
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
  }, [currentLocation, map]);

  useEffect(() => {
    console.log('props.searchKeyword:', searchKeyword);
    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(searchKeyword, (data, status) => {
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
  }, [searchKeyword, map]);

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
        center={{ lat: 37.56421, lng: 127.00169 }}
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
                  src: logoImg,
                  size: {
                    width: 64,
                    height: 69,
                  },
                  options: {
                    offset: {
                      x: 31,
                      y: 69,
                    },
                  },
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
                      navigate('/community/list', {
                        state: { latLon },
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
                  src: logoImg,
                  size: {
                    width: 30,
                    height: 30,
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
                              navigate('/community/list', {
                                state: { latLon },
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

export default UserLocationMap;
