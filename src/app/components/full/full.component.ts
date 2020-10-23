import { Component, OnInit } from '@angular/core';
import { FullEntity } from 'src/app/models/fullEntity';
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
      sortable: true
    },
    {
      headerName: "Looses",
      field: "Looses",
      sortable: true
    },
    {
      headerName: "WinLooseRatio",
      field: "WinLooseRatio",
      sortable: true
    },
  ]
  public ColDef = {
    flex: 1,
    minWidth: 110,
    editable: true,
    resizable: true,
  };
  
  constructor(private guildService: GuildService) { 
  }

  ngOnInit() {
    this.guildService.GetData().subscribe((data) => {
      this.guildService.ParseData(data);
      this.FullData = this.guildService.FullData;
      console.log("Request success!");
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    //this.gridApi.setDomLayout("autoHeight");
    //this.gridApi.sizeColumnsToFit();
  }

}
