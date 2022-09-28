import { ExtendedClient } from './structures/Client';
import Logger from './utils/Logger';

Logger.info('Lancement du programme...');

Logger.info('Création du client...');
const client = new ExtendedClient();

Logger.info('Client crée !');

Logger.info('Lancement du bot...');
client.start();
