import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Command } from '../models/Command';
import { Constants } from '../utils/Constants';

@Injectable({
  providedIn: 'root'
})
export class CommandsService {

  private URL_BASE_COMMANDS = `${Constants.BACKEND_IP}/wendy/commands`;

  constructor(private http: HttpClient) { }

  getCommands(deviceId) {
    return this.http.get<Command[]>(`${this.URL_BASE_COMMANDS}/${deviceId}`);
  }

  updateCommand(command: Command) {
    return this.http.put<Command>(`${this.URL_BASE_COMMANDS}`, command);
  }
}
