import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AquaStorage } from '../../app/app.storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers : [AquaStorage]
})
export class LoginPage {

  registerCredentials = { name: '', phone: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams, private aquaStorage : AquaStorage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  handleLogin(){
    if(this.registerCredentials.name !== "" && this.registerCredentials.phone !== ""){
      this.aquaStorage.setAquaAppStorage("UserName", this.registerCredentials.name);
      this.aquaStorage.setAquaAppStorage("PhoneNumber", this.registerCredentials.phone);
      this.navCtrl.push(HomePage)
    }
  }

}
