import { Device } from './Device';
import { User } from './User';
export class Message {
    messageId: number;
    content: string;
    date: Date;
    isFromDevice: boolean;
    deviceId: number;
    userId: number;
    device: Device;
    user: User
}