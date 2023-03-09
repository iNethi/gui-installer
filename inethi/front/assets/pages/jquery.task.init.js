/**
 * Theme: Dastyle - Responsive Bootstrap 4 Admin Dashboard
 * Author: Mannatthemes
 * Project-task Js
 */


var options = {
  series: [44, 55, 67, 83],
  chart: {
  height: 300,
  type: 'radialBar',
},
plotOptions: {
  radialBar: {
    hollow: {
      margin: 10,
      size: '55%',
      background: 'transparent',  
    },
    dataLabels: {
      name: {
          fontSize: '18px',
      },
      value: {
          fontSize: '16px',
          color: '#50649c',
      },
      total: {
        show: true,
      },      
    },
    track: {
      show: true,
    },
  }
},
colors: ["#7680ff", "#80e6e6", "#7ebcff"],
  stroke: {
    lineCap: 'round'
  },
  series: [71, 63, 100],
  labels: ['Completed', 'Active', 'Assigned'],
  legend: {
    show: true,
    floating: true,
    position: 'left',
    offsetX: -10,
    offsetY: 0,
  },
  legend: {
    show: true,
    position: 'bottom',
  },
  responsive: [{
    breakpoint: 480,
    options: {
        legend: {
            show: true,
            floating: true,
            position: 'left',
            offsetX: 10,
            offsetY: 0,
        }
    }
  }]
};

var chart = new ApexCharts(document.querySelector("#task_status"), options);
chart.render();

