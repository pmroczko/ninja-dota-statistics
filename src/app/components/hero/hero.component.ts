import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConst } from 'src/app/appConst';
import { GuildService } from 'src/app/services/guild.service';
import { GridUtils } from 'src/app/utils/gridUtils';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  private HeroRawData: Array<any>;
  private HeroRelData: Array<any>;
  private HeroTopData: Array<any>;
  private HeroPlayerData: Array<any>;

  private DisplayData: Array<any>;
  public Columns: Array<any>;
  public ColDef = GridUtils.GetRoleColDef();

  private Mode: string;

  constructor(private guildService: GuildService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.initGrid(params.mode);
    });
  }
  private initGrid(mode: string) {
    this.Mode = mode;
    this.Columns = GridUtils.GetHeroColDef(this.Mode);
    this.SetDisplayData(mode);
  }

  private SetDisplayData(mode: string) {
    switch (mode) {
      case AppConst.HERO_TYPE_RAW:
        this.DisplayData = this.HeroRawData;
        break;
      case AppConst.HERO_TYPE_REL:
        this.DisplayData = this.HeroRelData;
        break;
      case AppConst.HERO_TYPE_TOP:
        this.DisplayData = this.HeroTopData;
        break;
      case AppConst.HERO_TYPE_PLAYER:
        this.DisplayData = this.HeroPlayerData;
        break;
      default:
        throw new Error(`Unknown mode ${mode}`)
    }
  }

  ngOnInit() {
    this.guildService.GetHeroRecords().subscribe((data) => {
      this.guildService.ParseHeroData(data);
      this.HeroRawData = this.guildService.HeroRawData;
      this.HeroRelData = this.guildService.HeroRelData;
      this.HeroTopData = this.guildService.HeroTopData;
      this.HeroPlayerData = this.guildService.HeroPlayerData;

      this.SetDisplayData(this.Mode);
      console.log("Hero Data request success!");
    });
  }

}
