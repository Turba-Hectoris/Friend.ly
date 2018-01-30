import React from 'react';
import $ from 'jquery';


class userChart extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.makeGraph();
  }

  makeGraph(){
    var chart = AmCharts.makeChart( "chartdiv", {
      "type": "pie",
      "theme": "light",
      "dataProvider": this.props.catagories,
      "valueField": "value",
      "titleField": "activities",
      "outlineAlpha": 0.4,
      "depth3D": 15,
      "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
      "angle": 30,
      "export": {
        "enabled": false
      }
    });
    console.log(chart);
  }

  render() {
    return(
      <div id="chartdiv"> </div>
    )
  }
}

export default userChart;