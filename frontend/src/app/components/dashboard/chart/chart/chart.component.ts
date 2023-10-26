import { Component, Input, OnInit } from '@angular/core';
import * as Chart from 'chart.js';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit{
  public chart: any;
  @Input() toDoLength: number = 0
  @Input() inProgressLength: number = 0
  @Input() readyForQALength: number = 0
  @Input() doneLength: number = 0

  constructor(){
    console.log("length to do ",this.toDoLength);
  }
  
 

    pie( ){
     
      
      this.chart = new Chart("MyChart", {
        type: "pie", //this denotes tha type of chart
        data: {// values on X-Axis
          labels: ['To Do', 'In Progress','Ready for QA','Done' ],
           datasets: [{
      label: 'Ticket Chart',
      data: [this.toDoLength,this.inProgressLength,this.readyForQALength,this.doneLength],
      backgroundColor: [
        '#fbd32b',
        '#f79a0e',
        '#8bb1d6',
        '#3ba1d1',
      
      ],
      // hoverOffset: 4
    }],
        },
        options: {
          aspectRatio:2.5,
        }
  
      });
      console.log("chart value",this.chart);
      
    }

    ngOnInit(): void {
      this.pie()
      console.log("length to do ",this.toDoLength);
    }

}
