import React from 'react';
import Header from '../navdrawer/Header';
import './about.css'

const About = () => {
    return (
        <div className='about-page-container'>
            <Header />
            <div className='about-info-wrapper'>
                <div className='about-info-container'>
                        <h1 className='about-title'>About This App</h1>
                    <div className='about-info-text'>

                        <section>
                            <h2>Introduction:</h2>
                            <p>
                                This application was developed in collaboration with the Technologies and Web Development course,
                                from the Masters in Communication and Web Technologies, at the <a href='https://www.ua.pt/' target='_blank' rel="noreferrer">University of Aveiro</a>. This app was
                                developed to serve as my final submission for the practical appeal component of the course.
                            </p>
                            <p>
                                The main focus of the app is placed on two games: a Pokémon guessing game called Pokédle, and a Pokémon
                                themed memory game, which I called Memokemon. Both games&apos; rules are present in their respective pages, if there
                                is need for more information.
                            </p>
                        </section>

                        <section>
                            <h2>General Challenge:</h2>
                            <p>
                                As said by the professors: “The project work should focus in developing a website with a game dimension, based on the creative
                                exploration of a public API related to the universe of Pokémon or other types of cartoons/manga”, hence why I chose to make a
                                Pokémon themed app and games.
                            </p>
                        </section>

                        <section>
                            <h2>Objectives And Applied Knowledge:</h2>
                            <p>
                                This app&apos;s main objective, apart from trying to complete the general challenge proposed by the professors, is to show the retention
                                and application of knowledge lectured on the course classes, such as (but not limited to) the following:
                            </p>
                            <ul>
                                <li> <a href='https://react.dev/' target='_blank' rel="noreferrer">ReactJS</a> proficiency</li>
                                <li><a href='https://www.redhat.com/en/topics/devops/what-is-ci-cd' target='_blank' rel="noreferrer" >CI/CD</a> integration</li>
                                <li>Dynamic Deployment of Web Apps</li>
                                <li><a href='https://www.npmjs.com/package/prop-types' target='_blank' rel="noreferrer" >Prop Types</a></li>
                                <li> <a href='https://redux-toolkit.js.org/' target='_blank' rel="noreferrer">Redux Tool Kit (RTK)</a> for data storage and manipulation, and for consumption of data originating from external APIs</li>
                            </ul>
                            <p>
                                In this app, I not only used the aforementioned concepts, but also took the creative liberty of experimenting with technologies not
                                lectured in class, that, in my opinion, complemented the rest of the app nicely, these being the  <a href='https://firebase.google.com/' target='_blank' rel="noreferrer">Firebase Authentication and FireStore
                                Database</a> (and their respective APIs, through RTK) to save and manage user authentication and to store the users information, in relation
                                to the game, as well as React Icons for some icons on the pages.
                            </p>
                        </section>

                        <section>
                            <h2>Acknowledgments:</h2>
                            <p>
                                A huge thanks to professors Carlos Santos and David Oliveira, from my Masters, without whom this app&apos;s development would not be possible,
                                thanks for giving me an opportunity to prove my worth with this challenge.
                            </p>
                            <p>
                                Another huge thanks to my girlfriend, Ana, that has been there for me every step of the way, and has made the development process way more
                                enjoyable.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;