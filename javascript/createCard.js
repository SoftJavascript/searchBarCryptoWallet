export function createWalletCard(wallet, dataApi, vote, whichBlockchain) {

  function balanceStatut(apiData) {
    if (apiData.data.data.balance > 1){
      var balance = document.getElementById(`balance${whichBlockchain}`);
      balance.className += " success";
    } else {
      return "No"
    }
  }
  
  let lockBalanceNum = dataApi.data.data.lockedBalance;
  function balanceLockStatus(lockBalanceNum) {
    if (lockBalanceNum === undefined) {
      lockBalanceNum = 0;
      return 0;
    } else {
      return lockBalanceNum;
    }
  }
  
  
  var cardHTML = document.createElement('div');
  cardHTML.classList.add(`${whichBlockchain}`)
  cardHTML.classList.add(`container`)
  document.body.appendChild(cardHTML);
  
  cardHTML.innerHTML = ` 
  <div class="card">
    <h2>WALLET</h2>
        <div class="container-wallet">
          <div class='wallet-info'>
            <h3>${whichBlockchain}:<span>&nbsp;&nbsp;${wallet}</span></h3>
              <ul>
                <li id="balance${whichBlockchain}" class="balance"><strong>Balance:</strong> ${dataApi.data.data.balance/100000}</li>
                <li><strong>Locked Balance:</strong> ${balanceLockStatus(lockBalanceNum)/100000}</li>
                <li><strong>Nb Transactions:</strong> ${dataApi.data.data.nonce}</li>
                <li><strong>Vote:</strong> ${vote}</li>
              </ul>
          </div>
        </div>
  </div>`
  
  balanceStatut(dataApi)
}

export function createDelegateCard(wallet, whichBlockchain, username, rank, voteBalance, producedBlocks) {

  var cardHTML = document.createElement('div');
  cardHTML.classList.add(`delegate${whichBlockchain}`)
  cardHTML.classList.add(`container`)
  document.body.appendChild(cardHTML);

  cardHTML.innerHTML = ` 
    <div class="card">
        <div class="container-wallet">
          <div class='wallet-info'>
            <h3 class="">${wallet} <br>is delegate ${whichBlockchain}</h3>
            <ul>
              <li class="balance success"><strong>Username:</strong> ${username}</li>
              <li><strong>Vote Balance:</strong> ${voteBalance}</li>
              <li><strong>Produced Blocks:</strong> ${producedBlocks}</li>
              <li><strong>Rank:</strong>${rank}</li>
            </ul>
          </div>
        </div>
    </div>`
}
