import React, { Component } from 'react'

import parkingService from './services/parkingService'

class App extends Component {

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
}

export default App
