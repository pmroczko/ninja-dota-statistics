import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Ninja Dota Statistics';

  public form: FormGroup = new FormGroup({
    guildId: new FormControl('1234'),
  });
}
