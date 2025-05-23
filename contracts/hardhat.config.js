const dotenv = require('dotenv');
require('@nomicfoundation/hardhat-ignition');
require("@nomicfoundation/hardhat-toolbox");
dotenv.config();

const {
  DEPLOYER_WALLET_PRIVATE_KEY,
  SOLC_VERSION,
  EVM_VERSION,
  SOLIDITY_VIA_IR,
  SOLIDITY_OPTIMIZER,
  SOLIDITY_OPTIMIZER_RUNS,
  ALLOW_UNLIMITED_CONTRACT_SIZE,
  REPORT_GAS,
  COINMARKETCAP_API_KEY,
  GAS_PRICE_API,
  ARBITRUM_TESTNET_RPC_URL,
  AVALANCHE_FUJI_TESTNET_RPC_URL,
  BASE_TESTNET_RPC_URL,
  SEPOLIA_RPC_URL,
  POLYGON_AMOY_RPC_URL,
  MAINNET_RPC_URL,
  ETHERSCAN_API_KEY,
  ARBISCAN_API_KEY,
  SNOWTRACE_API_KEY,
  BSCSCAN_API_KEY,
  SEPOLIA_ETHERSCAN_API_KEY,
  POLYGONSCAN_API_KEY,
  DISBURSE_RPC_URL,
  OPTIMISM_TESTNET_RPC_URL,
  LINEA_TESTNET_RPC_URL,
  MANTLE_TESTNET_RPC_URL,
  SCROLL_TESTNET_RPC_URL,
  CUSTOM_EXPLORER_API_KEY,
  CUSTOM_NETWORK_CHAIN_ID,
  CUSTOM_NETWORK_API_URL,
  CUSTOM_NETWORK_BROWSER_URL,
  CUSTOM_NETWORK_URL,
  CUSTOM_NETWORK_ACCOUNTS_COUNT,
  CUSTOM_NETWORK_ACCOUNTS_MNEMONIC,
  CUSTOM_NETWORK_ACCOUNTS_PATH,
} = process.env;

function getWallet() {
  return DEPLOYER_WALLET_PRIVATE_KEY !== undefined
    ? [DEPLOYER_WALLET_PRIVATE_KEY]
    : [];
}

module.exports = {
  
  solidity: {
    compilers: [
      {
        version: SOLC_VERSION || '0.8.28',
        settings: {
          // TODO: temporary workaround to use the transient storage feature
          evmVersion: EVM_VERSION || 'cancun',
          viaIR:
            (SOLIDITY_VIA_IR && 'true' === SOLIDITY_VIA_IR.toLowerCase()) ||
            false,
          optimizer: {
            enabled:
              (SOLIDITY_OPTIMIZER &&
                'true' === SOLIDITY_OPTIMIZER.toLowerCase()) ||
              false,
            runs:
              (SOLIDITY_OPTIMIZER_RUNS &&
                Boolean(parseInt(SOLIDITY_OPTIMIZER_RUNS)) &&
                parseInt(SOLIDITY_OPTIMIZER_RUNS)) ||
              200,
          },
          outputSelection: {
            '*': {
              '*': ['storageLayout'],
            },
          },
        },
      },
    ],
  },
  finder: {
    prettify: true,
    colorify: true,
    outputDir: './soldata',
  },
  storageVault: {
    check: {
      storeFile: 'storage-store-lock.json',
    },
    lock: {
      storeFile: 'storage-store-lock.json',
      prettify: true,
    },
  },
  docgen: {
    outputDir: './docs',
    pages: 'files',
  },
  contractSizer: {
    runOnCompile: false,
    strict: true,
  },
  gasReporter: {
    enabled: (REPORT_GAS && 'true' === REPORT_GAS.toLowerCase()) || false,
    coinmarketcap: COINMARKETCAP_API_KEY || '',
    gasPriceApi: GAS_PRICE_API || '',
    outputFile: `gas-reporter/result-${Date.now()}.txt`,
    forceTerminalOutput: true,
    trackGasDeltas: true,
    token: 'ETH',
    currency: 'USD',
  },
  exposed: {
    include: ['**/*.sol'],
    outDir: 'contracts-exposed',
    prefix: '$',
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize:
        (ALLOW_UNLIMITED_CONTRACT_SIZE &&
          'true' === ALLOW_UNLIMITED_CONTRACT_SIZE.toLowerCase()) ||
        false,
      hardfork: EVM_VERSION || 'cancun',
      enableTransientStorage: true,
    },
    custom: {
      url: CUSTOM_NETWORK_URL || '',
      accounts: {
        count:
          (CUSTOM_NETWORK_ACCOUNTS_COUNT &&
            Boolean(parseInt(CUSTOM_NETWORK_ACCOUNTS_COUNT)) &&
            parseInt(CUSTOM_NETWORK_ACCOUNTS_COUNT)) ||
          0,
        mnemonic: CUSTOM_NETWORK_ACCOUNTS_MNEMONIC || '',
        path: CUSTOM_NETWORK_ACCOUNTS_PATH || '',
      },
    },
    sepolia: {
      url: SEPOLIA_RPC_URL || '',
      accounts: getWallet(),
    },
    base: {
      url: BASE_TESTNET_RPC_URL || '',
      accounts: getWallet(),
    },
    avalancheFujiTestnet: {
      url: AVALANCHE_FUJI_TESTNET_RPC_URL || '',
      accounts: getWallet(),
    },
    polygonAmoy: {
      url: POLYGON_AMOY_RPC_URL || '',
      accounts: getWallet(),
    },
    arbitrumTestnet: {
      url: ARBITRUM_TESTNET_RPC_URL || '',
      accounts: getWallet(),
    },
    mainnet: {
      url: MAINNET_RPC_URL || '',
      accounts: getWallet(),
    },
    disburse: {
      url: DISBURSE_RPC_URL || '',
      accounts: getWallet(),
    },
    optimismTestnet: {
      url: OPTIMISM_TESTNET_RPC_URL || '',
      accounts: getWallet(),
    },
    lineaTestnet: {
      url: LINEA_TESTNET_RPC_URL || '',
      accounts: getWallet(),
    },
    mantleTestnet: {
      url: MANTLE_TESTNET_RPC_URL || '',
      accounts: getWallet(),
    },
    scrollTestnet: {
      url: SCROLL_TESTNET_RPC_URL || '',
      accounts: getWallet(),
    }
  },
  etherscan: {
    apiKey: {
      localhost: '0x00000000000000000000000000000000',
      custom: CUSTOM_EXPLORER_API_KEY || '',
      sepolia: SEPOLIA_ETHERSCAN_API_KEY || '',
      base: BSCSCAN_API_KEY || '',
      avalancheFujiTestnet: SNOWTRACE_API_KEY || '',
      polygonAmoy: POLYGONSCAN_API_KEY || '',
      arbitrumTestnet: ARBISCAN_API_KEY || '',
      mainnet: ETHERSCAN_API_KEY || '',
    },
    customChains: [
      {
        network: 'localhost',
        chainId: 31337,
        urls: {
          apiURL: 'http://localhost/api',
          browserURL: 'http://localhost',
        },
      },
      {
        network: 'custom',
        chainId:
          (CUSTOM_NETWORK_CHAIN_ID &&
            Boolean(parseInt(CUSTOM_NETWORK_CHAIN_ID)) &&
            parseInt(CUSTOM_NETWORK_CHAIN_ID)) ||
          0,
        urls: {
          apiURL: CUSTOM_NETWORK_API_URL || '',
          browserURL: CUSTOM_NETWORK_BROWSER_URL || '',
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
  
};

