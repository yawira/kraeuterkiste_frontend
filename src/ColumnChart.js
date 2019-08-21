import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated"

import React, { Component } from 'react'
import './charts.css'


export default class ColumnChart extends Component {

  componentDidMount() {
    let chart = am4core.create(this.props.div, am4charts.XYChart);


    /* Chart code */
    // Themes begin

    am4core.useTheme(am4themes_animated);

    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = this.props.data;

    let categoryAxis = chart.xAxes.push(new am4charts.DateAxis());
    //categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = this.props.xAxisName;
    categoryAxis.renderer.minGridDistance = 40;
    categoryAxis.fontSize = 11;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.strictMinMax = true;
    valueAxis.renderer.minGridDistance = 30;


    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.dateX = this.props.xAxisName;
    series.dataFields.valueY = this.props.yAxisName;
    series.columns.template.tooltipText = "{valueY.value}";
    series.columns.template.tooltipY = 0;
    series.columns.template.strokeOpacity = 0;

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  componentDidUpdate() {
    this.chart.data = this.props.data
  }

  render() {
    return (
        <div id={this.props.div} style={{width: "100%", height: "500px"}}/>
    );
  }
}