import React, { useState, useCallback } from 'react';

import { Popover } from 'antd';

import { FiMenu } from 'react-icons/fi';

import { Container, Content } from './styles';

import Barplot from './Barplot';

import { useTranslation } from 'react-i18next';

interface CardProps {
  ishidden: number;
}

const CardPlot: React.FC<CardProps> = ({ ishidden }) => {
  const { t } = useTranslation();

  const [hidden, setHidden] = useState(ishidden);

  const handleCardPlot = useCallback(() => {
    if (hidden === 0) {
      setHidden(1);
    } else {
      setHidden(0);
    }
  }, [hidden]);

  return (
    <Container id="cardplot" ishidden={hidden}>
      <div id="handleCardplot">
        <Popover placement="leftTop" content={t('tooltip_menu_plot')}>
          <FiMenu
            type="menu"
            style={{ fontSize: '20px', color: '#000' }}
            onClick={handleCardPlot}
          />
        </Popover>
      </div>

      <Content>
        <label>{` ${t('barplot_title')} - Médio Grande`}</label>
        <Barplot ydtick={15000} watershed="mediogrande" />

        <label>{` ${t('barplot_title')} - Alto Grande`}</label>
        <Barplot ydtick={30000} watershed="grande" />

        <label>{` ${t('barplot_title')} - Corrente`}</label>
        <Barplot ydtick={1000} watershed="corrente" />

        <label>{` ${t('barplot_title')} - Carinhanha`}</label>
        <Barplot ydtick={5000} watershed="carinhanha" />
        <div className="final-space"></div>
      </Content>
    </Container>
  );
};

export default CardPlot;
