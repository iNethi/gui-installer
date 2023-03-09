/**
 * Theme: Dastyle - Responsive Bootstrap 4 Admin Dashboard
 * Author: Mannatthemes
 * Analytics Dashboard Js
 */






var options = {
  chart: {
      height: 350,
      type: 'bar',
      toolbar: {
          show: false
      }
  },
  plotOptions: {
      bar: {
          horizontal: false,
          columnWidth: '30%',
      },
  },
  dataLabels: {
      enabled: false
  },
  stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
  },
  colors: ["rgba(42, 118, 244, .18)", '#2a76f4'],
  series: [{
      name: 'New Visitors',
      data: [68, 44, 55, 57, 56, 61, 58, 63, 60, 66, 48, 59]
  }, {
      name: 'Unique Visitors',
      data: [51, 76, 85, 101, 98, 87, 105, 91, 114, 94, 65, 63]
  },],
  xaxis: {
      categories: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisBorder: {
        show: false,
        color: '#bec7e0',
      },  
      axisTicks: {
        show: false,
        color: '#bec7e0',
      },    
  },
  legend: {
    offsetY: 6,
  },
  yaxis: {
      title: {
          text: 'Visitors',
      },
  },
  fill: {
      opacity: 1

  },
  grid: {
      row: {
          colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.2,           
      },
      strokeDashArray: 2.5,
  },
  tooltip: {
      y: {
          formatter: function (val) {
              return "" + val + "k"
          }
      }
  }
}

var chart = new ApexCharts(
  document.querySelector("#ana_dash_1"),
  options
);

chart.render();

var dash_spark_1 = {
    
  chart: {
      type: 'area',
      height: 25,
      sparkline: {
          enabled: true
      },
  },
  stroke: {
      curve: 'smooth',
      width: 1.5,
    },
  fill: {
      opacity: 1,
      gradient: {
        shade: '#2c77f4',
        type: "horizontal",
        shadeIntensity: 0.5,
        inverseColors: true,
        opacityFrom: 0.1,
        opacityTo: 0.1,
        stops: [0, 80, 100],
        colorStops: []
    },
  },
  series: [{
    data: [5, 10, 4, 16, 5, 11, 6, 11, 30, 10, 13, 4, 6, ]
  }],
  yaxis: {
      min: 0
  },
  colors: ['#6374ff'],
  tooltip: {
    enabled: false,
  },
}
new ApexCharts(document.querySelector("#dash_spark_1"), dash_spark_1).render();


var dash_spark_2 = {
    
  chart: {
      type: 'area',
      height: 25,
      sparkline: {
          enabled: true
      },
  },
  stroke: {
      curve: 'smooth',
      width: 1.5,
    },
  fill: {
      opacity: 1,
      gradient: {
        shade: '#fd3c97',
        type: "horizontal",
        shadeIntensity: 0.5,
        inverseColors: true,
        opacityFrom: 0.1,
        opacityTo: 0.1,
        stops: [0, 80, 100],
        colorStops: []
    },
  },
  series: [{
    data: [4, 8, 5, 10, 4, 25, 5, 11, 6, 11, 5, 10, ]
  }],
  yaxis: {
      min: 0
  },
  colors: ['#6374ff'],
  tooltip: {
    enabled: false,
  },
}
new ApexCharts(document.querySelector("#dash_spark_2"), dash_spark_2).render();




var dash_spark_3 = {
    
  chart: {
      type: 'area',
      height: 25,
      sparkline: {
          enabled: true
      },
  },
  stroke: {
      curve: 'smooth',
      width: 1.5,
    },
  fill: {
      opacity: 1,
      gradient: {
        shade: '#2c77f4',
        type: "horizontal",
        shadeIntensity: 0.5,
        inverseColors: true,
        opacityFrom: 0.1,
        opacityTo: 0.1,
        stops: [0, 80, 100],
        colorStops: []
    },
  },
  series: [{
    data: [5, 10, 4, 16, 5, 11, 6, 11, 30, 10, 13, 4, 6, ]
  }],
  yaxis: {
      min: 0
  },
  colors: ['#6374ff'],
  tooltip: {
    enabled: false,
  },
}
new ApexCharts(document.querySelector("#dash_spark_3"), dash_spark_3).render();


var dash_spark_4 = {
    
  chart: {
      type: 'area',
      height: 25,
      sparkline: {
          enabled: true
      },
  },
  stroke: {
      curve: 'smooth',
      width: 1.5,
    },
  fill: {
      opacity: 1,
      gradient: {
        shade: '#fd3c97',
        type: "horizontal",
        shadeIntensity: 0.5,
        inverseColors: true,
        opacityFrom: 0.1,
        opacityTo: 0.1,
        stops: [0, 80, 100],
        colorStops: []
    },
  },
  series: [{
    data: [4, 8, 5, 10, 4, 25, 5, 11, 6, 11, 5, 10, ]
  }],
  yaxis: {
      min: 0
  },
  colors: ['#6374ff'],
  tooltip: {
    enabled: false,
  },
}
new ApexCharts(document.querySelector("#dash_spark_4"), dash_spark_4).render();



var options = {
  series: [76],
  chart: {
  type: 'radialBar',
  offsetY: -20,
  sparkline: {
    enabled: true
  }
},
plotOptions: {
  radialBar: {
    startAngle: -90,
    endAngle: 90,  
    hollow: {
      size: '75%',
      position: 'front',
  },  
    track: {
      background: ["rgba(42, 118, 244, .18)"],
      strokeWidth: '80%',
      opacity: 0.5,
      margin: 5,
    },
    dataLabels: {
      name: {
        show: false
      },
      value: {
        offsetY: -2,
        fontSize: '20px'
      }
    }
  }
},
stroke: {
  lineCap: 'butt'
},
colors: ["#2a76f4"],
grid: {
  padding: {
    top: -10
  }
},

labels: ['Average Results'],
};

var chart = new ApexCharts(document.querySelector("#ana_1"), options);
chart.render();



//Device-widget

 
var options = {
  chart: {
      height: 265,
      type: 'donut',
  }, 
  plotOptions: {
    pie: {
      donut: {
        size: '85%'
      }
    }
  },
  dataLabels: {
    enabled: false,
  },

  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
 
  series: [50, 25, 25,],
  legend: {
    show: true,
    position: 'bottom',
    horizontalAlign: 'center',
    verticalAlign: 'middle',
    floating: false,
    fontSize: '13px',
    offsetX: 0,
    offsetY: 0,
  },
  labels: [ "Mobile","Tablet", "Desktop" ],
  colors: ["#2a76f4","rgba(42, 118, 244, .5)","rgba(42, 118, 244, .18)"],
 
  responsive: [{
      breakpoint: 600,
      options: {
        plotOptions: {
            donut: {
              customScale: 0.2
            }
          },        
          chart: {
              height: 240
          },
          legend: {
              show: false
          },
      }
  }],

  tooltip: {
    y: {
        formatter: function (val) {
            return   val + " %"
        }
    }
  }
  
}

var chart = new ApexCharts(
  document.querySelector("#ana_device"),
  options
);

chart.render();





$('#usa').vectorMap({
  map: 'us_aea_en',
  backgroundColor: 'transparent',
  borderColor: '#818181',
  regionStyle: {
    initial: {
      fill: '#2a76f428',
    }
  },
  series: {
    regions: [{
        values: {
            "US-VA": '#2a76f473',
            "US-PA": '#2a76f473',
            "US-TN": '#2a76f473',
            "US-WY": '#2a76f473',
            "US-WA": '#2a76f473',
            "US-TX": '#2a76f473',
        },
        attribute: 'fill',
    }]
  },
});

