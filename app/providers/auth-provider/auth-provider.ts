import { Injectable, Inject } from '@angular/core';
import {FirebaseAuth, FirebaseRef, AngularFire} from 'angularFire2';
import {LocalStorage, Storage} from 'ionic-angular';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {
	
	local = new Storage(LocalStorage);
	constructor(public af:AngularFire) {}
	getAuth() {
		return firebase.auth();
	};

	signin(credentials) {
		return this.af.auth.login(credentials);
	}

	createAccount(credentials){
		return this.af.auth.createUser(credentials);
	}

	logout() {
		var auth = firebase.auth();
		auth.signOut();
	}
}

