import React, { useState, useCallback, useContext } from "react";
import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";
import { mapDataContext } from "../../providers/CsvProvider";

export default function Direction() {
  const { mapData } = useContext(mapDataContext);
  const [currentDirection, setCurrentDirection] = useState(null);

  const directionsCallback = useCallback(
    (googleResponse) => {
      let renderFlg = false;
      if (googleResponse) {
        if (currentDirection) {
          /* ステータスOKの場合 */
          if (googleResponse.status === "OK") {
            /* 経路が追加された場合は再レンダリングする */
            if (
              googleResponse.geocoded_waypoints.length !==
              currentDirection.geocoded_waypoints.length
            ) {
              setCurrentDirection(googleResponse);
            } else {
              /* 経路が変更されたか判定する */
              renderFlg = renderEqual(
                googleResponse.geocoded_waypoints,
                currentDirection.geocoded_waypoints
              );
              /* 経路が変更された場合は再レンダリングする */
              if (!renderFlg) {
                setCurrentDirection(googleResponse);
              }
            }
          }
        } else {
          if (googleResponse.status === "OK") {
            setCurrentDirection(googleResponse);
          }
        }
      }
    },
    [currentDirection]
  );

  const GetRouteList = (data) => {
    let routeList = [];
    data.forEach((icon) => {
      if (icon["routeIndex"] !== null) {
        routeList.push({
          id: icon["ID"],
          index: icon["routeIndex"],
          lat: parseFloat(icon.latitude),
          lng: parseFloat(icon.longitude),
        });
      }
    });
    return routeList;
  };

  const renderEqual = (render, current) => {
    let flg = true;

    for (let i = 0; i < render.length; i++) {
      if (render[i]["place_id"] !== current[i]["place_id"]) {
        flg = false;
        break;
      }
    }
    return flg;
  };

  const SetRoute = (list) => {
    let origin;
    let destination;
    let transitPoints = [];

    list.forEach((icon) => {
      if (icon["routeIndex"] !== null) {
        if (icon["index"] === 0) {
          origin = {
            lat: icon.lat,
            lng: icon.lng,
          };
        } else if (icon["index"] === list.length - 1) {
          destination = {
            lat: icon.lat,
            lng: icon.lng,
          };
        } else {
          transitPoints.push({
            location: {
              lat: icon.lat,
              lng: icon.lng,
            },
          });
        }
      }
    });

    return [origin, destination, transitPoints];
  };

  // 経路のindex順で配列をソートする関数
  const compare = (a, b) => {
    var r = 0;
    if (a.index < b.index) {
      r = -1;
    } else if (a.index > b.index) {
      r = 1;
    }

    return r;
  };

  const RouteRender = (mapData) => {
    let list = GetRouteList(mapData);
    list.sort(compare);
    const [origin, destination, transitPoints] = SetRoute(list);
    let viewFlg;
    let setOptions;

    if (
      origin !== undefined &&
      destination !== undefined &&
      transitPoints !== undefined
    ) {
      setOptions = {
        origin,
        destination,
        travelMode: "DRIVING",
        // 走行モードを指定する。今回は自動車に設定
        optimizeWaypoints: true,
        // 経由地の順序を最適化する場合はtrueに設定する
        waypoints: transitPoints,
      };
      viewFlg = true;
    } else if (transitPoints.length < 0) {
      /* preserveViewport=拡大しない */
      setOptions = {
        origin,
        destination,
        travelMode: "DRIVING",
        preserveViewport: false
      };
      viewFlg = true;
    } else {
      viewFlg = false;
      setOptions = {};
    }
    return (
      <>
        {viewFlg && (
          <DirectionsService
            options={setOptions}
            callback={directionsCallback}
          />
        )}
        {viewFlg && currentDirection !== null && (
          <DirectionsRenderer
            options={{
              directions: currentDirection,
            }}
          />
        )}
      </>
    );
  };

  return <>{RouteRender(mapData)}</>;
}
