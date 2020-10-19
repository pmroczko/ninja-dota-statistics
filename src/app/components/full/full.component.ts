import { Component, OnInit } from '@angular/core';
import { GuildService } from '../../services/guild.service';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {

  private gridApi;
  private gridColumnApi;

  private GuildService: GuildService;
  public Values = [
    {header: "headerValue1",value: "valueValue1"},
    {header: "headerValue2",value: "valueValue2"}
  ]
  public Columns = [
    {
      headerName: "Column1",
      type: "text",
      field: "header"
    },
    {
      headerName: "Column2",
      type: "text",
      field: "value"
    }
  ]
  public ColDef = {
    flex: 1,
    minWidth: 110,
    editable: true,
    resizable: true,
  };
  constructor(guildService: GuildService) { 
    this.GuildService = guildService;
  }

  ngOnInit() {
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setDomLayout("autoHeight");
    //this.gridApi.sizeColumnsToFit();
  }

}
