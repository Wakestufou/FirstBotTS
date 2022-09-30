import { Event } from '../structures/Event';
import { client } from '..';
import { CommandInteractionOptionResolver } from 'discord.js';
import { ExtendedInteraction } from '../types/Command';
import Logger from '../utils/Logger';

export default new Event('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
        await interaction.deferReply();

        const command = client.commands.get(interaction.commandName);

        if (!command)
            return interaction.followUp('You have used a non exitent command');

        try {
            command.run({
                args: interaction.options as CommandInteractionOptionResolver,
                client,
                interaction: interaction as ExtendedInteraction,
            });
        } catch (error) {
            Logger.error(
                `Error when executing the ${command.name} command`,
                error as Error
            );
        }
    }
});
