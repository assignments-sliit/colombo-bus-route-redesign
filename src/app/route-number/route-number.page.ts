declare var require:any;
import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';


const routeDetails=require('../info/routeDetails.json');
@Component({
  selector: 'app-route-number',
  templateUrl: './route-number.page.html',
  styleUrls: ['./route-number.page.scss'],
})
export class RouteNumberPage implements OnInit {

  routeNumber;
  routeName:any;
  start:any;
  destination:any;
  isMapShow:Boolean=false;

  busRoute:any='';
  
  constructor(private toastController:ToastController,public loadingController: LoadingController,private router:Router) { 
    this.busRoute=[];
  }

  async btnShowMap(routeNumber){
    const loading = await this.loadingController.create({
      message: 'Looking for Bus Route '+routeNumber,
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
    if(this.routeNumber){
     this.isMapShow=true;
    }
    else {
    this.isMapShow=false;
    }


    routeDetails.forEach(element => {
      if(element.routeNumber==routeNumber){
        this.start=element.places[0];
        this.destination=element.places[element.places.length -1];
        this.routeName=element.routeName;
        this.busRoute.push()
        
      }
    });
    console.log(this.routeName);
  }  

  showMap(){
    if(this.isMapShow){
      return true;    
    }else{
      return false;
    }
  }

  ngOnInit() {
    this.presentToastWithOptions();
  }

  //initial toast method
  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      message: 'Route Number Details',
      position: 'bottom',
      duration:2000,
      buttons: [
         {
          text: 'Okay',
          role: 'cancel',
          handler: () => {
            console.log(' Initial Toast cancelled');
          }
        }
      ]
    });
    toast.present();
  }

  load(routeNumber){

   // this.getPoints(this.routeNumber);

   

    const routes={
      start:this.start,
      destination:this.destination,
      routeNumber:this.routeNumber
    }
  
    let navigationExtras:NavigationExtras={
      state:{
        routes:routes
      }
    }
    console.log(this.routeNumber);
    
  
    this.router.navigate(['srr-host/srr-host/text'],navigationExtras);
    
   
  
  }

  getPoints(routeNumber){
    
    
  }

}


