import React from 'react';
import Header from '../navdrawer/Header';
import './about.css'

const About = () => {
    return (
        <div className='about-page-container'>
            <Header/>
            <div className='about-info-wrapper'>
                <div className='about-info-container'>
                    <h2 className='about-title'>About this App</h2>
                </div>

            </div>
        </div>
    );
};

export default About;