import { Injectable } from '@angular/core';
import { FullEntity } from '../models/fullEntity';
import * as EXAMPLE from '../../dota_example.json';
import { HttpClient } from '@angular/common/http';
import { AppConst } from '../appConst';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class GuildService {
  
  private ParseFullData(data): FullEntity[] {

    const parsePlayer = (e): any => {
      if (!e)
        return "";
      return `${e[0]} ${e[1]}`
    }
    return data.payload.map(e => {
      let ret: FullEntity = new FullEntity;
      let players = e[0];
      let score = e[1];
      ret.Player1 = parsePlayer(players[0]);
      ret.Player2 = parsePlayer(players[1]);
      ret.Player3 = parsePlayer(players[2]);
      ret.Player4 = parsePlayer(players[3]);
      ret.Player5 = parsePlayer(players[4]);
      ret.Wins = +score['wins'];
      ret.Looses = +score['looses'];
      ret.WinLooseRatio = Math.round(100*ret.Wins / ret.Looses)/100;
      return ret;
    })
  }
  constructor(private httpClient: HttpClient) {
    this.FullData = [];
  }


  public ParseData(data) {
    this.FullData = this.ParseFullData(data);
    this.GuildId = data["guild_id"]
  }

  public GetData(): Observable<any> {
    return this.httpClient.get(AppConst.FULL_URL);
  }

  public GuildId = "unknown";
  public FullData: FullEntity[] = [];

}
