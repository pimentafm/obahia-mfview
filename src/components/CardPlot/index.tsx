import React, { useState, useCallback } from 'react';

import { Tooltip } from 'antd';

import { FiMenu } from 'react-icons/fi';

import { Container } from './styles';

import Barplot from './Barplot';
import StackPlot from './StackPlot';

interface CardProps {
  year: number;
}

const CardPlot: React.FC<CardProps> = ({ year }) => {
  const [hidden, setHidden] = useState(0);

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
        <Tooltip placement="leftTop" title="Esconde/Mostra gráficos">
          <FiMenu
            type="menu"
            style={{ fontSize: '20px', color: '#000' }}
            onClick={handleCardPlot}
          />
        </Tooltip>
      </div>

      <label>Cobertura e Início da estação chuvosa (1990 - 2018)</label>
      <StackPlot tableName="onset" />

      <label>Cobertura e Início da estação chuvosa {year}</label>
      <Barplot year={year} tableName="onset" />
    </Container>
  );
};

export default CardPlot;
