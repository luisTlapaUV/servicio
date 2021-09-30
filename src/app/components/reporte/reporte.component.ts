import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {FormGroup, FormControl} from '@angular/forms';
import { ReporteFechas } from 'src/app/model/reportesFechas';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  conversion:any;
  rta:Array<any>= [];
  data:Array<any>= [''];
  conversion2:any;
  rta2:Array<any>= [];
  data2:Array<any>= [''];
  public lis:any =[];  
  public lis2:any =[];  
  status: boolean = false;
  start: string = "";
  end: string = "";

  reportes: ReporteFechas []=[];
   // cancelada: undefined,
    //Re_Sin_Doc: undefined,
    //Pen_Revision: undefined,
    //Cance_Tiempo: undefined
 // };
  


  constructor(private http:HttpClient) { }

  ngOnInit(): void {

  }

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  buscarPorFechas(){
    if(this.range.controls.start.valid && this.range.controls.end.valid && this.range.value.start != null && this.range.value.end != null){
      console.log('Rango de fechas', this.range.value)
      console.log('Rango de fecha inicio', this.range.value.start)
      this.status=true
      //this.start = this.range.value.start
      //this.end = this.range.value.end
      this.start ='2020-09-01'
      this.end = '2021-09-01'
      this.obtenerValorFecha(this.status, this.start, this.end);
    }else{
      this.obtenerValor(this.status);


    }
  }

  obtenerValor(status:boolean){
    this.http.get(`${environment.url}/cita/getCountCitas?porEstatus=${this.status}`)
        .subscribe(date=> {
          this.conversion=date;
          this.rta= this.conversion.data;
          this.lis = this.rta
          console.log(this.rta);
    });
  }

  obtenerValorFecha(status:boolean, start:string, end:string){
    this.http.get(`${environment.url}/cita/getCountCitas?porEstatus=${this.status}&fechaInicial=${start}&fechaFinal=${end}`)
        .subscribe(date2=> {
          this.conversion=date2;
          this.reportes=this.conversion;
          this.rta2= this.conversion;
          this.lis2 = this.rta2
          console.log(this.reportes);
          /*console.log(this.conversion2.data.CANCELADA);
          console.log(this.conversion2.data['PENDIENTE DE REVISIÓN']);
          console.log(this.conversion2.data['CANCELADA POR TIEMPO']);
          console.log(this.conversion2.data['RESERVADA SIN DOCUMENTOS']);*/
    });
  }

}
