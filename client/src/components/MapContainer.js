import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Polygon, InfoWindow } from 'google-maps-react'
import { ENV } from "../environment"

class MapContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showingInfoWindow: false,
            lngInfo: 24.953118143536688,
            latInfo: 60.17153323236579,
            infoCapacity: "?",
            infoCurrent: "?",
            center: {
                lng: 24.953118143536688,
                lat: 60.17153323236579
            }
        }
    }

    hover = (area) => {
        if (area.coordinates[0]) {
            this.setState({
                showingInfoWindow: true,
                lngInfo: area.coordinates[0].lng,
                latInfo: area.coordinates[0].lat,
                infoCapacity: area.capacity_estimate ? area.capacity_estimate : "?",
                infoCurrent: area.current_parking_count,
            })
        } else {
            this.setState({ showingInfoWindow: true })
        }

    }

    unhover = () => {
        this.setState({ showingInfoWindow: false })
    }

    infoText = () => {
        return (<div>
            <h1>{this.state.infoCurrent}/{this.state.infoCapacity}</h1>
        </div>)
    }

    calculateColor = (area) => {

        if (!area.capacity_estimate) {
            return "#CCCC00"
        }

        const ratio = area.current_parking_count / area.capacity_estimate;
        if (ratio > 0.75) {
            return "#CD0000"
        } else {
            return "#008000"
        }


    }

    render() {

        return (
            <Map
                google={this.props.google}
                zoom={18}
                style={mapStyles}
                initialCenter={this.state.center}
            >
                {this.props.areas.map(area =>
                    <Polygon
                        key={area.areaId}
                        paths={area.coordinates}
                        strokeColor={this.calculateColor(area)}
                        strokeOpacity={0.8}
                        strokeWeight={2}
                        fillColor={this.calculateColor(area)}
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
}

export default GoogleApiWrapper({
    apiKey: ENV.APIKEY
})(MapContainer)
