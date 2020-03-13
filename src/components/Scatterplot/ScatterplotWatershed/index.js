import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

import oba from "~/services/api";

import { PlotContainer } from "./styles";

const Scatterplot = props => {
  const [defaultWatershed, setWatershed] = useState([]);
  const [l1_obs, setL1obs] = useState(null);
  const [l1_calc, setL1calc] = useState(null);
  const [l2_obs, setL2obs] = useState(null);
  const [l2_calc, setL2calc] = useState(null);
  const [l3_obs, setL3obs] = useState(null);
  const [l3_calc, setL3calc] = useState(null);

  useEffect(() => {
    oba
      .post("validation/", {
        gcc: props.defaultWatershed,
        table_name: "validation_gcc",
        headers: {
          "Content-type": "application/json"
        }
      })
      .then(response => {
        setWatershed(props.defaultWatershed);

        const data = response.data.filter(f => f.watershed === props.defaultWatershed);

        const layer1_obs = data.filter(f => f.layer === "L1").map(a => a.obs);
        const layer1_calc = data.filter(f => f.layer === "L1").map(a => a.calc);
        setL1obs(layer1_obs);
        setL1calc(layer1_calc);

        const layer2_obs = data.filter(f => f.layer === "L2").map(a => a.obs);
        const layer2_calc = data.filter(f => f.layer === "L2").map(a => a.calc);
        setL2obs(layer2_obs);
        setL2calc(layer2_calc);

        const layer3_obs = data.filter(f => f.layer === "L3").map(a => a.obs);
        const layer3_calc = data.filter(f => f.layer === "L3").map(a => a.calc);
        setL3obs(layer3_obs);
        setL3calc(layer3_calc);

        //setObs(response.data.filter(f => f.watershed === props.defaultWatershed).map(a => a.obs));
        //setCalc(response.data.filter(f => f.watershed === props.defaultWatershed).map(a => a.calc));

      })
      .catch(e => {
        this.errors.push(e);
      });
  }, [props.defaultYear, props.defaultWatershed]);

  return (
    <PlotContainer id="scatter-plot">
      <Plot
        data={[
          {
            x: [620, 650, 710, 740, 770, 800, 830, 860, 890],
            y: [620, 650, 710, 740, 770, 800, 830, 860, 890],
            mode: "lines",
            type: "scatter",
            name: "1:1"
          },
          {
            x: [620, 650, 710, 740, 770, 800, 830, 860, 890],
            y: [660.74565868, 690.74565868, 750.74565868, 780.74565868, 810.74565868, 840.74565868, 870.74565868, 900.74565868, 930.74565868],
            fillcolor: "rgba(255,255,255,0)", 
            fill: "tonexty",
            mode: "none",
            type: "scatter",
            name: "IC 95%",
            showlegend: false
          },
          {
            x: [620, 650, 710, 740, 770, 800, 830, 860, 890],
            y: [586.856476, 616.856476, 676.856476, 706.856476, 736.856476, 766.856476, 796.856476, 826.856476, 856.856476],
            fillcolor: "rgba(150,150,150,0.2)", 
            fill: "tonexty",
            mode: "none",
            type: "scatter",
            name: "IC 95%"
          },
          {
            x: l3_obs,
            y: l3_calc,
            mode: 'markers',
            marker: {
              symbol: 'triangle-up',
              size: 10,
              color: "#065600"
            },
            type: "scatter",
            name: 'L3'
          },
          {
            x: l2_obs,
            y: l2_calc,
            mode: 'markers',
            marker: {
              symbol: 'circle',
              size: 10,
              color: "#0000ff"
            },
            type: "scatter",
            name: 'L2'
          },
          {
            x: l1_obs,
            y: l1_calc,
            mode: 'markers',
            marker: {
              symbol: 'square',
              size: 10,
              color: "#ff0000"
            },
            type: "scatter",
            name: 'L1'
          }
        ]}
        layout={{
          title: {
            text:
              "<b>Intervalo de confiança de 95% - Rio " +
              defaultWatershed +
              "</b>",
            font: {
              family: "Arial, sans-serif",
              size: 14
            }
          },
          autosize: false,
          width: 500,
          height: 500,
          xaxis: {
            title: {
              text: "Carga observada (m)"
            },
            titlefont: {
              family: "Arial, sans-serif",
              size: 12,
              color: "#000"
            },
            tickfont: {
              family: "Arial, sans-serif",
              size: 12,
              color: "black"
            },
            autotick: false,
            ticks: "outside",
            tick0: 620,
            dtick: 30,
            ticklen: 8,
            tickwidth: 2,
            tickcolor: "#000"
          },
          yaxis: {
            title: {
              text: "Carga calculada (m)"
            },
            titlefont: {
              family: "Arial, sans-serif",
              size: 12,
              color: "#000"
            },
            tickfont: {
              family: "Arial, sans-serif",
              size: 12,
              color: "black"
            },
            autotick: false,
            ticks: "outside",
            tick0: 620,
            dtick: 30,
            ticklen: 8,
            tickwidth: 2,
            tickcolor: "#000"
          },
          showlegend: true,
          margin: { l: 60, r: 10, t: 70, b: 50 }
        }}
        config={{
          displaylogo: false
        }}
      />
    </PlotContainer>
  );
};

export default Scatterplot;
