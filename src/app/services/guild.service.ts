import { Injectable } from '@angular/core';
import { FullEntity } from '../models/FullEntity';

@Injectable({
  providedIn: 'root'
})
export class GuildService {

  private ParseFullData(): FullEntity[] {

    const parsePlayer = (e): any => {
      if (!e)
        return "";
      return `${e[0]} ${e[1]}`
    }
    return this.DemoData.payload.map(e => {
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
      return ret;
    })
  }
  constructor() {
    this.GuildId = this.DemoData["guild_id"];
    this.FullData = this.ParseFullData();
  }

  public GuildId = "unknown";
  public FullData: FullEntity[] = [];

  public DemoData = {
    "guild_id": "316887",
    "payload": [
      [
        [
          [
            "Bixkog",
            "Initiator"
          ],
          [
            "Dragon",
            "Nuker"
          ],
          [
            "Spawek",
            "Pusher"
          ]
        ],
        {
          "looses": 5,
          "wins": 28
        }
      ],
      [
        [
          [
            "Bixkog",
            "Escape"
          ],
          [
            "Dragon",
            "Nuker"
          ],
          [
            "Spawek",
            "Pusher"
          ]
        ],
        {
          "looses": 7,
          "wins": 28
        }
      ],
      [
        [
          [
            "Bixkog",
            "Disabler"
          ],
          [
            "goovie",
            "Initiator"
          ]
        ],
        {
          "looses": 8,
          "wins": 28
        }
      ],
    ]
  }

  public GuildId = "316887";
}
