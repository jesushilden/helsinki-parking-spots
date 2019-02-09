
const areas = [
    {
        id: 'ef44a2eb-57ad-4889-bc38-c713fc2d59e2',
        coordinates: [
            {
                lon: 24.95095348096506,
                lat: 60.171520647632406
            },
            {
                lon: 24.9509556803676,
                lat: 60.17150419982532
            },
            {
                lon: 24.951907565280848,
                lat: 60.171534655463105
            },
            {
                lon: 24.951905353253338,
                lat: 60.17155181966475
            },
            {
                lon: 24.951552974429124,
                lat: 60.17154054607087
            },
            {
                lon: 24.95095348096506,
                lat: 60.171520647632406
            }
        ],
        capacity_estimate: 10
    },
    {
        id: '5e9398b9-0b55-4e12-8376-3246d7f6bbba',
        coordinates: [
            {
                lon: 24.952267526407198,
                lat: 60.17150364378772
            },
            {
                lon: 24.952269290615902,
                lat: 60.17149077900347
            },
            {
                lon: 24.952296916829102,
                lat: 60.17149171945856
            },
            {
                lon: 24.953119948766968,
                lat: 60.17152034840436
            },
            {
                lon: 24.953118143536688,
                lat: 60.17153323236579
            },
            {
                lon: 24.952267526407198,
                lat: 60.17150364378772
            }
        ],
        capacity_estimate: null
    }
]

const getAreas = () => {
    return areas
}

const getCloseTo = (lon, lat) => {
    return areas
}

export default { getAreas, getCloseTo }