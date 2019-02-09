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

    async componentDidMount() {
        const areas = await parkingService.getAreas()

        this.setState({
            areas
        })
    }

    updateAreas = async (lng, lat) => {
        const areas = await parkingService.getAreasCloseTo(lat, lng)
        console.log(areas)
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
                <MapContainer areas={this.state.areas} updateAreas={this.updateAreas}></MapContainer>
            </div>
        )
    }
}

export default App
