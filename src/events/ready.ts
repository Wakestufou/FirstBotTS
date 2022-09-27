import { ExtendedClient } from 'src/structures/Client';
import Events from 'src/utils/Events';

export default class Ready implements Events {
    isOnce(): boolean {
        return true;
    }

    getName(): string {
        return 'ready';
    }

    async execute(client: ExtendedClient) {
        console.log(`Ready ! Logged in as ${client.user?.tag}`);
    }
}
