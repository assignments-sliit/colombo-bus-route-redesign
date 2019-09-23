import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import * as RouteNumbers from '../'
declare var require:any;
const routeDetails=require('../info/routeDetails.json');

@Component({
  selector: 'app-srr-text',
  templateUrl: './srr-text.page.html',
  styleUrls: ['./srr-text.page.scss'],
})

export class SrrTextPage implements OnInit {

  data:any;
  details:any;
  routeNumber:any;
  points:boolean=false;

  constructor(private route: ActivatedRoute, private router: Router) {
    
   this.route.queryParams.subscribe(params=>{
     if(this.router.getCurrentNavigation().extras.state){
       this.data=this.router.getCurrentNavigation().extras.state.routes
     }else{
       console.log('Nothing in params state');
     }
   });
    
    
  }

  ngOnInit() {
    this.findNumber();
   }

  findNumber(){
   
  if(this.data){
    this.routeNumber=this.data.routeNumber;
    
    routeDetails.forEach(element => {
      if(element.routeNumber.includes(this.routeNumber)){
        this.details=element;
      }
    });
  }else{
    this.routeNumber="177";
    routeDetails.forEach(element => {
      if(element.routeNumber.includes(this.routeNumber)){
        this.details=element;
      }
    });
  }

    console.log(this.details);
    //console.log('findNumber()');
    
    
    
  }

  

}
