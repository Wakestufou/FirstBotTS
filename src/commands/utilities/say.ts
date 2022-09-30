import { Command } from '../../structures/Command';
import Logger from '../../utils/Logger';
import path from 'path';

export default new Command({
    name: 'say',
    description: 'Send a message via the bot.',
    categories: path.dirname(__filename).split(path.sep).pop() as string,
    options: [
        {
            name: 'message',
            description: 'Message you want the bot to say',
            type: 3,
            required: true,
        },
    ],
    run: async ({ interaction, args }) => {
        const channel = interaction.channel;

        try {
            await channel?.send({ content: `${args.getString('message')}` });

            await interaction.reply({
                content: 'Message sended !',
                ephemeral: true,
            });
        } catch (error) {
            Logger.error(
                `Error when executing the say command`,
                error as Error
            );
        }
    },
});
