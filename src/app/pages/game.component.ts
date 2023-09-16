import { AppLayout } from '../views/layouts/app-layout.component';
import { BoardComponent } from '../game/board.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IConfig } from '../defs';
import { CONFIG } from '../data';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, AppLayout, BoardComponent],
  templateUrl: './game.component.html',
  styles: [
  ]
})
export class GameComponent {

    public config: IConfig = CONFIG;

}
