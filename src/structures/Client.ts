import {
    ApplicationCommandDataResolvable,
    Client,
    ClientEvents,
    Collection,
    REST,
    Routes,
} from 'discord.js';
import 'dotenv/config';
import Logger from '../utils/Logger';
import { CommandType } from '../types/Command';
import glob from 'glob';
import { promisify } from 'util';
import { RegisterCommandsOptions } from '../types/client';
import { Event } from './Event';

const globPromise = promisify(glob);

export class ExtendedClient extends Client {
    commands: Collection<string, CommandType> = new Collection();

    constructor() {
        super({ intents: 32767 });
    }

    start() {
        this._loadEvents();
        this._loadCommands();
        this.login(process.env.TOKEN);
    }

    private async _loadCommands() {
        const slashCommands: ApplicationCommandDataResolvable[] = [];
        const commandFiles = await globPromise(
            `${__dirname}\\..\\commands\\*\\*{.ts,.js}`.replace(/\\/g, '/')
        );

        Promise.all(
            commandFiles.map(async (filePath) => {
                const command: CommandType = await this._importFile(filePath);
                if (!command.name) return;

                Logger.info(`Loading (/) commands : ${command.name}...`);

                this.commands.set(command.name, command);
                slashCommands.push(command);
            })
        )
            .then(() => {
                if (process.argv.includes('--DEV')) {
                    this._registerCommands({
                        commands: slashCommands,
                        guildID: process.env.GUILD_DEV,
                    });
                } else {
                    this._registerCommands({ commands: slashCommands });
                }
            })
            .catch((error) => {
                Logger.fatal(`Error while loading (/) commands`, error, 500);
            });
    }

    private async _registerCommands({
        commands,
        guildID,
    }: RegisterCommandsOptions) {
        if (process.env.TOKEN && process.env.APP_ID) {
            const rest = new REST({ version: '10' }).setToken(
                process.env.TOKEN
            );
            if (guildID) {
                Logger.info(`Registering (/) commands for guild : ${guildID}`);

                await rest.put(
                    Routes.applicationGuildCommands(
                        process.env.APP_ID,
                        guildID
                    ),
                    {
                        body: commands,
                    }
                );
            } else {
                Logger.info(`Registering global (/) commands`);
                await rest.put(Routes.applicationCommands(process.env.APP_ID), {
                    body: commands,
                });
            }
        }
    }

    private async _loadEvents() {
        Logger.info('Loading events...');

        const eventsFiles = await globPromise(
            `${__dirname}\\..\\events\\*{.ts,.js}`.replace(/\\/g, '/')
        );

        Promise.all(
            eventsFiles.map(async (filePath) => {
                const event: Event<keyof ClientEvents> = await this._importFile(
                    filePath
                );

                this.on(event.event, event.run);
                Logger.info(`Events ${event.event} loaded !`);
            })
        )
            .then(() => {
                Logger.info('All events loaded !');
            })
            .catch((error) => {
                Logger.fatal(`Error while loading events`, error, 500);
            });
    }

    private async _importFile(filePath: string) {
        return (await import(filePath))?.default;
    }
}
