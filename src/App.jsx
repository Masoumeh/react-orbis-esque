import React, {Component} from 'react';
import {render} from 'react-dom';
import {LayersControl, Map, TileLayer, LayerGroup} from 'react-leaflet';
import {Sidebar, Tab} from 'react-leaflet-sidebarv2';
// import {LayerGroup, LayersControl} from "react-leaflet/es/LayersControl";
// import Sidebar from 'react-sidebar';
import '../style/leaflet-sidebar.min.css'
import '../style/font-awesome.min.css'
import '../style/leaflet.css'

const stamenTonerTiles = 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg';
const stamenTonerAttr = 'Tiles and Data &copy; 2013 <a href="http://www.awmc.unc.edu" target="_blank">AWMC</a>' +
    '<a href="http://creativecommons.org/licenses/by-nc/3.0/deed.en_US" target="_blank">CC-BY-NC 3.0</a>';

const { BaseLayer, Overlay } = LayersControl;
const mql = window.matchMedia(`(min-width: 800px)`);


export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //react-leaflet-sidebar
            collapsed: false,
            selected: 'home',

            //react-sidebar
            sidebarDocked: mql.matches,
            sidebarOpen: false,

            zoom: [4], // map zoom
            center: [30, 33],
            containerStyle: {
                height: "100vh",
                width: "100vw"
            },
            // places: EMPTY_GEOM, // Places GeoJSON
            // routes: EMPTY_GEOM, // Routes GeoJSON
            highlighted: { // Selected route (if any) - places & route segments
                places: [],
                segments: []
            }
        }
        //react-sidebar
        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }
    // react-sidebar
    componentWillMount() {
        mql.addListener(this.mediaQueryChanged);
    }

    componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
    }

    onSetSidebarOpen(open) {
        this.setState({sidebarOpen: open});
    }

    mediaQueryChanged() {
        this.setState({sidebarDocked: mql.matches, sidebarOpen: false});
    }


    //react-leaflet-sidebar
    onClose() {
        this.setState({collapsed: true});
    }

    onOpen(id) {
        this.setState({
            collapsed: false,
            selected: id,
        })
    }

    render() {
        return (
            <div>

                <Sidebar id="sidebar" collapsed={this.state.collapsed} selected={this.state.selected}
                         onOpen={this.onOpen.bind(this)} onClose={this.onClose.bind(this)}>
                    <Tab id="home" header="Home" icon="fa fa-home">
                        <p>No place like home!</p>
                    </Tab>
                    <Tab id="settings" header="Settings" icon="fa fa-cog" anchor="bottom">
                        <p>Settings dialogue.</p>
                    </Tab>
                </Sidebar>
                <Map className="sidebar-map"
                     center={this.state.center}
                     zoom={this.state.zoom}
                >
                    <LayersControl position="topright">
                        <BaseLayer checked name="OpenStreetMap.WaterColor">
                            <TileLayer
                                // attribution={stamenTonerAttr}
                                url={stamenTonerTiles}
                            />
                        </BaseLayer>
                        <BaseLayer checked name="OpenStreetMap.Mapnik">
                            <TileLayer
                                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                        </BaseLayer>
                        <BaseLayer name="OpenStreetMap.BlackAndWhite">
                            <TileLayer
                                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                                url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                            />
                        </BaseLayer>
                    </LayersControl>
                </Map>
            </div>
        );
    }
}

render(
    <App/>,
    document.getElementById('mount')
);