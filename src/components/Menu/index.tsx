import React, { useState, useEffect, useCallback } from 'react';

import HtmlParser from 'react-html-parser';

import { Modal, Popover, Button } from 'antd';

import OlMap from 'ol/Map';

import 'antd/dist/antd.css';
import { FiMenu } from 'react-icons/fi';
import { FaInfoCircle } from 'react-icons/fa';
import { GoAlert } from 'react-icons/go';

import ToolsMenu from './ToolsMenu';
import ZoomControl from './ZoomControl';
import Scalebar from './ScaleBar';

import StaticLayerSwitcher from '../StaticLayerSwitcher';
import LayerSwitcher from '../LayerSwitcher';

import { Container, Header, Footer, Content } from './styles';

interface MenuProps {
  ishidden: number;
  map: OlMap;
}

const Menu: React.FC<MenuProps> = ({ ishidden, map, ...rest }) => {
  const [hidden, setHidden] = useState(ishidden);
  const [termsOfUseModal, setTermsOfUseModal] = useState<boolean>(false);
  const [metadataModal, setMetadataModal] = useState<boolean>(false);

  const [downloadURL, setDownloadURL] = useState('');

  const termsOfUse = HtmlParser(
    `<span style="color: #1f5582; font-weight: 600; font-size: 16px;">OBahia</span><span> Visualizador do Modelo de Águas Subterrâneas - MODFLOW - Termos de uso</span>`,
  );

  const additionalInformation = HtmlParser(
    `<span style="color: #1f5582; font-weight: 600; font-size: 16px;">OBahia</span><span> Visualizador do Modelo de Águas Subterrâneas - MODFLOW - Informações adicionais</span>`,
  );

  const showTermsOfUseModal = () => {
    setTermsOfUseModal(true);
  };

  const showMetadataModal = () => {
    setMetadataModal(true);
  };

  const handleOk = () => {
    setTermsOfUseModal(false);
    setMetadataModal(false);
  };

  const handleCancel = () => {
    setTermsOfUseModal(false);
    setMetadataModal(false);
  };

  const handleMenu = useCallback(() => {
    if (hidden === 0) {
      setHidden(1);
    } else {
      setHidden(0);
    }
  }, [hidden]);

  const handleLayerVisibility = useCallback(
    (e, id) => {
      const lyr_name = id; //obj.target.name;

      map.getLayers().forEach(lyr => {
        if (lyr.get('name') === lyr_name) {
          lyr.setVisible(e);
        }
      });
    },
    [map],
  );

  const handleLayerOpacity = useCallback(
    (opacity, lyr_name) => {
      map.getLayers().forEach(lyr => {
        if (lyr.get('name') === lyr_name) {
          lyr.setOpacity(opacity);
        }
      });
    },
    [map],
  );

  useEffect(() => {
    setDownloadURL(`ftp://obahia.dea.ufv.br/landuse/`);
  }, []);

  return (
    <Container id="menu" ishidden={hidden}>
      <ToolsMenu ishidden={hidden} />
      <ZoomControl ishidden={hidden} map={map} />
      <Scalebar id="scalebar" map={map} />

      <Header ishidden={hidden}>
        <a href="http://obahia.dea.ufv.br">
          <img
            src="http://obahia.dea.ufv.br/static/geonode/img/logo.png"
            alt="Obahia"
          />
        </a>

        <Popover placement="right" content="Esconde/Mostra menu">
          <FiMenu
            id="handleMenu"
            type="menu"
            className="nav_icon"
            style={{ fontSize: '20px', color: '#000' }}
            onClick={handleMenu}
          />
        </Popover>
      </Header>

      <Content>
        <div className="card-menu">
          <span>Visualizador do Modelo de Águas Subterrâneas</span>
        </div>

        <div className="static-layers">
          <span className="span-text">
            <label>Descrição:</label> Esta ferramenta permite a visualização
            customizada do modelo de águas subterrâneas paras as bacias do Alto
            Rio Grande, Rio Corrente e Rio Carinhanha. Maiores informações sobre
            o modelo de fluxo desenvolvido com a utilização do modelo{' '}
            <Popover
              placement="right"
              content="MODFLOW 2005: USGS Three-Dimensional Finite-Difference Ground-Water Model"
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.usgs.gov/software/modflow-2005-usgs-three-dimensional-finite-difference-ground-water-model"
              >
                {' '}
                MODFLOW{' '}
              </a>
            </Popover>
            pode ser encontradas em{' '}
            <FaInfoCircle
              className="text-icon"
              style={{ fontSize: '12px', color: '#1f5582', cursor: 'pointer' }}
              onClick={showMetadataModal}
            />
            . O uso dessas informações implica no aceite dos termos de uso
            especificados em{' '}
            <GoAlert
              className="text-icon"
              style={{ fontSize: '12px', color: '#1f5582', cursor: 'pointer' }}
              onClick={showTermsOfUseModal}
            />
            .
          </span>
        </div>

        <LayerSwitcher
          name="elevation"
          label="Elevação"
          handleLayerOpacity={handleLayerOpacity}
          handleLayerVisibility={handleLayerVisibility}
          layerIsVisible={true}
          legendIsVisible={true}
          layerInfoIsVisible={true}
          switchColor="#1f5582"
          downloadURL={downloadURL}
        />

        <LayerSwitcher
          name="thickness"
          label="Espessura"
          handleLayerOpacity={handleLayerOpacity}
          handleLayerVisibility={handleLayerVisibility}
          layerIsVisible={false}
          legendIsVisible={true}
          layerInfoIsVisible={true}
          switchColor="#1f5582"
          downloadURL={downloadURL}
        />

        <LayerSwitcher
          name="head"
          label="Carga"
          handleLayerOpacity={handleLayerOpacity}
          handleLayerVisibility={handleLayerVisibility}
          layerIsVisible={false}
          legendIsVisible={true}
          layerInfoIsVisible={true}
          switchColor="#1f5582"
          downloadURL={downloadURL}
        />
        

        <div className="static-layers">
          <StaticLayerSwitcher
            name="hidrography"
            label="Hidrografia"
            handleLayerVisibility={handleLayerVisibility}
            layerIsVisible={false}
            legendIsVisible={false}
            layerInfoIsVisible={false}
            switchColor="#0000ff"
          />
          <StaticLayerSwitcher
            name="highways"
            label="Rodovias"
            handleLayerVisibility={handleLayerVisibility}
            layerIsVisible={false}
            legendIsVisible={false}
            layerInfoIsVisible={false}
            switchColor="#800000"
          />

          <StaticLayerSwitcher
            name="counties"
            label="Municípios"
            handleLayerVisibility={handleLayerVisibility}
            layerIsVisible={false}
            legendIsVisible={false}
            layerInfoIsVisible={false}
            switchColor="#696969"
          />

          <StaticLayerSwitcher
            name="watersheds"
            label="Bacias hidrográficas"
            handleLayerVisibility={handleLayerVisibility}
            layerIsVisible={true}
            legendIsVisible={false}
            layerInfoIsVisible={false}
            switchColor="#000000"
          />

          <StaticLayerSwitcher
            name="urucuia"
            label="Aquifero Urucuia"
            handleLayerVisibility={handleLayerVisibility}
            layerIsVisible={true}
            legendIsVisible={false}
            layerInfoIsVisible={false}
            switchColor="#d1ddee"
          /> 


        </div>
        <div className="final-space"></div>
      </Content>

      <Footer ishidden={hidden}>
        <Popover placement="right" content="Termos de uso">
          <GoAlert
            className="footer_icon"
            style={{ fontSize: '20px', color: '#fff', cursor: 'pointer' }}
            onClick={showTermsOfUseModal}
          />
        </Popover>
        <Popover placement="right" content="Informações adicionais">
          <FaInfoCircle
            className="footer_icon"
            style={{ fontSize: '20px', color: '#fff', cursor: 'pointer' }}
            onClick={showMetadataModal}
          />
        </Popover>
      </Footer>

      <Modal
        title={termsOfUse}
        style={{ top: 20 }}
        visible={termsOfUseModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            style={{
              background: '#1f5582',
              color: '#fff',
              borderColor: '#fff',
            }}
            onClick={handleOk}
          >
            Continue
          </Button>,
        ]}
      >
        <p style={{ textAlign: 'justify' }}>
        O usuário assume todo o risco relacionado ao uso de informações nas páginas Web desta plataforma. A UFV fornece essas informações da maneira como estão apresentadas, e a UFV se isenta de todas e quaisquer garantias, expressas ou implícitas, incluindo (mas não se limitando a) quaisquer garantias implícitas de adequação a uma finalidade específica. Em nenhum caso a UFV será responsável perante usuários ou terceiros por quaisquer danos diretos, indiretos, incidentais, conseqüenciais, especiais ou perda de lucro resultante de qualquer uso ou uso indevido desses dados.
        </p>
      </Modal>

      <Modal
        title={additionalInformation}
        width={800}
        style={{ top: 20 }}
        visible={metadataModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            style={{
              background: '#1f5582',
              color: '#fff',
              borderColor: '#fff',
            }}
            onClick={handleOk}
          >
            Continue
          </Button>,
        ]}
      >
        <p style={{ textAlign: 'justify' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam quis
          magni cum accusamus nisi eligendi accusantium alias. Nobis ipsum eius
          amet, asperiores magnam non! Ipsum ab officia quas perferendis nisi!
        </p>
        <p style={{ textAlign: 'justify' }}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur
          consequuntur unde, iusto consequatur earum veniam! Minus sed eligendi
          consequatur earum temporibus cupiditate nam. Modi mollitia dolore non
          magni velit obcaecati!
        </p>
      </Modal>
    </Container>
  );
};

export default Menu;
