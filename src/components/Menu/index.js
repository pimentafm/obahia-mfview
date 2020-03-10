import React, { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
import { Select, Icon, Button } from "antd";

//import oba from "~/services/api";

import { MenuContainer } from "./styles";
import LayerSwitcher from "~/components/LayerSwitcher";
import Zoom from "~/components/Zoom";

import "antd/dist/antd.css";

const { Option } = Select;

const Menu = props => {
  const [defaultWatershed] = useState(props.defaultWatershed);
  const [defaultCategory] = useState(props.defaultCategory);
  const [watersheds] = useState(["grande", "corrente", "carinhanha"]);
  const [isHidden, setHidden] = useState(props.isHidden);
  const [map] = useState(props.map);

  useEffect(() => {

  },[]);

  const handleMenu = () => {
    if (isHidden === false) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  };

  let watershedsLabel = null;
  let watershedSelect = null;

  if (defaultCategory === "Bacia hidrográfica") {
    watershedsLabel = <label>Bacia hidrográfica</label>;
    watershedSelect = (
      <Select
        id="select"
        defaultValue={defaultWatershed}
        onChange={props.handleWatersheds}
        style={{ color: "#000" }}
      >
        {watersheds.map(c => (
          <Option key={c} value={c} style={{ color: "#000" }}>
            {c}
          </Option>
        ))}
      </Select>
    );
  } else {
    watershedSelect = null;
  }

  return (
    <MenuContainer isHidden={isHidden}>

      <div id="nav" className="nav">  
        <Icon
          id="handleMenu"
          type="menu"
          className="nav_icon"
          style={{ fontSize: "20px" }}
          onClick={() => handleMenu()}
        />
      </div>

      <Zoom key="zoom" isHidden={props.menuIsHidden} map={map} />

      {watershedsLabel}
      {watershedSelect}

      <LayerSwitcher
        name="botm1"
        checked={true}
        legend={true}
        switcher={() => props.onOffLayers}
      />

      <LayerSwitcher
        name="botm2"
        checked={false}
        legend={false}
        switcher={() => props.onOffLayers}
      />

      <LayerSwitcher
        name="botm3"
        checked={false}
        legend={false}
        switcher={() => props.onOffLayers}
      />

      <LayerSwitcher
        name="hy1"
        checked={false}
        legend={false}
        switcher={() => props.onOffLayers}
      />

      <LayerSwitcher
        name="hy2"
        checked={false}
        legend={false}
        switcher={() => props.onOffLayers}
      />

      <LayerSwitcher
        name="hy3"
        checked={false}
        legend={false}
        switcher={() => props.onOffLayers}
      />

      <LayerSwitcher
        name="sf1_1"
        checked={false}
        legend={false}
        switcher={() => props.onOffLayers}
      />

      <LayerSwitcher
        name="sf1_2"
        checked={false}
        legend={false}
        switcher={() => props.onOffLayers}
      />

      <LayerSwitcher
        name="sf1_3"
        checked={false}
        legend={false}
        switcher={() => props.onOffLayers}
      />

      <Button id="report-button"
        title="Gera relatório"
        onClick={props.handleReport}
        >Relatorio
      </Button>
    </MenuContainer>
  );
};

export default Menu;
