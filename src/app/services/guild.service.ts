import { Injectable } from '@angular/core';
import { FullEntity } from '../models/fullEntity';
import * as EXAMPLE from '../../dota_example.json';
import { HttpClient } from '@angular/common/http';
import { AppConst } from '../appConst';

import axios from "axios";
import { AxiosInstance } from "axios";
import { ErrorHandler } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class GuildService {
	private axiosClient: AxiosInstance;
  private errorHandler: ErrorHandler;
  
  private ParseFullData(): FullEntity[] {

    const parsePlayer = (e): any => {
      if (!e)
        return "";
      return `${e[0]} ${e[1]}`
    }
    return EXAMPLE.payload.map(e => {
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
  constructor(errorHandler: ErrorHandler) {
    this.errorHandler = errorHandler;
 
		// The ApiClient wraps calls to the underlying Axios client.
		this.axiosClient = axios.create({
			timeout: 3000,
			headers: {
        "X-Initialized-At": Date.now().toString(),
        "Access-Control-Allow-Origin": "*"
			}
		});
    this.FullData = [];
  }


  public async GetData() {
    try {
 
			var axiosResponse = await this.axiosClient.request<any>({
				method: "get",
				url: AppConst.FULL_URL,
				params: []
      });
      this.FullData = axiosResponse.data;
 
		} catch ( error ) {
 
			console.error("Communication error: "+error)
 
		}
  }

  private LoadDemoData() {
    this.GuildId = EXAMPLE["guild_id"];
    this.FullData = this.ParseFullData();    
  }

  public GuildId = "unknown";
  public FullData: FullEntity[] = [];

}
