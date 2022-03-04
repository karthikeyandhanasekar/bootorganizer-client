
import React from 'react';
import Header from './Elements/Header';
import poster from '../assets/images/about_poster.png'
const About = () => {
    document.title = "About"
    return (
        <React.Fragment>
            <Header active="about" />
            <br/>
            <main className='aboutmain'>
                <section>
                    <p className='about'>BootOrganizer goal is to make sure the student/trainee as started with their ambitious carrer life.Students will be guided step-by-step through the process of paragraph writing using practice printables, writing notebook inserts, and anchor charts that they will be able to keep as references for the entire year. Those practice sheets will serve as anchor papers for all future writing.
                        BootOrganizer  is perfect for those of you who has aspiried to train yourself.. All the work has been done for you!</p>
                    <section>
                        <h1><strong>Contact US</strong></h1>
                        <address>
                            A10 & 11, IT PARK, 3rd Floor, 500, Anna Road, Tech Nagar, Chennai, Tamil Nadu 600035
                        </address>
                        <a href='mailto:dkmailpratice@gmail.com'><strong>dkmailpratice@gmail.com</strong></a>
                    </section>
                </section>
                <section className='aboutposter'>
                    <img src={poster} alt='bootorganizer' />
                </section>
            </main>
        </React.Fragment>

    )
}

export default About