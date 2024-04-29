import { Component } from '@angular/core';
import { InstructorService } from 'src/app/instructor.service';
import { ActivatedRoute } from '@angular/router';
import { ChartType } from 'chart.js';
@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './instructor-dashboard.component.html',
  styleUrls: ['./instructor-dashboard.component.css']
})
export class InstructorDashboardComponent {
  public pieChartType: ChartType = 'pie';
  public barChartType: ChartType = 'bar';
  pieChartData:any
constructor(public _instructorService:InstructorService ,  private route: ActivatedRoute){}
ngOnInit(){
  this._instructorService.GetSectionByINSTRUCTORID();

  setTimeout(
    ()=>{
      let arr:any=[this._instructorService.studentCounts]
      let catarr =["Section1" , "section2" , "section3"]
      this.pieChartData ={
        labels:catarr,
        datasets:[
          {data:arr,
          backgroundColor: ["#797EF6", "#1AA7EC" ,],
          barThickness: 220,
        },
        ],

      };
    },1000);
}

}
