import React from 'react';
import DeckGL from '@deck.gl/react';
import {IconLayer, ArcLayer} from '@deck.gl/layers';
import {StaticMap} from 'react-map-gl';
import LocationData from '../map_data/locations.json';
import ProductFlowData from '../map_data/productflow.json';
import IconMapping from '../icon/icon_mapping_v2.json';
import IconSpriteImage from '../icon/icon_sprite_v2.png';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoid2VpbWlueWVlIiwiYSI6ImNraXRnZnY1ejAxNTMzNXFlaHFqeXYwbDAifQ.N6dyyIXYydGKEDnf5uD-VA';

// Viewport settings
const INITIAL_VIEW_STATE = {
    latitude: 51.47,
    longitude: 0.45,
    zoom: 4,
    bearing: 0,
    pitch: 30
};

function DeckLayer(props) {
  let arcLayerData = [];
  let iconLayerData = [];
  if (props.locationName === 'Location' && props.categoryName ==='Category') {
    arcLayerData = ProductFlowData;
    iconLayerData = LocationData;
  }
  else if (props.locationName === 'Location' && props.categoryName !=='Category'){
    if (props.inbound){
      arcLayerData = arcLayerData.concat(ProductFlowData.filter(flow => flow.ToType === props.categoryName));
    }
    if (props.outbound){
      arcLayerData = arcLayerData.concat(ProductFlowData.filter(flow => flow.FromType === props.categoryName));
    }
    if (arcLayerData.length === 0){
      iconLayerData = iconLayerData.concat(LocationData.filter(location => location.Type === props.categoryName));
      console.log('no flow from this location');
    }
  }
  else if (props.locationName !== 'Location'){
    if (props.inbound){
      arcLayerData = arcLayerData.concat(ProductFlowData.filter(flow => flow.ToName === props.locationName));
    }
    if (props.outbound){
      arcLayerData = arcLayerData.concat(ProductFlowData.filter(flow => flow.FromName === props.locationName));
    }
    if (arcLayerData.length === 0){
      iconLayerData = iconLayerData.concat(LocationData.filter(location => location.Name === props.locationName));
      console.log('no flow from this location');
    }
  }

  if (arcLayerData.length > 0){
    for (let i = 0 ; i < arcLayerData.length; i++){
      iconLayerData = iconLayerData.concat(LocationData.filter(location => location.Name === arcLayerData[i].FromName));
      iconLayerData = iconLayerData.concat(LocationData.filter(location => location.Name === arcLayerData[i].ToName));
    }
  }

  const layers = [
    new IconLayer({
        id: 'icon-layer',
        data: iconLayerData,
        pickable: true,
        dataTransform: d => d,
        // iconAtlas and iconMapping are required
        // getIcon: return a string
        iconAtlas: IconSpriteImage,
        iconMapping: IconMapping,
        getIcon: d => d.Type,
        sizeScale: 10,
        getPosition: d => [d.Longitude,d.Latitude],
        getSize: d => 5,
    }),
    new ArcLayer({
        id: 'arcs',
        data: arcLayerData,
        dataTransform: d => d,//.features.filter(f => f.properties.scalerank < 4),
        // Styles
        getSourcePosition: d => [d.FromLongitude, d.FromLatitude],//[-0.4531566, 51.4709959], // London
        getTargetPosition: d => [d.ToLongitude, d.ToLatitude],
        getSourceColor: [0, 128, 200],
        getTargetColor: [200, 0, 80],
        getWidth: 1
    })
];
  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
      getTooltip={({object}) => object && object.Name}
    >
      <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
  );
}

export default DeckLayer;