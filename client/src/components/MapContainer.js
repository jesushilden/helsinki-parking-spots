import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Polygon } from 'google-maps-react'
import { ENV } from "../environment"

class MapContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            center: {
                lat: 60.169886,
                lng: 24.938516
            }
        }
    }

    render() {

        return (
            <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={this.state.center}
            >
                {this.props.areas.map(area =>
                    <Polygon
                        paths={area.coordinates}
                        strokeColor="#0000FF"
                        strokeOpacity={0.8}
                        strokeWeight={2}
                        fillColor="#0000FF"
                        fillOpacity={0.35}
                        key={area.areaId} />
                )}
            </Map>
        )
    }
}

const mapStyles = {
    width: '50%',
    height: '100%'
}

export default GoogleApiWrapper({
    apiKey: ENV.APIKEY
})(MapContainer)
