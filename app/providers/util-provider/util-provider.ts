import { Injectable, Inject } from '@angular/core';
import { Alert } from 'ionic-angular';

@Injectable()
export class UtilProvider {
	
	doAlert(title, message, buttonText): Alert {
		console.log(message);
		let alert = Alert.create({
			title: title,
			subTitle: message,
			buttons: [buttonText]
		});
		//alert.present();
		return alert;
	}
}

