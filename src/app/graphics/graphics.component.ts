import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { GraphicsService } from '../services/graphics.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/User';
import { Graphic } from '../models/Graphic';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {
  private user: User;

  public heartStatsNull = true;
  public sleepStatsNull = true;
  public stepStatsNull = true;

  public chartConfig: any;
  public optionalChartConfig: any;

  constructor(private graphicService: GraphicsService, private auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.getUserLoggedValue();

    this.initChartConfiguration();

    this.heartRateChart();
    this.sleepHoursChart();
    this.dailyStepsChart();
  }

  private heartRateChart() {

    this.graphicService.getHeartStats(this.user.deviceId).subscribe(result => {
      if (result != null) {
        this.heartStatsNull = false;
        const canvas: any = document.getElementById('heartRate');
        const ctx = canvas.getContext('2d');

        const gradientYbars = ctx.createLinearGradient(0, 170, 0, 50);
        gradientYbars.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradientYbars.addColorStop(1, this.hexToRGB('#8f25c4', 0.5));
        const gradientYLine1 = ctx.createLinearGradient(0, 170, 0, 50);
        gradientYLine1.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradientYLine1.addColorStop(1, this.hexToRGB('#ed3434', 0.5));
        const gradientYLine2 = ctx.createLinearGradient(0, 170, 0, 50);
        gradientYLine2.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradientYLine2.addColorStop(1, this.hexToRGB('#ff9c19', 0.5));

        const heartChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: result.axisX.values,
            datasets: [
              {
                label: result.axisYBars[0].title,
                pointBorderWidth: 2,
                pointHoverRadius: 3,
                pointHoverBorderWidth: 1,
                pointRadius: 3,
                fill: true,
                borderWidth: 2,
                borderColor: '#8f25c4',
                pointBorderColor: '#FFF',
                pointBackgroundColor: '#8f25c4',
                backgroundColor: gradientYbars,
                data: result.axisYBars[0].values.map(function (item) {
                  return parseInt(item, 10);
                })
              },
              {
                label: result.axisYLines[0].title,
                type: 'line',
                pointBorderWidth: 2,
                pointHoverRadius: 3,
                pointHoverBorderWidth: 1,
                pointRadius: 3,
                fill: true,
                borderWidth: 2,
                borderColor: '#ed3434',
                pointBorderColor: '#FFF',
                pointBackgroundColor: '#ed3434',
                backgroundColor: gradientYLine1,
                data: result.axisYLines[0].values.map(function (item) {
                  return parseInt(item, 10);
                })
              },
              {
                label: result.axisYLines[1].title,
                type: 'line',
                pointBorderWidth: 2,
                pointHoverRadius: 3,
                pointHoverBorderWidth: 1,
                pointRadius: 3,
                fill: true,
                borderWidth: 2,
                borderColor: '#ff9c19',
                pointBorderColor: '#FFF',
                pointBackgroundColor: '#ff9c19',
                backgroundColor: gradientYLine2,
                data: result.axisYLines[1].values.map(function (item) {
                  return parseInt(item, 10);
                })
              }
            ]
          },
          options: this.chartConfig
        });

      }
    });

  }

  private sleepHoursChart() {
    this.graphicService.getSleepStats(this.user.deviceId).subscribe(result => {
      if (result != null) {
        this.sleepStatsNull = false;
        const canvas: any = document.getElementById('sleepHours');
        const ctx = canvas.getContext('2d');

        const gradientYbars = ctx.createLinearGradient(0, 170, 0, 50);
        gradientYbars.addColorStop(0, 'rgba(128, 182, 244, 0)');
        gradientYbars.addColorStop(1, this.hexToRGB('#f0c93a', 0.4));
        const gradientYLines = ctx.createLinearGradient(0, 170, 0, 50);
        gradientYLines.addColorStop(0, 'rgba(128, 182, 244, 0)');
        gradientYLines.addColorStop(1, this.hexToRGB('#563680', 0.4));

        const sleepChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: result.axisX.values,
            datasets: [
              {
                label: result.axisYBars[0].title,
                pointBorderWidth: 2,
                pointHoverRadius: 3,
                pointHoverBorderWidth: 1,
                pointRadius: 3,
                fill: true,
                borderWidth: 2,
                borderColor: '#f0c93a',
                pointBorderColor: '#FFF',
                pointBackgroundColor: '#f0c93a',
                backgroundColor: gradientYbars,
                data: result.axisYBars[0].values.map(function (item) {
                  return parseInt(item, 10);
                })
              },
              {
                label: result.axisYLines[0].title,
                type: 'line',
                pointBorderWidth: 2,
                pointHoverRadius: 3,
                pointHoverBorderWidth: 1,
                pointRadius: 3,
                fill: true,
                borderWidth: 2,
                borderColor: '#563680',
                pointBorderColor: '#FFF',
                pointBackgroundColor: '#563680',
                backgroundColor: gradientYLines,
                data: result.axisYLines[0].values.map(function (item) {
                  return parseInt(item, 10);
                })
              }
            ]
          },
          options: this.optionalChartConfig
        });

      }
    });

  }

  private dailyStepsChart() {
    this.graphicService.getStepStats(this.user.deviceId).subscribe(result => {
      if (result != null) {
        this.stepStatsNull = false;
        const canvas: any = document.getElementById('dailySteps');
        const ctx = canvas.getContext('2d');

        const gradientYbars = ctx.createLinearGradient(0, 170, 0, 50);
        gradientYbars.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradientYbars.addColorStop(1, this.hexToRGB('#0398fc', 0.5));

        const stepChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: result.axisX.values,
            datasets: [
              {
                label: result.axisYBars[0].title,
                pointBorderWidth: 2,
                pointHoverRadius: 3,
                pointHoverBorderWidth: 1,
                pointRadius: 3,
                fill: true,
                borderWidth: 2,
                borderColor: '#0398fc',
                pointBorderColor: '#FFF',
                pointBackgroundColor: '#0398fc',
                backgroundColor: gradientYbars,
                data: result.axisYBars[0].values.map(function (item) {
                  return parseInt(item, 10);
                })
              }
            ]
          },
          options: this.optionalChartConfig
        });

      }
    });
  }

  private initChartConfiguration() {
    this.chartConfig = {
      maintainAspectRatio: false,
      legend: {
        display: true,
        position: 'bottom'
      },
      tooltips: {
        bodySpacing: 1,
        mode: 'nearest',
        intersect: 1,
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

    this.optionalChartConfig = {
      maintainAspectRatio: false,
      legend: {
        display: true,
        position: 'bottom'
      },
      tooltips: {
        bodySpacing: 2,
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
}
