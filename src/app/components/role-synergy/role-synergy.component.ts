import { Component, OnInit } from '@angular/core';
import { RoleSynergyEntity } from 'src/app/models/roleSynergyEntity';
import { GuildService } from 'src/app/services/guild.service';
import { GridUtils } from 'src/app/utils/gridUtils';

@Component({
  selector: 'app-role-synergy',
  templateUrl: './role-synergy.component.html',
  styleUrls: ['./role-synergy.component.scss']
})
export class RoleSynergyComponent implements OnInit {

  public DisplayData: RoleSynergyEntity[] = [];
  public Columns: Array<any> = GridUtils.GetRoleSynergyColumns();
  public ColDef = GridUtils.GetRoleColDef();
  constructor(private guildService: GuildService) { }

  ngOnInit() {
    this.guildService.GetRoleSynergy().subscribe((data) => {
      this.guildService.ParseRoleSynergyData(data);
      this.DisplayData = this.guildService.RoleSynergyData;
      //this.FilterDisplayData();
      console.log("Synergy Data request success!");
    });
  }

}
