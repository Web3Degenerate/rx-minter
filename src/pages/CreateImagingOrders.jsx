import { useAddress, useContract, ConnectWallet, useOwnedNFTs,
  useTransferNFT, useMetadata, useTotalCount, useContractWrite, useContractEvents } from "@thirdweb-dev/react";
  //Removed ThirdwebNftMedia, MediaRenderer, Web3Button
// import "../styles/Home.css";
// import "../styles/globals.css";
import 'bootstrap/dist/css/bootstrap.css';
import "../styles/App.css";
import axios from 'axios';

// import { contract, contractAddress } from '../constants';

import { ethers } from 'ethers';

// Original idea for useRef came from: https://dev.to/kevinkh89/how-to-solve-input-delay-lagging-in-react-j2o
// Confirmed process: https://flaviocopes.com/react-hook-useref/
import React, { useState, useEffect, useRef } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'

import { FormField, CustomButton } from '../components';

import { alertService } from '../services';

import { addyShortner, formatDateFourDigitYear, formatDateTwoDigitYear, dayCalculatorDoc, convertNumberDateToRawString, convertBigNumberToFourDigitYear, convertBigNumberToRawString } from '../utils'
import { solidityContractAddress } from '../constants'

// import Web3 from 'web3';
// import { convertTokenId } from '../utils'; 




const CreateImagingOrders = () => {

// load patient by id:
const { id } = useParams();

const [patient, setPatient] = useState({
  name: "",
  wallet_address: "",
  email:"",
  id:"",
  dob:"",
  pt_physical_address: ""
});


useEffect(()=> {    
loadUser(); 
loadMedications();
loadDoctors();
// loadPatients();
}, [])

const [medication, setMedication] = useState([]);
// const [medication, setMedication] = useState({
//   name: "",
//   sig: "",
//   id: "",
//   strength:"",
//   quantity:"",
//   daily_max:"",
//   daily_supply:""
// });

// const [wtf3provider, setWtf3Provder] = useState('');

// const web3 = new Web3(Web3.givenProvider || "http://localhost:5173"); //returns address 50 times??
// web3.eth.getAccounts().then(console.log);
// setWtf3Provder(web3.eth.getAccounts());

// const personallyWTF = web3.eth.getAccounts();

//Added R 6/8/23 for Wallet Events
const inputWalletRef = useRef();

const loadUser = async () => {
// console.log('ID check inside loadUsers', id) 
setPatient({name: "", wallet_address: "", email:"", dob:"", id:""});
const result = await axios.get("https://rxminter.com/php-react/edit.php?id="+id);
console.log("loadUser axios request returned:", result);
setPatient(result.data);
// inputWalletRef.current = result.data.wallet_address; 
// console.log('loadUser inputWalletRef returned: ', inputWalletRef)
}


const {name,wallet_address,dob,email,pt_physical_address} = patient;
// if(wallet_address==''){loadUser()}

const [options, setOptions] = useState({
autoClose: false,
keepAfterRouteChange: false
});


// const [isLoading, setIsLoading] = useState(false);
// const { contract } = useContract("0x7e45B8A00e2B1Fb9C7302982610219714E500576"); //NFT Rx9.0 - George Minter on mumbai
// const { contract } = useContract("0x0967b8b29Df848E63239F5dc9314fDcff8839f7B"); //NFT Rx-10.1 - Struct, tokenURI w/ struct
// const { contract } = useContract("0x46222c35eCA09F0eDDEF9B1faA14B7a236eD0C15"); //NFT Rx-10.2 (NOT BASE/721A) - Struct, tokenURI w/ struct

// const { contract } = useContract("0xEC44e3efeD46D6ffd392e32D6c99E04780Ce4d08"); // NFT RX -10.3 721 ONLY. FINALLY INCREMENT
// const { contract } = useContract("0x03766B73D752D3155D6D8d7ff98D88ba656db7E0"); // NFT RX 10.4 - fix addy string 
// const { contract } = useContract("0x3bcf6B3d11d2737A7F2E3D819D6E66F63C6f7a8e"); // NFT RX 10.5 - Two Calls
// const { contract } = useContract("0xb1F31B06dA1FEca5Bd98D52E89b7AD3e9cbD23B6"); // 10.6 reworked svg section (Yellow, fixed duplicates, but SPACING breaking metadata)

// const { contract } = useContract("0xE0a73cAEb01ABdee510993F2d6a525b9948B49dF"); // 11.0 - Fixed spacing SVG issue. 
// const { contract } = useContract("0x684E9cA3BDf984769531Af2778957815EB096e01"); // 11.1 - Testing Pharmacy Update
// const { contract } = useContract("0x92525216C74e3B5819e487Bef564e12845BafdB2"); // 11.5 - Fix SVG uint, Events, Roles (5/20/23)
// const { contract } = useContract("0x135B8F385f8FaE5ab558d2D2A7A5d33a99184485"); // 11.7 - Improved metadata and function callls (5/21/23)
// const { contract } = useContract("0xd76F7225D8563071d04f16FF26873f7B4468bD5D"); // 11.9 - Improved metadata and function callls (5/21/23)
// const { contract } = useContract("0xE5960C2422B192a54988D0b7d7cD6d3f8A3a7794"); // 12.1 - Improved metadata  (5/23/23)


// const getCurrentContractAddress = async () => {
//   const result = await axios.get("https://rxminter.com/php-react/constants.php?id=1");
//   return result.data.contract_address; // 12.6 - Event index / Fixed Metadata Doctors / DEA (6/4/23)
// }

// const solidityContractAddress = getCurrentContractAddress();

const { contract } = useContract(solidityContractAddress); // 12.1 - Improved metadata  (5/23/23)             
console.log('contract address from server axios is: ',contract)

const audit_address = patient.wallet_address;
console.log("Audit address:", audit_address)

const { data: nfts, isLoading: loading } = useOwnedNFTs(contract, audit_address);
console.log(nfts)

const address = useAddress(); 

// Your NFT collection contract address
// const contractAddress = "0xE0a73cAEb01ABdee510993F2d6a525b9948B49dF";

// const contractAddress = "0x684E9cA3BDf984769531Af2778957815EB096e01"; //11.1
// const contractAddress = "0x92525216C74e3B5819e487Bef564e12845BafdB2"; //11.5
// const contractAddress = "0x135B8F385f8FaE5ab558d2D2A7A5d33a99184485"; //11.5
const contractAddress = "0xE5960C2422B192a54988D0b7d7cD6d3f8A3a7794"; //12.1




//docs erc-721
// ERC721 - docs: 
// const { mutateAsync } = useTransferNFT(contract)

//docs useMetadata
// const { data } = useMetadata(contract)


// (~16th min to -16:30) - map over nfts in return stmt that we grab here (metadata.nft)  https://youtu.be/cKc8JVl_u30?t=990
// const { data: nfts } = useOwnedNFTs(contract, address);

// console.log(nfts)

// Contract must be an ERC-721 or ERC-1155 contract
// const {
//   mutateAsync: transferNFT,
//   // isLoading,
//   // error,
// } = useTransferNFT(contract);



//*********************************** Address Transfer Form ********************* */

const [transferForm, setTransferForm] = useState({
address: '',
});

const handleTransferFormFieldChange = (fieldName, e) => {
setTransferForm({ ...form, [fieldName]: e.target.value })
}

const handleTransferSubmit = async (e) => {
e.preventDefault();
await mintNFT({ ...transferForm })

}

const mintNFT = async (transferForm) => {
try {
  const data = await contract.call("mintNFT", [transferForm.address])

  console.log("contract call success", data)
  setTransferForm({ address: '' });
} catch (error) {
  console.log("contract call failure", error)
}
}


//*********************************** Rx Fields Form ************************** */
// const [form, setForm] = useState({
//   name: '',
//   wallet_address: '',
//   description: '',
//   medication: '',
//   dob: '', 
//   quantity: ''
// });

const [form, setForm] = useState({
  name: '',
  wallet_address: '',
  description: '',
  medication: '',
  dob: '', 
  quantity: '',
  datePrescribed: ''
});

//Delay Issue: https://dev.to/kevinkh89/how-to-solve-input-delay-lagging-in-react-j2o
// explained also: https://www.w3schools.com/react/react_useref.asp
// const inputName = useRef(); 
// const inputDOB = useRef(); 
// const inputWalletAddress = useRef(); 
const inputDescription = useRef(); 
//put useRef() ON the select tag, not the option: https://stackoverflow.com/questions/70421676/react-search-filter-using-select-option-and-useref
const inputMedication = useRef(); 
const inputQuantity = useRef(); 
const inputMax = useRef(); 

const inputDatePrescribed = useRef(); //datePrescribed



//For Version 11.1:
// const inputDoctor = useRef(); 
// const inputNPI = useRef(); 
// const inputDEA = useRef(); 

// **************************** CHAT GPT HELPER FUNCTION FOR OUR DATE STRING IN v.11.5 ************************************

const formatDateCard = (dateValue) => {
  // Assuming the date value is received as a string from the input field dateValue = '2023-05-19';
  // let dateValue = String(date);

  // Split the date value by the hyphen
  const [year, month, day] = dateValue.split('-');

  // Create a new Date object using the extracted values
  const formattedDate = new Date(year, month - 1, day);

  // Format the date as mm/dd/YY
  const formattedDateString = `${formattedDate.getMonth() + 1}/${formattedDate.getDate()}/${formattedDate.getFullYear().toString().slice(-2)}`;
  return formattedDateString; // Output: 05/19/23
 }

 const displayDateCard = (dateValue) => {
  // Assuming the date value is received as a string from the input field dateValue = '2023-05-19';
  // let dateValue = String(date);

  // Split the date value by the hyphen
  const [year, month, day] = dateValue.split('-');

  // Create a new Date object using the extracted values
  const formattedDate = new Date(year, month - 1, day);

  // Format the date as mm/dd/YY
  const formattedDateString = `${formattedDate.getMonth() + 1}/${formattedDate.getDate()}/${formattedDate.getFullYear()}`;
  return formattedDateString; // Output: 05/19/23
 }


//*************************************************************************** Sun 10:38pm (5/7/23) removed in favor of useRef() to fix lag  */
// const handleFormFieldChange = (fieldName, e) => {
const handleFormFieldChange = (e) => {
  // setForm({ ...form, [fieldName]: e.target.value })
  setForm({ ...form, [e.target.name]: e.target.value })
}


//************************     START IMPORT FROM HERE ON FORM       ********************************************************** */


//v12.1: https://thirdweb.com/mumbai/0xE5960C2422B192a54988D0b7d7cD6d3f8A3a7794/code
const { mutateAsync: _createScript } = useContractWrite(contract, "_createScript")

const handleSubmit = async (e) => { // useRef() example didn't have e param, but also no e.prevent: https://dev.to/kevinkh89/how-to-solve-input-delay-lagging-in-react-j2o
                                    // Per Crowd Funding example, I think we can call onSubmit={handleSubmit} without explicitly passing e
  e.preventDefault();
  console.log("handleSubmit event is:", e)
  // await _createScript({ ...form, name: name, wallet_address: ethers.utils.getAddress(wallet_address) })

//useRef() remove lag solution: https://dev.to/kevinkh89/how-to-solve-input-delay-lagging-in-react-j2o
  // let wallet_address_Ref = inputWalletAddress.current.value;
  // let name_Ref = inputName.current.value;

  // setForm({ ...form, [e.target.name]: e.target.value })
  let description_Ref = inputDescription.current.value;
    console.log('SIG is:', description_Ref)
  let medication_Ref = inputMedication.current.value;
    console.log('Medication is:', medication_Ref)
  // let dob_Ref = inputDOB.current.value;

  let quantity_Ref = inputQuantity.current.value;
    console.log('Quantity is:', quantity_Ref)

// Get per diem Max from (Qty / days supply)
  let max_Ref = inputMax.current.value;
    console.log('Days Supply is:', max_Ref)
    console.log(typeof max_Ref)
    console.log('Above is max_Ref datatype')

  let quantityPrescribedInt = parseInt(quantity_Ref);
  let numberOfDays = parseInt(max_Ref)

  let perDiemMax = quantityPrescribedInt / numberOfDays;
    console.log("Max per diem Qty is: ", perDiemMax)


  let date_prescribed_Ref = inputDatePrescribed.current.value;
    console.log('Date Prescribed is:', date_prescribed_Ref)

// Set initial "Next Fill Date" plus 1 #FixNextFill
  const nextFillDate = dayCalculatorDoc(date_prescribed_Ref, numberOfDays);
  // const nextFillDate = date_prescribed_Ref;



  // await _createScript({ ...form, wallet_address: wallet_address, name: name, description: description_Ref, medication: medication_Ref, dob: dob,
  // quantity: quantity_Ref})

  // await _createScript({wallet_address, name, description_Ref, medication_Ref, dob, quantity_Ref});

  // const _createScript = async (form) => {

//*********************************************************************** START OF MERGE FN TEST ************************************************/
if (confirm(`Next Fill Date will initially be set to ${formatDateTwoDigitYear(nextFillDate)} by adding a ${numberOfDays} Days Supply of ${medication_Ref} to the Date Prescribed: ${formatDateTwoDigitYear(date_prescribed_Ref)}. Do you wish to proceed?`) == true){  


                        // ******************   datePrescribed inputDatePrescribed
try {

  // const data = await contract.call("_createScript", [form.wallet_address, form.name, form.description, form.medication, form.dosage, form.quantity])
  // const data = await contract.call("_createScript", [wallet_address, name, description_Ref, medication_Ref, dob, quantity_Ref])
 
//*** VERSION 11.0  */    
  // const data = await contract.call("_createScript", [wallet_address, name, description_Ref, medication_Ref, dob, quantity_Ref])

//*** VERSION 11.1 - With Date Prescribed  */   
  // const data = await contract.call("_createScript", [wallet_address, name, description_Ref, medication_Ref, dob, quantity_Ref, formatDateCard(date_prescribed_Ref), new Date(date_prescribed_Ref).getTime()])

//*** VERSION 11.7 - With patient addy as STRING and address  */   
  // const data = await contract.call("_createScript", [wallet_address, wallet_address, name, description_Ref, medication_Ref, dob, quantity_Ref, formatDateCard(date_prescribed_Ref), new Date(date_prescribed_Ref).getTime()])
  // const data = await contract.call("_createScript", [wallet_address, wallet_address, name, description_Ref, medication_Ref, dob, quantity_Ref, date_prescribed_Ref, new Date(date_prescribed_Ref).getTime()])
  
//v12.1 - 12.4 version
  // const data = await _createScript({ args: [wallet_address, wallet_address, name, description_Ref, medication_Ref, dob, quantity_Ref, date_prescribed_Ref, new Date(date_prescribed_Ref).getTime()] })

//v12.6 version (swap out pt_physical_address for max_Ref)
  // const data = await _createScript({ args: [wallet_address, wallet_address, name, description_Ref, medication_Ref, dob, 
  //   String(perDiemMax), quantity_Ref, doctor, dea, date_prescribed_Ref, new Date(date_prescribed_Ref).getTime()] })

//v12.7 version: Added two additional parameters, date_prescribed_Ref formatted and perDiemMax in its own slot.

//https://www.youtube.com/live/bBjZUe56biU?feature=share&t=1135
// 1 - wallet_address (string)
// 2 - patient name (string)
// 3 - description / sig (string)
// 4 - medication (string)
// 5 - dob (string)
// 6 - pt_physical_address (string)
// 7 - quantity (uint256)
// 8 - doctor (string)
// 9 - dea (strings)  ====================> Imaging Dx 
// 10 - date_prescribed (uint256)
// 11 - perDiemMax (uint256)
// 12 - nextFillDate (uint256)

  const data = await _createScript({ args: [wallet_address, name, description_Ref, medication_Ref, dob, 
    pt_physical_address, quantity_Ref, doctor, dea, new Date(date_prescribed_Ref).getTime(), perDiemMax, 
    // new Date(nextFillDate).getTime()
    new Date(nextFillDate).getTime()
  ] })

//expiration date. 

  console.log("Rx NFT Data Set w/ date prescribed as:", data)


  const sendRx = await contract.call("mintRx", [wallet_address]); 

  console.log("Rx NFT Sent to Patient!", sendRx);

  // alertService.success(`Success, The Rx NFT has been minted and sent to ${name} at address ${wallet_address}`, options);

  alert(`Rx has been minted and sent to ${name} at address ${wallet_address} and transaction ID of ${sendRx.receipt.transactionHash}`); 
  setTestNet(sendRx.receipt.transactionHash)
  // setForm({ name: '', wallet_address: '', description: '', medication: '', dosage: '', quantity: '', datePrescribed: '' });


//from: https://stackoverflow.com/questions/67803090/how-to-get-erc-721-tokenid
// We tried calling .toNumber() but the returned value is string "0x0000000000000000000000000000000000000000000000000000000000000006"
// so get the last item in the string with soln: https://stackoverflow.com/questions/3884632/how-to-get-the-last-character-of-a-string
  // let getTokenUri = sendRx.receipt.logs[0].topics[3].slice(-2);

  let tokenId_stepOneProfit = sendRx.receipt.events[0].args.tokenId;
  // let tokenId_step3profit = web3.toUtf8(tokenId_stepOneProfit);

//https://ethereum.stackexchange.com/questions/101356/how-to-convert-bignumber-to-normal-number-using-ethers-js
// Close, on 19 got 0.000000000000000019
// HEX Big Gay number was 0x0000000000000000000000000000000000000000000000000000000000000013

//##################################************************$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$  CONQUERED BIGNUMBER!!! $$$$$$$$$$$$$$$$$$$$$$$$***********************###################################
  let step1Profit = ethers.utils.formatEther(tokenId_stepOneProfit.toString());
// FINAL SOLUTION IN COMMENT AT BOTTOM: https://ethereum.stackexchange.com/questions/101356/how-to-convert-bignumber-to-normal-number-using-ethers-js
  const step3Profit = Math.round(parseFloat(step1Profit) * (10 ** 18));



  // let getOpenSeaURL = `${contractAddress}/${getTokenUri}`;
  let getOpenSeaURL = `${solidityContractAddress}/${step3Profit}`;
  
  setOpenSeaURL(getOpenSeaURL)
  setSuccess('block')


} catch (error) {
  console.log("contract call failure", error)
  alertService.error(`Error with error message of ${error} :(`, options);
}

} //if alert closing bracket for testing (6/8/23)

//**************************************************************************END OF MERGE FN TEST FOR LAG ********************************/
  // await setRx({ ...form })
} //end up _createScript function
     

const [testNet, setTestNet] = useState('')
const [openSeaURL, setOpenSeaURL] = useState('')
const [success, setSuccess ] = useState('none')



// console.log("right before create script:", form)
// const _create_Script_old_function_call = async (form) => {
  const _createEscript = async (form) => {
// const _createScript = async (wallet_address, name, description_Ref, medication_Ref, dob, quantity_Ref) => {
  

          console.log("inside create script:", form)

  try {
    // const data = await contract.call("setRx", [form.name, form.description, form.medication, form.dosage, form.quantity])
    // const data = await contract.call("_createScript", [form.wallet_address, form.name, form.description, form.medication, form.dosage, form.quantity])

//LAST WORKING SOLIDITY FN CALL (v.11.0) before useRef() change:
    const data = await contract.call("_createScript", [form.wallet_address, form.name, form.description, form.medication, form.dosage, form.quantity])
    // const data = await contract.call("_createScript", [wallet_address, name, description_Ref, medication_Ref, dob, quantity_Ref])

    console.log("Rx NFT Data Set", data)


    const sendRx = await contract.call("mintRx", [wallet_address]); 

    console.log("Rx NFT Sent to Patient!", sendRx);

    // alertService.success(`Success, The Rx NFT has been minted and sent to ${name} at address ${wallet_address}`, options);

    alert(`Rx has been minted and sent to ${name} at address ${wallet_address} and transaction ID of ${sendRx.receipt.transactionHash}`); 
    setForm({ name: '', wallet_address: '', description: '', medication: '', dosage: '', quantity: '' });
    setTestNet(sendRx.receipt.transactionHash)


//from: https://stackoverflow.com/questions/67803090/how-to-get-erc-721-tokenid
// We tried calling .toNumber() but the returned value is string "0x0000000000000000000000000000000000000000000000000000000000000006"
// so get the last item in the string with soln: https://stackoverflow.com/questions/3884632/how-to-get-the-last-character-of-a-string
    // let getTokenUri = sendRx.receipt.logs[0].topics[3].slice(-1);
    let getTokenUri = sendRx.receipt.events[0].args.tokenId.toHexString();
    // then .toString(); ??

    let getOpenSeaURL = `${solidityContractAddress}/${getTokenUri}`;
    setOpenSeaURL(getOpenSeaURL)
    setSuccess('block')


  } catch (error) {
    console.log("contract call failure", error)
    alertService.error(`Error with error message of ${error} :(`, options);
  }
}


const mintRx = async (transferForm) => {
  try {
    const data = await contract.call("mintRx", [wallet_address])

    console.log("contract call success", data)
    setTransferForm({ address: '' });
  } catch (error) {
    console.log("contract call failure", error)
  }
}



// 8:55pm R 5/4/23: Load all medications: 
const loadMedications = async () => {
  setMedication([]);   
  const result = await axios.get("https://rxminter.com/php-react/viewmeds.php");
  console.log("Medication object from server are: ",result);
  console.log("Medications names from server are: ",result.data.doccs)

  // let new_array = []; 
  // const medListLength = result.data.length
  // console.log("length of result.data meds is: ",medListLength)

  // for(let i=0;i<result.data.length; i++){
  //   new_array.push(result.data.pop())
  // }
  // console.log("new_array is now:",new_array)

  // const names = data.map(item => item.name);
  // console.log(names);

  setMedication(result.data.doccs);
  console.log("Medications is #NOW: ",medication)
  // navigate('/');
}

// 6/2/23 F: Load all doctors: 
const [doctors, setDoctors] = useState([])
const loadDoctors = async () => {
  setDoctors([]);   
  const result = await axios.get("https://rxminter.com/php-react/view-doctors.php");
  console.log("View Doctors axios call:",result);
  setDoctors(result.data.docs);
  // navigate('/');
}


const [dea, setDea] = useState('')
const [doctor, setDoctor] = useState('')
const handleDoctorChange=(e)=>{
  // const {value, options } = e.target
  setDea(e.target.value)
  // setDoctor(e.target.name)
  const {value, options } = e.target
  setDoctor(options[e.target.selectedIndex].text)
  console.log("Event passed to handleDoctorChange is ", e);
  console.log('Current DEA # is now:', dea);
  console.log('Current Doctor # is now:', doctor);

}




// https://stackoverflow.com/questions/49277112/react-js-how-to-set-a-default-value-for-input-date-type
let currentDate = new Date().toJSON().slice(0, 10);


// const { data: totalCount, isLoading, error } = useTotalCount(contract);

const medLabel = useRef('"inputGroup-sizing-lg"');

// ******************** GET THE EVENT ****************************************************************** \\

// inputWalletRef.current = wallet_address; 
// let walletOnLoadMN = inputWalletRef.current.value;

const { data: fillEvents, isLoading: isLoadingFillEvents } = useContractEvents(
  contract,
  "UpdateScriptQuantityAndDatesEvent",
  {
      queryFilter: {
          filters: {
              // script_token_number: id
              // script_token_number: id,
              // patient_address: wallet_address
              patient_address: wallet_address,    
              // patient_address: "0xE3cEA19e68430563f71C591390358e54d1fa857a"
          },
          order: "desc",
         
      }
  }
)

//convert BigNumber to JS Number: https://docs.ethers.org/v5/api/utils/bignumber/

console.log("EVENT IS", fillEvents)


// ******************* GET TODAY'S DATE IN PST ********************************************************** \\
const getTodayPSTDate = () => {
let currentFilterDate = new Date();

let optionsFilter = {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
};

let pstDate = currentFilterDate.toLocaleString('en-US', optionsFilter).split(', ')[0];

let parts = pstDate.split('/'); // Split the date string by '/'

const formattedFilterDate = `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
return formattedFilterDate;
}

let newPstDate = getTodayPSTDate(); 

console.log(`wallet_address is ${wallet_address}`)
console.log(typeof wallet_address)
console.log("***** wallet_address Type Above *****")


// ******************* GET TODAY'S DATE IN PST ********************************************************** \\

// const convertNumberToDater = (num) => {
//   return num.toNumber();
// }

let date_prescribed_Test = "2023-05-04";

const displayDateUintTest = new Date(date_prescribed_Test).getTime();
console.log("displayDateUintTest is of type:", displayDateUintTest)
console.log(typeof displayDateUintTest)

function convertNumberDateToRawString(dateNumber) {
  var date = new Date(dateNumber);
  
  var year = date.getFullYear();
  var month = String(date.getMonth() + 1).padStart(2, '0');
  var day = String(date.getDate()+1).padStart(2, '0');
  
  var dateString = year + '-' + month + '-' + day;
  return dateString;
}

const convertDateNumberTest = convertNumberDateToRawString(displayDateUintTest)

// const stackDateTest = new DateTime.ParseExact("YYYY-MM-dd",displayDateUintTest);
// let date_string = stackDateTest.ToString("yyyy-MM-dd");
// const convertSolidityUintDate = displayDateUintTest.toNumber();

const dayCalculatorTest = (startDate, numberOfDays) => {
  const todaysFillDate = new Date(startDate);
  todaysFillDate.setDate(todaysFillDate.getDate() + numberOfDays + 1);

  const year = todaysFillDate.getFullYear();
  const month = String(todaysFillDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
  const day = String(todaysFillDate.getDate()).padStart(2, '0');

  const modifiedNextFillDateString = `${year}-${month}-${day}`;
  return modifiedNextFillDateString;
}

const displayTest = dayCalculatorTest("2023-06-01", 6)


const handleKeyDown = (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
  }
}


return (
<>    


{/* ***************************************************************************************************************************************************** */}
                      <hr></hr>
                      <br />
{/* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&  &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */}
                  <div className="row">  
                      <div className="col-md-12 text-center">
                          <h3>Mint an Imaging Order For: {name} ({displayDateCard(dob)}) </h3>                           
                      </div>
                  </div>

                
{/* External Linking Solution From: https://herewecode.io/blog/react-router-link-to-external-url/ */}
                  <div className="box_size_success" style={{display:`${success}`, background:"#D4EDDA"}}>
                      <br></br>
                        
                        <h3 className="text-justify" style={{color:"#74A27F"}}><a href={`https://mumbai.polygonscan.com/tx/${testNet}`} target="_blank">
                        Success! Click Here to View the transaction on the Polygonscan explorer.
                      </a></h3>
                      <br></br>
                      
                      <h3 className="text-justify" style={{color:"#74A27F"}}><a href={`https://testnets.opensea.io/assets/mumbai/${openSeaURL}`} target="_blank">
                      Click Here to View the NFT on OpenSea.
                      </a></h3>
                      <hr></hr>
                      
                      <Link style={{color:"#74A27F"}} to="/">
                          {/* <h4 className="text-justify" style={{color:"#74A27F"}}>Click Here to View Your Scripts.</h4> */}
                          <h4 className="text-justify" style={{color:"#74A27F"}}>Click Here to Return Back to Practice Dashboard.</h4>
                      </Link>

                  </div>
                  
         

  {/* <form onSubmit={(e) => handleSubmit(e)}> */}
  <form onSubmit={handleSubmit}>
  <div className="box_size">
                  <div className="row">
                          <div className="col-md-3">Patient Name:</div>
                          <div className="col-md-9">
                              {/* <input type="text" name="name" className="form-control" value={name} onChange={(e) => handleChange(e)} /> */}             
                              {/* <input type="text" name="name" className="form-control" value={form.name} onChange={(e) => handleChange(e)} />   */}
                              {/* <input type="text" name="name" className="form-control" value={form.name} onChange={(e) => handleFormFieldChange('name', e)} />  */}
                              {/* <input type="text" name="name" className="form-control" value={form.name} onChange={(e) => handleFormFieldChange(e)} />   */}
                              {/* <input type="text" name="name" className="form-control" value={name} onChange={(e) => handleFormFieldChange(e)} disabled/> */}
                              <input type="text" name="name" className="form-control" value={name} disabled/>
                          </div>
                  </div>
  <hr></hr>
                  <div className="row">
                          <div className="col-md-3">Patient DOB:</div>
                          <div className="col-md-9">
                    
                              <input type="date" name="dob" className="form-control" value={dob} disabled/>
                          </div>
                  </div>

  <hr></hr>
                  <div className="row">
                          <div className="col-md-3">Wallet Address:</div>
                          <div className="col-md-9">
                              {/* <input type="text" name="name" className="form-control" value={name} onChange={(e) => handleChange(e)} /> */}
                              {/* <input type="text" name="wallet_address" className="form-control" onChange={(e) => handleChange(e)} />  */}
                              {/* <input type="text" name="wallet_address" className="form-control" value={form.wallet_address} onChange={(e) => handleFormFieldChange('wallet_address', e)} />  */}
                              {/* <input type="string" name="wallet_address" className="form-control" value={wallet_address} onChange={(e) => handleFormFieldChange(e)} disabled/> */}
                              {/* <input type="string" name="wallet_address" className="form-control" value={wallet_address} ref={inputWalletAddress} disabled/> */}
                              <input type="string" name="wallet_address" className="form-control" value={wallet_address} ref={inputWalletRef} disabled/>
                          </div>
                  </div>
    <hr></hr>

                  <div className="row">
                          <div className="col-md-3">Physical Address:</div>
                          <div className="col-md-9">
                              {/* <input type="text" name="name" className="form-control" value={name} onChange={(e) => handleChange(e)} /> */}
                              {/* <input type="text" name="wallet_address" className="form-control" onChange={(e) => handleChange(e)} />  */}
                              {/* <input type="text" name="wallet_address" className="form-control" value={form.wallet_address} onChange={(e) => handleFormFieldChange('wallet_address', e)} />  */}
                              {/* <input type="string" name="wallet_address" className="form-control" value={wallet_address} onChange={(e) => handleFormFieldChange(e)} disabled/> */}
                              {/* <input type="string" name="wallet_address" className="form-control" value={wallet_address} ref={inputWalletAddress} disabled/> */}
                              <input type="string" name="pt_physical_address" className="form-control" value={pt_physical_address} disabled/>
                          </div>
                  </div>

  <hr></hr>
    
                  <div className="row">
                          <div className="col-md-3">Date Ordered:</div>
                          <div className="col-md-9">
                                                                                  
                              <input type="date" name="datePrescribed" className="form-control" defaultValue={currentDate} ref={inputDatePrescribed} />
                          </div>
                  </div>
  <hr></hr>
                  <div className="row">
                          <div className="col-md-2">SIG:</div>
                          <div className="col-md-10">
                              {/* <input type="text" name="name" className="form-control" value={name} onChange={(e) => handleChange(e)} /> */}             
                              {/* <input type="text" name="name" className="form-control" value={form.name} onChange={(e) => handleChange(e)} />   */}
                              {/* <input type="text" name="description" className="form-control" value={form.description} onChange={(e) => handleFormFieldChange('description', e)} />   */}
                              {/* <input type="text" name="description" className="form-control" value={form.description} onChange={(e) => handleFormFieldChange(e)} /> */}
                              <textarea name="description" className="form-control" ref={inputDescription} rows="3" onKeyDown={handleKeyDown}/>
                          </div>
                  </div>

                  {/* <div className="row" style={{display: "none"}}>  */}
                 {/* <div className="row">
                          <div className="col-md-6">Medication:</div>
                          <div className="col-md-6">                          
                              <input type="text" name="medication" className="form-control" value={form.medication} onChange={(e) => handleFormFieldChange(e)} /> 
                          </div>
                  </div> */}

                  {/* <div className="row">
                      <div className="col-md-2">Original Med Select:</div> */}
                              {/* <select className="form-select" aria-label="Default select example" name="email" value={email} onChange={(e) => handleChange(e)}> */}
                              {/* Previously working with onChange as shown on line below: */}
                              {/* <select className="form-select" aria-label="Select A Medication" name="medication" onChange={(e) => handleChange(e)} > */}
                      {/* <select className="form-select" aria-label="Select A Medication" name="medication" ref={inputMedication} >
                          <option selected>Select A Medication</option>

                          {medication.map((medication, index) => (
                                  <option value={`${medication.name}`} key={`${index}`}>{medication.name}</option>                                   
                          ))}
                      </select>
                  </div> */}

{/* MEDICATION CHANGED TO FREE TEXT ON THU 7/7/23 */}
<hr></hr>
                  <div className="row">
                          <div className="col-md-2">Imaging Order: </div>
                          <div className="col-md-10">
                              {/* <input type="text" name="name" className="form-control" value={name} onChange={(e) => handleChange(e)} /> */}             
                              {/* <input type="text" name="name" className="form-control" value={form.name} onChange={(e) => handleChange(e)} />   */}
                              {/* <input type="text" name="description" className="form-control" value={form.description} onChange={(e) => handleFormFieldChange('description', e)} />   */}
                              {/* <input type="text" name="description" className="form-control" value={form.description} onChange={(e) => handleFormFieldChange(e)} /> */}
                              <textarea name="medication" className="form-control" ref={inputMedication} rows="2" onKeyDown={handleKeyDown} />
                          </div>
                  </div>

                {/* <div className="row">         
                            <div className="input-group mb-3">    
                          
                                <div className="input-group-prepend">
                                    
                                    <span class="input-group-text" ref={medLabel}>Medication: </span>
                                  
                                </div>

                                <select className="form-select" aria-label="Select A Medication" name="medication" ref={inputMedication} >
                                    <option selected>Select A Medication</option>

                                    {medication?.map((med, index) => (
                                            <option value={`${med.name}`} key={`${index}`}>{med.name}</option>                                   
                                    ))}
                                </select>
                            
                            </div>
                  </div>  */}
<hr></hr>
{/* QUANTITY PRESCRIBED */}
                  <div className="row">
                          <div className="col-md-2">Dx Code(s):</div>
                          <div className="col-md-10">
                              {/* <input type="text" name="name" className="form-control" value={name} onChange={(e) => handleChange(e)} /> */}             
                              {/* <input type="text" name="name" className="form-control" value={form.name} onChange={(e) => handleChange(e)} />   */}
                              {/* <input type="text" name="quantity" className="form-control" value={form.quantity} onChange={(e) => handleFormFieldChange('quantity', e)} /> */}
                              {/* <input type="text" name="quantity" className="form-control" value={form.quantity} onChange={(e) => handleFormFieldChange(e)} />    */}
                              <input type="text" name="quantity" className="form-control" ref={inputQuantity} /> 
                          </div>
                  </div>
<hr></hr>
{/* QUANTITY PRESCRIBED */}
                  <div className="row">
                          <div className="col-md-6">Days Supply:</div>
                          <div className="col-md-6">
                              {/* <input type="text" name="name" className="form-control" value={name} onChange={(e) => handleChange(e)} /> */}             
                              {/* <input type="text" name="name" className="form-control" value={form.name} onChange={(e) => handleChange(e)} />   */}
                              {/* <input type="text" name="quantity" className="form-control" value={form.quantity} onChange={(e) => handleFormFieldChange('quantity', e)} /> */}
                              {/* <input type="text" name="quantity" className="form-control" value={form.quantity} onChange={(e) => handleFormFieldChange(e)} />    */}
                              <input type="number" name="max" className="form-control" ref={inputMax} required /> 
                          </div>
                  </div>               
  <hr></hr>
{/* REFERRING DOCTOR */}


                        <div className="row">         
                            <div className="input-group mb-3">    
                            {/* <div className="input-group input-group-lg"> */}
                                <div className="input-group-prepend">
                                    {/* <span className="input-group-text">Medication:</span> */}
                                    <span class="input-group-text" ref={medLabel}>Referring Doctor: </span>
                                    {/* <span>Medication:</span> */}
                                </div>

                                {/* <select className="form-select" aria-label="Select A Medication" name="medication" 
                                ref={inputMedication} onChange={(e) => handleDoctorChange(e)}> */}

                                <select className="form-select" aria-label="Select A Doctor" name="doctor" onChange={(e) => handleDoctorChange(e)}>                             

                                    <option selected>Select The Doctor</option>

                                    {/* {medication.map((medication, index) => (
                                            <option value={`${medication.name}`} key={`${index}`}>{medication.name}</option>                                   
                                    ))} */}

                                    {doctors.map((doctor, index) => (
                                            <option value={`${doctor.doctor_dea}`} key={`${index}`}>{doctor.doctor_name}</option>                                   
                                    ))}                                      


                                </select>
                            
                            </div>
                      </div> 
  <hr></hr>

                  {/* <div className="row">
                          <div className="col-md-6">Referring Doctor:</div>
                          <div className="col-md-6">
                              <input type="text" name="dosage" className="form-control" value="Dr. Jorge Rucker, M.D." onChange={(e) => handleFormFieldChange(e)} disabled/>
                              <input type="text" name="doctor" className="form-control" value="Dr. Jorge Rucker, M.D." ref={inputDoctor} disabled/>
                              <input type="text" name="doctor" className="form-control" value="Dr. Jorge Rucker, M.D." disabled/>
                          </div>
                  </div> */}

{/* DEA NUMBER */}

                  <div className="row">
                          <div className="col-md-6">DEA #:</div>
                          <div className="col-md-6">                             
                              {/* <input type="text" name="dea" className="form-control" value="EB7344196" ref={inputDEA}  disabled/> */}
                              <input type="text" name="dea" className="form-control" value={dea} disabled/>
                          </div>
                  </div>

{/* NPI NUMBER */}
                  {/* <div className="row">
                          <div className="col-md-6">NPI #:</div>
                          <div className="col-md-6"> */}
                                    {/* <input type="text" name="name" className="form-control" value={name} onChange={(e) => handleChange(e)} /> */}             
                                    {/* <input type="text" name="name" className="form-control" value={form.name} onChange={(e) => handleChange(e)} />   */}
                                    {/* <input type="text" name="dosage" className="form-control" value={form.dosage} onChange={(e) => handleFormFieldChange('dosage', e)} />   */}
                                    {/* <input type="text" name="dosage" className="form-control" value={form.dosage} onChange={(e) => handleFormFieldChange(e)} /> */}
                                    {/* <input type="text" name="dosage" className="form-control" value="1417960428" onChange={(e) => handleFormFieldChange(e)} disabled/> */}
                                    {/* <input type="text" name="npi" className="form-control" value="1417960428" ref={inputNPI}  disabled/> */}
                              {/* <input type="text" name="npi" className="form-control" value="1417960428" disabled/>
                          </div>
                  </div> */}



                  


{/* SUBMIT BUTTON */}

</div>
                    <div className="row block_button_box_size">
                        <div className="col-md-12 text-center"> 
                            {/* <input type="submit" name="submit" value="Add Patient" className="btn btn-warning" /> */}
                            <button type="submit" className="btn btn-primary btn-lg btn-block"> Mint This Imaging Order For {name} </button>
                        </div>
                    </div> 

              </form>
          

              
</>


)

}
export default CreateImagingOrders