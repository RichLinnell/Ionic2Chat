import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ChatsPage} from '../chats/chats';
import {AccountPage} from '../account/account';
import {UsersPage} from '../users/users';

/*
  Generated class for the TabsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/tabs/tabs.html',
})
export class TabsPage {

	chats = ChatsPage;
	users = UsersPage;
	profile = AccountPage;
}
