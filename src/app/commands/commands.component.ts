import { Component, OnInit } from '@angular/core';
import { ApiWendyService } from '../services/api-wendy.service';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss']
})
export class CommandsComponent implements OnInit {

  commands: any;

  constructor(private api: ApiWendyService) { }

  ngOnInit() {
    this.api.getCommands(0/*userID*/).subscribe(commands => {
      this.commands = commands;
    });
  }

  editCommand(disable: boolean) {

  }

}
