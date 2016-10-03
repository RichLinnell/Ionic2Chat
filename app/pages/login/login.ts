import { Component } from '@angular/core';
import { NavController, Storage, LocalStorage } from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {FormBuilder, Validators} from '@angular/common';
import {validateEmail} from '../../validators/email';
import {AuthProvider} from '../../providers/auth-provider/auth-provider';
import {UserProvider} from '../../providers/user-provider/user-provider';
import {UtilProvider} from '../../providers/util-provider/util-provider';
import {FirebaseAuth} from 'angularfire2'

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
	loginForm: any;
	storage = new Storage(LocalStorage);
  constructor(public nav: NavController,
  	form: FormBuilder,
  	public auth: AuthProvider,
  	public userProvider: UserProvider,
  	public util: UtilProvider) {

  	this.loginForm = form.group({
  		email: ["", Validators.compose([Validators.required,
  			validateEmail])],
  		password:["",Validators.required]
  	});
  }

  signin(){
  	this.auth.signin(this.loginForm.value)
  		.then((data)=>{
  			this.storage.set('userInfo', JSON.stringify(data));
  			this.nav.push(TabsPage);
  		}, (error) =>{
  			let errorMessage = "Enter correct Email and Password";
  			let alert = this.util.doAlert("Error", errorMessage, "Ok");
  			this.nav.present(alert);
  		});
  };

  createAccount(){
  	let credentials = this.loginForm.value;
  	this.auth.createAccount(credentials)
  		.then((data) => {
  			this.storage.set('userInfo', JSON.stringify(data));
  			this.userProvider.createUser(credentials);
  		}, (error) => {
  			let errorMessage = "Account Already Exists";
  			let alert = this.util.doAlert("Error", errorMessage, "Ok");
  			this.nav.present(alert);
  		});
  };

}
