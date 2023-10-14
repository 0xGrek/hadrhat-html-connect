import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectButton")
const withdrawButton = document.getElementById("withdrawButton")
const fundButton = document.getElementById("fundButton")
const balanceButton = document.getElementById("balanceButton")

connectButton.onclick = connect
fundButton.onclick = fund
withdrawButton.onclick = withdraw
// balanceButton.onclick = getBalance

async function connect() {
        if (typeof window.ethereum !== "undefined") {
                try {
                        await ethereum.request({ method: "eth_requestAccounts" })
                } catch (error) {
                        console.log(error)
                }
                connectButton.innerHTML = "Connected"
                const accounts = await ethereum.request({ method: "eth_accounts" })
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                const signer = provider.getSigner()
                console.log("🚀 ~ file: index.js:24 ~ connect ~ signer:", signer)
                console.log("🚀 ~ file: index.js:22 ~ connect ~ accounts:", accounts)
        } else {
                connectButton.innerHTML = "Please install MetaMask"
        }
}

async function fund() {
        const ethAmount = "88"
        console.log("🚀 ~ file: index.js:33 ~ fund ~ ethAmount:", ethAmount)
        if (typeof window.ethereum !== "undefined") {
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                const signer = provider.getSigner()

                const contract = new ethers.Contract(contractAddress, abi, signer)
                try {
                        const transactionResponse = await contract.fund({
                                value: ethers.utils.parseEther(ethAmount),
                        })
                        // wait finish tx
                        await listenForTransactionMine(transactionResponse, provider)
                } catch (error) {
                        console.log(error)
                }
        } else {
                fundButton.innerHTML = "Please install MetaMask"
        }
}

function listenForTransactionMine(transactionResponse, provider) {
        console.log(`Mining ${transactionResponse.hash}`)
        // return new Promise()
		provider.once(transactionResponse.hash, listener {})
}
async function withdraw() {
        console.log(`Withdrawing...`)
        if (typeof window.ethereum !== "undefined") {
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          await provider.send('eth_requestAccounts', [])
          const signer = provider.getSigner()
          const contract = new ethers.Contract(contractAddress, abi, signer)
          try {
            const transactionResponse = await contract.withdraw()
            await listenForTransactionMine(transactionResponse, provider)
            // await transactionResponse.wait(1)
          } catch (error) {
            console.log(error)
          }
        } else {
          withdrawButton.innerHTML = "Please install MetaMask"
        }
      }