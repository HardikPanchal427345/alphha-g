import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  gamerating =  0;
  gameid!: string;
  game!: Game;
  routesub!: Subscription;
  gamesub!: Subscription;
  public maxid = 0;
  public maxval = 0;

  

  constructor(
    private activatedroute: ActivatedRoute,
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.routesub = this.activatedroute.params.subscribe((params: Params ) => {
      this.gameid  = params['id'];
      this.getGameDetails(this.gameid);
    });
    
  }

  getGameDetails(id: string):void{
    this.gamesub = this.http
      .getGameDetails(id)
      .subscribe((gameresp: Game) => {
        this.game = gameresp;
        console.log(this.game);
        console.log(this.game.stores);
        setTimeout(() => {
          this.findrating();
          // this.gamerating = this.game.metacritic;
        }, 1000);
      })
  }

  findrating(){
    for (let index = 1; index < this.game.ratings.length; index++) {
      // const element = array[index];
      if (this.game.ratings[index].count > this.maxval) {
        this.maxval = this.game.ratings[index].count;
        this.maxid = this.game.ratings[index].id;
      }
    }    
    console.log(this.maxid);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.gamesub) {
      this.gamesub.unsubscribe();
    }

    if (this.routesub) {
      this.routesub.unsubscribe();
    }
  }
}
