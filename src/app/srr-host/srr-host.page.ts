import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-srr-host',
  templateUrl: './srr-host.page.html',
  styleUrls: ['./srr-host.page.scss'],
})
export class SrrHostPage implements OnInit {

  data:any;
  constructor(private route:ActivatedRoute,private router:Router) {
    if(this.router.getCurrentNavigation().extras.state){
      this.data=this.router.getCurrentNavigation().extras.state.routes
    }else{
      console.log('nothing found here');
      
    }
   }

  ngOnInit() {
  }


  passData(){
   
  
    let navigationExtras:NavigationExtras={
      state:{
        data:this.data
      }
    }
    
    this.router.navigate(['srr-host/srr-host/map'],navigationExtras);
    console.log("Map Opened with paramaters");
    
  }
}
