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
        const commanndFiles = await globPromise(
            `${__dirname}\\..\\commands\\*\\*{.ts,.js}`.replace(/\\/g, '/')
        );

        let iteration = 0;

        commanndFiles.forEach(async (filePath) => {
            const command: CommandType = await this._importFile(filePath);
            if (!command.name) return;

            Logger.info(`Enregistrement de la commande : ${command.name}...`);

            this.commands.set(command.name, command);
            slashCommands.push(command);

            iteration++;
            if (iteration >= commanndFiles.length) {
                if (process.argv.includes('--DEV')) {
                    this._registerCommands({
                        commands: slashCommands,
                        guildID: process.env.GUILD_DEV,
                    });
                } else {
                    this._registerCommands({ commands: slashCommands });
                }
            }
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
                Logger.info(
                    `Enregistrement des commandes pour la guild : ${guildID}`
                );

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
                Logger.info(`Enregistrement des commandes global`);
                await rest.put(Routes.applicationCommands(process.env.APP_ID), {
                    body: commands,
                });
            }
        }
    }

    private async _loadEvents() {
        Logger.info('Enregistrement des events...');

        const eventsFiles = await globPromise(
            `${__dirname}\\..\\events\\*{.ts,.js}`.replace(/\\/g, '/')
        );

        eventsFiles.forEach(async (filePath) => {
            const event: Event<keyof ClientEvents> = await this._importFile(
                filePath
            );

            this.on(event.event, event.run);
            Logger.info(`Events ${event.event} enregistrés !`);
        });

        Logger.info('Events enregistrés !');
    }

    private async _importFile(filePath: string) {
        return (await import(filePath))?.default;
    }
}
