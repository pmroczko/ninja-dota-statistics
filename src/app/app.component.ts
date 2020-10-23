import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppConst } from './appConst';
import { GuildService } from './services/guild.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Ninja Dota Statistics';
  guildId = AppConst.DEFAULT_GUILD_ID;

  public constructor(private guildService: GuildService) {
    this.guildService.GuildId = this.guildId;
  }

  public form: FormGroup = new FormGroup({
    guildId: new FormControl(this.guildId),
  });

  onSubmit(guildId) {
    console.warn(`Submit with id ${guildId}`);
    //doesnt work yet
    /*
    this.guildService.GuildId = guildId;
    this.guildService.GetData().subscribe((data) => {
      this.guildService.ParseData(data);
      this.FullData = this.guildService.FullData;
      console.log("Request success!");
    });*/
  }
}
