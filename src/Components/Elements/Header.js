
import logo from '../../assets/images/brand-transparent.svg';
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown, Menu } from 'antd';
import React from 'react';

const Header = ({ active }) => {

    const navigate = useNavigate()
    //toogle dislpay nav on mobile
    const displaynav = () => document.querySelector(".navbar").classList.toggle("navdisplay")

    //retrive current user email
    const currentemail = sessionStorage.getItem("email")
    const adminemail = sessionStorage.getItem("adminemail")


    const logout = () => {
        sessionStorage.clear()
        window.location.reload();

        navigate('/')
    }


    //dropdown menu for login nav
    const menu = (
        <Menu>
            <Menu.Item key="user">
                <Link to={"/userlogin"} className="links">User</Link>
            </Menu.Item>
            <Menu.Item key="admin">
                <Link to={"/adminlogin"} className="links"> Admin </Link>
            </Menu.Item>
        </Menu>
    )

    return (
        <header>
            <picture>
                < img src={logo} alt="BootOrganizer" />
            </picture>
            <nav className='navbar'>
                <Link to={adminemail ? "/adminhomepage" : "/"} className={`links ${active === 'home' ? 'active' : ''}`} >Home</Link>
                <Link to={"/about"} className={`links ${active === 'about' ? 'active' : ''}`}>
                    About
                </Link>
                {
                    adminemail ?
                        <React.Fragment>
                            <Link to={"/complaintlist"} className={`links ${active === 'complaint' ? 'active' : ''}`}>
                                Complaints
                            </Link>
                            <Link to={"/addcamp"} className={`links ${active === 'addcamp' ? 'active' : ''}`}>
                                AddCamp
                            </Link>
                        </React.Fragment>
                        :
                        <Link to={"/support"} className={`links ${active === 'support' ? 'active' : ''}`}>
                            Support
                        </Link>
                }

                {/* {
                    adminemail ?
                        <Link to={"/"} className={`links ${active === 'support' ? 'active' : ''}`}>
                            BootCampList
                        </Link>
                        : null
                } */}
                {
                    currentemail || adminemail ?
                        <p onClick={logout} className={`links`}> Logout </p>

                        :

                        <React.Fragment>
                            <Dropdown overlay={menu} placement="bottomCenter" className={`links ${active === 'login' ? 'active' : ''}`}>
                                <p className='links'> Login </p>
                            </Dropdown>
                            <Link to={"/signin"} className={`links ${active === 'signin' ? 'active' : ''}`}> Signin </Link>

                        </React.Fragment>
                }
            </nav>

            <div className='burgerbox' onClick={displaynav}>
                <div />
                <div />
                <div />
                <div />
            </div>
        </header>
    )
}


export default Header