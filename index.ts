import {ApiPromise, WsProvider} from '@polkadot/api';

const SOCKET_URL = 'ws://127.0.0.1:9944';

const connectSubstrate = async () => {
    const wsProvider = new WsProvider(SOCKET_URL);
    const api = await ApiPromise.create({provider: wsProvider});
    await api.isReady;
    console.log('Connection to Substrate is OK.')
    return api;
}
const subscribeEvents = async (api: ApiPromise) => {
    await api.query.system.events((events: any) => {
        console.log(`@ [ ${events.length} ] events received`)
        events.forEach((event: any, index: number) => {
            console.log(`-->[ ${index} ]: ${event}`)
        })
    });
}
const main = async () => {
    const api = await connectSubstrate();
    await subscribeEvents(api);
}
main()
    // .then(() => {
    //     console.log('successfully exited');
    //     process.exit(0);
    // })
    .catch(err => {
        console.log('error occur:', err);
        process.exit(1);
    })