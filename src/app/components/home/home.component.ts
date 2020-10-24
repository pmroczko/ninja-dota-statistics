import { Component, OnInit } from '@angular/core';
import { GuildService } from 'src/app/services/guild.service';
import { CalcUtils } from 'src/app/utils/calcUtils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public RecordData: any = undefined;

  constructor(private guildService: GuildService) { }

  private IsDataLoaded() {
    return this.RecordData !== undefined;
  }

  private PrintSquad(players, score): string {
    let ret = "";
    let ratio = CalcUtils.CalcWinRatio(score.wins, score.looses);
    const playerClass = 'record-player';
    const recordClass = 'record-score';
    const recordSpan = `<span class='${recordClass}'>`;
    const closeSpan = '</span>'
    ret += `<span class='${playerClass}' > ${players[0]}`;
    for (let i = 1; i < players.length; i++) {
      ret += `, ${players[i]} `
    }
    ret += '</span>'
    ret += `--> ${recordSpan}${score.wins}${closeSpan} wins,`;
    ret += ` ${recordSpan}${score.looses}${closeSpan} looses,`;
    ret += ` ${recordSpan}${ratio}${closeSpan} ratio`
    return ret;

  }

  private PrintBestSquad(key, description): string {
    let data = this.RecordData[key] as Array<any>;
    let players = data.slice(0, data.length - 1);
    let score = data[data.length - 1];
    let ret = `${description}: `
    ret += this.PrintSquad(players, score);
    return ret;

  }
  private PrintBestFightingCrew() {
    return this.PrintBestSquad('best_fight_crew', 'Best Fighting Crew');
  }
  private PrintBestNukingSquad() {
    return this.PrintBestSquad('best_nuking_squad', 'Best Nuking Squad');
  }
  private PrintBestSinglePlayer() {
    let data = this.RecordData['best_single'];
    let ret = "Best Player per Role:";
    const playerClass = 'record-player';
    const recordClass = 'record-score';
    const playerSpan = `<span class='${playerClass}'>`;
    const recordSpan = `<span class='${recordClass}'>`;
    const closeSpan = '</span>'
    data.forEach(e => {
      let score = e[2];
      let ratio = CalcUtils.CalcWinRatio(score.wins, score.looses);
      ret += `<br/>${e[0]}: `
      ret += `${playerSpan}${e[1]}${closeSpan}`
      ret += `--> ${recordSpan}${score.wins}${closeSpan} wins,`;
      ret += ` ${recordSpan}${score.looses}${closeSpan} looses,`;
      ret += ` ${recordSpan}${ratio}${closeSpan} ratio`
    })
    return ret;
  }

  private PrintBestCarrySupp() {
    let data = this.RecordData['top3_carry_sup'];
    let ret = "Top 3 carry/support:";
    const playerClass = 'record-player';
    const recordClass = 'record-score';
    const playerSpan = `<span class='${playerClass}'>`;
    const recordSpan = `<span class='${recordClass}'>`;
    const closeSpan = '</span>'
    data.forEach(e => {
      let score = e[2];
      let ratio = CalcUtils.CalcWinRatio(score.wins, score.looses);
      ret += `<br/>${playerSpan}${e[0]} & ${e[1]}${closeSpan}`;
      ret += `--> ${recordSpan}${score.wins}${closeSpan} wins,`;
      ret += ` ${recordSpan}${score.looses}${closeSpan} looses,`;
      ret += ` ${recordSpan}${ratio}${closeSpan} ratio`
    })
    return ret;

  }


  ngOnInit() {
    this.guildService.GetRoleRecords().subscribe((data) => {
      this.RecordData = data;
      console.log("Role Records request success!");
    });
  }

}
