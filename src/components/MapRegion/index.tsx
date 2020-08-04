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
  const [elevation_altogrande] = useState(
    new TileLayer({ visible: true, className: 'altogrande-layer' }),
  );
  const [thickness_altogrande] = useState(
    new TileLayer({ visible: false, className: 'altogrande-layer' }),
  );
  const [head_altogrande] = useState(
    new TileLayer({ visible: false, className: 'altogrande-layer' }),
  );

  const [elevation_corrente] = useState(
    new TileLayer({ visible: false, className: 'corrente-layer' }),
  );
  const [thickness_corrente] = useState(
    new TileLayer({ visible: false, className: 'corrente-layer' }),
  );
  const [head_corrente] = useState(
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
      maxZoom: 12,
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
        head_altogrande,
        thickness_altogrande,
        elevation_altogrande,
        head_corrente,
        thickness_corrente,
        elevation_corrente,
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

  const elevation_altogrande_source = new TileWMS({
    url: wms.defaults.baseURL + 'altogrande_elevation.map',
    params: {
      LAYERS: 'elevation',
      TILED: true,
    },
    serverType: 'mapserver',
    crossOrigin: 'anonymous',
  });

  const thickness_altogrande_source = new TileWMS({
    url: wms.defaults.baseURL + 'altogrande_thickness.map',
    params: {
      LAYERS: 'thickness',
      TILED: true,
    },
    serverType: 'mapserver',
    crossOrigin: 'anonymous',
  });

  const head_altogrande_source = new TileWMS({
    url: wms.defaults.baseURL + 'altogrande_head.map',
    params: {
      LAYERS: 'head',
      TILED: true,
    },
    serverType: 'mapserver',
    crossOrigin: 'anonymous',
  });

  const elevation_corrente_source = new TileWMS({
    url: wms.defaults.baseURL + 'corrente_elevation.map',
    params: {
      LAYERS: 'elevation',
      TILED: true,
    },
    serverType: 'mapserver',
    crossOrigin: 'anonymous',
  });

  const thickness_corrente_source = new TileWMS({
    url: wms.defaults.baseURL + 'corrente_thickness.map',
    params: {
      LAYERS: 'thickness',
      TILED: true,
    },
    serverType: 'mapserver',
    crossOrigin: 'anonymous',
  });

  const head_corrente_source = new TileWMS({
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

  elevation_altogrande.set('name', 'elevation_altogrande');
  elevation_altogrande.setSource(elevation_altogrande_source);
  elevation_altogrande.getSource().refresh();

  thickness_altogrande.set('name', 'thickness_altogrande');
  thickness_altogrande.setSource(thickness_altogrande_source);
  thickness_altogrande.getSource().refresh();

  head_altogrande.set('name', 'head_altogrande');
  head_altogrande.setSource(head_altogrande_source);
  head_altogrande.getSource().refresh();

  elevation_corrente.set('name', 'elevation_corrente');
  elevation_corrente.setSource(elevation_corrente_source);
  elevation_corrente.getSource().refresh();

  thickness_corrente.set('name', 'thickness_corrente');
  thickness_corrente.setSource(thickness_corrente_source);
  thickness_corrente.getSource().refresh();

  head_corrente.set('name', 'head_corrente');
  head_corrente.setSource(head_corrente_source);
  head_corrente.getSource().refresh();

  useEffect(() => {
    map.setTarget('map');
  });

  return (
    <Container id="map">
      <Menu ishidden={window.innerWidth <= 760 ? 1 : 0} map={map} />

      <Popup
        map={map}
        source={[
          elevation_altogrande_source,
          thickness_altogrande_source,
          head_altogrande_source,
          elevation_corrente_source,
          thickness_corrente_source,
          head_corrente_source,
        ]}
      />

      <Footer id="footer" map={map} />
    </Container>
  );
};

export default Map;
