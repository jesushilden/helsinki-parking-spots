import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Polygon, InfoWindow } from 'google-maps-react';
import { ENV } from "../environment";

class MapContainer extends Component {

    state = {
        showingInfoWindow: false,
        lngInfo: 24.953118143536688,
        latInfo: 60.17153323236579,
        infoCapacity: "?",
        infoCurrent: "?"
    };

    hover = (paths) => {
        if(paths.coordinates[0]){
            this.setState({
                showingInfoWindow: true,
                lngInfo: paths.coordinates[0].lng,
                latInfo: paths.coordinates[0].lat,
                infoCapacity: paths.capacity_estimate ? paths.capacity_estimate : "?",
                infoCurrent: paths.current_parking_count,
            })
        } else {
            this.setState({showingInfoWindow: true})
        }
        
    }

    unhover = () => {
        this.setState({showingInfoWindow: false})
    }

    infoText = () => {
        return(<div>
            <h1>{this.state.infoCurrent}/{this.state.infoCapacity}</h1>
        </div>)
    }

    render() {
        return (
            <Map
                google={this.props.google}
                zoom={18}
                style={mapStyles}
                initialCenter={{
                    lng: 24.953118143536688,
                    lat: 60.17153323236579
                }}
            >
                {this.props.areas.map(area =>
                    <Polygon
                        key={area.id}
                        paths={area.coordinates}
                        strokeColor="#0000FF"
                        strokeOpacity={0.8}
                        strokeWeight={2}
                        fillColor="#0000FF"
                        fillOpacity={0.35}
                        onMouseover={() => this.hover(area)}
                        onMouseout={this.unhover} />
                )}
                <InfoWindow
                    position={{
                        lng: this.state.lngInfo,
                        lat: this.state.latInfo
                    }}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h1>{this.state.infoCurrent}/{this.state.infoCapacity}</h1>
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}

const mapStyles = {
    width: '100%',
    height: '100%'
};

export default GoogleApiWrapper({
    apiKey: ENV.APIKEY
})(MapContainer);
