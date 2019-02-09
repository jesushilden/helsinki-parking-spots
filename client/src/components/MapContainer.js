import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
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
          />
        );
    }
}

const mapStyles = {
    width: '50%',
    height: '100%'
  };

  export default GoogleApiWrapper({
    apiKey: ENV.APIKEY
  })(MapContainer);
