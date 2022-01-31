import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from '../fill-in-form.model';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {
  message: Message;
  IP_adress='';
  token: string|undefined;

  constructor(private http: HttpClient, private router: Router) {
    this.token = undefined;
   }

   public send(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

    console.debug(`Token [${this.token}] generated`);
  }

  ngOnInit(): void {
    this.IPAdress();
   }

  send_message(form: NgForm){
    const valName = form.value;
    this.message = new Message(valName.f_name, valName.f_email,
      valName.f_web, valName.f_message, this.IP_adress);
      
      this.http.post('https://php-test-midis-default-rtdb.firebaseio.com/message.json',
      this.message)
      .subscribe(response => {
        this.router.navigate(['book']);
      });
  }

  private IPAdress(){
    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.IP_adress = res.ip;
    });
  }

}
