import React, { useState, useEffect, useCallback } from 'react';

import Collapsible from 'react-collapsible';

import HtmlParser from 'react-html-parser';

import { Modal, Popover, Button } from 'antd';

import OlMap from 'ol/Map';

import 'antd/dist/antd.css';
import { FiMenu } from 'react-icons/fi';
import { FaInfoCircle } from 'react-icons/fa';
import { GoAlert } from 'react-icons/go';

import ChangeLanguage from './ChangeLanguage';

import ToolsMenu from './ToolsMenu';
import ZoomControl from './ZoomControl';
import Scalebar from './ScaleBar';

import StaticLayerSwitcher from '../StaticLayerSwitcher';
import LayerSwitcher from '../LayerSwitcher';

import { Container, Header, Footer, Content } from './styles';

import { useTranslation } from 'react-i18next';

import SAUGeral from '../../assets/images/SAU_Geral.png';
import SAUBacias from '../../assets/images/SAU_Bacias.png';

interface MenuProps {
  ishidden: number;
  map: OlMap;
}

const Menu: React.FC<MenuProps> = ({ ishidden, map, ...rest }) => {
  const { t } = useTranslation();
  document.title = t('appname');

  const [hidden, setHidden] = useState(ishidden);
  const [termsOfUseModal, setTermsOfUseModal] = useState<boolean>(false);
  const [metadataModal, setMetadataModal] = useState<boolean>(false);

  const [downloadURL, setDownloadURL] = useState('');

  const [elevVisibleM, setElevVisibleM] = useState(false);
  const [thickVisibleM, setThickVisibleM] = useState(false);
  const [headVisibleM, setHeadVisibleM] = useState(false);

  const [elevVisibleG, setElevVisibleG] = useState(true);
  const [thickVisibleG, setThickVisibleG] = useState(false);
  const [headVisibleG, setHeadVisibleG] = useState(false);

  const [elevVisibleC, setElevVisibleC] = useState(false);
  const [thickVisibleC, setThickVisibleC] = useState(false);
  const [headVisibleC, setHeadVisibleC] = useState(false);

  const termsOfUse = HtmlParser(
    `<span style="color: #1f5582; font-weight: 600; font-size: 16px;">OBahia</span><span> ${t(
      'modal_terms_title',
    )}</span>`,
  );

  const additionalInformation = HtmlParser(
    `<span style="color: #1f5582; font-weight: 600; font-size: 16px;">OBahia</span><span> ${t(
      'modal_info_title',
    )}</span>`,
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
      const lyr_name = id;
      if (lyr_name === 'mediogrande_elevation') {
        setElevVisibleM(e);
        setThickVisibleM(!e);
        setHeadVisibleM(!e);
      }

      if (lyr_name === 'mediogrande_thickness') {
        setElevVisibleM(!e);
        setThickVisibleM(e);
        setHeadVisibleM(!e);
      }

      if (lyr_name === 'mediogrande_head') {
        setElevVisibleM(!e);
        setThickVisibleM(!e);
        setHeadVisibleM(e);
      }

      if (lyr_name === 'altogrande_elevation') {
        setElevVisibleG(e);
        setThickVisibleG(!e);
        setHeadVisibleG(!e);
      }

      if (lyr_name === 'altogrande_thickness') {
        setElevVisibleG(!e);
        setThickVisibleG(e);
        setHeadVisibleG(!e);
      }

      if (lyr_name === 'altogrande_head') {
        setElevVisibleG(!e);
        setThickVisibleG(!e);
        setHeadVisibleG(e);
      }

      if (lyr_name === 'corrente_elevation') {
        setElevVisibleC(e);
        setThickVisibleC(!e);
        setHeadVisibleC(!e);
      }

      if (lyr_name === 'corrente_thickness') {
        setElevVisibleC(!e);
        setThickVisibleC(e);
        setHeadVisibleC(!e);
      }

      if (lyr_name === 'corrente_head') {
        setElevVisibleC(!e);
        setThickVisibleC(!e);
        setHeadVisibleC(e);
      }

      map.getLayers().forEach(lyr => {
        if (lyr.getClassName() !== 'ol-layer') {
          if (lyr.get('name') === lyr_name) {
            lyr.setVisible(e);
          } else if (lyr.getClassName() === `${lyr_name.split('_')[0]}-layer`) {
            lyr.setVisible(!e);
          }
        }
      });
    },
    [map],
  );

  const handleStaticLayerVisibility = useCallback(
    (e, id) => {
      const lyr_name = id;

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
    setDownloadURL(`ftp://obahia.dea.ufv.br/modflow/shapefiles/`);
  }, []);

  return (
    <Container id="menu" ishidden={hidden}>
      <ChangeLanguage ishidden={hidden} />
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

        <Popover placement="right" content={t('tooltip_menu')}>
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
          <span>{t('appname')}</span>
        </div>

        <div className="static-layers">
          <span className="span-text">
            <label>{t('description_title')}</label> {t('description_start')}{' '}
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
            {t('description_end')}{' '}
            <FaInfoCircle
              className="text-icon"
              style={{ fontSize: '12px', color: '#1f5582', cursor: 'pointer' }}
              onClick={showMetadataModal}
            />
            . {t('description_terms')}{' '}
            <GoAlert
              className="text-icon"
              style={{ fontSize: '12px', color: '#1f5582', cursor: 'pointer' }}
              onClick={showTermsOfUseModal}
            />
            .
          </span>
        </div>

        <Collapsible tabIndex={1} open={false} trigger="Médio Rio Grande">
          <LayerSwitcher
            mapfile="mediogrande_elevation"
            name="mediogrande_elevation"
            label={t('label_elevation')}
            handleLayerOpacity={handleLayerOpacity}
            handleLayerVisibility={handleLayerVisibility}
            layerIsVisible={elevVisibleM}
            legendIsVisible={true}
            layerInfoIsVisible={false}
            switchColor="#1f5582"
            downloadURL={downloadURL + 'mediogrande.zip'}
          />

          <LayerSwitcher
            mapfile="mediogrande_thickness"
            name="mediogrande_thickness"
            label={t('label_thickness')}
            handleLayerOpacity={handleLayerOpacity}
            handleLayerVisibility={handleLayerVisibility}
            layerIsVisible={thickVisibleM}
            legendIsVisible={true}
            layerInfoIsVisible={false}
            switchColor="#1f5582"
            downloadURL={downloadURL + 'mediogrande.zip'}
          />

          <LayerSwitcher
            mapfile="mediogrande_head"
            name="mediogrande_head"
            label={t('label_head')}
            handleLayerOpacity={handleLayerOpacity}
            handleLayerVisibility={handleLayerVisibility}
            layerIsVisible={headVisibleM}
            legendIsVisible={false}
            layerInfoIsVisible={true}
            switchColor="#1f5582"
            downloadURL={downloadURL + 'mediogrande.zip'}
          />
        </Collapsible>

        <Collapsible tabIndex={0} open={true} trigger="Alto Rio Grande">
          <LayerSwitcher
            mapfile="altogrande_elevation"
            name="altogrande_elevation"
            label={t('label_elevation')}
            handleLayerOpacity={handleLayerOpacity}
            handleLayerVisibility={handleLayerVisibility}
            layerIsVisible={elevVisibleG}
            legendIsVisible={true}
            layerInfoIsVisible={false}
            switchColor="#1f5582"
            downloadURL={downloadURL + 'altogrande.zip'}
          />

          <LayerSwitcher
            mapfile="altogrande_thickness"
            name="altogrande_thickness"
            label={t('label_thickness')}
            handleLayerOpacity={handleLayerOpacity}
            handleLayerVisibility={handleLayerVisibility}
            layerIsVisible={thickVisibleG}
            legendIsVisible={true}
            layerInfoIsVisible={false}
            switchColor="#1f5582"
            downloadURL={downloadURL + 'altogrande.zip'}
          />

          <LayerSwitcher
            mapfile="altogrande_head"
            name="altogrande_head"
            label={t('label_head')}
            handleLayerOpacity={handleLayerOpacity}
            handleLayerVisibility={handleLayerVisibility}
            layerIsVisible={headVisibleG}
            legendIsVisible={true}
            layerInfoIsVisible={true}
            switchColor="#1f5582"
            downloadURL={downloadURL + 'altogrande.zip'}
          />
        </Collapsible>

        <Collapsible tabIndex={2} open={false} trigger="Rio Corrente">
          <LayerSwitcher
            mapfile="corrente_elevation"
            name="corrente_elevation"
            label={t('label_elevation')}
            handleLayerOpacity={handleLayerOpacity}
            handleLayerVisibility={handleLayerVisibility}
            layerIsVisible={elevVisibleC}
            legendIsVisible={true}
            layerInfoIsVisible={false}
            switchColor="#1f5582"
            downloadURL={downloadURL + 'corrente.zip'}
          />

          <LayerSwitcher
            mapfile="corrente_thickness"
            name="corrente_thickness"
            label={t('label_thickness')}
            handleLayerOpacity={handleLayerOpacity}
            handleLayerVisibility={handleLayerVisibility}
            layerIsVisible={thickVisibleC}
            legendIsVisible={true}
            layerInfoIsVisible={false}
            switchColor="#1f5582"
            downloadURL={downloadURL + 'corrente.zip'}
          />

          <LayerSwitcher
            mapfile="corrente_head"
            name="corrente_head"
            label={t('label_head')}
            handleLayerOpacity={handleLayerOpacity}
            handleLayerVisibility={handleLayerVisibility}
            layerIsVisible={headVisibleC}
            legendIsVisible={true}
            layerInfoIsVisible={true}
            switchColor="#1f5582"
            downloadURL={downloadURL + 'corrente.zip'}
          />
        </Collapsible>

        {/* <DetailedAreasLink /> */}

        <div className="static-layers">
          <StaticLayerSwitcher
            name="hidrography"
            label={t('label_hidrography')}
            handleLayerVisibility={handleStaticLayerVisibility}
            layerIsVisible={false}
            legendIsVisible={false}
            layerInfoIsVisible={false}
            switchColor="#0000ff"
          />
          <StaticLayerSwitcher
            name="highways"
            label={t('label_highways')}
            handleLayerVisibility={handleStaticLayerVisibility}
            layerIsVisible={false}
            legendIsVisible={false}
            layerInfoIsVisible={false}
            switchColor="#800000"
          />

          <StaticLayerSwitcher
            name="counties"
            label={t('label_counties')}
            handleLayerVisibility={handleStaticLayerVisibility}
            layerIsVisible={false}
            legendIsVisible={false}
            layerInfoIsVisible={false}
            switchColor="#696969"
          />

          <StaticLayerSwitcher
            name="watersheds"
            label={t('label_watersheds')}
            handleLayerVisibility={handleStaticLayerVisibility}
            layerIsVisible={true}
            legendIsVisible={false}
            layerInfoIsVisible={false}
            switchColor="#000000"
          />

          <StaticLayerSwitcher
            name="urucuia"
            label={t('label_urucuia')}
            handleLayerVisibility={handleStaticLayerVisibility}
            layerIsVisible={true}
            legendIsVisible={false}
            layerInfoIsVisible={false}
            switchColor="#f5f5dc"
          />
        </div>
        <div className="final-space"></div>
      </Content>

      <Footer ishidden={hidden}>
        <Popover placement="right" content={t('tooltip_terms')}>
          <GoAlert
            className="footer_icon"
            style={{ fontSize: '20px', color: '#fff', cursor: 'pointer' }}
            onClick={showTermsOfUseModal}
          />
        </Popover>
        <Popover placement="right" content={t('tooltip_info')}>
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
        <p style={{ textAlign: 'justify' }}>{t('terms_of_use')}</p>
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
        <p style={{ textAlign: 'justify' }}>{t('modal_info_paraghaph01')}</p>
        <p style={{ textAlign: 'justify' }}>{t('modal_info_paraghaph02')}</p>

        <img
          style={{
            marginBottom: '10px',
            marginLeft: '25%',
            width: '50%',
          }}
          src={SAUGeral}
          alt="Anomalous accumulation"
        />
        <p style={{ textAlign: 'justify' }}>
          <b>{t('modal_info_figure')} </b>
          {t('modal_info_figure_legend_01')}
        </p>

        <p style={{ textAlign: 'justify' }}>{t('modal_info_paraghaph03')}</p>

        <img
          width="50%"
          style={{
            marginBottom: '10px',
            marginLeft: '25%',
            width: '50%',
          }}
          src={SAUBacias}
          alt="Anomalous accumulation"
        />
        <p style={{ textAlign: 'justify' }}>
          <b>{t('modal_info_figure')} </b>
          {t('modal_info_figure_legend_02')}
        </p>

        <p style={{ textAlign: 'justify' }}>{t('modal_info_paraghaph04')}</p>
        <p style={{ textAlign: 'justify' }}>{t('modal_info_paraghaph05')}</p>
        <p style={{ textAlign: 'justify' }}>{t('modal_info_paraghaph06')}</p>
      </Modal>
    </Container>
  );
};

export default Menu;
