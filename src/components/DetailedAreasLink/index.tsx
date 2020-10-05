import React from 'react';

import 'antd/dist/antd.css';

import { Container } from './styles';

import { useTranslation } from 'react-i18next';

const DetailedAreasLink: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Container id="layerswitcher">
      <label>{t('label_zone_title')}</label>
      <div className="layer-div">
        <a
          href="http://obahia.dea.ufv.br/landuse"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('label_zone_1')}
        </a>
        <a
          href="http://obahia.dea.ufv.br/landuse"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('label_zone_2')}
        </a>
        <a
          href="http://obahia.dea.ufv.br/landuse"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('label_zone_3')}
        </a>
      </div>
    </Container>
  );
};

export default DetailedAreasLink;
