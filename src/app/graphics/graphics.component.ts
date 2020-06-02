import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {
  public gradientStroke;
  public chartColor;
  public canvas: any;
  public ctx;
  public gradientFill;

  public genericChartConfig: any;
  public sleepHoursChartConfig: any;

  public heartRateType;
  public heartRateData: Array<any>;
  public heartRateOptions: any;
  public heartRateLabels: Array<any>;
  public heartRateColors: Array<any>;

  public sleepHoursType;
  public sleepHoursData: Array<any>;
  public sleepHoursOptions: any;
  public sleepHoursLabels: Array<any>;
  public sleepHoursColors: Array<any>;

  public dailyStepsType;
  public dailyStepsData: Array<any>;
  public dailyStepsOptions: any;
  public dailyStepsLabels: Array<any>;
  public dailyStepsColors: Array<any>;

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  public hexToRGB(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    } else {
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
  }
  constructor() { }

  ngOnInit() {
    this.chartColor = '#FFFFFF';

    this.initChartConfiguration();

    this.heartRateChart();
    this.sleepHoursChart();
    this.dailyStepsChart();
  }

  private heartRateChart() {
    this.canvas = document.getElementById('heartRate');
    this.ctx = this.canvas.getContext('2d');

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#80b6f4');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, 'rgba(128, 182, 244, 0)');
    this.gradientFill.addColorStop(1, 'rgba(249, 99, 59, 0.40)');

    this.heartRateData = [
      {
        label: 'Ritmo Cardiaco',
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 2,
        data: [83, 81, 84, 86, 79, 78, 80, 81, 77, 60, 59, 55]
      }
    ];
    this.heartRateColors = [
      {
        borderColor: '#f96332',
        pointBorderColor: '#FFF',
        pointBackgroundColor: '#f96332',
        backgroundColor: this.gradientFill
      }
    ];

    this.heartRateLabels = ['14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00'];
    this.heartRateOptions = this.genericChartConfig;

    this.heartRateType = 'line';
  }

  private sleepHoursChart() {
    this.canvas = document.getElementById('sleepHours');
    this.ctx = this.canvas.getContext('2d');

    const gradientLight = this.ctx.createLinearGradient(0, 170, 0, 50);
    gradientLight.addColorStop(0, 'rgba(128, 182, 244, 0)');
    gradientLight.addColorStop(1, this.hexToRGB('#f0c93a', 0.4));
    const gradientDeep = this.ctx.createLinearGradient(0, 170, 0, 50);
    gradientDeep.addColorStop(0, 'rgba(128, 182, 244, 0)');
    gradientDeep.addColorStop(1, this.hexToRGB('#563680', 0.4));

    this.sleepHoursData = [
      {
        label: 'Sueño ligero',
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 2,
        data: [5, 5.7, 4.3, 6.1, 5.2, 3.6, 5.2, 5.1]
      },
      {
        label: 'Sueño profundo',
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 2,
        data: [1.2, 1.3, 0.6, 0.9, 1.6, 2, 1.8, 1.9]
      },
    ];
    this.sleepHoursColors = [
      {
        borderColor: '#f0c93a',
        pointBorderColor: '#FFF',
        pointBackgroundColor: '#f0c93a',
        backgroundColor: gradientLight
      },
      {
        borderColor: '#563680',
        pointBorderColor: '#FFF',
        pointBackgroundColor: '#563680',
        backgroundColor: gradientDeep
      },
    ];
    this.sleepHoursLabels = ['26 Mayo', '27 Mayo', '28 Mayo', '29 Mayo', '30 Mayo', '31 Mayo', '1 Junio', '2 Junio'];
    this.sleepHoursOptions = this.sleepHoursChartConfig;

    this.sleepHoursType = 'bar';

  }

  private dailyStepsChart() {
    this.canvas = document.getElementById('dailySteps');
    this.ctx = this.canvas.getContext('2d');

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, 'rgba(128, 182, 244, 0)');
    this.gradientFill.addColorStop(1, this.hexToRGB('#2CA8FF', 0.6));


    this.dailyStepsData = [
      {
        label: 'Pasos diarios',
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 1,
        data: [2802, 2954, 5671, 4312, 2812, 2912, 2510, 3254]
      }
    ];
    this.dailyStepsColors = [
      {
        backgroundColor: this.gradientFill,
        borderColor: '#2CA8FF',
        pointBorderColor: '#FFF',
        pointBackgroundColor: '#2CA8FF',
      }
    ];
    this.dailyStepsLabels = ['26 Mayo', '27 Mayo', '28 Mayo', '29 Mayo', '30 Mayo', '31 Mayo', '1 Junio', '2 Junio'];
    this.dailyStepsOptions = this.genericChartConfig;

    this.dailyStepsType = 'bar';
  }

  private initChartConfiguration() {
    this.sleepHoursChartConfig = {
      maintainAspectRatio: false,
      legend: {
        display: true,
        position: 'bottom'
      },
      tooltips: {
        bodySpacing: 4,
        mode: 'nearest',
        intersect: 0,
        position: 'nearest',
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: true,
      scales: {
        yAxes: [{
          gridLines: {
            zeroLineColor: 'transparent',
            drawBorder: false
          }
        }],
        xAxes: [{
          display: true,
          gridLines: {
            zeroLineColor: 'transparent',
            drawTicks: true,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };

    this.genericChartConfig = {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      tooltips: {
        bodySpacing: 4,
        mode: 'nearest',
        intersect: 0,
        position: 'nearest',
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: true,
      scales: {
        yAxes: [{
          gridLines: {
            zeroLineColor: 'transparent',
            drawBorder: false
          }
        }],
        xAxes: [{
          display: true,
          gridLines: {
            zeroLineColor: 'transparent',
            drawTicks: true,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };
  }
}
