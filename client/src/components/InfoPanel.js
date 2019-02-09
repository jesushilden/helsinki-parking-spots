import React from 'react'

const InfoPanel = ({ visible, toggle }) => {

    if (visible) {
        return (
            <div style={infoPanelStyles}>
                <div style={contentContainer}>
                    <div style={headerStyle}>Onko tilaa</div>
                    <div style={kayttoohjeetHeaderStyle}>Käyttöohjeet</div>
                    <div style={kayttoohjeStyle}>Klickaa sijaintia jossa haluat parkkeerata.</div>
                    <div style={kayttoohjeStyle}>Alueet missä saa pysäköidä näkyvät eri värisinä alueina.</div>
                    <div style={kayttoohjeStyle}>Punaisilla alueilla ei ole tilaa parkkeerata.</div>
                    <div style={kayttoohjeStyle}>Keltaisilla alueilla saattaa olla tilaa.</div>
                    <div style={kayttoohjeStyle}>Vihreillä alueilla on reippaasti tilaa.</div>
                    <div style={hideInfoPanelStyle} onClick={toggle}>Aloita</div>
                </div>
            </div>
        )
    } else {
        return (
            <div style={showInfoPanelStyle} onClick={toggle}>?</div>
        )
    }
}

const infoPanelStyles = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'sans-serif'
}

const contentContainer = {
    marginTop: '100px'
}

const headerStyle = {
    fontWeight: 'bold',
    fontSize: '45px',
    marginBottom: '40px'
}

const kayttoohjeetHeaderStyle = {
    fontSize: '25px',
    fontWeight: 'bold',
    marginBottom: '30px'
}

const kayttoohjeStyle = {
    marginBottom: '17px'
}

const showInfoPanelStyle = {
    position: 'absolute',
    zIndex: 1000,
    right: '9px',
    top: '60px',
    padding: '2px 14px',
    fontSize: '30px',
    cursor: 'pointer',
    backgroundColor: 'white',
    color: '#666666',
    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px -1px',
    borderRadius: '2px'
}

const hideInfoPanelStyle = {
    border: '1px solid white',
    padding: '10px',
    cursor: 'pointer',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '100px',
    marginTop: '40px'

}

export default InfoPanel