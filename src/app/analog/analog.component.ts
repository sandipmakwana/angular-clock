import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClockService } from '../clock.service';

@Component({
  selector: 'app-analog',
  templateUrl: './analog.component.html',
  styleUrls: ['./analog.component.css']
})
export class AnalogComponent implements OnInit{

  @ViewChild('hrArrow', {static:false}) hrArrow : ElementRef;
  @ViewChild('minArrow', {static:false}) minArrow : ElementRef;
  @ViewChild('secArrow', {static:false}) secArrow : ElementRef;
  public ampm : string;
  public ampms = ['AM','PM'];
  public isNotCustom = true;
  public usrInputHr: any;
  public usrInputMin: any;
  public dafaultTime : any;
  public startTime : any;
  public customTime : any;
  public emptyHr : string;
  public emptyMin : string;
  public emptyAmpm : string;
  public isValidate = true;
  
  constructor( private clock: ClockService) { 
   
  }

  ngOnInit(){
    // It will update time every second
   
    this.dafaultTime = setInterval(() => { 
      const date = new Date();
      this.updateTime(date);
    }, 1000); 
  }

  
  updateTime(date : Date){
     // Sync Call Update time from Digital //
    if(this.clock.hrDigitalVal != undefined && this.clock.minDigitalVal != undefined && this.clock.ampmDigitalVal != undefined){
      const date = new Date();
      const newdate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(this.clock.hrDigitalVal), parseInt(this.clock.minDigitalVal), 0);
      this.startTime =  newdate.getTime();
      this.isNotCustom = false;
      clearInterval(this.dafaultTime); // Clear Default interval
      clearInterval(this.customTime); // Clear Previous Customtime interval

      this.customTime = setInterval(() => { 
          this.updateCustomTime();
        }, 1000); 
      this.clock.hrDigitalVal = undefined;
      this.clock.minDigitalVal= undefined;
      this.clock.ampmDigitalVal = undefined; 
   }

    // Rotate Second arrow.
    this.secArrow.nativeElement.style.transform = 'rotate('+ date.getSeconds() * 6 + 'deg)';
    // Rotate Minute arrow
    this.minArrow.nativeElement.style.transform = 'rotate('+ date.getMinutes() * 6 + 'deg)';
     // Rotate Hour arrow
     this.hrArrow.nativeElement.style.transform = 'rotate('+ (date.getHours() * 30 + date.getMinutes() * 0.5) + 'deg)';
     this.ampm = date.getHours() >= 12 ? 'PM' : 'AM'; // Set AM or PM time
   
  }

  onSubmit(hr : HTMLInputElement, min: HTMLInputElement,ampm : HTMLInputElement){
    if(hr.value == ""){
      this.emptyHr = "Select Hours";
      this.isValidate = false;
    }else{ this.emptyHr = "";}
    if(min.value == ""){
      this.emptyMin = "Select Minutes";
      this.isValidate = false;
    }else{ this.emptyMin = "";}
    if(ampm.value == ""){
     this.emptyAmpm = "Select AM/PM";
     this.isValidate = false;
   }else{ this.emptyAmpm = "";}
   if(hr.value != "" && min.value != "" && ampm.value != ""){
    this.isValidate = true;
   }
   if(this.isValidate == true){ 
    if(ampm.value == "PM"){
      this.usrInputHr = 12 + parseInt(hr.value);
    }else{
      this.usrInputHr = parseInt(hr.value);
     }
    this.usrInputMin = parseInt(min.value);
    this.ampm = ampm.value;
    // Update values in service 
    this.clock.hrAnalogVal = this.usrInputHr;
    this.clock.minAnalogVal = this.usrInputMin;
    this.clock.ampmAnalogVal = ampm.value;
    ///////////////////////
    this.isNotCustom = false;
    clearInterval(this.dafaultTime); // Clear Default interval
    clearInterval(this.customTime); // Clear Previous Customtime interval
      const date = new Date();
      const newdate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), this.usrInputHr, this.usrInputMin, 0);
      this.startTime =  newdate.getTime();
      
   this.customTime = setInterval(() => { 
      this.updateCustomTime();
    }, 1000); 
  }
  }

  private updateCustomTime(){
    // SyncCall Update time from Digital //
    if(this.clock.hrDigitalVal != undefined && this.clock.minDigitalVal != undefined && this.clock.ampmDigitalVal != undefined){
      console.log(this.clock.hrDigitalVal);
      const date = new Date();
      const newdate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(this.clock.hrDigitalVal), parseInt(this.clock.minDigitalVal), 0);
      this.startTime =  newdate.getTime();
      this.isNotCustom = false;
      clearInterval(this.dafaultTime); // Clear Default interval
      clearInterval(this.customTime); // Clear Previous Customtime interval
      
      this.clock.hrDigitalVal = undefined;
      this.clock.minDigitalVal= undefined;
      this.clock.ampmAnalogVal = undefined;
      this.customTime = setInterval(() => { 
        this.updateCustomTime();
      }, 1000); 
      }
    ////////////////////////////////  
    this.startTime += 1000;
    let dateCustom = new Date(this.startTime);
    
    // Rotate Second arrow.
     this.secArrow.nativeElement.style.transform = 'rotate('+ dateCustom.getSeconds() * 6 + 'deg)';
     // Rotate Minute arrow
     this.minArrow.nativeElement.style.transform = 'rotate('+ dateCustom.getMinutes() * 6 + 'deg)';
      // Rotate Hour arrow
      this.hrArrow.nativeElement.style.transform = 'rotate('+ (dateCustom.getHours() * 30 + dateCustom.getMinutes() * 0.5) + 'deg)';
      
      this.ampm = dateCustom.getHours() >= 12 ? 'PM' : 'AM'; // Set AM or PM time
  
  }

  counter(i: number) {
    return this.clock.counter(i);
 }


}
