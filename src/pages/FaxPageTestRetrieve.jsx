import 'bootstrap/dist/css/bootstrap.css';
import "../styles/App.css";
import axios from 'axios'; 
import html2canvas from 'html2canvas';

//************************************************************************************************************************** *//
// ****** TUTORIAL RAYS ON REACT IMAGE UPLAOD - MY MAN IN INDIA: https://www.youtube.com/watch?v=fFx4Pbe9dAs *************** //
//************************************************************************************************************************** *//
// https://www.w3schools.com/php/php_superglobals_post.asp


import { ethers } from 'ethers';

// Original idea for useRef came from: https://dev.to/kevinkh89/how-to-solve-input-delay-lagging-in-react-j2o
// Confirmed process: https://flaviocopes.com/react-hook-useref/
import React, { useState, useEffect, useRef, useContext, getContext } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'

import { FormField, CustomButton, ScriptSvgTemplate, RemedySvgPdfTemplate } from '../components';

import { alertService } from '../services';

import { scriptImageTest, RemedyScriptTemplatePDF } from '../assets';

import { addyShortner, formatDateFourDigitYear, formatDateTwoDigitYear, dayCalculatorDoc, convertNumberDateToRawString, convertBigNumberToFourDigitYear, convertBigNumberToRawString, RemedySvgPdfGenerator } from '../utils'
import { solidityContractAddress } from '../constants'
import RemedySvgTemplate from '../components/RemedySvgTemplate';

// import {RemedyScriptTemplatePDF} from '../assets'

const FaxPageTestRetrieve = () => {


//Get_Fax_Inbox: 
    const [inbox, setInbox] = useState([])

    const handleRetrieveInbox = async () => {

        try {
        //         const response = await axios.get('https://rxminter.com/srfax/Retrieve_Fax.php', {
        //             // responseType: 'text', // Adjust the responseType based on your expected response type
        //             // responseType: 'blob', // Adjust the responseType based on your expected response type
        //             responseType: 'arraybuffer' // Adjust the responseType based on your expected response type
        //         });
                          
                    // const response = await axios.get('https://rxminter.com/srfax/Get_Fax_Inbox_Curl.php')
                    const response = await axios.get('https://rxminter.com/srfax/Get_Fax_Inbox.php')

                        // await axios.get('https://rxminter.com/srfax/Get_Fax_Inbox.php', {
                        //     headers: {
                        //         'accept': 'application/json',
                        //         'Accept-Language': 'en-US,en;q=0.8',
                        //         'Content-Type': `application/json; charset=UTF-8`,
                        //       },
                        //     }
                        // ).then((response)=>{     })}             

                    setInbox(response.data.Result)
                    
                    
                        // setInbox(response.data.Result)
                        // setInbox(response.data)

                    // console.log("After setFaxContent content_type was: ", response.data.content_type)
                    console.log("After getInbox3 result was: ", response)
                    console.log("After getInbox3 response.data was: ", response.data)
                    console.log("After getInbox3 response.data.result was: ", response.data.Result)              
            }        
          catch(error){
                console.log('ERROR: Get-Fax-Inbox.php returned: ', error)
                // alertService.error(`Retrieve-Fax.php Error with message of ${error} :(`, options);           
        } 

    }














// Attempt 1: 
    const [faxContent, setFaxContent] = useState('');

// Attempt 2:
    const [result, setResult] = useState('');
    const [resultAtob, setResultAtob] = useState('')
    // const [result, setResult] = useState({ content_type: '', data: '' });
    const [error, setError] = useState('');

    const handleRetrieveFax = async () => {

        try {
        //         const response = await axios.get('https://rxminter.com/srfax/Retrieve_Fax.php', {
        //             // responseType: 'text', // Adjust the responseType based on your expected response type
        //             // responseType: 'blob', // Adjust the responseType based on your expected response type
        //             responseType: 'arraybuffer' // Adjust the responseType based on your expected response type
        //         });
                          
                    const response = await axios.get('https://rxminter.com/srfax/Retrieve_Fax.php')
                    setFaxContent(response)

                    setResult(response.data)

                        // let encodedResponse = btoa(response)
                        // setResult(encodedResponse)
                        // let decodedResponse = atob(response) //[object Object]
                        let decodedResponse = btoa(response.data)
                        setResultAtob(decodedResponse)

                    // console.log("After setFaxContent content_type was: ", response.data.content_type)
                    console.log("After setFaxContent result was: ", response.data.result)
                    console.log("After setFaxContent response.data was: ", response.data)
                    console.log("After setFaxContent response.result object was: ", response.result)
            }

        //     // Check if the response contains an error property
        //     setResult(response);
        //     console.log("response is ",response)
        //     console.log("response.data is ",response.data)

        //         // if (response.data.error) {
        //         //     setError(response.data.error);
        //         // } else {
        //         //   setResult(response.data.result);
        //         //     // setResult({
        //         //     //     content_type: response.data.content_type,
        //         //     //     data: response.data.result,
        //         //     // });
        //         // }
        // } 

                // catch (error) {
                //     console.error('Error retrieving fax:', error);
                //     // setError('An error occurred while retrieving the fax.');
                // }

// try {
//     const response = await axios.get('https://rxminter.com/srfax/Retrieve_Fax.php', {
//         responseType: 'arraybuffer', // This indicates binary data
//     });

//     const blob = new Blob([response.data], { type: 'application/pdf' }); // Adjust the type according to your content
//     console.log("blob is: ", blob)
//     const url = URL.createObjectURL(blob);
//     console.log("url is: ", url)
//     setResult(url);
//     // setFaxContent(blob)
//     console.log('SUCCESS: Retrieve-Fax.php returned: ', response.data)
//     }
          
          catch(error){
                console.log('ERROR: Retrieve-Fax.php returned: ', error)
                // alertService.error(`Retrieve-Fax.php Error with message of ${error} :(`, options);
                setError('An error occurred while retrieving the fax.');
        } 

    }



  return (
        <>

            <h3>Get Fax Inbox (1/7/2023)</h3>
            <button className="btn btn-info" onClick={handleRetrieveInbox}>Get Fax Inbox (onClick=handleRetrieveInbox)</button>

        <br></br>
        <br></br>
                {inbox ? inbox.map((fax, index) => (
                    <ul key={index}>
                        <li>Fax Name: {fax.FileName}</li>
                        <li>Date: {fax.Date}</li>
                        <li>Caller ID: {fax.CallerID}</li>
                        <li>Remote ID: {fax.RemoteID}</li>
                    </ul>
                )) : <p>Nothing found.</p>}


            <br></br>
<hr></hr>
<br></br>
            <h3>Retrieve Fax Test (1/6/2023)</h3>

            <button className="btn btn-warning" onClick={handleRetrieveFax}>Send Fax Now (onClick=handleRetrieveFax)</button>

            <div>
                <h3>As PDF</h3>
                
                {error && <div style={{ color: 'red' }}>{error}</div>}

                {result && (
                    <div>
                        <p>Success! Result from Server:</p>
                        <p>Text: {result}</p>
                        <p>base64 Text: {resultAtob}</p>
                        {/* Display the PDF using an iframe */}
                        <iframe title="PDF Viewer" width="100%" height="500px" src={`data:application/pdf;base64,${result}`} />
                    </div>
                )}


                <hr></hr>
                {/* Display the retrieved fax content */}
                {/* {faxContent && <iframe title="Fax" srcDoc={faxContent} width="100%" height="500px" />} */}
                <h3>As iframe</h3>
                {faxContent && <iframe title="Fax" srcDoc={`<html><body>${faxContent}</body></html>`} width="100%" height="500px" />}
                <hr></hr>
                <h3>As Image</h3>
                {faxContent && <img src={faxContent} width="100%" height="500px" /> }
                {/* {imageUrl && <img alt="TIFF" src={imageUrl} />} */}
                {/* {faxContent && <img alt="TIFF" src={faxContent} />} */}

                {/* Second Attempt */}

               
               
            <div>
                {/* {faxContent && <img src={faxContent} width="100%" height="500px" />} */}
                {/* {faxContent && <iframe title="Fax" srcDoc={faxContent} width="100%" height="500px" />}

                {faxContent && <div style={{ color: 'red' }}>{faxContent}</div>} */}

            </div>


            </div>


        <br></br>
        <hr></hr>
        <br></br>
        <br></br>
               
                    
 
        </>
  )
}
export default FaxPageTestRetrieve

{/* <input type="checkbox" name="selectedFax[]" class="selectedFax" id="checkBox1" data-rowid="1" 
data-readstatus="unread" 
value="1234842814|20240105192008-309406-11294"> */}

// Latest Fax:
// sFaxFileName='1234842814'
// sFaxDetailsID='20240105192008-309406-11294'

{/* <input type="checkbox" name="selectedFax[]" class="selectedFax" id="checkBox2" data-rowid="2" 
data-readstatus="read" 
value="1234792110|20240105152315-309406-71271"> */}

// Penultimate Fax:
// sFaxFileName='1234792110'
// sFaxDetailsID='20240105152315-309406-71271'