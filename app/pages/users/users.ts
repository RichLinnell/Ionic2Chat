import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {UserProvider} from '../../providers/user-provider/user-provider';
import {ChatViewPage} from '../chat-view/chat-view';


/*
  Generated class for the UsersPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/users/users.html',
})
export class UsersPage {
	users:Observable<any>;
	uid:string;
  constructor(private nav: NavController, public userProvider: UserProvider) {
  	userProvider.getUid().then(uid => {
  		this.uid = uid;
  		this.users = this.userProvider.getAllUsers();
  	});
  	
  }

  openChat(key) {
  	let param = {uid: this.uid, interlocutor: key};
  	this.nav.push(ChatViewPage, param);
  }

}
