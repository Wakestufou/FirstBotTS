import { Color } from '../utils/Colors';
import { ExtendedClient } from '../structures/Client';
import Events from '../utils/Events';
import Logger from '../utils/Logger';

export default class Ready implements Events {
    isOnce(): boolean {
        return true;
    }

    getName(): string {
        return 'ready';
    }

    async execute(client: ExtendedClient) {
        Logger.info(
            `Ready ! Logged in as ${client.user?.tag}`,
            'READY',
            Color.FgGreen
        );
    }
}
