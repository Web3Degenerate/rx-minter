## Commands

### Project Dependencies

1. npm i axios

2. npm i react-router-dom

3. Bootstrap

   - **VITE** -

   - **_React(?)_** npm i react-bootstrap bootstrap
     - For bootstrap versions older than 5, [check the react-bootstrap docs here](https://www.npmjs.com/package/react-bootstrap)

4.

## Notes Log

1. On Monday 6/5/23, when making a lot of contract calls getting async/await error

https://stackoverflow.com/questions/72462523/typeerror-cannot-read-property-length-of-undefined-while-deploying-using-ha

ChatGPT's analysis:
`Confirm the asynchronous nature of the contract call: If you are making an asynchronous contract call using async/await or promises, ensure that the call is properly awaited and resolved before attempting to access its properties. Improper handling of asynchronous calls can cause this error.`

Finally got this in console when broke the next day logic out to it's own function

```
contract call failure Error:


╔═══════════════════╗
║ TRANSACTION ERROR ║
╚═══════════════════╝

Reason: Cannot read properties of undefined (reading 'length')


╔═════════════════════════╗
║ TRANSACTION INFORMATION ║
╚═════════════════════════╝

from:      0x54F8B8694833422d09AdF9f5d5D469243e04C57e
to:        0x9DF1b4b34B0944DB3B09010a73215A910150fE22 (RxNftMinter)
chain:     maticmum (80001)
rpc:       mumbai.rpc.thirdweb.com
data:      0x2229ac370000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000006362f352f32330000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000174861696768742d4173686275727920506861726d616379000000000000000000
method:    updateScriptQuantityAndDatesRoles("1", "10", "6/5/23", {}, "Haight-Ashbury Pharmacy")


╔═════════════════════╗
║ DEBUGGING RESOURCES ║
╚═════════════════════╝

Need helping debugging? Join our Discord: https://discord.gg/thirdweb


    at ContractWrapper.formatError (watchTransactions-0b07c8b2.browser.esm.js:2895:12)
    at async ContractWrapper.sendTransactionByFunction (watchTransactions-0b07c8b2.browser.esm.js:2837:17)
    at async ContractWrapper.sendTransaction (watchTransactions-0b07c8b2.browser.esm.js:2793:18)
    at async ContractWrapper.call (watchTransactions-0b07c8b2.browser.esm.js:2752:23)
    at async updateScriptQuantityAndDates (PharmacyReview.jsx:608:26)
    at async handleSubmitUpdateFilled (PharmacyReview.jsx:305:7)

```

3. Mismatch data type with solidity (expecting bignumbers/5.7.0)
   Error with error message of Error: invalid BigNumber string (argument="value", value="M54.16", code=INVALID_ARGUMENT, version=bignumber/5.7.0) :(

---

## Getting Started

Create a project using this example:

```bash
npx thirdweb create --template vite-javascript-starter
```

You can start editing the page by modifying `src/main.jsx`. The page auto-updates as you edit the file.

On `src/index.jsx`, you'll find our `ThirdwebProvider` wrapping your app,
this is necessary for our [hooks](https://portal.thirdweb.com/react) and
[UI Components](https://portal.thirdweb.com/ui-components) to work.

### Deploy to IPFS

Deploy a copy of your application to IPFS using the following command:

```bash
yarn deploy
```

## Learn More

To learn more about thirdweb, Vite and React, take a look at the following resources:

- [thirdweb React Documentation](https://docs.thirdweb.com/react) - learn about our React SDK.
- [thirdweb JavaScript Documentation](https://docs.thirdweb.com/react) - learn about our JavaScript/TypeScript SDK.
- [thirdweb Portal](https://docs.thirdweb.com/react) - check our guides and development resources.
- [Vite Documentation](https://vitejs.dev/guide/) - learn about Vite features.
- [React documentation](https://reactjs.org/) - learn React.

You can check out [the thirdweb GitHub organization](https://github.com/thirdweb-dev) - your feedback and contributions are welcome!

## Join our Discord!

For any questions, suggestions, join our discord at [https://discord.gg/thirdweb](https://discord.gg/thirdweb).
