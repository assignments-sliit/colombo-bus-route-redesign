declare var require: any;
import { Component, OnInit } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  MarkerCluster
} from '@ionic-native/google-maps';
import { ActivatedRoute, Router } from '@angular/router';
const routeDetails = require('../info/routeDetails.json');

@Component({
  selector: 'app-srr-map',
  templateUrl: './srr-map.page.html',
  styleUrls: ['./srr-map.page.scss'],
})
export class SrrMapPage implements OnInit {
  map: GoogleMap;
  latLngData = [
    {
      name: "Angulana",
      lat: 6.8173567,
      lng: 79.9045282

    },
    {
      name: "Athurugiriya",
      lat: 6.8734427,
      lng: 79.9893857

    },
    {
      name: "BMICH",
      lat: 6.9015603,
      lng: 79.8707128

    },
    {
      name: "Fort",
      lat: 6.925833,
      lng: 79.841667

    },
    {
      name: "Kollupitiya",
      lat: 6.900556,
      lng: 79.853333

    },
    {
      name: "Bambalapitiya",
      lat: 6.888889,
      lng: 79.856667

    },
    {
      name: "Wellawatte",
      lat: 6.874657,
      lng: 79.860483

    },
    {
      name: "Dehiwala",
      lat: 6.856387,
      lng: 79.865156

    },
    {
      name: "Mount-Lavinia",
      lat: 6.838864,
      lng: 79.863141

    },
    {
      name: "Moratuwa",
      lat: 6.7733,
      lng: 79.8825

    },
    {
      name: "Panadura",
      lat: 6.7133,
      lng: 79.9042

    },
    {
      name: "Battaramulla",
      lat: 6.9001015,
      lng: 79.9029844

    },
    {
      name: "Batuwatta",
      lat: 7.0553894,
      lng: 79.9207519

    },
    {
      name: "Bauddhaloka Mawatha",
      lat: 6.9972593,
      lng: 79.8630344

    },
    {
      name: "Bloemendhal",
      lat: 6.9512446,
      lng: 79.8604365

    },
    {
      name: "Boralesgamuwa",
      lat: 6.8365151,
      lng: 79.8714963

    },
    {
      name: "Borella",
      lat: 6.9124745,
      lng: 79.8614361

    },
    {
      name: "Cinnamon Gardens",
      lat: 6.9061463,
      lng: 79.8488393

    },
    {
      name: "D.R. Wijewardhana Road",
      lat: 6.9315196,
      lng: 79.8523319

    },
    {
      name: "Dalugama",
      lat: 6.9735104,
      lng: 79.9120395

    },
    {
      name: "Darley Road",
      lat: 6.9228745,
      lng: 79.8599001

    },
    {
      name: "Delkanda",
      lat: 6.8618352,
      lng: 79.8985203

    },
    {
      name: "Dematagoda",
      lat: 6.9357891,
      lng: 79.8771957

    },
    {
      name: "Dickmans Road",
      lat: 6.8871986,
      lng: 79.8590032

    },
    {
      name: "Embuldeniya Junction",
      lat: 6.8681302,
      lng: 79.9068474

    },
    {
      name: "Galle Face",
      lat: 6.9261046,
      lng: 79.8420486

    },
    {
      name: "Gamini Hall Junction",
      lat: 6.9268455,
      lng: 79.8596285

    },
    {
      name: "Grandpass",
      lat: 6.9511256,
      lng: 79.8679175

    },
    {
      name: "Havelock Town",
      lat: 6.8861913,
      lng: 79.8544967

    },
    {
      name: "Hokandara",
      lat: 6.8775388,
      lng: 79.9444236

    },
    {
      name: "Hulftsdorp",
      lat: 6.9375606,
      lng: 79.8586274

    },
    {
      name: "Ibbanwala Junction",
      lat: 6.9181163,
      lng: 79.860341

    },
    {
      name: "Independence Square",
      lat: 6.9035436,
      lng: 79.8659211

    },
    {
      name: "Ja-Ela",
      lat: 7.0766391,
      lng: 79.8772411

    },
    {
      name: "Jawatta Road",
      lat: 6.8950005,
      lng:79.8661706 

    },
    {
      name: "Kadawatha",
      lat: 7.0096207,
      lng: 79.9250157

    },
    {
      name: "Kaduwela",
      lat: 6.9300185,
      lng: 79.9645933

    },
    {
      name: "Kahathuduwa",
      lat: 6.7837184,
      lng: 79.9798054

    },
    {
      name: "Kalubowila",
      lat: 6.8607468,
      lng: 79.8616943

    },
    {
      name: "Kanatta Junction",
      lat: 6.9084997,
      lng: 79.8747736

    },
    {
      name: "Kandana",
      lat: 7.0462179,
      lng: 79.8552412

    },
    {
      name: "Katubedda",
      lat: 6.8013583,
      lng: 79.8878292

    },
    {
      name: "Kelaniya",
      lat: 6.9565575,
      lng: 79.9029339

    },
    {
      name: "Kiribathgoda",
      lat: 6.9780619,
      lng: 79.9183037

    }

  ];
  routeNumber: any;
  data: any;
  details: any;
  constructor(private route: ActivatedRoute, private router: Router) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.data = this.router.getCurrentNavigation().extras.state.data
      console.log('data from state: '+ this.data);

    } else {
      console.log('nothing found here');

    }
  }
  ngOnInit() {
    this.findNumber();
    this.loadMap();

  }

  findNumber() {
    this.routeNumber = this.data.routeNumber;
    routeDetails.forEach(element => {
      if (element.routeNumber.includes(this.routeNumber)) {
        this.details = element;
        console.log('route number extracted: '+element);
        
      }     
    });
  }

  loadMap() {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyB8pf6ZdFQj5qw7rc_HSGrhUwQKfIe9ICw',
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyB8pf6ZdFQj5qw7rc_HSGrhUwQKfIe9ICw'
    });

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 6.8667833,
          lng: 79.8632827
        },
        zoom: 15
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    // let marker: Marker = this.map.addMarkerSync({
    //   title: 'Kollupitiya',
    //   icon: 'blue',
    //   animation: 'DROP',
    //   position: {
    //     lat: 6.910879,
    //     lng: 79.846345
    //   }
    // });

    // marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
    //   console.log('Clicked');

    // })

  

    this.latLngData.forEach(element => {
      if(this.details.places.includes(element.name)){
        let marker: Marker = this.map.addMarkerSync({
          title: element.name,
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: element.lat,
            lng: element.lng
          }
        });
    
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          console.log('Clicked');
    
        })
        
     }
    });
    }
  

  // placeMarker(element){
  //       let marker: Marker = this.map.addMarkerSync({
  //         title: element.name,
  //         icon: 'blue',
  //         animation: 'DROP',
  //         position: {
  //           lat: element.lat,
  //           lng: element.lng
  //         }
  //       });
    
  //       marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
  //         console.log('Clicked');
    
  //       })
      
    
  // }


}
