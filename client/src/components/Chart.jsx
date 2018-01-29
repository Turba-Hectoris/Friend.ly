import React from 'react';
import c3 from 'c3';
import $ from 'jquery';


class Chart extends React.Component {
  constructor(props) {
    super(props)

  }
  componentDidMount() {
    this._updateChart();
  }
  componentDidUpdate() {
    this._updateChart();
  }
  _updateChart() {
    var $el = $('#chart');

    const chart = c3.generate({
      bindto: '#chart',
      data: {
        // iris data from R
        columns: [
            ['data1', 30],
            ['data2', 120],
        ],
        type : 'pie',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); },
    }
    });
    var height= Number($(".profile_data").css("height").match(/\d+/)[0])
    var width= Number($(".profile_data").css("width").match(/\d+/)[0])

    $(window).on('resize', function() {
    })
  }
  render() {
    return <div id="chart"></div>;    
  }
}

export default Chart;