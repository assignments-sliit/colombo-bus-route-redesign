declare var require: any;

import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
const routeDetails = require('../info/routeDetails.json');

@Component({
  selector: 'app-busincp',
  templateUrl: './busincp.page.html',
  styleUrls: ['./busincp.page.scss'],
})
export class BusincpPage implements OnInit {

  //from home.ts
  private places = [
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

  private place: any;
  private hundred = [
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
  public startResult = [];
  public start: string = '';
  public startCard: '';

  public startPass;

  public doWeHaveBuses = [];
  public routeNumber = [];
  public routePoints = [];

  public resultView: boolean;
  public btnClickControl: boolean;
  searchResults: any;
  destination: any;

  //end from home.ts


  constructor(public router: Router, public alertController: AlertController, public loadingController: LoadingController) {
    this.searchResults = [];

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
        text: 'Decline',
        role: 'Cancel',
        handler: () => {
          this.presentAlertCancel();
        }
      }, {
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
          label: 'Malabe',
          value: 'Malabe',
        }
      ],
      buttons: [
        {
          text: 'Select',
          handler: (value) => {
            this.findRoute(value);
          }
        }
      ]
    });

    await alert.present();
  }



  startChanged() {
    console.log(this.start);
    var tempResult = [];

    for (var i = 0; i < this.places.length; i++) {

      var regex = new RegExp(this.start, 'gi');
      var tempResultVar = this.places[i].match(regex);

      if (tempResultVar) {
        tempResult.push(this.places[i]);
      }
    }

    this.startResult = tempResult;
  }

  setStart(result) {
    //this.search=this.startCard;

    var startSet = document.getElementById("startValue") as HTMLInputElement;
    startSet.value = result;
    this.startPass = result;

  }

  checkStartIsTrue() {
    // tslint:disable-next-line:triple-equals
    const lp = this.start;
    const summa = this.start == this.startResult.find(x => x == lp);

    if (!this.start.length) {
      return true;
    } else if (summa) {
      return true;
    } else {
      return false;
    }
  }



  // routes={
  //   start:this.startPass,
  //   destination:this.destinationPass
  // }

  load(result) {

    const routes = {
      start: this.start,
      destination: this.destination,
      routeNumber: result.routeNumber
    }

    let navigationExtras: NavigationExtras = {
      state: {
        routes: routes
      }
    }
    console.log(result.routeNumber);


    this.router.navigate(['srr-host/srr-host/text'], navigationExtras);



  }

  activateButton() {
    if ((!this.startPass)) {
      return false;
    } else if (this.startPass) {
      return true;
    }

  }

  async findRoute(place) {
    let start = this.startPass;
    //   //let destination=this.destinationPass;
    //   if(this.startPass==this.destinationPass){

    //     const alert = await this.alertController.create({
    //       header: 'Incorrect Values',

    //       message: 'You cannot find bus for the same start and destination',
    //       buttons: ['OKAY']
    //     });

    //     await alert.present();

    // }else
    //  if(this.btnClickControl){
    //    console.log('Already found');

    //  }else{
      routeDetails.forEach(element => {
        if (element.places.includes(place) ) {
          this.searchResults.push(element);
          this.resultView = true;
          this.place = place;
          this.startPass=place;
        }

      });

      routeDetails.forEach(element => {
        if(this.searchResults.routeNumber==element.routeNumber){
           this.destination= this.searchResults.places[this.searchResults.places.length -1]
        }
      });
    this.btnClickControl = true;


  }




}
