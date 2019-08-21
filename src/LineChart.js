import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated"
import React, {Component} from 'react'
import './charts.css'

export default class LineChart extends Component {
    componentDidMount() {
      let chart = am4core.create(this.props.div, am4charts.XYChart);

        am4core.useTheme(am4themes_animated);

        chart.data = this.props.data;

        // Create axes
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 60;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        // Create series
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = this.props.yAxisName;
        series.dataFields.dateX = this.props.xAxisName;
        series.tooltipText = {this.props.xAxisName}

        series.tooltip.pointerOrientation = "vertical";

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.snapToSeries = series;
        chart.cursor.xAxis = dateAxis;

        //chart.scrollbarY = new am4core.Scrollbar();
        chart.scrollbarX = new am4core.Scrollbar();
  
      this.chart = chart;
    }
  
    componentWillUnmount() {
      if (this.chart) {
        this.chart.dispose();
      }
    }

    render() {
        return (
          <div className="lineChart" id={this.props.div}></div>
        );
      }
    }
}