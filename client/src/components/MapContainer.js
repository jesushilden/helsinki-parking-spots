import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Polygon } from 'google-maps-react';
import { ENV } from "../environment";

class MapContainer extends Component {
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={{
                    lat: 60.192059,
                    lng: 24.945831
                }}
            >
                {this.props.areas.map(area =>
                    <Polygon
                        paths={area.coordinates}
                        strokeColor="#0000FF"
                        strokeOpacity={0.8}
                        strokeWeight={2}
                        fillColor="#0000FF"
                        fillOpacity={0.35} />
                )}
            </Map>
        )
    }
}

const mapStyles = {
    width: '50%',
    height: '100%'
};

export default GoogleApiWrapper({
    apiKey: ENV.APIKEY
})(MapContainer);
