declare var require: any;

import { Component, OnInit } from '@angular/core';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx'
import { AlertController, LoadingController } from '@ionic/angular';
import {SpinnerDialog} from '@ionic-native/spinner-dialog';
import { Router, NavigationExtras } from '@angular/router';

const routeDetails=require('../info/routeDetails.json');

@Component({
  selector: 'app-cptodest',
  templateUrl: './cptodest.page.html',
  styleUrls: ['./cptodest.page.scss'],
})
export class CptodestPage implements OnInit {
  //from home.ts
  private places=[
    "Athurugiriya",
    "Bambalapitiya",
    "Battaramulla",
    "Batuwatta",
    "Bloemendhal",
    "Boralesgamuwa",
    "Borella",
    "Cinnamon Gardens",
    "Dalugama",
    "Dehiwala",
    "Dematagoda",
    "Fort",
    "Grandpass",
    "Havelock Town",
    "Hokandara",
    "Hulftsdorp",
    "Ja-Ela",
    "Kadawatha",
    "Kaduwela",
    "Kahathuduwa",
    "Kalubowila",
    "Kandana",
    "Kiribathgoda",
    "Kirulapana",
    "Kohuwala",
    "Kollupitiya",
    "Kolonnawa",
    "Koswatte",
    "Kotahena",
    "Kotikawatta",
    "Kottawa",
    "Madampitiya",
    "Maha Nuge Gardens",
    "Maharagama",
    "Malabe",
    "Maligawatta",
    "Maradana",
    "Mattakkuliya",
    "Modara",
    "Moratuwa",
    "Mount-Lavinia",
    "Narahenpita",
    "Nawala",
    "Nugegoda",
    "Wellawatte"
  ];

  private hundred=[
    "100",
    "Fort",
    "Galle Face",
    "Kollupitiya",
    "Bambalapitiya",
    "Wellawatte",
    "Dehiwala",
    "Mount-Lavinia",
    "Ratmalana",
    "Katubedda",
    "Rawatawatta",
    "Moratuwa",
    "Horethuduwa",
    "Gorakana",
    "Keselwatta",
    "Panadura"
  ];
  public startResult=[];
  public destinationResult=[];
  public start:string='';
  public destination:string='';
  public startCard:'';

  public startPass;
  public destinationPass;

  public doWeHaveBuses=[];
  public routeNumber=[];
  public routePoints=[];

  public resultView:boolean;
  public btnClickControl:boolean;
  searchResults:any;
  //end from home.ts

  constructor(private router:Router,public alertController: AlertController,public loadingController: LoadingController) {
    this.searchResults=[];

  }

  ngOnInit() {
  this.presentAlert();
    
  }
  //fetching location loading dialog
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Fetching your Location',
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
    this.presentAlertRadio();
  }

  //location permission dialog
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Location Permission',
      message: 'Allow ColomboBusRoute to get your location',
      buttons: [{
        text:'Decline',
        role:'Cancel',
        handler:()=>{
          this.presentAlertCancel();
        }
      },{
        text: 'Accept',
          handler: () => {
            this.presentLoading();
          }
      }]
    });

    await alert.present();
  }
  
  //called when location permission is cancelled
  async presentAlertCancel() {
    const alert = await this.alertController.create({
      header: 'Location Required',
      message: 'Without the Location Permission, we cannot locate you.',
      buttons: [{
        text: 'Location Services',
          handler: () => {
            console.log('Confirm Cancel');
          }
      }]
    });

    await alert.present();
  }

  //radio dialog
  async presentAlertRadio() {
    const alert = await this.alertController.create({
      header: 'Where are you exactly?',
      inputs: [
        {
          name: 'place1',
          type: 'radio',
          label: 'Wellawatte',
          value: 'Wellawatte',
          checked: true
        },
        {
          name: 'place2',
          type: 'radio',
          label: 'Bambalapitiya',
          value: 'Bambalapitiya',
        },
        {
          name: 'place3',
          type: 'radio',
          label: 'Dehiwala',
          value: 'Dehiwala',
        }
      ],
      buttons: [
         {
          text: 'Select',
          handler: (value) => {
           this.start=value;
            this.startPass=value;
          }
        }
      ]
    });

    await alert.present();
  }



  setStart(result){
    //this.search=this.startCard;

    var startSet=document.getElementById("startValue") as HTMLInputElement;
    startSet.value=result;
    this.startPass=result;

  }

  checkStartIsTrue(){
      // tslint:disable-next-line:triple-equals
    const lp=this.start;
      const  summa=this.start==this.startResult.find(x=>x==lp);

      if(!this.start.length){
        return true;
      } else if(summa){
        return true;
      }else{
        return false;
      }
  }

  destinationChanged(){
    console.log(this.destination);
    var tempResult=[];

    for(var i=0;i<this.places.length;i++){

      var regex=new RegExp(this.destination,'gi');
      var tempResultVar=this.places[i].match(regex);

      if(tempResultVar){
        tempResult.push(this.places[i]);
      }
    }

      this.destinationResult=tempResult;


  }

  checkDestinationIsTrue(){
  const lp=this.destination;
    const  summa=this.destination==this.destinationResult.find(y=>y==lp);

    if(!this.destination.length){
      return true;
    } else if(summa){
      return true;
    }else{
      return false;
    }
}


setDestination(result){
  //this.search=this.startCard;

  var destSet=document.getElementById("destinationValue") as HTMLInputElement;
  destSet.value=result;
  this.destinationPass=result;


}

 load(result){

  

  const routes={
    start:this.start,
    destination:this.destination,
    routeNumber:result.routeNumber
  }

  let navigationExtras:NavigationExtras={
    state:{
      routes:routes
    }
  }
  console.log(result.routeNumber);
  

  this.router.navigate(['srr-host/srr-host/text'],navigationExtras);

}

activateButton(){
  if((!this.startPass && this.destinationPass)){
    return false;
  }else if(this.startPass && this.destinationPass) {
    return true;
  }

}

async findRoute(){
  let start=this.startPass;
  let destination=this.destinationPass;
  if(this.startPass==this.destinationPass){
    
    const alert = await this.alertController.create({
      header: 'Incorrect Values',
      
      message: 'You cannot find bus for the same start and destination',
      buttons: ['OKAY']
    });

    await alert.present();
  
}
 

 else if(this.btnClickControl){
   console.log('Already found');
   
 }else{
  this.searchResults=[];

  routeDetails.forEach(element=> {
    if(element.places.includes(start) && element.places.includes(destination)){
      this.searchResults.push(element);
      this.resultView=true;
    }
  });
  //this.btnClickControl=true;
 }

}



}
