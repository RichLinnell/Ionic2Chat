import { Injectable, Inject } from '@angular/core';
import {FirebaseRef, AngularFire} from 'angularfire2';
import {LocalStorage, Storage} from 'ionic-angular';
import {Camera} from 'ionic-native';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {
	local = new Storage(LocalStorage);
  	constructor(public af:AngularFire) {}

  	// Get Current User's UID
  	getUid() {
  		return this.local.get('userInfo')
  			.then(value => {
  				let newValue = JSON.parse(value);
  				return newValue.uid;
  			});
  	}

  	//Create a user in Firebase
  	createUser(userCredentials){
  		this.getUid().then(uid => {
  			let currentUserRef = this.af.database.object(`/users/${uid}`);
  			currentUserRef.set({email: userCredentials.email});
  		});
  	}

  	//get into of single user
  	getUser() {
  		// Getting UID of Logged In User
  		return this.getUid().then(uid => {
  			return this.af.database.object(`/users/${uid}`);
  		});
  	}

  	getAllUsers() {
  		return this.af.database.list('/users');
  	}

  	// Get base64 Picture of User
  	getPicture() {
  		let base64Picture;
  		let options = {
  			destinationType: 0,
  			sourceType: 0,
  			encodingType: 0
  		};

  		let promise = new Promise((resolve, reject) => {
  			Camera.getPicture(options).then((imageData) => {
  				base64Picture = "data:image/jpeg;base64," + ImageData;
  				resolve(base64Picture);
  			}, (error) => {
  				reject(error);
  			});
  		});
  		return promise;
  	}

  	//Update provide Picture of User
  	updatePicture(){
  		this.getUid().then(uid => {
  			let pictureRef = this.af.database.object(`/users/${uid}/picture`);
  			this.getPicture()
  				.then((image) => {
  					pictureRef.set(image);
  				});
  		});
  	}
}

