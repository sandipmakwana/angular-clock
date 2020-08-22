import { Component, OnInit, Input } from '@angular/core';
import { ClockService } from '../clock.service';

@Component({
  selector: 'app-digital',
  templateUrl: './digital.component.html',
  styleUrls: ['./digital.component.css']
})
export class DigitalComponent implements OnInit {
  @Input() myname: string;
  
  private days_arr = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  private date = new Date();
  public hour : any;
  public minute : any;
  public second : any;
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
  constructor( private clock : ClockService) { }

  ngOnInit() {
     
    
     // It will update time every second
    if(this.isNotCustom){
   this.dafaultTime = setInterval(() => { 
      const date = new Date();
      this.updateDate(date);
    }, 1000); 
    
    }
  }

  private updateDate(date : Date){
    // Sync Call Update time from Analog //
  if(this.clock.hrAnalogVal != undefined && this.clock.minAnalogVal != undefined){
     
    clearInterval(this.dafaultTime); // Clear Default interval
   
    const date = new Date();
    const newdate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(this.clock.hrAnalogVal), parseInt(this.clock.minAnalogVal), 0);
    this.startTime =  newdate.getTime();
      
   this.customTime = setInterval(() => { 
      this.updateCustomTime();
    }, 1000); 
    this.clock.hrAnalogVal = undefined;
    this.clock.minAnalogVal = undefined;
    this.clock.ampmAnalogVal = undefined;
    }
    /////////////////////////////////

    // Hours
    const currentHours =  date.getHours();
    this.ampm = currentHours >= 12 ? 'PM' : 'AM'; // Set AM or PM time
    this.hour = currentHours % 12;  // Set hours in 12 hrs formet.
    this.hour = this.hour ? this.hour : 12; // if hour is 0 then set 12.
    this.hour = this.hour < 10 ? '0'+ this.hour : this.hour; // Format hour if its below 10
    // Minutes
    const currentMinutes =  date.getMinutes();
    this.minute = currentMinutes < 10 ? '0'+ currentMinutes : currentMinutes.toString(); // Format hour if its below 10
    // Seconds
    const currentSeconds =  date.getSeconds();
    this.second = currentSeconds < 10 ? '0' + currentSeconds : currentSeconds.toString();
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
    this.clock.hrDigitalVal = this.usrInputHr;
    this.clock.minDigitalVal = this.usrInputMin;
    this.clock.ampmDigitalVal = ampm.value;
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

    // Sync Call Update time from Analog //
    if(this.clock.hrAnalogVal != undefined && this.clock.hrAnalogVal != undefined){
      console.log(this.clock.minAnalogVal);
      const date = new Date();
      const newdate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(this.clock.hrAnalogVal), parseInt(this.clock.minAnalogVal), 0);
      this.startTime =  newdate.getTime();
      this.isNotCustom = false;
      clearInterval(this.dafaultTime); // Clear Default interval
      clearInterval(this.customTime); // Clear Previous Customtime interval
      this.customTime = setInterval(() => { 
        this.updateCustomTime();
      }, 1000); 
      this.clock.hrAnalogVal = undefined;
      this.clock.minAnalogVal= undefined
      this.clock.ampmAnalogVal = undefined
      }
    ///////////////////////////////////////

    this.startTime += 1000;
    let dateCustom = new Date(this.startTime);
 
    // Hours
  const newHours =  dateCustom.getHours();
  this.ampm = newHours >= 12 ? 'PM' : 'AM'; // Set AM or PM time
  this.hour = newHours % 12;  // Set hours in 12 hrs format.
  this.hour = this.hour ? this.hour : 12; // if hour is 0 then set 12.
  this.hour = this.hour < 10 ? '0'+ this.hour : this.hour; // Format hour if its below 10
   
    // Minutes
  const newMinutes =   dateCustom.getMinutes()
  this.minute = newMinutes < 10 ? '0'+ newMinutes : newMinutes.toString(); // Format hour if its below 10
   
  // Seconds
   const currentSeconds =  dateCustom.getSeconds();
    this.second = currentSeconds < 10 ? '0' + currentSeconds : currentSeconds.toString();
   // console.log(this.second);
  }

  counter(i: number) {
   return this.clock.counter(i);
 }

 
}
