import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
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
  estatus: boolean = false;



  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    //this.http.get(environment.url+'/v1/cita/getCountCitas?porEstatus='+this.estatus)
    //this.http.get(`${environment.url}/v1/cita/getCountCitas?porEstatus=${this.estatus}&fechaInicial=${this.fecha}`)

    this.http.get(`${environment.url}/v1/cita/getCountCitas?porEstatus=${this.estatus}`)

    
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
