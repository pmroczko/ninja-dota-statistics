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

  public ColDef = {
    flex: 1,
    minWidth: 110,
    editable: true,
    resizable: true,
  };

  constructor(private guildService: GuildService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      //this.Mode = params.mode;
      this.initGrid(params.mode);
    });
  }

  private FilterDisplayData() {
    this.DisplayData = this.RoleData;

    switch (this.Mode) {
      case "any":
        return;
      case "5":
        this.DisplayData = this.DisplayData.filter(d => d.Player5 != "");
        return;
      case "4":
        this.DisplayData = this.DisplayData.filter(d => d.Player5 == "" && d.Player4 != "");
        return;
      case "3":
        this.DisplayData = this.DisplayData.filter(d => d.Player4 == "" && d.Player3 != "")
        return;
      case "2":
        this.DisplayData = this.DisplayData.filter(d => d.Player3 == "" && d.Player2 != "")
        return;
      case "1":
        this.DisplayData = this.DisplayData.filter(d => d.Player2 == "")
        return;
    }
  }

  private initGrid(mode: string) {
    this.Mode = mode;
    this.Columns = GridUtils.GetRoleColumns(mode);
    this.FilterDisplayData();
  }

  ngOnInit() {
    this.guildService.GetRoleData().subscribe((data) => {
      this.guildService.ParseData(data);
      this.RoleData = this.guildService.RoleData;
      this.FilterDisplayData();
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
