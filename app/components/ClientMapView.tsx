"use client";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
});

const ClientMapView = () => {
  return <MapView />;
};

export default ClientMapView; 