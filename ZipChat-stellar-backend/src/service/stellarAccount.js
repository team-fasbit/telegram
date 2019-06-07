import StellarSdk from 'stellar-sdk';
import { AES, enc } from 'crypto-js';
import { getAdmin } from '../routes/admin';

const ENVCryptoSecret = 'Stellar-is-awesome';
const stellarServer = new StellarSdk.Server('https://horizon-testnet.stellar.org');
// const stellarAsset = new StellarSdk.Asset(
//     StellarSdk.Asset.native().code,
//     'GCD6WBCRZ7HUSMCWPSCHKLCVKWC3VD5PH43ARYUAUSET6IEO5ERTXYEI'
// );
StellarSdk.Network.useTestNetwork();


export const createAccount = async () => {
    return new Promise(async(resolve, reject) => {
        const keypair = StellarSdk.Keypair.random();

        const secret = AES.encrypt(
            keypair.secret(),
            ENVCryptoSecret
        ).toString()

        const data = {
            stellarAddress: keypair.publicKey(),
            stellarSeed: secret
        }

        await createAccountInLedger(keypair.publicKey());

        console.log('acc', data);
        resolve(data);
    })
}

export const createAccountInLedger = async (newAccount) => {
    return new Promise(async (resolve, reject) => {
        try {
            const admin = await getAdmin();
console.log('admin: ', admin);
            const provisionerKeyPair = StellarSdk.Keypair.fromSecret(AES.decrypt(admin.stellarSeed, ENVCryptoSecret).toString(enc.Utf8))
            const provisioner = await stellarServer.loadAccount(provisionerKeyPair.publicKey())
        
            console.log('creating account in ledger', newAccount)
        
            const transaction = new StellarSdk.TransactionBuilder(provisioner)
                .addOperation(
                    StellarSdk.Operation.createAccount({
                    destination: newAccount,
                    startingBalance: '1'
                })
                ).build()
      
            transaction.sign(provisionerKeyPair)
        
            const result = await stellarServer.submitTransaction(transaction);
            console.log('Account created: ', result)
            resolve(result);
            } catch (e) {
            console.log('Stellar account not created.', e)
        }
    })
}


export const payment = async (signerKeys, destination, amount) => {
  
    const account = await stellarServer.loadAccount(signerKeys.publicKey())
  
    let transaction = new StellarSdk.TransactionBuilder(account)
      .addOperation(
        StellarSdk.Operation.payment({
          destination,
          asset: StellarSdk.Asset.native(),
          amount: amount
        })
      )
      .build()
  
    transaction.sign(signerKeys)
  
    console.log(`sending ${amount} from ${signerKeys.publicKey()} to ${destination} `)
    try {
      const result = await stellarServer.submitTransaction(transaction)
      console.log(`sent ${result}`)
      return result
    } catch (e) {
      console.log(`failure ${e}`)
      throw e
    }
  }

export const getAccount = (id) => {
    console.log('called');
    return stellarServer.accounts()
        .accountId(id)
        .call()
        .then((response) => {
            console.log('res', response);
            return response;
        })
        .catch((error) => {
            console.log('error', error);
            throw error
        })
}   
