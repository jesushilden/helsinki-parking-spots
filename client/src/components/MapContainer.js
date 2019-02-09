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
                lngInfo: area.coordinates[0].long,
                latInfo: area.coordinates[0].lat,
                infoCapacity: area.capacityEstimate ? area.capacityEstimate : "?",
                infoCurrent: area.currentParkingCount,
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

        if (!area.capacityEstimate) {
            return "#CCCC00" //yellow
        }

        const ratio = area.currentParkingCount / area.capacityEstimate;
        if (ratio === 1) {
            return "#CD0000" //red
        } else if(ratio > 0.5){
            return "#CCCC00" //yellow
        }
        else {
            return "#008000" //green
        }


    }

    mapClicked(mapProps, map, clickEvent) {
        
        console.log(clickEvent.latLng.lat())
        console.log(clickEvent.latLng.lng())
        this.setState({center:
            {
            lng: clickEvent.latLng.lng(),
            lat: clickEvent.latLng.lat()}
        })
        
    }

    fixLong(coordinates) {
        return coordinates.map(c => {
            let new_cor = {
                lat: 0,
                lng: 0
            }
            new_cor.lat = c.lat
            new_cor.lng = c.long
            return new_cor
        })
    }

    render() {

        return (
            <Map
                google={this.props.google}
                zoom={18}
                style={mapStyles}
                initialCenter={this.state.center}
                onClick={(mapProps, map, clickEvent) => this.mapClicked(mapProps, map, clickEvent)}
                center={this.state.center}
            >
                {this.props.areas.map(area =>
                    <Polygon
                        key={area.areaId}
                        paths={this.fixLong(area.coordinates)}
                        strokeColor={this.calculateColor(area)}
                        strokeOpacity={0.8}
                        strokeWeight={2}
                        fillColor={this.calculateColor(area)}
                        fillOpacity={0.35}
                        onMouseover={() => this.hover(area)}
                        onMouseout={this.unhover}
                     />
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
    height: '100%',
    clickable: true
}

export default GoogleApiWrapper({
    apiKey: ENV.APIKEY
})(MapContainer)
