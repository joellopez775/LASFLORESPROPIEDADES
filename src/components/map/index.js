import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

export default ({ lat, lng, height, zoom })=> {
  
const mapBoxUrl =  "https://api.mapbox.com/styles/v1/clasihome/clg12imq6000p01mm2ahkyyib/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY2xhc2lob21lIiwiYSI6ImNsZXVqN2M5dzBrNnMzd3BidjhhenQzOWkifQ.9-WGLYsiyhsikDCT5ESfhQ";
//mapbox://styles/felixtineo/ckkigaae20ubv17pelsiz47wg

//mapbox://styles/felixtineo/ckjsqy8dq3eu419oaxv4azw71 https://api.mapbox.com/styles/v1/clasihome/clg12imq6000p01mm2ahkyyib.html?title=view&access_token=pk.eyJ1IjoiY2xhc2lob21lIiwiYSI6ImNsZXVnbnV1ejFtYmgzcHB2MWJ2ZnlzZjMifQ.QfbH0mQA-HSMdZV59AHOpw&zoomwheel=true&fresh=true#2/37.75/-92.25
//mapbox://styles/felixtineo/ckcd8fl665s3y1inuti4rsg5c

  if (typeof window !== 'undefined') {
    return(
      <MapContainer
        center={{ lat, lng }}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height }}
      >
        <TileLayer
          url={mapBoxUrl}
          attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>"
        />
      <Marker position={[lat, lng]}/>
    </MapContainer>
    
    );
    
  }
  return <span>a</span>  ;
}