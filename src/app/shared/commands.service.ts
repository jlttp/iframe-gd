import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommandsService {

  constructor(private http: HttpClient) { }

  getPGPMessage(url: string){
    return this.http.get(url);
  }

}
