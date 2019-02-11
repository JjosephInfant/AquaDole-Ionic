import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { AndroidPermissions} from '@ionic-native/android-permissions';
import { Geolocation } from '@ionic-native/geolocation';
import { AquaStorage } from '../../app/app.storage';

//var permissions = cordova.plugins.permissions;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AquaStorage, ]
})
export class HomePage {
  itemCount = 1;
  totalCost = 50;
  currentUser = "";
  currentPhoneNumber = "";
  constructor(public navCtrl: NavController, public platform: Platform, private androidPermissions : AndroidPermissions, private geolocation: Geolocation, private aquaStorage : AquaStorage, private alertCtrl: AlertController) {
    
  }

  ionViewDidLoad() {
    this.aquaStorage.getAquaAppStorage("UserName").then(userName =>{
      this.currentUser = userName;
    }).catch(error =>{
      console.error("Error on storage query -->"+error);
    });

    this.aquaStorage.getAquaAppStorage("PhoneNumber").then(phoneNumber =>{
      this.currentPhoneNumber = phoneNumber;
    }).catch(error =>{
      console.error("Error on storage query -->"+error);
    });
  }

  addCount(){
    this.itemCount = this.itemCount + 1;
    this.totalCost = this.itemCount * 50;
  }

  reduceCount(){
    if(this.itemCount !== 1){
      this.itemCount = this.itemCount - 1;
      this.totalCost = this.itemCount * 50;
    }
  }

  async placeOrder() {

    let self = this;

    let list = [
      this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,
      this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION
    ];
    
    // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(
    //   success => console.log('Permission granted'),
    //   err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS)
    // );

    // this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.SEND_SMS]);

     await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(
      success => {
        console.log("Permission granted");
      },
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
    );

    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION, this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION]);

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log('Success getting location', resp.coords);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
    // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
    //   success => {
    //     console.log('ACCESS_COARSE_LOCATION Permission granted');
    //     this.geolocation.getCurrentPosition().then((resp) => {
    //       // resp.coords.latitude
    //       // resp.coords.longitude
    //       console.log('Success getting location', resp.coords);
    //      }).catch((error) => {
    //        console.log('Error getting location', error);
    //      });
         
    //      let watch = this.geolocation.watchPosition();
    //      watch.subscribe((data) => {
    //       // data can be a set of coordinates, or an error (if an error occurred).
    //       // data.coords.latitude
    //       // data.coords.longitude
    //       console.log('Success getting watch', data);
    //      }, error=>{
    //       console.log('Error getting watch', error);
    //      });
    //   },
    //   err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
    // );

    // this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION]);

    
  }

  presentAlert(title, msg) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
