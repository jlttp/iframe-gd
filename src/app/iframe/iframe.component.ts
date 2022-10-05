import { Component, OnInit } from '@angular/core';
import { CommandsService } from '../shared/commands.service';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss']
})
export class IframeComponent implements OnInit {

  readonly API: string = 'http://localhost:8000/encriptar';
  encryptedClaims: any;
  //targetUrl: string = '/dashboards/embedded/#/workspace/j7qqdh9vipmgjk0woxl950v00de2719d/dashboard/aag3qx8mRg7w?showNavigation=false'; //endpoint do dashboard (kpi)
  targetUrl: string = '/dashboard.html#workspace=/gdc/workspaces/j7qqdh9vipmgjk0woxl950v00de2719d&dashboard=/gdc/md/j7qqdh9vipmgjk0woxl950v00de2719d/obj/1536067'; //endpoint do dashboard
  ssoProvider: string = 'aguaseesgotos.sso.com.br';
  //pgpLoginRequest: any;

  constructor(private service: CommandsService) { }

  ngOnInit(): void {
    this.service.getPGPMessage(this.API)
      .subscribe(response => {
        this.encryptedClaims = response;
        this.encryptedClaims = this.encryptedClaims['publicKey'];
        //this.encryptedClaims = this.encryptedClaims['publicKey'].replace(/\n/g, '\u005C' + 'n');
        //this.encryptedClaims = this.encryptedClaims.substring(0, this.encryptedClaims.length - 2);

        //var temp = `{ \"pgpLoginRequest\": { \"encryptedClaims\": \"${this.encryptedClaims}\", \"ssoProvider\": \"${this.ssoProvider}\", \"targetUrl\":\"${this.targetUrl}\"}}`;
        //this.pgpLoginRequest = temp;
        //console.log(this.pgpLoginRequest);

        console.log(this.encryptedClaims);
        console.log(document.getElementById('helperForm'));

        var form: any = document.getElementById('helperForm');
        form.submit();

        console.log('submit enviado');

      })
  }

}
