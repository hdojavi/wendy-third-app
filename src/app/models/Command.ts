export interface Command {
    commandId: number;
    commandDisabledId: number;
    title: string;
    description: string;
    isDisabled: boolean;
    deviceId: number;
}
