import path from 'path';
import { Command } from '../../structures/Command';

export default new Command({
    name: 'ping',
    description: 'Replies with Pong !',
    categories: path.dirname(__filename).split(path.sep).pop() as string,
    run: async ({ interaction }) => {
        await interaction.deferReply();

        await interaction.followUp({ content: 'Pong !' });
    },
});
