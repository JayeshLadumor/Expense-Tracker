import { Component, OnInit, AfterViewInit, NgModule, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { New1Service } from '../services/new1.service';
import { ChartsModule } from 'ng2-charts';
import Chart from 'chart.js';

@NgModule({
  imports: [ChartsModule]
})

@Component({
  selector: 'app-doughnut-chart-demo',
  templateUrl: './doughnut-chart-demo.component.html',
  styleUrls: ['./doughnut-chart-demo.component.css']
})
export class DoughnutChartDemoComponent {

  amount_array: Array<number>;
  category_array: Array<string>;

  @ViewChild('abc') abc: ElementRef;

  constructor(
    private elRef:ElementRef,
    private authService: AuthService,
    private new1Service:New1Service
  ) {
    this.amount_array = new1Service.amount_array;
    this.category_array = new1Service.category_array;
    console.log(this.amount_array);
  }

  ngOnInit(){
    let ctx = this.abc.nativeElement;
    let myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.category_array,
        datasets: [{
          label: '# of Votes',
          data: this.amount_array,
          backgroundColor: [
            '#09ABF5', '#F50994', '#09F546', '#F59F09', '#F5EA09', '#09F5E0', '#0954F5', '#9109F5', '#F50909', '#46990A', '#0BA773', '#D981AE'
          ],
          borderColor: [
            '#09ABF5', '#F50994', '#09F546', '#F59F09', '#F5EA09', '#09F5E0', '#0954F5', '#9109F5', '#F50909', '#46990A', '#0BA773', '#D981AE'
          ],
          borderWidth: 0
        }]
      },
      options: {
        segmentShowStroke: false,
        legend: {
              display: true,
              labels: {
                    fontColor: 'white',
                    boxWidth: 10,
                    padding: 0
              },
              position: 'right'
        },
        elements: {
          center: {
            text: 'Category',
            color: '#36A2EB', //Default black
            fontStyle: 'Helvetica', //Default Arial
            sidePadding: 15 //Default 20 (as a percentage)
          }
        }
      }
    });

  }
}
