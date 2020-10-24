import { Component, OnInit } from '@angular/core';
import { FullEntity } from 'src/app/models/fullEntity';
import { GuildService } from '../../services/guild.service';
import { ActivatedRoute } from "@angular/router";
import { GridUtils } from 'src/app/utils/gridUtils';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {

  private GridApi;
  private GridApiColumns;
  public FullData: FullEntity[] = [];
  public DisplayData: FullEntity[] = [];
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
    this.DisplayData = this.FullData;
    let modeNumber: Number = +this.Mode;
    if (modeNumber == 5 || this.Mode == "any")
      return;

    if (modeNumber < 5) {
      this.DisplayData = this.DisplayData.filter(d => d.Player5 == "")
    }
    if (modeNumber < 4) {
      this.DisplayData = this.DisplayData.filter(d => d.Player4 == "")
    }
    if (modeNumber < 3) {
      this.DisplayData = this.DisplayData.filter(d => d.Player3 == "")
    }
    if (modeNumber < 2) {
      this.DisplayData = this.DisplayData.filter(d => d.Player2 == "")
    }
  }

  private initGrid(mode: string) {
    this.Mode = mode;
    this.Columns = GridUtils.GetColumnsFull(mode);
    this.FilterDisplayData();
  }

  ngOnInit() {
    this.guildService.GetFullData().subscribe((data) => {
      this.guildService.ParseData(data);
      this.FullData = this.guildService.FullData;
      this.FilterDisplayData();
      console.log("Full Data request success!");
    });
  }

  onGridReady(params) {
    this.GridApi = params.api;
    this.GridApiColumns = params.columnApi;
    //this.gridApi.setDomLayout("autoHeight");
    //this.gridApi.sizeColumnsToFit();
  }

}
