import { EmbedBuilder } from 'discord.js';
import path from 'path';
import { Command } from '../../structures/Command';

export default new Command({
    name: 'help',
    description: 'Command help',
    categories: path.dirname(__filename).split(path.sep).pop() as string,
    run: async ({ interaction, client }) => {
        await interaction.deferReply();

        const embedHelp = new EmbedBuilder()
            .setTitle('Help')
            .setDescription('Command help')
            .setColor(0x0099ff);

        const map = new Map<string, string>();

        Promise.all(
            client.commands.map((value) => {
                if (map.has(value.categories)) {
                    map.set(
                        value.categories,
                        map.get(value.categories) +
                            `\n${value.name} : ${value.description}`
                    );
                } else {
                    map.set(
                        value.categories,
                        `${value.name} : ${value.description}`
                    );
                }
            })
        )
            .then(() => {
                map.forEach((value, key) => {
                    embedHelp.addFields({
                        name: key,
                        value: value,
                    });
                });
            })
            .then(async () => {
                await interaction.followUp({ embeds: [embedHelp] });
            });
    },
});
