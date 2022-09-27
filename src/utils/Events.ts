import { ExtendedClient } from 'src/structures/Client';

export default interface Event {
    getName(): string;
    isOnce(): boolean;
    execute(client: ExtendedClient): void;
}
