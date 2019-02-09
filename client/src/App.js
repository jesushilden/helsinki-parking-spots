import React, { Component } from 'react'
import MapContainer from './components/MapContainer'
import InfoPanel from './components/InfoPanel'

import parkingService from './services/parkingService'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            areas: [],
            infoPanel: true
        }
    }

    componentDidMount() {
        const areas = parkingService.getAreas()

        this.setState({
            areas
        })
    }

    toggleInfoPanel = () => {
        this.setState({infoPanel: !this.state.infoPanel})
    }

    render() {
        return (
            <div className="container">
                <InfoPanel visible={this.state.infoPanel} toggle={this.toggleInfoPanel}/>
                <MapContainer areas={this.state.areas}></MapContainer>
            </div>
        )
    }
}

export default App
