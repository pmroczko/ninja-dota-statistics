import { Injectable } from '@angular/core';
import { RoleWrEntity } from '../models/roleWrEntity';
import { HttpClient } from '@angular/common/http';
import { AppConst } from '../appConst';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from './../../environments/environment';
import { RoleSynergyEntity } from '../models/roleSynergyEntity';
import { CalcUtils } from '../utils/calcUtils';
import { StringUtils } from '../utils/stringUtils';

@Injectable({
  providedIn: 'root'
})

export class GuildService {
  public GuildId = "unknown";
  public RoleWrData: RoleWrEntity[] = [];
  public RoleSynergyData: RoleSynergyEntity[] = [];

  private ApiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.RoleWrData = [];
    this.ApiUrl = environment.apiUrl;
  }

  public ParseRoleWrData(data): void {
    this.RoleWrData = data.map(e => {
      let ret: RoleWrEntity = new RoleWrEntity;
      let players = e[0];
      let score = e[1];
      ret.Player1 = StringUtils.ParsePlayer(players[0]);
      ret.Player2 = StringUtils.ParsePlayer(players[1]);
      ret.Player3 = StringUtils.ParsePlayer(players[2]);
      ret.Player4 = StringUtils.ParsePlayer(players[3]);
      ret.Player5 = StringUtils.ParsePlayer(players[4]);
      ret.Wins = +score['wins'];
      ret.Looses = +score['looses'];
      ret.WinRatio = CalcUtils.CalcWinRatio(ret.Wins, ret.Looses);
      return ret;
    })
    this.GuildId = data["guild_id"]
  }

  public ParseRoleSynergyData(data): void {
    this.RoleSynergyData = data.map(e => {
      let ret: RoleSynergyEntity = new RoleSynergyEntity();
      let players = e[0];
      let score = e[1];
      ret.Player1 = StringUtils.ParsePlayer(players[0]);
      ret.Player2 = StringUtils.ParsePlayer(players[1]);
      ret.WinFactor = score;
      return ret;
    })
  }

  public GetRoleWr(): Observable<any> {
    if (this.GuildId == 'unknown') {
      this.GuildId = AppConst.DEFAULT_GUILD_ID;
    }
    return this.httpClient.get(`${this.ApiUrl}/roles_wr`);
  }

  public GetRoleSynergy(): Observable<any> {
    if (this.GuildId == 'unknown') {
      this.GuildId = AppConst.DEFAULT_GUILD_ID;
    }
    return this.httpClient.get(`${this.ApiUrl}/roles_synergy`);
  }

  public GetRoleRecords(): Observable<any> {
    if (this.GuildId == 'unknown') {
      this.GuildId = AppConst.DEFAULT_GUILD_ID;
    }
    return this.httpClient.get(`${this.ApiUrl}/roles_records`);
  }
}
