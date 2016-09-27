import { Injectable, Inject } from '@angular/core';
import { Alert, AlertController } from 'ionic-angular';

@Injectable()
export class UtilProvider {
	constructor(private alertCtrl: AlertController){}
	doAlert(title, message, buttonText): Alert {
		console.log(message);
		let alert = this.alertCtrl.create({
			title: title,
			subTitle: message,
			buttons: [buttonText]
		});
		//alert.present();
		return alert;
	}
}

