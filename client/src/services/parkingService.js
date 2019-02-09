const areas = [
    {
        areaId: 'ef44a2eb-57ad-4889-bc38-c713fc2d59e2',
        coordinates: [
            {
                long: 24.95095348096506,
                lat: 60.171520647632406
            },
            {
                long: 24.9509556803676,
                lat: 60.17150419982532
            },
            {
                long: 24.951907565280848,
                lat: 60.171534655463105
            },
            {
                long: 24.951905353253338,
                lat: 60.17155181966475
            },
            {
                long: 24.951552974429124,
                lat: 60.17154054607087
            },
            {
                long: 24.95095348096506,
                lat: 60.171520647632406
            }
        ],
        capacity_estimate: 10,
        current_parking_count: 5,
    },
    {
        areaId: '5e9398b9-0b55-4e12-8376-3246d7f6bbba',
        coordinates: [
            {
                long: 24.952267526407198,
                lat: 60.17150364378772
            },
            {
                long: 24.952269290615902,
                lat: 60.17149077900347
            },
            {
                long: 24.952296916829102,
                lat: 60.17149171945856
            },
            {
                long: 24.953119948766968,
                lat: 60.17152034840436
            },
            {
                long: 24.953118143536688,
                lat: 60.17153323236579
            },
            {
                long: 24.952267526407198,
                lat: 60.17150364378772
            }
        ],
        capacity_estimate: null,
        current_parking_count: 10
    }
]

const getAreas = () => {
    return areas
}   

const getAreasCloseTo = (lng, lat) => {
    return areas
}

export default { getAreas, getAreasCloseTo }