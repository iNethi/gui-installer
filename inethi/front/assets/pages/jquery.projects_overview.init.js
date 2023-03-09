/**
 * Theme: Dastyle - Responsive Bootstrap 4 Admin Dashboard
 * Author: Mannatthemes
 * Project Dashboard Js
 */


 


var options = {
  chart: {
      height: 360,
      type: 'area',
      stacked: true,
      toolbar: {
        show: false,
        autoSelected: 'zoom'
      },
  },
  colors: ['#2a77f4'],
  dataLabels: {
      enabled: false
  },
  stroke: {
      curve: 'smooth',
      width: [3, 3],
      dashArray: [0, 4],
      lineCap: 'round'
  },
  grid: {
    borderColor: "#45404a2e",
    padding: {
      left: 0,
      right: 0
    },
    strokeDashArray: 3,
  },
  markers: {
    size: 0,
    hover: {
      size: 0
    }
  },
  series: [{
      name: 'Unique Visits',
      data: [45,45,20,20,20,100,100,100,35,35,80,80]
  }],

  xaxis: {
      type: 'month',
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisBorder: {
        show: true,
        color: '#45404a2e',
      },  
      axisTicks: {
        show: true,
        color: '#45404a2e',
      },                  
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0.3,
      stops: [0, 90, 100]
    }
  },
  
  tooltip: {
      x: {
          format: 'dd/MM/yy HH:mm'
      },
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right'
  },
}

var chart = new ApexCharts(
  document.querySelector("#overview"),
  options
);

chart.render();

// Radial

var options = {
  chart: {
    type: 'radialBar',
    height: 260,
    dropShadow: {
      enabled: true,
      top: 5,
      left: 0,
      bottom: 0,
      right: 0,
      blur: 5,
      color: '#45404a2e',
      opacity: 0.35
    },
  },
  plotOptions: {
    radialBar: {
      offsetY: -10,
      startAngle: 0,
      endAngle: 270,
      hollow: {
        margin: 5,
        size: '50%',
        background: 'transparent',  
      },
      track: {
        show: false,
      },
      dataLabels: {
        name: {
            fontSize: '18px',
        },
        value: {
            fontSize: '16px',
            color: '#50649c',
        },
        
      }
    },
  },
  colors: ["#2a76f4","rgba(42, 118, 244, .5)","rgba(42, 118, 244, .18)"],
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
}


var chart = new ApexCharts(
  document.querySelector("#task_status"),
  options
);

chart.render();