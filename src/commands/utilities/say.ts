import { Command } from '../../structures/Command';
import Logger from '../../utils/Logger';
export default new Command({
    name: 'say',
    description: 'Send a message via the bot.',
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
