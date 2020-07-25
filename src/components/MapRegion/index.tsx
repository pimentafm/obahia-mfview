import React, { useState, useEffect } from 'react';

import OlMap from 'ol/Map';

import View from 'ol/View';

import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import OSM from 'ol/source/OSM';

import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import { get as getProjection } from 'ol/proj';

import { defaults } from 'ol/interaction';

import 'ol/ol.css';

import { wms } from '../../services';

import { Container } from './styles';

import Menu from '../Menu';
import Footer from '../Footer';

import Popup from '../../components/Popup';

interface MapProps {
  defaultYear: number;
  defaultCategory: string;
}

const Map: React.FC<MapProps> = ({ defaultYear, defaultCategory }) => {
  const [elevation] = useState(new TileLayer({ visible: true }));

  const [highways] = useState(new TileLayer({ visible: false }));
  const [hidrography] = useState(new TileLayer({ visible: false }));
  const [watersheds] = useState(new TileLayer({ visible: true }));
  const [counties] = useState(new TileLayer({ visible: false }));

  const [center] = useState([476126.77, 8616856.44]);
  const [zoom] = useState<number>(7);

  proj4.defs(
    'EPSG:31983',
    '+proj=utm +zone=23 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ',
  );
  register(proj4);
  const utmProjection = getProjection('EPSG:31983');

  const [view] = useState(
    new View({
      projection: utmProjection,
      center: center,
      //extent: [276126.77, 8416856.44, 676126.77, 8816856.44],
      zoom: zoom,
    }),
  );

  const osm = new TileLayer({ source: new OSM() });

  const [map] = useState(
    new OlMap({
      controls: [],
      target: undefined,
      layers: [osm, elevation, watersheds, counties, highways, hidrography],
      view: view,
      interactions: defaults({
        keyboard: false,
      }),
    }),
  );

  const watersheds_source = new TileWMS({
    url: wms.defaults.baseURL + 'watersheds.map',
    params: {
      LAYERS: 'watersheds',
      TILED: true,
    },
    serverType: 'mapserver',
  });

  const counties_source = new TileWMS({
    url: wms.defaults.baseURL + 'counties.map',
    params: {
      LAYERS: 'counties',
      TILED: true,
    },
    serverType: 'mapserver',
  });

  const highways_source = new TileWMS({
    url: wms.defaults.baseURL + 'highwaysRegion.map',
    params: {
      LAYERS: 'Rodovias',
      TILED: true,
    },
    serverType: 'mapserver',
  });

  const hidrography_source = new TileWMS({
    url: wms.defaults.baseURL + 'hidrographyRegion.map',
    params: {
      LAYERS: 'hidrografia',
      TILED: true,
    },
    serverType: 'mapserver',
  });

  const elevation_source = new TileWMS({
    url: wms.defaults.baseURL + 'mf_altogrande.map',
    params: {
      LAYERS: 'elevacao',
      TILED: true,
    },
    projection: 'EPSG:31983',
    serverType: 'mapserver',
  });

  watersheds.set('name', 'watersheds');
  watersheds.setSource(watersheds_source);
  watersheds.getSource().refresh();

  counties.set('name', 'counties');
  counties.setSource(counties_source);
  counties.getSource().refresh();

  highways.set('name', 'highways');
  highways.setSource(highways_source);
  highways.getSource().refresh();

  hidrography.set('name', 'hidrography');
  hidrography.setSource(hidrography_source);
  hidrography.getSource().refresh();

  elevation.set('name', 'elevacao');
  elevation.setSource(elevation_source);
  elevation.getSource().refresh();

  useEffect(() => {
    map.setTarget('map');
  });

  return (
    <Container id="map">
      <Menu ishidden={false ? 1 : 0} map={map} />

      <Popup map={map} source={elevation_source} />

      <Footer id="footer" map={map} />
    </Container>
  );
};

export default Map;
