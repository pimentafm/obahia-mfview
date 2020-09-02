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

const Map: React.FC<MapProps> = () => {
  const [altogrande_elevation] = useState(
    new TileLayer({ visible: true, className: 'altogrande-layer' }),
  );
  const [altogrande_thickness] = useState(
    new TileLayer({ visible: false, className: 'altogrande-layer' }),
  );
  const [altogrande_head] = useState(
    new TileLayer({ visible: false, className: 'altogrande-layer' }),
  );

  const [mediogrande_elevation] = useState(
    new TileLayer({ visible: false, className: 'mediogrande-layer' }),
  );
  const [mediogrande_thickness] = useState(
    new TileLayer({ visible: false, className: 'mediogrande-layer' }),
  );
  const [mediogrande_head] = useState(
    new TileLayer({ visible: false, className: 'mediogrande-layer' }),
  );

  const [corrente_elevation] = useState(
    new TileLayer({ visible: false, className: 'corrente-layer' }),
  );
  const [corrente_thickness] = useState(
    new TileLayer({ visible: false, className: 'corrente-layer' }),
  );
  const [corrente_head] = useState(
    new TileLayer({ visible: false, className: 'corrente-layer' }),
  );

  const [highways] = useState(new TileLayer({ visible: false }));
  const [hidrography] = useState(new TileLayer({ visible: false }));
  const [watersheds] = useState(new TileLayer({ visible: true }));
  const [urucuia] = useState(new TileLayer({ visible: true }));
  const [counties] = useState(new TileLayer({ visible: false }));

  const osm = new TileLayer({ source: new OSM({ crossOrigin: 'anonymous' }) });

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
      maxZoom: 10,
      center: center,
      //extent: [276126.77, 8416856.44, 676126.77, 8816856.44],
      zoom: zoom,
    }),
  );

  const [map] = useState(
    new OlMap({
      controls: [],
      target: undefined,
      layers: [
        osm,
        urucuia,
        altogrande_head,
        altogrande_thickness,
        altogrande_elevation,
        mediogrande_head,
        mediogrande_thickness,
        mediogrande_elevation,
        corrente_head,
        corrente_thickness,
        corrente_elevation,
        watersheds,
        counties,
        highways,
        hidrography,
      ],
      view: view,
      interactions: defaults({
        keyboard: false,
      }),
    }),
  );

  const urucuia_source = new TileWMS({
    url: wms.defaults.baseURL + 'urucuia.map',
    params: {
      LAYERS: 'urucuia',
      TILED: true,
    },
    serverType: 'mapserver',
    crossOrigin: 'anonymous',
  });

  const watersheds_source = new TileWMS({
    url: wms.defaults.baseURL + 'watersheds.map',
    params: {
      LAYERS: 'watersheds',
      TILED: true,
    },
    serverType: 'mapserver',
    crossOrigin: 'anonymous',
  });

  const counties_source = new TileWMS({
    url: wms.defaults.baseURL + 'counties.map',
    params: {
      LAYERS: 'counties',
      TILED: true,
    },
    serverType: 'mapserver',
    crossOrigin: 'anonymous',
  });

  const highways_source = new TileWMS({
    url: wms.defaults.baseURL + 'highwaysRegion.map',
    params: {
      LAYERS: 'Rodovias',
      TILED: true,
    },
    serverType: 'mapserver',
    crossOrigin: 'anonymous',
  });

  const hidrography_source = new TileWMS({
    url: wms.defaults.baseURL + 'hidrographyRegion.map',
    params: {
      LAYERS: 'hidrografia',
      TILED: true,
    },
    serverType: 'mapserver',
    crossOrigin: 'anonymous',
  });

  const altogrande_elevation_source = new TileWMS({
    url: wms.defaults.baseURL + 'altogrande_elevation.map',
    params: {
      LAYERS: 'elevation',
      TILED: true,
    },
    serverType: 'mapserver',
    crossOrigin: 'anonymous',
  });

  const altogrande_thickness_source = new TileWMS({
    url: wms.defaults.baseURL + 'altogrande_thickness.map',
    params: {
      LAYERS: 'thickness',
      TILED: true,
    },
    serverType: 'mapserver',
    crossOrigin: 'anonymous',
  });

  const altogrande_head_source = new TileWMS({
    url: wms.defaults.baseURL + 'altogrande_head.map',
    params: {
      LAYERS: 'head',
      TILED: true,
    },
    serverType: 'mapserver',
    crossOrigin: 'anonymous',
  });

  const mediogrande_elevation_source = new TileWMS({
    url: wms.defaults.baseURL + 'mediogrande_elevation.map',
    params: {
      LAYERS: 'elevation',
      TILED: true,
    },
    serverType: 'mapserver',
    crossOrigin: 'anonymous',
  });

  const mediogrande_thickness_source = new TileWMS({
    url: wms.defaults.baseURL + 'mediogrande_thickness.map',
    params: {
      LAYERS: 'thickness',
      TILED: true,
    },
    serverType: 'mapserver',
    crossOrigin: 'anonymous',
  });

  const mediogrande_head_source = new TileWMS({
    url: wms.defaults.baseURL + 'mediogrande_head.map',
    params: {
      LAYERS: 'head',
      TILED: true,
    },
    serverType: 'mapserver',
    crossOrigin: 'anonymous',
  });

  const corrente_elevation_source = new TileWMS({
    url: wms.defaults.baseURL + 'corrente_elevation.map',
    params: {
      LAYERS: 'elevation',
      TILED: true,
    },
    serverType: 'mapserver',
    crossOrigin: 'anonymous',
  });

  const corrente_thickness_source = new TileWMS({
    url: wms.defaults.baseURL + 'corrente_thickness.map',
    params: {
      LAYERS: 'thickness',
      TILED: true,
    },
    serverType: 'mapserver',
    crossOrigin: 'anonymous',
  });

  const corrente_head_source = new TileWMS({
    url: wms.defaults.baseURL + 'corrente_head.map',
    params: {
      LAYERS: 'head',
      TILED: true,
    },
    serverType: 'mapserver',
    crossOrigin: 'anonymous',
  });

  urucuia.set('name', 'urucuia');
  urucuia.setSource(urucuia_source);
  urucuia.getSource().refresh();

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

  altogrande_elevation.set('name', 'altogrande_elevation');
  altogrande_elevation.setSource(altogrande_elevation_source);
  altogrande_elevation.getSource().refresh();

  altogrande_thickness.set('name', 'altogrande_thickness');
  altogrande_thickness.setSource(altogrande_thickness_source);
  altogrande_thickness.getSource().refresh();

  altogrande_head.set('name', 'altogrande_head');
  altogrande_head.setSource(altogrande_head_source);
  altogrande_head.getSource().refresh();

  mediogrande_elevation.set('name', 'mediogrande_elevation');
  mediogrande_elevation.setSource(mediogrande_elevation_source);
  mediogrande_elevation.getSource().refresh();

  mediogrande_thickness.set('name', 'mediogrande_thickness');
  mediogrande_thickness.setSource(mediogrande_thickness_source);
  mediogrande_thickness.getSource().refresh();

  mediogrande_head.set('name', 'mediogrande_head');
  mediogrande_head.setSource(mediogrande_head_source);
  mediogrande_head.getSource().refresh();

  corrente_elevation.set('name', 'corrente_elevation');
  corrente_elevation.setSource(corrente_elevation_source);
  corrente_elevation.getSource().refresh();

  corrente_thickness.set('name', 'corrente_thickness');
  corrente_thickness.setSource(corrente_thickness_source);
  corrente_thickness.getSource().refresh();

  corrente_head.set('name', 'corrente_head');
  corrente_head.setSource(corrente_head_source);
  corrente_head.getSource().refresh();

  useEffect(() => {
    map.setTarget('map');
  });

  return (
    <Container id="map">
      <Menu ishidden={window.innerWidth <= 760 ? 1 : 0} map={map} />

      <Popup
        map={map}
        source={[
          altogrande_elevation_source,
          altogrande_thickness_source,
          altogrande_head_source,
          mediogrande_elevation_source,
          mediogrande_thickness_source,
          mediogrande_head_source,
          corrente_elevation_source,
          corrente_thickness_source,
          corrente_head_source,
        ]}
      />

      <Footer id="footer" map={map} />
    </Container>
  );
};

export default Map;
