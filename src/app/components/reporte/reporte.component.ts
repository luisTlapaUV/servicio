import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  conversion:any;
  rta:Array<any>= [];
  //rta:Array<any>= [];
  data:Array<any>= [''];
  public lis:any =[]



  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://10.30.3.248:9006/v1/cita/getCountCitas?porEstatus=false')
      .subscribe(date=> {
        this.conversion=date;
        //this.rta1= this.conversion.data;
        this.rta= this.conversion;
        this.lis = this.rta

        //this.das = this.conversion.data;
        //console.log(this.conversion);
        console.log(this.rta);
      });

  }

}
