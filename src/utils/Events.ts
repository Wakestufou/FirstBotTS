import { ExtendedClient } from '../structures/Client';

export default interface Event {
    getName(): string;
    isOnce(): boolean;
    execute(client: ExtendedClient): void;
}
