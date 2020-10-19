import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuildService {

  constructor() { }

  public FullData = {
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
