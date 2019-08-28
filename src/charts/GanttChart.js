import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated"
import React, {Component} from "react";

export default class GanttChart extends Component {

    componentDidMount() {
        am4core.useTheme(am4themes_animated);

        let chart = am4core.create(this.props.div, am4charts.XYChart);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        chart.paddingRight = 30;
        chart.dateFormatter.inputDateFormat = "YYYY-MM-DD HH:mm:ss";

        let colorSet = new am4core.ColorSet();
        colorSet.saturation = 0.4;

        chart.data = this.props.data

        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = this.props.xAxisName;
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.inversed = true;

        var dateAxis = chart.yAxes.push(new am4charts.DateAxis());
        dateAxis.dateFormatter.dateFormat = "YYYY-MM-DD HH:mm:ss";
        dateAxis.renderer.minGridDistance = 70;
        dateAxis.baseInterval = {count: 1, timeUnit: "seconds"};
        dateAxis.renderer.tooltipLocation = 0;

        var series1 = chart.series.push(new am4charts.ColumnSeries());
        series1.columns.template.width = am4core.percent(80);
        series1.columns.template.tooltipText = "{openDateY} - {dateY}";

        series1.dataFields.openDateY = this.props.yOpenDate
        series1.dataFields.dateY = this.props.yCloseDate
        series1.dataFields.categoryX = this.props.xAxisName

        series1.columns.template.strokeOpacity = 1;
        series1.columns.template.adapter.add("fill", function (fill, target) {
            return chart.colors.getIndex(target.dataItem.index);
        });

        chart.scrollbarY = new am4core.Scrollbar()
        chart.scrollbarX = new am4core.Scrollbar()

        this.chart = chart
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