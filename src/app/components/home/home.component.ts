import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public sort: string ;
  public games: Array<Game> = [];
  private routesub: Subscription = new Subscription;
  private gamesub: Subscription = new Subscription;
  public mypage:number = 1;

  constructor(
    private httpservice: HttpService,
    private router: Router,
    private activatesroute: ActivatedRoute
  ) { 
    this.sort = '';

  }

  ngOnInit(): void {
   this.routesub = this.activatesroute.params.subscribe((params: Params) => {
      if(params['game-search']){
        this.searchGames('metacrit',this.mypage, params['game-search'] );
      }else{
        this.searchGames('metacrit', this.mypage);
      }
    });
  }

  searchGames(sort: string ,  page: number, search?: string): void{
      this.gamesub = this.httpservice.getGameList(sort,page,search).subscribe((gameLisst: APIResponse<Game>) => 
      {
        // this.games.push.apply(this.games, gameLisst.results);
        this.games.push(...gameLisst.results);
        // this.games = gameLisst.results;
        console.log(this.games);
      });

  }
  gameDetails(id: string){
    this.router.navigate(['details', id])
  }

  onScroll(){
    this.mypage = this.mypage+1;
    this.routesub = this.activatesroute.params.subscribe((params: Params) => {
      if(params['game-search']){
        this.searchGames('metacritic',  this.mypage, params['game-search']);
      }else{
        this.searchGames('metacritic', this.mypage);
        console.log(this.mypage);
      }
    });
  }


  changeSort(sort: string ,  page: number, search?: string){
    page  = 1;
    this.games = [];
    this.gamesub = this.httpservice.getGameList(sort,page,search).subscribe((gameLisst: APIResponse<Game>) => 
    {
      // this.games.push.apply(this.games, gameLisst.results);
      this.games.push(...gameLisst.results);
      // this.games = gameLisst.results;
      console.log(this.games);
    });


  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.gamesub){
      this.gamesub.unsubscribe();
    }

    if (this.routesub) {
      this.routesub.unsubscribe();
    }
  }
}
