import { Component, OnInit } from '@angular/core';
import { RoleWrEntity } from 'src/app/models/roleWrEntity';
import { GuildService } from '../../services/guild.service';
import { ActivatedRoute } from "@angular/router";
import { GridUtils } from 'src/app/utils/gridUtils';

@Component({
  selector: 'app-role',
  templateUrl: './role-wr.component.html',
  styleUrls: ['./role-wr.component.scss']
})
export class RoleWrComponent implements OnInit {

  private GridApi;
  private GridApiColumns;
  public RoleData: RoleWrEntity[] = [];
  public DisplayData: RoleWrEntity[] = [];
  private Mode: string = "any";

  public Columns: Array<any>;

  public ColDef = GridUtils.GetRoleColDef();

  constructor(private guildService: GuildService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      //this.Mode = params.mode;
      this.initGrid(params.mode);
    });
  }
  private initGrid(mode: string) {
    this.Mode = mode;
    this.Columns = GridUtils.GetRoleWrColumns(mode);
    this.DisplayData = GridUtils.FilterDataPerPlayer(this.RoleData, this.Mode)
  }

  ngOnInit() {
    this.guildService.GetRoleWr().subscribe((data) => {
      this.guildService.ParseRoleWrData(data);
      this.RoleData = this.guildService.RoleWrData;
      this.DisplayData = GridUtils.FilterDataPerPlayer(this.RoleData, this.Mode)
      console.log("Role Data request success!");
    });
  }

  onGridReady(params) {
    this.GridApi = params.api;
    this.GridApiColumns = params.columnApi;
    //this.gridApi.setDomLayout("autoHeight");
    //this.gridApi.sizeColumnsToFit();
  }

}
