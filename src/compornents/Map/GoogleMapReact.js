import { GoogleMap, LoadScript } from "@react-google-maps/api";
import Direction from "./GoogleMapDirection";
import PatientMerker from "./GoogleMapMeraker";
import { use100vh } from "react-div-100vh";

export default function GoogleMapReact() {
  const maxVh = use100vh();
  const height = maxVh - maxVh * 0.2;
  const containerStyle = {
    width: "100%",
    minHeight: "100%",
    height: height,
  };
  const center = {
    lat: 35.6215033997816,
    lng: 139.401459965221,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDB3ySdlD2mZaH9SlSATVnGjNH8nQN7mUg">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        <PatientMerker />
        <Direction></Direction>
      </GoogleMap>
    </LoadScript>
  );
}
