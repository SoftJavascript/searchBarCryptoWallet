import { createWalletCard } from './createCard.js';
import { createNotification } from './createNotif.js';
import { createDelegateCard } from './createCard.js';



const APIURLINFI = 'https://api.infinitysolutions.io/api/'
const APIURLEDGE = 'https://api.hedge.infinitysolutions.io/api/'

// getWallet('GeocWzPKN1kLWN4xCr4KWr75EBnkRS4ds1')
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
const toasts = document.getElementById('toasts')


function voteStatus(apiData) {
  if (apiData.data.data.vote?.length === 66){
    return "yes"
  } else {
    return "No"
  }
}

async function getWallet(wallet, blockchain) {
  const firstLetter = wallet.slice(0,1);

  let whichBlockchain = ""; 
  if (blockchain === APIURLINFI){
    whichBlockchain = "INFINITY";
  } else if (blockchain === APIURLEDGE){
    whichBlockchain = "HEDGE";
  }

  function brutUrl() {
    if (whichBlockchain === "INFINITY"){
      return blockchain.slice(0, 37);
    } else {
      return blockchain.slice(0, 43);
    }
  }

  function findRank(dataDelegate) {
    if (dataDelegate?.data.data.rank <= 25) {
      return dataDelegate?.data.data.rank;
    }
  }
  if (wallet.length === 34 & firstLetter === "G") {
    createNotification(`We find Wallet ${whichBlockchain}`, 'success');

    try {
        var URLBRUT = brutUrl();
        var data = await axios(URLBRUT  + "wallets/" + wallet);
        var vote = voteStatus(data);
        try {
          var dataDelegate = await axios(URLBRUT + "delegates/" + wallet);
          var rank = findRank(dataDelegate);
          var username = dataDelegate.data.data.username;
          var voteBalance = (dataDelegate.data.data.votes/100000);
          var producedBlocks = dataDelegate.data.data.blocks.produced;
        } catch (err) {
          if (err.response.data.statusCode === 404) {
            createNotification(`${err.response.data.message} on ${whichBlockchain}`,'error')
          } else {
            createNotification(`"${wallet}" is not ${whichBlockchain} delegate`, 'info');
          }
        }        
       

        setTimeout(() => {
          createWalletCard(wallet, data, vote, whichBlockchain);
          try {
            if (data.data.data.isDelegate === true & data.data.data.isResigned === false) {
              setTimeout(() => {
              createDelegateCard(wallet, whichBlockchain, username, rank, voteBalance, producedBlocks);
              }, 2000);
            }
          } catch (err) {
            createNotification(`catch ${err.response.data.message} on ${whichBlockchain}`,'error')
            if (err.response.data.statusCode === 404) {
              createNotification(`${err.response.data.message} on ${whichBlockchain}`,'error')
            } 
          }
        }, 1000);
      

      } catch (err) {
          console.log(err);
          if (err.response.data.statusCode === 429){
              createNotification(`Too Many Request Try Later`, 'error')
          } else if (err.response.data.statusCode === 404) {
            createNotification(`${err.response.data.message} on ${whichBlockchain}`,'error')
          } else {
              createNotification(`Error not defined`, 'error')
          } 
      }
      
    }  else {
      createNotification(`"${wallet}" is not a Wallet `, 'error')
    }
 
}



form.addEventListener('submit', (e) => {
  e.preventDefault()
  const wallet = search.value
  if(wallet) {

      getWallet(wallet, APIURLINFI);
      setTimeout(() => {
        getWallet(wallet, APIURLEDGE);
      }, 4000)
      search.value = '';
      // setTimeout(() => {
      //   window.location.reload();
      // }, 40000)
  }
})

