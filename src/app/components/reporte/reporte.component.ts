import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {FormGroup, FormControl} from '@angular/forms';
import { ReporteFechas } from 'src/app/model/reportesFechas';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';


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
  end: string = "";
  start: string = "";
  p1:string="";
  cancelada:number =0;
  Pe_Revision:number = 0;
  Cancela_Por_Tiempo :number = 0;
  Reservada_Sin_Documen:number = 0;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  reportes: ReporteFechas []=[];
  resultado: Array<any>= [];
  fecha_transformada: any;
  fecha: string | undefined;
  fechaInicio: any;

  constructor(private http:HttpClient, private datePipe: DatePipe) {
    ;
  }

  ngOnInit(): void {

  }

  public buscarPorFechas(){
    if(this.range.controls.start.valid && this.range.controls.end.valid && this.range.value.start != null && this.range.value.end != null){
      console.log('Rango de fechas', this.range.value)
      console.log('Rango de fecha inicio', this.range.value.start)
      this.status=true
      this.start = this.range.value.start

      //this.trans = moment(this.start, 'yyyy-mm-dd')
      //this.fecha = new Date(this.start).toLocaleDateString();
      
      this.fecha = new Date(this.start).toLocaleDateString();
      this.fechaInicio = this.datePipe.transform(this.fecha,"yyyy-MM-dd")
      //this.fechaFinal = this.datePipe.transform(this.fecha,"yyyy-MM-dd")
      console.log('FECHA BIEN: ',this.fechaInicio)



      console.log('fecha', this.fecha)
      console.log(this.range.value.date);
      //this.end = this.range.value.end
      //this.start ='2020-09-01'
      this.end = '2021-09-01'
      this.obtenerValorFecha(this.status, this.fechaInicio, this.end);
    }else{
      this.status = false
     0// this.start ='2020-09-01'
      //this.end = '2021-09-01'
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

  obtenerValorFecha(status:boolean, fechaInicio:string, fechaFinal:string){
    this.http.get(`${environment.url}/cita/getCountCitas?porEstatus=${this.status}&fechaInicial=${this.fechaInicio}&fechaFinal=${fechaFinal}`)
        .subscribe(date2=> {
          this.conversion2=date2;
          //this.rta2= this.conversion.data;
          this.reportes=this.conversion2.data;
          console.log(this.conversion2)
          this.cancelada = this.conversion2.data['CANCELADA']
          this.Pe_Revision = this.conversion2.data['PENDIENTE DE REVISIÓN']
          this.Cancela_Por_Tiempo = this.conversion2.data['CANCELADA POR TIEMPO']
          this.Reservada_Sin_Documen = this.conversion2.data['RESERVADA SIN DOCUMENTOS']
          //this.rta2= this.conversion2;
          //this.lis2 = this.rta2
          //this.p1 = this.conversion2.data.CANCELADA
          // -----this.fecha_transformada = this.range.value.start
    
          // ------console.log(this.trans)
          //console.log(this.reportes['CANCELADA']);
          console.log('datos',this.reportes);
          console.log(this.conversion2.data['CANCELADA']);
          console.log(this.conversion2.data['PENDIENTE DE REVISIÓN']);
          console.log(this.conversion2.data['CANCELADA POR TIEMPO']);
          console.log(this.conversion2.data['RESERVADA SIN DOCUMENTOS']);
    });
  }
  events: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {

    this.fecha_transformada =this.events.push(`${type}: ${event.value}`)
    console.log(event)
    console.log(this.fecha_transformada)
    //this.resultado = this.events
    //let FechaBien = this.miDatepipe.transform(this.miDatepipe,'yyyy-MM-dd')
  }

}


