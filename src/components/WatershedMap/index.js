import React, { useState, useEffect } from "react";
import OlMap from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import OSM from "ol/source/OSM";
import { defaults } from 'ol/interaction';

import odb from "~/services/obahiadb";

import "ol/ol.css";

import { MapContainer } from "./styles";
import Menu from "~/components/Menu";
import Scalebar from "~/components/Scalebar";
import Footer from "~/components/Footer";

import CardPlot from "~/components/CardPlot";
import Scatterplot from "~/components/Scatterplot/ScatterplotWatershed";
import Barplot from "~/components/Barplot/BarplotWatershed";

import CardReport from "~/components/CardReport";
import Report from "~/components/Report";

import domtoimage from 'dom-to-image';

const DrainageMap = props => {
  const [defaultWatershed, setWatershed] = useState(props.defaultWatershed);
  const [defaultCategory] = useState(props.defaultCategory);
  const [menuIsHidden] = useState(false);
  const [plotsAreHidden] = useState(false);
  const [reportIsHidden, setReportHidden] = useState(true);
  const [center, setCenter] = useState([]);
  const [zoom, setZoom] = useState([]);
  const [botm] = useState([new TileLayer({name: "botm_1", visible: false}), new TileLayer({name: "botm_2", visible: false}), new TileLayer({name: "botm_3", visible: false})]);
  const [hy] = useState([new TileLayer({name: "hy_1", visible: false}), new TileLayer({name: "hy_2", visible: false}), new TileLayer({name: "hy_3", visible: false})]);
  const [sf1] = useState([new TileLayer({name: "sf1_1", visible: false}), new TileLayer({name: "sf1_2", visible: false}), new TileLayer({name: "sf1_3", visible: false})]);
  const [strt] = useState([new TileLayer({name: "strt_1", visible: false}), new TileLayer({name: "strt_2", visible: false}), new TileLayer({name: "strt_3", visible: false})]);
  const [tkness] = useState([new TileLayer({name: "tkness_1", visible: false}), new TileLayer({name: "tkness_2", visible: false}), new TileLayer({name: "tkness_3", visible: false})]);
  const [total_tkness] = useState(new TileLayer({name: "tkness_sum", visible: false}));
  const [top] = useState(new TileLayer({name: "top", visible: true}));
  const [vcont] = useState([new TileLayer({name: "vcont_1", visible: false}), new TileLayer({name: "vcont_2", visible: false})]);

  const [scatterImage, setScatterImage] = useState("/obahia-mfview/src/assets/images/image-loading.png");
  const [barImage, setBarImage] = useState("/obahia-mfview/src/assets/images/image-loading.png");

  const base_URL = "http://obahia.dea.ufv.br:8085/"

  const top_source = new TileWMS({
    url: base_URL + "cgi-bin/mapserv.fcgi?map=/var/www/geodb/mapfiles/top.map",
    params: {
      ws: defaultWatershed,
      LAYERS: "Top"
    },
    serverType: "mapserver"
  });

  const botm1_source = new TileWMS({
    url:
      base_URL + "cgi-bin/mapserv.fcgi?map=/var/www/geodb/mapfiles/botm_1.map",
    params: {
      ws: defaultWatershed,
      LAYERS: "Botm"
    },
    serverType: "mapserver"
  });

  const botm2_source = new TileWMS({
    url:
      base_URL + "cgi-bin/mapserv.fcgi?map=/var/www/geodb/mapfiles/botm_2.map",
    params: {
      ws: defaultWatershed,
      LAYERS: "Botm"
    },
    serverType: "mapserver"
  });

  const botm3_source = new TileWMS({
    url:
      base_URL + "cgi-bin/mapserv.fcgi?map=/var/www/geodb/mapfiles/botm_3.map",
    params: {
      ws: defaultWatershed,
      LAYERS: "Botm"
    },
    serverType: "mapserver"
  });

  const hy1_source = new TileWMS({
    url:
      base_URL + "cgi-bin/mapserv.fcgi?map=/var/www/geodb/mapfiles/hy_1.map",
    params: {
      ws: defaultWatershed,
      LAYERS: "Hy"
    },
    serverType: "mapserver"
  });

  const hy2_source = new TileWMS({
    url:
      base_URL + "cgi-bin/mapserv.fcgi?map=/var/www/geodb/mapfiles/hy_2.map",
    params: {
      ws: defaultWatershed,
      LAYERS: "Hy"
    },
    serverType: "mapserver"
  });

  const hy3_source = new TileWMS({
    url:
      base_URL + "cgi-bin/mapserv.fcgi?map=/var/www/geodb/mapfiles/hy_3.map",
    params: {
      ws: defaultWatershed,
      LAYERS: "Hy"
    },
    serverType: "mapserver"
  });

  const sf1_source = new TileWMS({
    url:
      base_URL + "cgi-bin/mapserv.fcgi?map=/var/www/geodb/mapfiles/sf1_1.map",
    params: {
      ws: defaultWatershed,
      LAYERS: "Sf1"
    },
    serverType: "mapserver"
  });

  const sf2_source = new TileWMS({
    url:
      base_URL + "cgi-bin/mapserv.fcgi?map=/var/www/geodb/mapfiles/sf1_2.map",
    params: {
      ws: defaultWatershed,
      LAYERS: "Sf1"
    },
    serverType: "mapserver"
  });

  const sf3_source = new TileWMS({
    url:
      base_URL + "cgi-bin/mapserv.fcgi?map=/var/www/geodb/mapfiles/sf1_3.map",
    params: {
      ws: defaultWatershed,
      LAYERS: "Sf1"
    },
    serverType: "mapserver"
  });

  const strt1_source = new TileWMS({
    url:
      base_URL + "cgi-bin/mapserv.fcgi?map=/var/www/geodb/mapfiles/strt_1.map",
    params: {
      ws: defaultWatershed,
      LAYERS: "Strt"
    },
    serverType: "mapserver"
  });

  const strt2_source = new TileWMS({
    url:
      base_URL + "cgi-bin/mapserv.fcgi?map=/var/www/geodb/mapfiles/strt_2.map",
    params: {
      ws: defaultWatershed,
      LAYERS: "Strt"
    },
    serverType: "mapserver"
  });

  const strt3_source = new TileWMS({
    url:
      base_URL + "cgi-bin/mapserv.fcgi?map=/var/www/geodb/mapfiles/strt_3.map",
    params: {
      ws: defaultWatershed,
      LAYERS: "Strt"
    },
    serverType: "mapserver"
  });

  const tkness1_source = new TileWMS({
    url:
      base_URL + "cgi-bin/mapserv.fcgi?map=/var/www/geodb/mapfiles/tkness_1.map",
    params: {
      ws: defaultWatershed,
      LAYERS: "Tkness"
    },
    serverType: "mapserver"
  });

  const tkness2_source = new TileWMS({
    url:
      base_URL + "cgi-bin/mapserv.fcgi?map=/var/www/geodb/mapfiles/tkness_2.map",
    params: {
      ws: defaultWatershed,
      LAYERS: "Tkness"
    },
    serverType: "mapserver"
  });

  const tkness3_source = new TileWMS({
    url:
      base_URL + "cgi-bin/mapserv.fcgi?map=/var/www/geodb/mapfiles/tkness_3.map",
    params: {
      ws: defaultWatershed,
      LAYERS: "Tkness"
    },
    serverType: "mapserver"
  });

  const totalTkness_source = new TileWMS({
    url:
      base_URL + "cgi-bin/mapserv.fcgi?map=/var/www/geodb/mapfiles/tkness_sum.map",
    params: {
      ws: defaultWatershed,
      LAYERS: "TknessSum"
    },
    serverType: "mapserver"
  });

  const vcont1_source = new TileWMS({
    url:
      base_URL + "cgi-bin/mapserv.fcgi?map=/var/www/geodb/mapfiles/vcont_1.map",
    params: {
      ws: defaultWatershed,
      LAYERS: "Vcont"
    },
    serverType: "mapserver"
  });

  const vcont2_source = new TileWMS({
    url:
      base_URL + "cgi-bin/mapserv.fcgi?map=/var/www/geodb/mapfiles/vcont_2.map",
    params: {
      ws: defaultWatershed,
      LAYERS: "Vcont"
    },
    serverType: "mapserver"
  });

  top.setSource(top_source);
  top.getSource().updateParams({ time: Date.now() });
  top.changed();

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

  strt[0].setSource(strt1_source);
  strt[0].getSource().updateParams({ time: Date.now() });
  strt[0].changed();
  strt[1].setSource(strt2_source);
  strt[1].getSource().updateParams({ time: Date.now() });
  strt[1].changed();
  strt[2].setSource(strt3_source);
  strt[2].getSource().updateParams({ time: Date.now() });
  strt[2].changed();

  tkness[0].setSource(tkness1_source);
  tkness[0].getSource().updateParams({ time: Date.now() });
  tkness[0].changed();
  tkness[1].setSource(tkness2_source);
  tkness[1].getSource().updateParams({ time: Date.now() });
  tkness[1].changed();
  tkness[2].setSource(tkness3_source);
  tkness[2].getSource().updateParams({ time: Date.now() });
  tkness[2].changed();

  total_tkness.setSource(totalTkness_source);
  total_tkness.getSource().updateParams({ time: Date.now() });
  total_tkness.changed();

  vcont[0].setSource(vcont1_source);
  vcont[0].getSource().updateParams({ time: Date.now() });
  vcont[0].changed();
  vcont[1].setSource(vcont2_source);
  vcont[1].getSource().updateParams({ time: Date.now() });
  vcont[1].changed();

  const view = new View({
    projection: "EPSG:4326",
    center: center,
    zoom: zoom
  });

  const osm = new TileLayer({ source: new OSM() });

  const map = new OlMap({
    controls: [],
    target: null,
    layers: [osm, vcont[0], vcont[1], total_tkness, tkness[2], tkness[1], tkness[0], strt[2], strt[1], strt[0], sf1[2], sf1[1], sf1[0], hy[2], hy[1], hy[0], botm[2], botm[1], botm[0], top],
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

    odb.post("geom/", {
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
    domtoimage.toPng(document.getElementById('scatter-plot'))
    .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        setScatterImage(img.src);
    })
    .catch(function (error) {
        console.error('oops, something went wrong when generate ScatterPlot image!', error);
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

      <CardPlot plotsAreHidden={plotsAreHidden}
        scatterplot={
          <Scatterplot 
            key="scatterplot" 
            defaultWatershed={defaultWatershed}
          /> 
        }
        barplot={
          <Barplot
            key={"barplot"}
            defaultWatershed={defaultWatershed}
          />
        }
      />

      <Footer key="footer" map={map} />

      <CardReport reportIsHidden={reportIsHidden}
        report={
          <Report 
            key="report" 
            params={{
              defaultWatershed,
              scatterImage,
              barImage
            }}
          />
        }
      />

    </MapContainer>
  );
};

export default DrainageMap;
