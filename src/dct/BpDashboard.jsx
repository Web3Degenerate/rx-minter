import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import "../styles/App.css";

import { useAddress, useContract, ConnectWallet } from "@thirdweb-dev/react";
// import { BpDashboard } from ".";
    //removed: useOwnedNFTs, ThirdwebNftMedia, Web3Button, useTransferNFT, MediaRenderer, useMetadata
    
const BpDashboard = () => {
// export default function Home() {


//*************************************************************************************** */
const { contract } = useContract("0xE0a73cAEb01ABdee510993F2d6a525b9948B49dF"); // 11.0

 //Get Current User's Addy: 
 const address = useAddress(); 

 const addyShortner = (address) => {
  let tempAddy = String(address);
    // String(address).substring(0, 6) + "..." + String(address).substring(address.length - 4);
    const tinyAddy = tempAddy.substring(0, 6) + "..." + tempAddy.substring(37)
    return tinyAddy;
 }

// Your NFT collection contract address
 const contractAddress = "0xE0a73cAEb01ABdee510993F2d6a525b9948B49dF";

//******************************************************************************************* */
    let navigate = useNavigate();

    const [patient, setPatient] = useState([]);


    // const [show, setShow ] = useState('none');

    // if(address){setShow('block')};
        
        useEffect(()=> {    
            loadUsers();     
        }, [])
 

        // /ihealth/php-react/view-patients.php
    const loadUsers = async () => {
        setPatient([]);   
        const result = await axios.get("https://dentcareteam.com/ihealth/php-react/view-patients.php");
        console.log(result);
        setPatient(result.data.records);
        navigate('/bp-dashboard');
    }

    const deleteUser = (id) => {
        axios.delete("https://rxminter.com/php-react/hold/delete.php", { data: { id: id} }).then((result)=>{ 
            // window.location.reload(true);
            loadUsers();
            // navigate('/');
        }).catch(() => {
            alert('Error, unable to delete patient');
        });
    }

//from: https://www.youtube.com/watch?v=xAqCEBFGdYk
    const [search, setSearch] = useState('');
    // console.log(search);

 


  return (
<>

{address ? (
    <>
                            <div className="connect text-center">
                                    <ConnectWallet dropdownPosition={{
                                        align: 'center',
                                        side: 'bottom'
                                    }} />
                            </div> 

                {/* <div className="row">   */}
                        <div className="col-md-12 text-center">
                            <b>You have connected to Rx Minter With Wallet: {addyShortner(address)}</b>  
                        </div>
                {/* </div> */}
        
        <div className="row">
            <div className="col-md-12 text-center">
                <h1>RPM Patient List</h1>
            </div>
        </div>



        
        <div className="row">
            <div className="col-md-12 text-center">
                <div className="input-group mb-3">
                    <input type="search" className="form-control" placeholder="Search For Patient" aria-label="Recipient's username" aria-describedby="basic-addon2"
                    onChange={(e) => setSearch(e.target.value.toLowerCase())}></input>
                    {/* <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button">Search</button>
                    </div> */}
                </div>        
            </div>
        </div>

        <table className="table table-striped table-dark">
            <thead>          
                <tr>
                    <th style={{display: "none"}}>Key</th>
                    <th>Patient</th>
                    
                    <th>MRN</th>
                    
                    <th>DOB</th>

                    <th>Status</th>
                    
                    <th>email</th>

                    <th>View Reads</th>
                </tr> 
            </thead>
            <tbody className="table-striped">
             {/* <tr key={`${index}`}> */}

            {patient.filter((patient) => {
               return search.toLowerCase() === '' ? patient : patient.name.toLowerCase().includes(search) || patient.mrn.toLowerCase().includes(search)
            }

            ).map((patient, index) => (
                    <tr key={`${index}`}>
                        <td style={{display: "none"}}>{index+1}</td>

                        <td><Link className="btn btn-outline-light"  to={`/patient-history/${patient.id}`}>{patient.name}</Link></td>
                        
                        <td>{patient.mrn}</td>

                        <td>{patient.dob}</td>

                        <td>{patient.status}</td>

                        <td>{patient.email}</td>

                        <td><Link className="btn btn-primary" to={`/view-your-reads/${patient.id}`}>View Reads</Link></td>

                    </tr>
                ))}
            </tbody>
        </table>
    </>
        ) : (
            <>
                    
                    <div className="box_size_login text-center" style={{background:"#444943"}}>
                            <h2 style={{color:"white"}}>Please connect your MetaMask Wallet</h2>
                            <div className="connect text-center">
                                    <ConnectWallet dropdownPosition={{
                                        align: 'center',
                                        side: 'bottom'
                                    }} />
                            </div>                   

                    </div>
            </>
        )}

    {/* </div> */}
    
</>

  )
}
export default BpDashboard