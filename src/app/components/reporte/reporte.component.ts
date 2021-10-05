import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {FormGroup, FormControl} from '@angular/forms';
import { ReporteFechas } from 'src/app/model/reportesFechas';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2'

import 'sweetalert2/src/sweetalert2.scss'



@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})

export class ReporteComponent implements OnInit {
  conversion:any;
  rta:Array<any>= [];
  datos:Array<number>= [];
  datosCitasProveedores:Array<number>= [];
  data:Array<any>= [''];
  conversion2:any;
  conversion3:any;
  conversion4:any;
  rta2:Array<any>= [];
  data2:Array<any>= [''];
  public lis:any =[];
  public lis2:any =[];
  public datos2:any =[];
  status: boolean = false;
  end: string = "";
  start: string = "";
  end2: string = "";
  start3: string = "";
  end3: string = "";
  start2: string = "";
  p1:string="";
  cancelada:number =0;
  Pe_Revision:number = 0;
  Cancela_Por_Tiempo :number = 0;
  Reservada_Sin_Documen:number = 0;
  totalProveedores:number =0;
  totalCitas:number =0;


  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });



  fecha_transformada: any;
  fecha: string | undefined;
  fecha2: Date | undefined;
  fechaStart: string | undefined;
  fechaEnd: string | undefined;
  fechaStart3: string | undefined;
  fechaEnd3: string | undefined;
  fechaInicio: any;
  fechaFinal: any | undefined;
  fechaInicioProvee: any;
  fechaFinalProvee:any;
  fechaInicioProveeCita: any;
  fechaFinalProveeCita:any;
  fechaInicioTotalProvee: any;
  fechaFinalTotalProvee:any;


  /////////////////////////////////////
  panelOpenState = false;
  ////////////////////////////////////


  constructor(private http:HttpClient, private datePipe: DatePipe) {
    ;
  }
  ngOnInit(): void {

  }

  public buscarPorFechas(){
    if(this.range.controls.start.valid && this.range.controls.end.valid && this.range.value.start != null && this.range.value.end != null){
      this.status=true
      this.start = this.range.value.start
      this.end = this.range.value.end
      this.fecha = new Date(this.start).toLocaleDateString();
     // this.fecha2 = new Date(this.end).toLocaleDateString();
     this.fecha2 = new Date(this.end);
      this.fechaInicio = this.datePipe.transform(this.fecha,"yyyy-MM-dd")
      this.fechaFinal = this.datePipe.transform(this.fecha2, "yyyy-MM-dd")
      console.log('FECHA FINAL: ',this.fechaInicio)
      console.log('FECHA INICIO: ',this.fechaFinal)
     this.obtenerValorFecha(this.status, this.fechaInicio, this.fechaFinal);
    }else{
      this.status = false
      this.obtenerValor(this.status);
    }
  }

  obtenerValor(status:boolean){
    this.http.get(`${environment.url}/cita/getCountCitas?porEstatus=${this.status}`)
        .subscribe(date=> {
          this.conversion=date;
          this.rta= this.conversion.data;
          this.lis = this.rta
          //console.log(this.rta);
    });
  }

  obtenerValorFecha(status:boolean, fechaInicio:string, fechaFinal:string){
    this.http.get(`${environment.url}/cita/getCountCitas?porEstatus=${this.status}&fechaInicial=${this.fechaInicio}&fechaFinal=${fechaFinal}`)
        .subscribe(date2=> {
          this.conversion2=date2;
          this.rta2 = this.conversion2.data
          this.lis2 = this.rta2
          //console.log(this.conversion2)
          this.cancelada = this.conversion2.data['CANCELADA']
          this.Pe_Revision = this.conversion2.data['PENDIENTE DE REVISIÓN']
          this.Cancela_Por_Tiempo = this.conversion2.data['CANCELADA POR TIEMPO']
          this.Reservada_Sin_Documen = this.conversion2.data['RESERVADA SIN DOCUMENTOS']

          /*
          console.log(this.conversion2.data['CANCELADA']);
          console.log(this.conversion2.data['PENDIENTE DE REVISIÓN']);
          console.log(this.conversion2.data['CANCELADA POR TIEMPO']);
          console.log(this.conversion2.data['RESERVADA SIN DOCUMENTOS']);*/
    });
  }
  obtenerTotal(){
    if(this.range.controls.start.valid && this.range.controls.end.valid && this.range.value.start != null && this.range.value.end != null){
      this.start2 = this.range.value.start
      this.end2 = this.range.value.end
      this.fechaStart = new Date(this.start2).toLocaleDateString();
      this.fechaEnd = new Date(this.end2).toLocaleDateString();

      this.fechaInicioProveeCita = this.datePipe.transform(this.fechaStart,"yyyy-MM-dd")
      this.fechaFinalProveeCita = this.datePipe.transform(this.fechaEnd,"yyyy-MM-dd")
      //console.log(this.fechaStart)
      //this.obtenerTotalProveedores(this.fechaInicioProvee, this.fechaFinalProvee);
      this.obtenerCitasProveedores(this.fechaInicioProveeCita, this.fechaFinalProveeCita)
    }else{
      //window.alert("Se necesita ingresar el rango de fechas de busqueda");
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error necesita ingresar un rango de fechas!'
      })
    }
  }

  obtenerCitasProveedores(fechaInicio:string, fechaFinal:string){
    this.http.get(`${environment.url}/cita/countCitasProveedor?fechaInicial=${this.fechaInicioProveeCita}&fechaFinal=${this.fechaFinalProveeCita}`)
        .subscribe(date3=> {
          this.conversion3=date3;
          //console.log(this.conversion3)
          this.datosCitasProveedores= this.conversion3.data ['MEDICAMENTOS SA. DE CV.']
          //console.log(this.datosCitasProveedores)
          //this.totalProveedores= this.conversion4.data['totalProveedores']


        });
  }

  obtenerTotalProveedores(){
    if(this.range.controls.start.valid && this.range.controls.end.valid && this.range.value.start != null && this.range.value.end != null){
      this.start3 = this.range.value.start
      this.end3 = this.range.value.end
      this.fechaStart3 = new Date(this.start3).toLocaleDateString();
      this.fechaEnd3 = new Date(this.end3).toLocaleDateString();
      //console.log(this.fechaStart3)
      //console.log(this.fechaEnd3)

      this.fechaInicioTotalProvee = this.datePipe.transform(this.fechaStart3,"yyyy-M-dd")
      this.fechaFinalTotalProvee = this.datePipe.transform(this.fechaEnd3,"yyyy-M-dd")
      //console.log(this.fechaFinalTotalProvee)
      //console.log(this.fechaInicioTotalProvee)
      this.obtenerTotalProveedoresCita(this.fechaInicioTotalProvee, this.fechaFinalTotalProvee);

    }else{
      //window.alert("Se necesita ingresar el rango de fechas de busqueda");
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error necesita ingresar un rango de fechas!'
      })
    }
  }

  obtenerTotalProveedoresCita(fechaInicio:string, fechaFinal:string){
    this.http.get(`${environment.url2}/proveedor/getTotalProveedores?fechaInicial=${this.fechaInicioTotalProvee}&fechaFinal=${this.fechaFinalTotalProvee}`)
        .subscribe(date4=> {
          this.conversion4=date4;
          //console.log(this.conversion4)

          this.datos= this.conversion4.data.totalProveedores;

          this.totalProveedores= this.conversion4.data['totalProveedores']
          //console.log(this.totalProveedores)
        });  }

}


