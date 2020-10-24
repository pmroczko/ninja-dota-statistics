import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoleSynergyEntity } from 'src/app/models/roleSynergyEntity';
import { GuildService } from 'src/app/services/guild.service';
import { GridUtils } from 'src/app/utils/gridUtils';

@Component({
  selector: 'app-role-synergy',
  templateUrl: './role-synergy.component.html',
  styleUrls: ['./role-synergy.component.scss']
})
export class RoleSynergyComponent implements OnInit {

  public SynergyData: RoleSynergyEntity[] = [];
  public DisplayData: RoleSynergyEntity[] = [];
  public Columns: Array<any>;
  public ColDef = GridUtils.GetRoleColDef();
  private Mode;
  constructor(private guildService: GuildService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.initGrid(params.mode);
    });
  }
  private initGrid(mode: string) {
    this.Mode = mode;
    this.Columns = GridUtils.GetRoleSynergyColumns(mode);
    this.DisplayData = GridUtils.FilterDataPerPlayer(this.SynergyData, this.Mode);
  }

  ngOnInit() {
    this.guildService.GetRoleSynergy().subscribe((data) => {
      this.guildService.ParseRoleSynergyData(data);
      this.SynergyData = this.guildService.RoleSynergyData;
      this.DisplayData = GridUtils.FilterDataPerPlayer(this.SynergyData, this.Mode)
      console.log("Synergy Data request success!");
    });
  }

}
