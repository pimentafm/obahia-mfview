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
  const [botm1] = useState(new TileLayer());
  const [botm2] = useState(new TileLayer());
  const [botm3] = useState(new TileLayer());
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

  botm1.setSource(botm1_source);
  botm1.getSource().updateParams({ time: Date.now() });
  botm1.changed();
  botm2.setSource(botm2_source);
  botm2.getSource().updateParams({ time: Date.now() });
  botm2.changed();
  botm3.setSource(botm3_source);
  botm3.getSource().updateParams({ time: Date.now() });
  botm3.changed();

  console.log(botm1)

  botm2.setVisible(false);
  botm3.setVisible(false);

  const view = new View({
    projection: "EPSG:4326",
    center: center,
    zoom: zoom
  });

  const osm = new TileLayer({ source: new OSM() });

  const map = new OlMap({
    controls: [],
    target: null,
    layers: [osm, botm3, botm2, botm1],
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

  const onOffbotm1 = evt => {
    botm1.setVisible(evt);
  };

  const onOffbotm2 = evt => {
    botm2.setVisible(evt);
  };

  const onOffbotm3 = evt => {
    botm3.setVisible(evt);
  };

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
        onOffbotm1={onOffbotm1}
        onOffbotm2={onOffbotm2}
        onOffbotm3={onOffbotm3}
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
