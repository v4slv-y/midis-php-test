import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Message } from '../fill-in-form.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  book: Message[]=[];
  ten_mess: Message[]=[];
  message_count:number;
  step: number=10;
  start: number=0;
  pages: number;
  pages_count: number=1;
  up_date: boolean=true;
  up_name: boolean=true;

  arr: Array<number>[]=[];

  fun(){
    this.book
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http
    .get<Message[]>('https://php-test-midis-default-rtdb.firebaseio.com/message.json')
      .subscribe(message => {
        this.book = Object.values(message);
        this.message_count=this.book.length;
        this.book.sort((a,b)=>{
          return b.date-a.date;
        })
        
        this.get_ten('start');
    });
  }

  get_ten(option: string){
    if(this.message_count<=10){
      this.ten_mess=this.book;
      return;
    }

    const part: number=this.message_count%10;
    let full: number=this.message_count/10-(part*0.1);
    if(part){
      full++;
    }
    this.pages=full;
    
    switch(option){
        case 'start':
          if(this.message_count>this.step){
            this.start=0;
            this.ten_mess=this.book.slice(0, 10);
          }
        break;
        case 'next':
          if(this.message_count>=(this.start+this.step)){
            if(this.message_count==(this.start+this.step)){
              break;
            }
            console.log('nex full');
            this.start+=this.step;
            this.ten_mess=this.book.slice(this.start, this.start+this.step);
            this.pages_count++;
          }
          // else{
          //   // if(this.pages==this.pages_count){
          //   //   break;
          //   // }
          //   console.log('nex part');
          //   this.ten_mess=this.book.slice(this.start, this.start+part+1);
          // }
        break;
        case 'prev':
          if(this.start==0){
            break;
          }
          else{
            this.start-=this.step;
            this.ten_mess=this.book.slice(this.start, this.start+this.step);
            this.pages_count--;
          }
        break;
        default:
          break;
    }

  }

  sorting(option: string){
    console.log(option);

    switch(option){
      case 'nameSort':
        if(this.up_name){
          this.ten_mess.sort((a, b)=>{
            if(a.name<b.name)
            return -1;
          })
          this.up_name=false;
        }
        else{
          this.ten_mess.sort((a,b)=>{
            if(a.name>b.name)
            return -1;
          })
          this.up_name=true;
        }
        break;
      case 'dateSort':
        if(this.up_date){
          this.ten_mess.sort((a,b)=>{
            return b.date-a.date;
          })
          this.up_date=false;
        }
        else{
          this.ten_mess.sort((a,b)=>{
            return a.date-b.date;
          })
          this.up_date=true;
        }
        break;
      default:
        break;
    }
  }

}

