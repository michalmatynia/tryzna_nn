import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faAddressBook, faEnvelope, faBriefcase } from '@fortawesome/free-solid-svg-icons'

const Footer = ({data}) => {
    
        return (
            data.siteData ?
            <footer className="bck_b_dark">
                <div className="container">
                    <div className="logo">
                        Waves
                    </div>
                    <div className="wrapper">
                        <div className="left">
                            <h2>Contact Information</h2>
                            <div className="business_nfo">
                                <div className="tag">
                                    <FontAwesomeIcon icon={faCoffee} className="icon" />
                                    <div className="nfo">
                                        <div>Address</div>
                                        <div>{data.siteData[0].address}</div>
                                    </div>
                                </div>
                                <div className="tag">
                                    <FontAwesomeIcon icon={faAddressBook} className="icon" />
                                    <div className="nfo">
                                        <div>Phone</div>
                                        <div>{data.siteData[0].phone}</div>
                                    </div>
                                </div>
                                <div className="tag">
                                    <FontAwesomeIcon icon={faEnvelope} className="icon" />
                                    <div className="nfo">
                                        <div>Working Hours</div>
                                        <div>{data.siteData[0].hours}</div>
                                    </div>
                                </div>
                                <div className="tag">
                                    <FontAwesomeIcon icon={faBriefcase} className="icon" />
                                    <div className="nfo">
                                        <div>Email</div>
                                        <div>{data.siteData[0].email}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="left">
                            <h2>Be the first to know</h2>
                            <div>Some more infomration</div>
                        </div>
                    </div>

                </div>

            </footer>
            :null
        );
    
};

export default Footer;
