import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommandsService } from '../services/commands.service';
import { User } from '../models/User';
import { Command } from '../models/Command';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss']
})
export class CommandsComponent implements OnInit {

  user: User;
  commands: Command[];

  constructor(private auth: AuthService, private commandsService: CommandsService) { }

  ngOnInit() {
    this.user = this.auth.getUserLoggedValue();
    this.commandsService.getCommands(this.user.deviceId).subscribe(commands => {
      this.commands = commands;
    });
  }

  editCommand(commandId) {
    const command = this.commands.filter(c => c.commandId == commandId)[0];
    this.commandsService.updateCommand(command).subscribe(c => {
      const commandIndex = this.commands.findIndex(i => i.commandId == c.commandId);
      this.commands[commandIndex] = c;
    }, e => console.error(e));
  }

}
