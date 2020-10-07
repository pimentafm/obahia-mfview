import React, { useState, useEffect } from 'react';
import PlotlyChart from 'react-plotlyjs-ts';

import { oba } from '../../../services';

import { useTranslation } from 'react-i18next';

interface BarPlotData {
  data: Object;
}

interface BarplotProps {
  watershed: string;
  ydtick: number;
}

const Barplot: React.FC<BarplotProps> = ({ ydtick, watershed }) => {
  const { t } = useTranslation();

  const [balanceIn, setBalanceIn] = useState<number[]>([]);
  const [balanceOut, setBalanceOut] = useState<number[]>([]);

  const [xaxis, setXAxis] = useState([
    t('label_storage'),
    t('label_constant_head'),
    t('label_wells'),
    t('label_drains'),
    t('label_leakage'),
    t('label_recharge'),
    t('label_total'),
  ]);

  useEffect(() => {
    oba
      .post('balance/', {
        gcc: watershed,
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(response => {
        let data = response.data.map((j: BarPlotData) => Object.values(j));

        setBalanceIn(data[0].slice(2));
        setBalanceOut(data[1].slice(2));
      })
      .catch(e => {
        throw new Error('Do not load Barplot data');
      });

    setXAxis([
      t('label_storage'),
      t('label_constant_head'),
      t('label_wells'),
      t('label_drains'),
      t('label_leakage'),
      t('label_recharge'),
      t('label_total'),
    ]);
  }, [watershed, t]);

  const data = [
    {
      x: xaxis,
      y: balanceIn,
      name: 'IN',
      type: 'bar',
      hovertemplate: `%{y:.2f} x 10<sup>6</sup> m<sup>3</sup>/${t(
        'label_year',
      )}<extra></extra>`,
      marker: { color: '#0000ff' },
    },
    {
      x: xaxis,
      y: balanceOut,
      name: 'OUT',
      type: 'bar',
      hovertemplate: `%{y:.2f} x 10<sup>6</sup> m<sup>3</sup>/${t(
        'label_year',
      )}<extra></extra>`,
      marker: { color: '#ff0000' },
    },
  ];

  const layout = {
    title: {
      font: {
        family: 'Arial, sans-serif',
        size: 14,
      },
    },
    height: 150,
    xaxis: {
      titlefont: {
        family: 'Arial, sans-serif',
        size: 12,
        color: '#000',
      },
      tickfont: {
        family: 'Arial, sans-serif',
        size: 12,
        color: 'black',
      },
      autotick: false,
      showticklabels: false,
      ticks: 'outside',
      tickcolor: '#000',
    },
    yaxis: {
      title: {
        text: t('label_plot_yaxis'),
      },
      titlefont: {
        family: 'Arial, sans-serif',
        size: 12,
        color: '#000',
      },
      tickfont: {
        family: 'Arial, sans-serif',
        size: 12,
        color: 'black',
      },

      autotick: false,
      ticks: 'outside',
      tick0: 0,
      dtick: ydtick,
      ticklen: 6,
      tickwidth: 1,
      tickcolor: '#000',
    },
    showlegend: false,
    margin: { l: 60, r: 10, t: 0, b: 50 },
    transition: {
      duration: 1000,
      easing: 'quad-in-out',
      ordering: 'traces first',
    },
  };

  const config = {
    responsive: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['zoom2d', 'select2d', 'lasso2d'],
  };

  return <PlotlyChart data={data} layout={layout} config={config} />;
};

export default Barplot;
