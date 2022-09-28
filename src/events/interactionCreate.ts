import { Event } from '../structures/Event';
import { client } from '..';
import { CommandInteractionOptionResolver } from 'discord.js';
import { ExtendedInteraction } from '../types/Command';

export default new Event('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
        await interaction.deferReply();

        const command = client.commands.get(interaction.commandName);

        if (!command)
            return interaction.followUp('You have used a non exitent command');

        command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction,
        });
    }
});
