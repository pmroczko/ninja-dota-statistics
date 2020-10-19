import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppConst } from './appConst';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Ninja Dota Statistics';

  public form: FormGroup = new FormGroup({
    guildId: new FormControl(AppConst.DEFAULT_GUILD_ID),
  });

  onSubmit(guildId) {
    console.warn(`Submit with id ${guildId}`);
  }
}
