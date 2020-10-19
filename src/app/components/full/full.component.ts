import { Component, OnInit } from '@angular/core';
import { FullEntity } from 'src/app/models/FullEntity';
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
  public FullData: FullEntity[] = [];
  public Columns = [
    {
      headerName: "Player1",
      field: "Player1",
      type: "text",
    },
    {
      headerName: "Player2",
      field: "Player2",
      type: "text",
    },
    {
      headerName: "Player3",
      field: "Player3",
      type: "text",
    },
    {
      headerName: "Player4",
      field: "Player4",
      type: "text",
    },
    {
      headerName: "Player5",
      field: "Player5",
      type: "text",
    },
    {
      headerName: "Wins",
      field: "Wins",
      type: "number",
      sortable: true
    },
    {
      headerName: "Looses",
      field: "Looses",
      type: "number",
      sortable: true
    },
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
    this.FullData = this.GuildService.FullData;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setDomLayout("autoHeight");
    //this.gridApi.sizeColumnsToFit();
  }

}
