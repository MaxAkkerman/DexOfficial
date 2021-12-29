import Notify from 'bnc-notify';
import Onboard from 'bnc-onboard';

const networkId = 1;
// eth, binance, polygon, phantom
const rpcUrl = 'https://bsc-dataseed1.binance.org:443';
const dappId = 'b5299606-953a-449b-932c-b04840ffdaa2';

export function initOnboard(subscriptions) {
  const onboard = Onboard;
  return onboard({
    dappId,
    hideBranding: false,
    networkId,
    // darkMode: true,
    subscriptions,
    walletSelect: {
      wallets: [
        { walletName: 'metamask', preferred: true },
        {
          walletName: 'fortmatic',
          apiKey: 'pk_test_72F021143E594451',
          preferred: true,
        },
        {
          walletName: 'walletConnect',
          infuraKey: 'bfdd0b3b95c440848f56a7dfc42f61b2',
          preferred: true,
        },
        // {
        //   walletName: 'portis',
        //   apiKey: 'd2171040-9e2d-4c0b-955d-ed9a6beecf9d',
        //   preferred: true,
        // },
        { walletName: 'coinbase', preferred: true },
        // {
        //   walletName: 'trezor',
        //   appUrl: 'https://trade.defispace.com',
        //   email: 'admin@trade.defispace.com',
        //   rpcUrl,
        // },
        // { walletName: 'ledger', rpcUrl },
        // { walletName: 'cobovault', appName: 'Defispace', rpcUrl },
        // { walletName: 'keystone', appName: 'Defispace', rpcUrl },
        // { walletName: 'keepkey', rpcUrl },
        // { walletName: 'lattice', appName: 'Onboard Demo', rpcUrl },
        // { walletName: 'status' },
        // { walletName: 'walletLink', rpcUrl },
        // { walletName: 'torus' },
        // { walletName: 'trust', rpcUrl },
        // { walletName: 'opera' },
        // { walletName: 'operaTouch' },
        // { walletName: 'imToken', rpcUrl },
        // { walletName: 'meetone' },
        // { walletName: 'mykey', rpcUrl },
        // { walletName: 'wallet.io', rpcUrl },
        // { walletName: 'huobiwallet', rpcUrl },
        // { walletName: 'alphawallet', rpcUrl },
        // { walletName: 'hyperpay' },
        // { walletName: 'atoken' },
        // { walletName: 'liquality' },
        // { walletName: 'frame' },
        // { walletName: 'tokenpocket', rpcUrl },
        // { walletName: 'authereum', disableNotifications: true },
        // { walletName: 'ownbit' },
        // { walletName: 'gnosis' },
        // { walletName: 'dcent' },
        // { walletName: 'bitpie' },
        // { walletName: 'xdefi' },
        { walletName: 'binance' },
        { walletName: 'tp' },
      ],
    },
    walletCheck: [
      { checkName: 'derivationPath' },
      { checkName: 'connect' },
      { checkName: 'accounts' },
      { checkName: 'network' },
      { checkName: 'balance', minimumBalance: '100000' },
    ],
  });
}

export function initNotify() {
  const notify = Notify;
  return notify({
    dappId,
    networkId,
    onerror: (error) => console.log(`Notify error: ${error.message}`),
  });
}
