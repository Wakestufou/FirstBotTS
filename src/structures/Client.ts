import { Client } from 'discord.js';
import fs from 'fs';
import 'dotenv/config';

export class ExtendedClient extends Client {
    constructor() {
        super({ intents: 32767 });
    }

    start() {
        this._loadEvents();
        this.login(process.env.TOKEN);
    }

    private _loadEvents() {
        const eventFiles = fs.readdirSync('./src/events');

        for (const file of eventFiles) {
            import(`../events/${file.replace('.ts', '')}`).then((event) => {
                const ev = new event.default();
                if (ev.isOnce()) {
                    this.once(ev.getName(), (...args) => ev.execute(...args));
                } else {
                    this.once(ev.getName(), (...args) => ev.execute(...args));
                }
            });
        }
    }
}
