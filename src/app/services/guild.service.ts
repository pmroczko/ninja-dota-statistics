import { Injectable } from '@angular/core';
import { RoleWrEntity } from '../models/roleWrEntity';
import { HttpClient } from '@angular/common/http';
import { AppConst } from '../appConst';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class GuildService {
  public GuildId = "unknown";
  public RoleData: RoleWrEntity[] = [];

  private ApiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.RoleData = [];
    this.ApiUrl = environment.apiUrl;
  }

  private ParseRoleData(data): RoleWrEntity[] {
    const parsePlayer = (e): any => {
      if (!e)
        return "";
      return `${e[0]} ${e[1]}`
    }
    return data.map(e => {
      let ret: RoleWrEntity = new RoleWrEntity;
      let players = e[0];
      let score = e[1];
      ret.Player1 = parsePlayer(players[0]);
      ret.Player2 = parsePlayer(players[1]);
      ret.Player3 = parsePlayer(players[2]);
      ret.Player4 = parsePlayer(players[3]);
      ret.Player5 = parsePlayer(players[4]);
      ret.Wins = +score['wins'];
      ret.Looses = +score['looses'];
      let ratio = ret.Wins / (ret.Wins + ret.Looses);
      ratio = Math.round(100 * ratio);
      ret.WinRatio = `${ratio}%`;
      return ret;
    })
  }


  public ParseData(data) {
    this.RoleData = this.ParseRoleData(data);
    this.GuildId = data["guild_id"]
  }

  public GetRoleData(): Observable<any> {
    if (this.GuildId == 'unknown') {
      this.GuildId = AppConst.DEFAULT_GUILD_ID;
    }
    return this.httpClient.get(`${this.ApiUrl}/roles_wr`);
  }

}
