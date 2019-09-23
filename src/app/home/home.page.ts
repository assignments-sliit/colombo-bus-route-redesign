declare var require: any;
import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';

const routeDetails = require('../info/routeDetails.json');

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  //from home.ts
  private places = [
    "Angulana",
    "Athurugiriya",
    "BMICH",
    "Bambalapitiya",
    "Battaramulla",
    "Batuwatta",
    "Bauddhaloka Mawatha",
    "Bloemendhal",
    "Boralesgamuwa",
    "Borella",
    "Cinnamon Gardens",
    "D.R. Wijewardhana Road",
    "Dalugama",
    "Darley Road",
    "Dehiwala",
    "Delkanda",
    "Dematagoda",
    "Dickmans Road",
    "Embuldeniya Junction",
    "Fort",
    "Galle Face",
    "Gamini Hall Junction",
    "Grandpass",
    "Havelock Town",
    "Hokandara",
    "Hulftsdorp",
    "Ibbanwala Junction",
    "Independence Square",
    "Ja-Ela",
    "Jawatta Road",
    "Kadawatha",
    "Kaduwela",
    "Kahathuduwa",
    "Kalubowila",
    "Kanatta Junction",
    "Kandana",
    "Katubedda",
    "Kelaniya",
    "Kiribathgoda",
    "Kirillapone",
    "Kochchikade",
    "Kohuwala",
    "Kollupitiya",
    "Kolonnawa",
    "Koswatte",
    "Kotahena",
    "Kotikawatta",
    "Kottawa",
    "Lake House",
    "Madampitiya",
    "Maha Nuge Gardens",
    "Maharagama",
    "Malabe",
    "Maligawatta",
    "Maradana",
    "Mattakkuliya",
    "Mirihana",
    "Modara",
    "Moratuwa",
    "Mount-Lavinia",
    "Narahenpita",
    "Nawala",
    "Navinna",
    "New Kelani Bridge",
    "Nugegoda",
    "Orugodawatta",
    "Panadura",
    "Park Avenue",
    "Peliyagoda",
    "Pettah",
    "Punchi Borella",
    "Ratmalana",
    "Rawatawatta",
    "Technical College Junction",
    "Thimbirigasyaya",
    "Thummulla",
    "Torrington Avenue",
    "Town Hall",
    "Udahamulla",
    "Wattala",
    "Wellawatte"
  ];

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
  public destinationResult = [];
  public start: string = '';
  public destination: string = '';
  public startCard: '';

  public startPass;
  public destinationPass;

  public routeNumber = [];

  public resultView: boolean;
  public btnClickControl: boolean;


  searchResults: any;
  resultView2: boolean;

  constructor(private router: Router, public alertController: AlertController, public loadingController: LoadingController) {
    this.searchResults = [];
  }

  ngOnInit() {

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

  destinationChanged() {
    console.log(this.destination);
    var tempResult = [];

    for (var i = 0; i < this.places.length; i++) {

      var regex = new RegExp(this.destination, 'gi');
      var tempResultVar = this.places[i].match(regex);

      if (tempResultVar) {
        tempResult.push(this.places[i]);
      }
    }

    this.destinationResult = tempResult;


  }

  checkDestinationIsTrue() {
    const lp = this.destination;
    const summa = this.destination == this.destinationResult.find(y => y == lp);

    if (!this.destination.length) {
      return true;
    } else if (summa) {
      return true;
    } else {
      return false;
    }
  }


  setDestination(result) {
    //this.search=this.startCard;

    var destSet = document.getElementById("destinationValue") as HTMLInputElement;
    destSet.value = result;
    this.destinationPass = result;


  }

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
    if ((!this.startPass && this.destinationPass)) {
      return false;
    } else if (this.startPass && this.destinationPass) {
      return true;
    }

  }

  async findRoute() {
    

    const loading = await this.loadingController.create({
      message: 'Finding Bus Routes for ' +this.start +  ' - '+this.destination,
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
    

    let start = this.startPass;
    let destination = this.destinationPass;
    if (this.startPass == this.destinationPass) {

      const alert = await this.alertController.create({
        header: 'Incorrect Values',

        message: 'You cannot find bus for the same start and destination',
        buttons: ['OKAY']
      });

      await alert.present();

    }


    else if (this.btnClickControl) {
      console.log('Already found');

    } else {
      this.searchResults=[];

      routeDetails.forEach(element => {
        if (element.places.includes(start) && element.places.includes(destination)) {
          this.searchResults.push(element);
          this.resultView = true;
        }
      });

      if (!this.resultView) {
        this.resultView2 = true;
        routeDetails.forEach(element => {
          if (element.routeNumber == "177") {
            this.searchResults.push(element);
          }
        });
      }

      console.log(this.searchResults);
      //this.btnClickControl = true;
    }
  }

}
