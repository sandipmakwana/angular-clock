import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClockService {

  constructor() { }
  
  hrDigitalVal : string;
  minDigitalVal : string;
  ampmDigitalVal : string;
  hrAnalogVal: string;
  minAnalogVal: string;
  ampmAnalogVal: string;

  counter(i: number) {
    return new Array(i);
 }

}
