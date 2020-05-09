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

      <div id="layer-div">
      <LayerSwitcher
          name="top"
          label="Elevação no topo do modelo"
          checked={true}
          legend={true}
          switcher={() => props.onOffLayers}
        />

        <LayerSwitcher
          name="botm_1"
          label="Elevação na primeira camada"
          checked={false}
          legend={false}
          switcher={() => props.onOffLayers}
        />

        <LayerSwitcher
          name="botm_2"
          label="Elevação na segunda camada"
          checked={false}
          legend={false}
          switcher={() => props.onOffLayers}
        />

        <LayerSwitcher
          name="botm_3"
          label="Elevação na terceira camada"
          checked={false}
          legend={false}
          switcher={() => props.onOffLayers}
        />

        <LayerSwitcher
          name="hy_1"
          label="Condutividade hidŕaulica na 1ª camada"
          checked={false}
          legend={false}
          switcher={() => props.onOffLayers}
        />

        <LayerSwitcher
          name="hy_2"
          label="Condutividade hidŕaulica na 2ª camada"
          checked={false}
          legend={false}
          switcher={() => props.onOffLayers}
        />

        <LayerSwitcher
          name="hy_3"
          label="Condutividade hidŕaulica na 3ª camada"
          checked={false}
          legend={false}
          switcher={() => props.onOffLayers}
        />

        <LayerSwitcher
          name="sf1_1"
          label="Coeficiente de armazenamento primário na 1ª camada"
          checked={false}
          legend={false}
          switcher={() => props.onOffLayers}
        />

        <LayerSwitcher
          name="sf1_2"
          label="Coeficiente de armazenamento primário na 2ª camada"
          checked={false}
          legend={false}
          switcher={() => props.onOffLayers}
        />

        <LayerSwitcher
          name="sf1_3"
          label="Coeficiente de armazenamento primário na 3ª camada"
          checked={false}
          legend={false}
          switcher={() => props.onOffLayers}
        />

        <LayerSwitcher
          name="strt_1"
          label="Carga inicial da 1ª camada"
          checked={false}
          legend={false}
          switcher={() => props.onOffLayers}
        />

        <LayerSwitcher
          name="strt_2"
          label="Carga inicial da 2ª camada"
          checked={false}
          legend={false}
          switcher={() => props.onOffLayers}
        />

        <LayerSwitcher
          name="strt_3"
          label="Carga inicial da 3ª camada"
          checked={false}
          legend={false}
          switcher={() => props.onOffLayers}
        />

        <LayerSwitcher
          name="tkness_1"
          label="Espessura da 1ª camada"
          checked={false}
          legend={false}
          switcher={() => props.onOffLayers}
        />

        <LayerSwitcher
          name="tkness_2"
          label="Espessura da 2ª camada"
          checked={false}
          legend={false}
          switcher={() => props.onOffLayers}
        />

        <LayerSwitcher
          name="tkness_3"
          label="Espessura da 3ª camada"
          checked={false}
          legend={false}
          switcher={() => props.onOffLayers}
        />

        <LayerSwitcher
          name="tkness_sum"
          label="Espessura total"
          checked={false}
          legend={false}
          switcher={() => props.onOffLayers}
        />

        <LayerSwitcher
          name="vcont_1"
          label="Condutância vertical na 1ª camada"
          checked={false}
          legend={false}
          switcher={() => props.onOffLayers}
        />

        <LayerSwitcher
          name="vcont_2"
          label="Condutância vertical na 2ª camada"
          checked={false}
          legend={false}
          switcher={() => props.onOffLayers}
        />
      </div>
      
      <Button id="report-button"
        title="Gera relatório"
        onClick={props.handleReport}
        >Relatorio
      </Button>
    </MenuContainer>
  );
};

export default Menu;
