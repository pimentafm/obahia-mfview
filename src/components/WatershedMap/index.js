import React, { useState, useEffect } from "react";
import OlMap from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import OSM from "ol/source/OSM";
import { defaults } from 'ol/interaction';

import oba from "~/services/api";

import "ol/ol.css";

import { MapContainer } from "./styles";
import Menu from "~/components/Menu";
import Scalebar from "~/components/Scalebar";
import Footer from "~/components/Footer";

//import CardPlot from "~/components/CardPlot";
//import Stackplot from "~/components/Stackplot/StackplotWatershed";
//import Barplot from "~/components/Barplot/BarplotWatershed";

import CardReport from "~/components/CardReport";
import Report from "~/components/Report";

import domtoimage from 'dom-to-image';

const DrainageMap = props => {
  const [defaultWatershed, setWatershed] = useState(props.defaultWatershed);
  const [defaultCategory] = useState(props.defaultCategory);
  const [menuIsHidden] = useState(false);
  //const [plotsAreHidden] = useState(false);
  const [reportIsHidden, setReportHidden] = useState(true);
  const [center, setCenter] = useState([]);
  const [zoom, setZoom] = useState([]);
  const [botm] = useState([new TileLayer({name: "botm1"}), new TileLayer({name: "botm2", visible: false}), new TileLayer({name: "botm3", visible: false})]);
  const [hy] = useState([new TileLayer({name: "hy1", visible: false}), new TileLayer({name: "hy2", visible: false}), new TileLayer({name: "hy3", visible: false})]);
  const [sf1] = useState([new TileLayer({name: "sf1_1", visible: false}), new TileLayer({name: "sf1_2", visible: false}), new TileLayer({name: "sf1_3", visible: false})]);

  const [stackImage, setStackImage] = useState("/obahia-mfview/src/assets/images/image-loading.png");
  const [barImage, setBarImage] = useState("/obahia-mfview/src/assets/images/image-loading.png");

  const botm1_source = new TileWMS({
    url:
      "http://ucayali.dea.ufv.br/cgi-bin/mapserv?map=/var/www/obahia-mfview/mapfiles/botm1.map",
    params: {
      ws: defaultWatershed,
      LAYERS: "Botm"
    },
    serverType: "mapserver"
  });

  const botm2_source = new TileWMS({
    url:
      "http://ucayali.dea.ufv.br/cgi-bin/mapserv?map=/var/www/obahia-mfview/mapfiles/botm2.map",
    params: {
      ws: defaultWatershed,
      LAYERS: "Botm"
    },
    serverType: "mapserver"
  });

  const botm3_source = new TileWMS({
    url:
      "http://ucayali.dea.ufv.br/cgi-bin/mapserv?map=/var/www/obahia-mfview/mapfiles/botm3.map",
    params: {
      ws: defaultWatershed,
      LAYERS: "Botm"
    },
    serverType: "mapserver"
  });

  const hy1_source = new TileWMS({
    url:
      "http://ucayali.dea.ufv.br/cgi-bin/mapserv?map=/var/www/obahia-mfview/mapfiles/hy1.map",
    params: {
      ws: defaultWatershed,
      LAYERS: "Hy"
    },
    serverType: "mapserver"
  });

  const hy2_source = new TileWMS({
    url:
      "http://ucayali.dea.ufv.br/cgi-bin/mapserv?map=/var/www/obahia-mfview/mapfiles/hy2.map",
    params: {
      ws: defaultWatershed,
      LAYERS: "Hy"
    },
    serverType: "mapserver"
  });

  const hy3_source = new TileWMS({
    url:
      "http://ucayali.dea.ufv.br/cgi-bin/mapserv?map=/var/www/obahia-mfview/mapfiles/hy3.map",
    params: {
      ws: defaultWatershed,
      LAYERS: "Hy"
    },
    serverType: "mapserver"
  });

  const sf1_source = new TileWMS({
    url:
      "http://ucayali.dea.ufv.br/cgi-bin/mapserv?map=/var/www/obahia-mfview/mapfiles/sf1_1.map",
    params: {
      ws: defaultWatershed,
      LAYERS: "Sf1"
    },
    serverType: "mapserver"
  });

  const sf2_source = new TileWMS({
    url:
      "http://ucayali.dea.ufv.br/cgi-bin/mapserv?map=/var/www/obahia-mfview/mapfiles/sf1_2.map",
    params: {
      ws: defaultWatershed,
      LAYERS: "Sf1"
    },
    serverType: "mapserver"
  });

  const sf3_source = new TileWMS({
    url:
      "http://ucayali.dea.ufv.br/cgi-bin/mapserv?map=/var/www/obahia-mfview/mapfiles/sf1_3.map",
    params: {
      ws: defaultWatershed,
      LAYERS: "Sf1"
    },
    serverType: "mapserver"
  });

  botm[0].setSource(botm1_source);
  botm[0].getSource().updateParams({ time: Date.now() });
  botm[0].changed();
  botm[1].setSource(botm2_source);
  botm[1].getSource().updateParams({ time: Date.now() });
  botm[1].changed();
  botm[2].setSource(botm3_source);
  botm[2].getSource().updateParams({ time: Date.now() });
  botm[2].changed();

  hy[0].setSource(hy1_source);
  hy[0].getSource().updateParams({ time: Date.now() });
  hy[0].changed();
  hy[1].setSource(hy2_source);
  hy[1].getSource().updateParams({ time: Date.now() });
  hy[1].changed();
  hy[2].setSource(hy3_source);
  hy[2].getSource().updateParams({ time: Date.now() });
  hy[2].changed();

  sf1[0].setSource(sf1_source);
  sf1[0].getSource().updateParams({ time: Date.now() });
  sf1[0].changed();
  sf1[1].setSource(sf2_source);
  sf1[1].getSource().updateParams({ time: Date.now() });
  sf1[1].changed();
  sf1[2].setSource(sf3_source);
  sf1[2].getSource().updateParams({ time: Date.now() });
  sf1[2].changed();

  const view = new View({
    projection: "EPSG:4326",
    center: center,
    zoom: zoom
  });

  const osm = new TileLayer({ source: new OSM() });

  const map = new OlMap({
    controls: [],
    target: null,
    layers: [osm, sf1[2], sf1[1], sf1[0], hy[2], hy[1], hy[0], botm[2], botm[1], botm[0]],
    view: view,
    interactions: defaults({
      keyboard: false
    })
  });

  useEffect(() => {
    map.getView().setCenter(props.center);
    map.getView().setZoom(props.zoom);
    map.setTarget("map");
  }, [props.center, props.zoom, map]);

  const handleWatersheds = ws => {
    setWatershed(ws);

    oba
      .post("geom/", {
        table_name: "gcc",
        headers: {
          "Content-type": "application/json"
        }
      })
      .then(response => {
        const cxcy = response.data
          .filter(f => f.name === defaultWatershed.toUpperCase())
          .map(c => c.centroid);
        const extent = response.data
          .filter(f => f.name === defaultWatershed.toUpperCase())
          .map(c => c.extent);

        setCenter(cxcy[0]);
        setZoom(extent[0]);
      })
      .catch(e => {
        this.errors.push(e);
      });
  };

  const handleReport = () => {
    domtoimage.toPng(document.getElementById('stack-plot'))
    .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        setStackImage(img.src);
    })
    .catch(function (error) {
        console.error('oops, something went wrong when generate StackPlot image!', error);
    });

    domtoimage.toPng(document.getElementById('bar-plot'))
    .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        setBarImage(img.src);
    })
    .catch(function (error) {
        console.error('oops, something went wrong when generate BarPlot image!', error);
    });

    if (reportIsHidden === false) {
      setReportHidden(true);
    } else {
      setReportHidden(false);
    }
  };

  const onOffLayers = (evt, obj) => {
    const lyr_name = obj.target.name;
    map.getLayers().forEach(lyr => {
      if (lyr.get('name') === lyr_name) {
        lyr.setVisible(!lyr.get('visible'));
      }
    });
  };

  return (
    <MapContainer id="map">
      <Menu
        key="menu"
        isHidden={menuIsHidden}
        reportIsHidden={reportIsHidden}
        handleReport={handleReport}
        handleWatersheds={handleWatersheds}
        defaultWatershed={defaultWatershed}
        defaultCategory={defaultCategory}
        onOffLayers={onOffLayers}
        map={map}
      />

      <Scalebar key="scalebar" map={map} />
{/*
      <CardPlot plotsAreHidden={plotsAreHidden}
        stackplot={
          <Stackplot 
            key="stackplot" 
            defaultWatershed={defaultWatershed}
            defaultYear={defaultYear}
          /> 
        }
        barplot={
          <Barplot
            key={"barplot" + defaultYear}
            defaultWatershed={defaultWatershed}
            defaultYear={defaultYear}
          />
        }
      />
*/}
      <Footer key="footer" map={map} />

      <CardReport reportIsHidden={reportIsHidden}
        report={
          <Report 
            key="report" 
            params={{
              defaultCategory,
              defaultWatershed,
              stackImage,
              barImage
            }}
          />
        }
      />

    </MapContainer>
  );
};

export default DrainageMap;
