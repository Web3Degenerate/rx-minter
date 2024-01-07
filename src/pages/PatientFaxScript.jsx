import 'bootstrap/dist/css/bootstrap.css';
import "../styles/App.css"; //  import "../styles/ViewScripts.css";
import axios from 'axios'; 
import html2canvas from 'html2canvas';
//https://www.npmjs.com/package/html2canvas  => https://github.com/niklasvh/html2canvas 

import { ethers } from 'ethers'

import { useAddress, useContract, ConnectWallet, useOwnedNFTs, ThirdwebNftMedia, 
    useTransferNFT, useMetadata, useNFT, MediaRenderer, useContractRead } from "@thirdweb-dev/react";
    //removed MediaRenderer, Web3Button

  import React, { useState, useEffect, useRef, useContext, getContext } from 'react'
  
  import { useNavigate, Link, useParams } from 'react-router-dom'
  
//   import { ethers } from 'ethers';
 
  import { addyShortner, formatDateFourDigitYear, formatDateTwoDigitYear, convertNumberDateToRawString, convertBigNumberToFourDigitYear,
    formatDateTwoDigit, convertNumberDateToFourDigitString, convertNumberDateToTwoDigitString, convertBigNumberToTwoDigitYear, 
    convertBigNumberToRawString, RemedySvgPdfGenerator, RemedySvgPdfInkscape, RemedySvgPdfWordDoc } from '../utils'
    //work out: dayCalculatorDoc


    import {RemedySvgOrderMri} from '../napoleon/imaging/mri'

    import { RemedySvgOrderRx } from '../napoleon/script/rx'

    import { RemedySvgForJorgeRucker } from '../doctorSigGeorge'

  import { solidityContractAddress } from '../constants'
  

    import { FormField, CustomButton, ScriptSvgTemplate, RemedySvgPdfTemplate } from '../components';
    import RemedySvgTemplate from '../components/RemedySvgTemplate';
    //   import { GetMedication } from '../components';

    import { alertService } from '../services';

    import { scriptImageTest, RemedyScriptTemplatePDF } from '../assets';

//************************************************************************************************************************** *//
// ****** TUTORIAL RAYS ON REACT IMAGE UPLAOD - MY MAN IN INDIA: https://www.youtube.com/watch?v=fFx4Pbe9dAs *************** //
//************************************************************************************************************************** *//

const PatientFaxScript = () => {

    const { id } = useParams();

    const navigate = useNavigate(); 

    const { contract } = useContract(solidityContractAddress);
    const address = useAddress(); 

  const { data: nft, isLoading: isLoadingNFT } = useNFT(contract, id);

    console.log("Single #nft to fax is: ",nft)

    // const { data: nfts, isLoading: loading } = useOwnedNFTs(contract, address);
    // console.log("owned NFTs from connected wallet are :",nfts)


    //************************************* Pull in Pharmacies for drop down menu ********************** */

//State for Pharmacies, initialized as []
const [pharmacy, setPharmacy] = useState([]);

// useEffect to load the pharmacies on page load:
useEffect(()=> {    
  loadViewPharmacy();
//   handleConvertClickerInternal()
}, [])

// Make call to server to pull pharmacies:
const loadViewPharmacy = async () => {
  const result = await axios.get("https://rxminter.com/php-react/view-pharmacy.php");
  console.log(result);
  setPharmacy(result.data.records);
  
}

// **************** SVG => JPEG PAGE LOGIC ****************************** //
    // const svgContainer = useRef();
    // const canvasTest = useRef();
    // const pngContainer = useRef();

    const [getImageDataUrl, setGetImageDateUrl] = useState('')
    const [generateSVGAuto, setGenerateSVGAuto] = useState('');
    const svgContainerInternal = useRef();

 // **************** Pharmacy State ******************************************* //
 
//  const [rxWallet, setRxWallet] = useState({
//     tokenId: '', 
//     rxWallet: '', 
//     pharmacyName: ''
//   });

//   const inputTokenId = useRef(); 
//   const inputPharmacyWallet = useRef('');

// ****************************** GET Selected Pharmacy ******************************************************//

const [pharmacyFax, setPharmacyFax] = useState({
    pharmacy_name: "",
    pharmacy_wallet: "",
    pharmacy_phone:"",
    pharmacy_fax:"",
    pharmacy_address:"",
    id:""
});
  

const handlePharmacyChange = async (e, id) => {
  const {value, options } = e.target

  const result = await axios.get("https://rxminter.com/php-react/pharmacy-get-by-address.php?pharmacy_wallet="+e.target.value);
  setPharmacyFax(result.data);
  console.log("handlePharmacyChange server data: ",result.data)
  let getSelectedPharmacy = result.data.pharmacy_name
  let getSelectedFax = result.data.pharmacy_fax

  setScriptFax({...scriptFax, pharmacy_fax: getSelectedFax });

  setShowSubmitButton('block')
  setDisplaySelectedPharmacy(getSelectedPharmacy)

//   setRxWallet({...rxWallet,[e.target.name]: e.target.value, tokenId: tokenId, pharmacyName: options[e.target.selectedIndex].text })
  console.log("Event passed to handlePharmacyChange is ", e);
//   console.log('handlePharmacyChange just updated:', rxWallet);

  // const result = axios.get("https://rxminter.com/php-react/pharmacy-get-by-address.php?pharmacy_wallet="+rxWallet.rxWallet);
  // setPharmacyFax(result.data);
  // alert(`You have selected ${pharmacyFax.pharmacy_name} pharmacy with fax # of ${pharmacyFax.pharmacy_fax}.`)
  // const getSelectedFax = loadPharmacyByAddress(rxWallet.rxWallet)
  console.log("handlePharmacyChange pharmacyFax is now: ", pharmacyFax)

//AT BREAK (4:38pm) on Wed 6/21/23 we needed to call handleConvertClickerInteral() to update the selected fax number on scriptFax state
  handleConvertClickerInternal() 

  alert(`You have selected ${getSelectedPharmacy} pharmacy with fax # of ${getSelectedFax}.`)
}

// **************************** handleSubmitToPharmacy Form Submission ******************************//

const handleSubmitTest = async (e) => { 

    e.preventDefault();
    console.log("handleSubmitTests e value:", e)


    // if (confirm(`Transfer Prescription Item #${rxWallet.tokenId} to Pharmacy: ${pharmacyFax.pharmacy_name} at address: ${rxWallet.rxWallet} for ${sig} by ${prescriber}. Okay ${pt_name}? Fax: ${pharmacyFax.pharmacy_fax} `) == true){

    if (confirm(`Transfer Prescription Item #${nft?.metadata.id} to Pharmacy: ${pharmacyFax.pharmacy_name} at address: ${pharmacyFax.pharmacy_wallet} for ${nft?.metadata.description} for ${nft?.metadata.attributes[0].value}. Okay ${nft?.metadata.name}? Fax: ${pharmacyFax.pharmacy_fax} `) == true){
    //   await _safeTransferFromToPharmacy({ ...rxWallet })
    sendFax()
    // _safeTransferFromToPharmacy()
    }

  }

// *************************** sendFax Function and State ********************************************//
//17162106152
    const [scriptFax, setScriptFax] = useState({ 
        script_image_name: "",
        script_image_location: "",
        pharmacy_fax: ""
    });

    const [options, setOptions] = useState({
        autoClose: false,
        keepAfterRouteChange: false
    });

const sendFax = () => {

try{
    // await axios.post("https://rxminter.com/srfax/Queue_Fax.php", scriptFax).then((result)=>{
    axios.post("https://rxminter.com/srfax/Staging_Queue_Fax.php", scriptFax

    ).then((result)=>{
    
    
        console.log(result);
        setOptions(result);
        alertService.success(`Success, The Fax Image Named ${scriptFax.script_image_name} has been sent!`, options);
     
        if(result.data.status == 'valid'){
            // navigate('/');
            // alert('sendFax() received result.data.status = valid')
            // setOptions(result.data)
            setOptions(result)

            alertService.success(`Valid, The Fax Image Named ${scriptFax.script_image_name} has been sent!`, options);
            // if (confirm(`Fax Successfully Sent! Transfer Prescription Item #${nft?.metadata.id} to Pharmacy: ${pharmacyFax.pharmacy_name} at address: ${pharmacyFax.pharmacy_wallet} for ${nft?.metadata.description} for ${nft?.metadata.attributes[0].value}. Okay ${nft?.metadata.name}? Fax: ${pharmacyFax.pharmacy_fax} `) == true){
            //     _safeTransferFromToPharmacy()
            //   }
            console.log("6/21 Valid result.data is: ",result.data)
            console.log("6/21 Valid result is: ",result)

              _safeTransferFromToPharmacy()

        }else{
            alert('There is a problem sending this fax script to the pharmacy. Please try again.');
            // setOptions(result.data)
            setOptions(result)

            alertService.error(`Error with error message of :(`, options);
            console.log("6/21 Invalid result.data is: ",result.data)
            console.log("6/21 Invalid result is: ",result)
        }
    }); //end of axios post call

    }catch(error){
        setOptions(error)
        alertService.error(`Catch Clause Error with message of ${error} :(`, options);
        console.log("6/21 catch(error) is: ",result)
    }
}


// **************************** _safeTransferFromToPharmacy Form Submission ******************************//

const _safeTransferFromToPharmacy = async () => {
    
    try {
       
        // VERSION 12.5+ - Patient Transfer: 
                    //   let pharmacyNameOnly = rxWallet.pharmacyName.substring(0, rxWallet.pharmacyName.indexOf(" ["));
                      const data = await contract.call("transferPatientToPharmacyRoles", [address, pharmacyFax.pharmacy_wallet, pharmacyFax.pharmacy_name, id]);
                                     
                      console.log("NFT Sent to Selected Pharmacy with response:", data);
              
                      alert(`Success! Your NFT Prescription has been sent to pharmacy ${pharmacyFax.pharmacy_name} at address ${pharmacyFax.pharmacy_wallet}. If you have any further questions, please call Rx Minter's dedicated Support Team located in Palau.`);
                    //   setRxWallet({ tokenId: '', rxwallet: '', pharmacyName: '' })
                      navigate('/view-script')      
              } catch (error) {
                      console.log("contract call failure", error)
                      alert("Your NFT Prescription has NOT been sent.  Please try again or contact Rx Minter's Support Team located in Palau.");
                      // alertService.error(`Error with error message of ${error} :(`, options);
              }
}

// ****************************** SET the SVG Script and Image Conversion Functions ********************//
useEffect(() => {
    handleConvertClickerInternal()
// },[pharmacyFax])
},[nft])

const [remedyPatientName, setRemedyPatientName] = useState('')
//"Mary Damon Burke   |   DOB: 11/22/1953"
const [rxRemedyDate, setRemedyRxDate] = useState('')
const [remedyMedication, setRemedyMedication] = useState('')
const [remedyQuantity, setRemedyQuantity] = useState('')

const [remedyPhysicalAddress, setRemedyPhysicalAddress] = useState('')
const [remedySig, setRemedySig] = useState('')






const handleConvertClickerInternal = async () => {

    // const svgElement = await RemedySvgForJorgeRucker(nft?.metadata.name, convertBigNumberToFourDigitYear(nft?.metadata.attributes[5].value), 
    //     nft?.metadata.attributes[10].value, nft?.metadata.description, nft?.metadata.attributes[0].value, nft?.metadata.attributes[2].value )

    if(nft?.metadata.attributes[8].value == 'Dr. Jorge Rucker, M.D.'){
        // const svgElement = RemedySvgPdfGenerator(remedyPatientName, remedyRxDate, remedyPtAddress, remedySig, remedyMedication, remedyQuantity)

        let remedyDisp = nft?.metadata.attributes[2].value - nft?.metadata.attributes[3].value;

        // const svgElement = await RemedySvgForJorgeRucker("Mary Damon Burke    |    DOB: 11/22/1953", "6/26/2023", 
        // "123 Market Street, San Francisco, CA 94101", "MRI L Spine", 
        // "Indication - low back pain, lumbar radiculopathy", "M54.16" )

        // const svgElement = await RemedySvgForJorgeRucker(nft?.metadata.name, convertBigNumberToFourDigitYear(nft?.metadata.attributes[5].value), 
        // nft?.metadata.attributes[10].value, nft?.metadata.description, nft?.metadata.attributes[0].value, remedyDisp )

        // const svgElement = await RemedySvgPdfInkscape(nft?.metadata.name, "38", nft?.metadata.description)

        // const svgElement = await RemedySvgPdfWordDoc(nft?.metadata.name, "60", nft?.metadata.description)

// (remedyPatientName, remedyDOB, remedyQuantity, remedyMedication, remedyPhysicalAddress, remedySig, remedyPrescribedDate)
        // const svgElement = await RemedySvgOrderMri(nft?.metadata.name, "03/08/1938", "M54.38", nft?.metadata.attributes[0].value,
        // "1800 Lavaca Street, San Francico CA 94109 Apt #12345678910", nft?.metadata.description, "7/1/2023")

        let unhashedName
        let unhashedDob
        let unhashed_pt_physical_address


        if(nft?.metadata.name.startsWith('0x')){
            unhashedName = ethers.utils.toUtf8String(ethers.utils.RLP.decode(nft?.metadata.name))
        }else{
            unhashedName = nft?.metadata.name
        }

        if(nft?.metadata.attributes[1].value.startsWith('0x')){
            unhashedDob = formatDateFourDigitYear(ethers.utils.toUtf8String(ethers.utils.RLP.decode(nft?.metadata.attributes[1].value)))
        }else{
            unhashedDob = formatDateFourDigitYear(nft?.metadata.attributes[1].value)
        }


        if(nft?.metadata.attributes[10].value.startsWith('0x')){
            unhashed_pt_physical_address = ethers.utils.toUtf8String(ethers.utils.RLP.decode(nft?.metadata.attributes[10].value))
        }else{
            unhashed_pt_physical_address = nft?.metadata.attributes[10].value
        }



        const svgElement = await RemedySvgOrderRx(unhashedName, unhashedDob, nft?.metadata.attributes[2].value, nft?.metadata.attributes[0].value,
            unhashed_pt_physical_address, nft?.metadata.description, convertBigNumberToFourDigitYear(nft?.metadata.attributes[5].value))
        
        

        console.log("Jorge svgElement Test is ", svgElement)
        setGenerateSVGAuto(svgElement)
    }else{
        let remedyDisp = nft?.metadata.attributes[2].value - nft?.metadata.attributes[3].value;

        const svgElement = await RemedySvgPdfGenerator(nft?.metadata.name, convertBigNumberToFourDigitYear(nft?.metadata.attributes[5].value), 
        nft?.metadata.attributes[10].value, nft?.metadata.description, nft?.metadata.attributes[0].value, remedyDisp )


        console.log("Other svgElement Test is ", svgElement)
        setGenerateSVGAuto(svgElement)
    }

    // console.log("svgElement Test is ", svgElement)
    // setGenerateSVGAuto(svgElement)
    // return imageLocation = 'data:image/svg+xml;base64,' + btoa(svgData);
}



    const handleConvertClickerManual = async (e) => {
        let remedyDisp = nft?.metadata.attributes[2].value - nft?.metadata.attributes[3].value;
        //convertBigNumberToFourDigitYear(nft?.metadata.attributes[5].value)
        const svgElement = await RemedySvgForJorgeRucker(remedyPatientName, rxRemedyDate, 
        // nft?.metadata.attributes[10].value, nft?.metadata.description, remedyMedication, remedyQuantity )
        remedyPhysicalAddress, remedySig, remedyMedication, remedyQuantity )      
        setGenerateSVGAuto(svgElement)
    }


// const generateSVGAuto = handleConvertClickerInternal()
// const getImageAuto = autoConvertClicker()

useEffect(() => {
    autoConvertClicker()
}, [generateSVGAuto])

const autoConvertClicker = () => {
// const handleConvertClickerInternal = async (e) => {
//     e.preventDefault()
//     const canABrotherSetAnSVGMyNigga = await autoConvertClicker();

    const svgElement = svgContainerInternal.current;
    // const svgElement = generateSVGAuto;
    console.log("Auto svgElemento es: ",svgElement)
    // const svgElement = await RemedySvgPdfGenerator("Eric Cartman", "6/20/2023", "123 Bud Liiiight Way, Houston, TX 78745", "Take PRN for pain, (2) Take when angry about Kyle, (3) Take when needed to calm anger, (4) Take bid tid blah, blah, blah, blah", "Amlodipine 100mg Tablet", "30")

    // Create a canvas element to render the SVG
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const svgRect = svgElement.getBoundingClientRect();

    console.log("svgRect is: ",svgRect)
    canvas.width = svgRect.width;
    canvas.height = svgRect.height;

    // Capture the SVG content as an image
    html2canvas(svgElement, { canvas })
      .then(canvas => {
        // Convert the canvas to an image data URL
    // const imageDataUrl = canvas.toDataURL('image/png');
        // let imageDataUrl = canvas.toDataURL('image/png');
        let imageDataUrl = canvas.toDataURL('image/jpeg');

        setGetImageDateUrl(imageDataUrl)
        // ...scriptFax, 
        setScriptFax({script_image_name: `${imageDataUrl}.jpeg`, script_image_location: imageDataUrl, pharmacy_fax: pharmacyFax.pharmacy_fax });
        console.log("Inside of autoConvertClicker SVG to JPEG fn, scriptFax is now: ",scriptFax)

        // Send the image data URL as a fax or perform further processing
        // console.log('Image data URL:', imageDataUrl);
      })
      .catch(error => {
        console.error('Error capturing SVG:', error);
      });
}


const [showSubmitButton, setShowSubmitButton] = useState('none')

const [displaySelectedPharmacy, setDisplaySelectedPharmacy] = useState('The Pharmacy')

  return (
    <>
       


{/* SVG ******************************************************************************* */}
{/* {!isLoadingNFT ? ( 
    <> */}
    <h2>Script Preview for Medication {nft?.metadata.attributes[0].value}</h2>


    <div className="row">
        <label>Patient Name</label>
        <input placeholder={nft?.metadata.name} type="text" className="form-control" onChange={(event) => {setRemedyPatientName(event.target.value)}} />
    </div>     

    <div className="row">
        <label>Patient Physical Address</label>
        <input placeholder={nft?.metadata.attributes[10].value} type="text" className="form-control" onChange={(event) => {setRemedyPhysicalAddress(event.target.value)}} />
    </div>   

    <div className="row">
        <label>Sig</label>
        <input placeholder={nft?.metadata.description} type="text" className="form-control" onChange={(event) => {setRemedySig(event.target.value)}} />
    </div>  


    <div className="row">
        <div className="col-md-4">
            <label>Prescribed/Ordered</label>
            <input placeholder={convertBigNumberToFourDigitYear(nft?.metadata.attributes[5].value)} type="text" className="form-control" onChange={(event) => {setRemedyRxDate(event.target.value)}} />
        </div>   

        <div className="col-md-4">
            <label>Medication/Test Name</label>
            <input placeholder={nft?.metadata.attributes[0].value} type="text" className="form-control" onChange={(event) => {setRemedyMedication(event.target.value)}} />
        </div>  

        <div className="col-md-4">
            <label>DISP# / DX Codes</label>
            <input placeholder={nft?.metadata.attributes[2].value - nft?.metadata.attributes[3].value} type="text" className="form-control" onChange={(event) => {setRemedyQuantity(event.target.value)}} />
        </div>  

    </div>   
            
        

        {/* <button className="btn btn-success" onClick={(e) => handleConvertClickerManual(e)}>Manually Update Script</button> */}
        <button className="btn btn-success" onClick={handleConvertClickerManual}>Manually Update Script</button>

        <hr></hr>

        {/* <div ref={svgContainerInternal} className="svg-component"> */}
        <div ref={svgContainerInternal}>          
                {generateSVGAuto}   
        </div>       
        

{/* PATIENT SELECT PHARMACY ******************************************************************************* */}
<hr></hr>
{/* <div className="progress">
  <div className="progress-bar" ></div>
</div> */}
<h2>Transfer Script</h2>
        <div className="card">
                <div className="card-header bg-light">
                    <h5 className="card-title">Select A Pharmacy</h5>
                    {/* <div className="text-right">
                        <Link to="/" className="btn btn-primary text-right">Go somewhere</Link>
                    </div> */}
                </div>
                <div className="card-body" style={{background:"#F0F1F2"}}>
                    
                        <br></br>
                                <p className="card-text">Select a participating pharmacy from the drop down list below and click the green 
                                button to send your script to the pharmacy of your choice.</p>

                                <form onSubmit={e => handleSubmitTest(e)}>

                                    {/* <div className="view-scripts-card"> */}
                                    <div  style={{background:"#F0F1F2"}}>

                                            <div className="input-group-mb-3">

                                                {/* <select className="form-select" aria-label="Select A Pharmacy" name="rxWallet" value={rxWallet.value} onChange={(e) => handlePharmacyChange(e, nft.metadata.id)}  > */}
                                                <select className="form-select" aria-label="Select A Pharmacy" name="rxWallet" onChange={(e) => handlePharmacyChange(e, nft?.metadata.id)}  >
                                                   
                                                    <option selected value="none">Select a Pharmacy...</option>

                                                    {pharmacy.map((pharmacy, index) => (
                                                        <option 
                                                            value={`${pharmacy.pharmacy_wallet}`}                                                                                  
                                                            key={`${index}`}>
                                                                {pharmacy.pharmacy_name} [{addyShortner(pharmacy.pharmacy_wallet)}]
                                                        </option>                                                                            
                                                    ))}

                                                </select>     
                                            </div>

                                            {/* <button type="submit" className="btn btn-success">Submit {nft?.metadata.attributes[0].value} To Pharmacist</button>  */}
                                            

                                            <div className="row">
                                                <div className="col-md-12">  
                                                    <div style={{display: `${showSubmitButton}`}} >                                        
                                                        <button type="submit" className="btn btn-success">Send Your NFT Script To {displaySelectedPharmacy}</button>                        
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                </form>

                </div>
                <div className="card-footer text-muted">
                    Pills Left To Fill: {nft?.metadata.attributes[2].value - nft?.metadata.attributes[3].value}
                </div>
        </div>



{/* IMAGE ******************************************************************************* */}
        <div style={{visibility:"hidden"}} > 
            <img src={getImageDataUrl} />
        </div>  
    {/* </>
        ) : (                                     
            <h5>Loading Your Script...</h5>
        )} */}
        

    </>
  )
}
export default PatientFaxScript