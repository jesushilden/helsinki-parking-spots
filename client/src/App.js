import React, { Component } from 'react'
import MapContainer from "./components/MapContainer"

import parkingService from './services/parkingService'

class App extends Component {
<<<<<<< HEAD
  render() {
    return (
      <div className="container">
        Hello world!
        <MapContainer></MapContainer>
      </div>
    )
  }
=======

    constructor(props) {
        super(props)
        this.state = {
            areas: []
        }
    }

    componentDidMount() {
        const areas = parkingService.getAreas()

        this.setState({
            areas
        })
    }

    render() {
        return (
            <div className="container">
                Hello world!
            </div>
        )
    }
>>>>>>> 82e573a14622d355f615293d967b6b5205640c50
}

export default App
