import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

import odb from "~/services/obahiadb";

import { PlotContainer } from "./styles";

const Barplot = props => {
  const [balanceIn, setBalanceIn] = useState([]);
  const [balanceOut, setBalanceOut] = useState([]);
  const [xaxis] = useState(["Armazenamento", "Carga", "Poços", "Drenagens", "Descarga", "Recarga", "Total"]);

  useEffect(() => {
    odb
      .post("balance/", {
        gcc: props.defaultWatershed,
        table_name: "landuse",
        headers: {
          "Content-type": "application/json"
        }
      })
      .then(response => {
        const data = response.data;
        //const data = response.data;
        setBalanceIn(Object.values(data[0]).slice(2));
        setBalanceOut(Object.values(data[1]).slice(2));
      })
      .catch(e => {
        this.errors.push(e);
      });
  }, [props.defaultWatershed]);
  
  return (
    <PlotContainer id="bar-plot">
      <Plot
        data={[
          {
            x: xaxis,
            y: balanceIn,
            name: "IN",
            type: "bar",
            marker: { color: "#0000ff" }
          },
          {
            x: xaxis,
            y: balanceOut,
            name: "OUT",
            type: "bar",
            marker: { color: "#ff0000" }
          }
        ]}
        layout={{
          title: {
            text:
              "<b>Balanço - Rio " + props.defaultWatershed[0].toUpperCase() + props.defaultWatershed.slice(1) + "</b>",
            font: {
              family: "Arial, sans-serif",
              size: 14
            }
          },
          autosize: false,
          width: 400,
          height: 300,
          xaxis: {
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
            showticklabels: true,
            ticks: "outside",
            tickcolor: "#000"
          },
          yaxis: {
            title: {
              text: "Balanço (10<sup>10</sup> m³)"
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
            tick0: 0,
            dtick: 2,
            ticklen: 8,
            tickwidth: 2,
            tickcolor: "#000"
          },
          showlegend: true,
          margin: { l: 60, r: 10, t: 70, b: 70 }
        }}
        config={{
          displaylogo: false
        }}
      />
    </PlotContainer>
  );
};

export default Barplot;
