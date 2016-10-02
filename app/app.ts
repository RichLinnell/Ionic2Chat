import { Component, Inject } from '@angular/core';
import { ionicBootstrap, Platform, NavController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import {LoginPage} from './pages/login/login';
import {TabsPage} from './pages/tabs/tabs';
import { HomePage } from './pages/home/home';

import {AuthProvider} from './providers/auth-provider/auth-provider';
import {UserProvider} from './providers/user-provider/user-provider';
import {UtilProvider} from './providers/util-provider/util-provider'; 
import {ChatsProvider} from './providers/chats-provider/chats-provider';

//firebase Includes
import {
	FIREBASE_PROVIDERS,
	defaultFirebase,
	firebaseAuthConfig,
	FirebaseRef,
	AngularFire,
	AuthProviders,
	AuthMethods
} from 'angularfire2';

@Component({
  template: '<ion-nav id="nav" [root]="rootPage" #content></ion-nav>'
})
export class MyApp {
	message: string;
	rootPage: any;

  constructor(public authProvider:AuthProvider,  public platform: Platform) {
    let auth = authProvider.getAuth();
    auth.onAuthStteChanged(user => {
    	if(user) {
    		this.rootPage = TabsPage;
    	} else {
    		this.rootPage = LoginPage;
    	}
    })
    platform.ready().then(() => {

      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp, [FIREBASE_PROVIDERS, defaultFirebase({
	apiKey: "AIzaSyBNo7JksyWwgpG4fTB6PzYlxu5V0_0EF0Q",
	authDomain: "test-fcm-9a4b4.firebaseapp.com",
    databaseURL: "https://test-fcm-9a4b4.firebaseio.com",
    storageBucket: "test-fcm-9a4b4.appspot.com"
}),
	firebaseAuthConfig({
		provider: AuthProviders.Password,
		method: AuthMethods.Password,
		remember: 'default',
		scope: ['email']
	}),
	AuthProvider,
	ChatsProvider,
	UserProvider,
	UtilProvider]
	);
