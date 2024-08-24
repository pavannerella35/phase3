import React from "react";
import $ from "jquery";
import axios from 'axios';
import { ReactSession } from 'react-client-session';

import "../assets/css/style.css";

import config from "../assets/config.json"

import banner from "../assets/img/about-banner.png";

const pathname = window.location.pathname;
var route = pathname.split("/");
let page = route[1];

console.log("page:" + page)

class Main extends React.Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {

    // const addEventOnElements = function (elements, eventType, callback) {
    //     for (let i = 0, len = elements.length; i < len; i++) {
    //       elements[i].addEventListener(eventType, callback);
    //     }
    // }

    // const navbar = document.querySelector("[data-navbar]");
    // const navTogglers = document.querySelectorAll("[data-nav-toggler]");
    // const overlay = document.querySelector("[data-overlay]");
    
    // const toggleNavbar = function () {
    //     console.log('toggle ', i);
    //     console.log(navbar.classList)
    //     navbar.classList.toggle("active");
    //     overlay.classList.toggle("active");
    //     document.body.classList.toggle("nav-active");
    //     i++;
    // }

    // addEventOnElements(navTogglers, "click", toggleNavbar);

    const header = document.querySelector("[data-header]");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 100) {
            header.classList.add("active");
        } else {
            header.classList.remove("active");
        }
    });

    const sliders = document.querySelectorAll("[data-slider]");

    const initSlider = function(currentSlider) {

    const sldierContainer = currentSlider.querySelector("[data-slider-container]");
    const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
    const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

    let currentSlidePos = 0;

    const moveSliderItem = function () {
        sldierContainer.style.transform = `translateX(-${sldierContainer.children[currentSlidePos].offsetLeft}px)`;
    }

    /**
     * NEXT SLIDE
     */

    const slideNext = function () {
        const slideEnd = currentSlidePos >= sldierContainer.childElementCount - 2;
        console.log("----------------------" , sldierContainer.childElementCount);
        if (slideEnd) {
        currentSlidePos = 0;
        } else {
        currentSlidePos++;
        }

        moveSliderItem();
    }

    sliderNextBtn.addEventListener("click", slideNext);

    /**
     * PREVIOUS SLIDE
     */

    const slidePrev = function () {

        if (currentSlidePos <= 0) {
        currentSlidePos = sldierContainer.childElementCount - 2;
        } else {
        currentSlidePos--;
        }

        moveSliderItem();
    }

    sliderPrevBtn.addEventListener("click", slidePrev);

    const dontHaveExtraItem = sldierContainer.childElementCount <= 1;
    if (dontHaveExtraItem) {
        sliderNextBtn.style.display = "none";
        sliderPrevBtn.style.display = "none";
    }

    }

    for (let i = 0, len = sliders.length; i < len; i++) { initSlider(sliders[i]); }

    // const accordions = document.querySelectorAll("[data-accordion]");

    // let lastActiveAccordion = accordions[0];

    // const initAccordion = function (currentAccordion) {

    //   const accordionBtn = currentAccordion.querySelector("[data-accordion-btn]");

    //   const expandAccordion = function () {
    //     if (lastActiveAccordion && lastActiveAccordion !== currentAccordion) {
    //       lastActiveAccordion.classList.remove("expanded");
    //     }

    //     currentAccordion.classList.toggle("expanded");

    //     lastActiveAccordion = currentAccordion;
    //   }

    //   accordionBtn.addEventListener("click", expandAccordion);

    // }

    // for (let i = 0, len = accordions.length; i < len; i++) { initAccordion(accordions[i]); }
        
  }

  navAddEvent() {
    const navbar = document.querySelector("[data-navbar]");
    const navTogglers = document.querySelectorAll("[data-nav-toggler]");
    const overlay = document.querySelector("[data-overlay]");
    
    
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
       
  }

  // accordionBtn()
  // {
  //   const accordions = document.querySelectorAll("[data-accordion]");
  //   let lastActiveAccordion = accordions[0];

  // }

  redirect() {
    const email = $("#Lemail");
    const password = $("#Lpassword");
    // const userType = $('#userType');
    const pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
    if (!email.val() || !pattern.test(email.val())) {
      alert('Email is not valid');
      $('#Lemail').focus()
      return
    }
    if (!password.val()) {
      alert('Enter password');
      $('#Lpassword').focus()
      return
    }
    // if (userType.val() == "userType") {
    //   alert('Select userType');
    //   // $('#userType').focus()
    //   return
    // }

    const data = {
      email: email.val(),
      password: password.val()
    }

    
    // let url = "/" + userType.val() + "/home"

    // window.location.replace(url)

    axios.post(config.server + `/login`, JSON.stringify(data))
      .then(res => {
        console.log(res);
        console.log(res.data);
        if (res.data.status == 'redirect') {
          if (res.data.message.active == 0) {
            alert('You dont have access contact admin')
            return
          }

          ReactSession.set("loggedIn", true);
          ReactSession.set("userId", res.data.message.userId);
          ReactSession.set("userEmail", res.data.message.email);
          ReactSession.set("userName", res.data.message.name);
          ReactSession.set("userType", res.data.message.userType);

          const userType = $('#userType');

          let url = origin + "/" + res.data.message.userType + "/home";
          
          console.log('url:' + url)

          // console.log(ReactSession.get("userId"))

          window.location.replace(url)

          // setTimeout(() => {
          //   const userId = ReactSession.get("userId");
          //   console.log("User ID:", userId);
          
          //   const userType = ReactSession.get("userType");
          //   console.log("User Type:", userType);
          
          //   if (userId && userType) {
          //     const url = `${origin}/${userType}/home`;
          //     window.location.replace(url);
          //   } else {
          //     console.error("Session values not properly set");
          //   }
          // }, 500);
        }
        else {
          alert(res.data.message)
        }
      })
  }


  render() {
    return (

      <div>
        <header className="header active" data-header>
          <div className="container">

            <a href="#" className="logo">
              <h2 className="logo-light ">Smart Health Hub</h2>
              <h2 className="logo-dark">Smart Health Hub</h2>
            </a>

            <nav className="navbar" data-navbar>

              <div className="navbar-top">
                <a href="#" className="logo">
                  Smart Health Hub
                </a>

                <button className="nav-close-btn" aria-label="close menu" onClick={(e) => this.navAddEvent()} data-nav-toggler>
                  <ion-icon name="close-outline" aria-hidden="true"></ion-icon>
                </button>
              </div>

              <ul className="navbar-list">

                <li>
                  <a href="home" className="navbar-link" style={{color: "rgb(87 123 192)"}}>Home</a>
                </li>

                <li>
                  <a href="about" className="navbar-link" style={{color: "rgb(87 123 192)"}}>About</a>
                </li>

                <li>
                  <a href="service" className="navbar-link" style={{color: "rgb(87 123 192)"}}>Service</a>
                </li>

                <li>
                  <a href="contact" className="navbar-link" style={{color: "rgb(87 123 192)"}}>Contact</a>
                </li>
                <li>
                    <a href="https://blog.pxn2799.uta.cloud/" className="navbar-link" style={{color: "rgb(87 123 192)"}}>Blog</a>
                </li>
              </ul>


              <ul className="social-list">

                <li>
                  <a href="#" className="social-link">
                    <ion-icon name="logo-twitter"></ion-icon>
                  </a>
                </li>

                <li>
                  <a href="#" className="social-link">
                    <ion-icon name="logo-facebook"></ion-icon>
                  </a>
                </li>

                <li>
                  <a href="#" className="social-link">
                    <ion-icon name="logo-dribbble"></ion-icon>
                  </a>
                </li>

                <li>
                  <a href="#" className="social-link">
                    <ion-icon name="logo-instagram"></ion-icon>
                  </a>
                </li>

                <li>
                  <a href="#" className="social-link">
                    <ion-icon name="logo-youtube"></ion-icon>
                  </a>
                </li>

              </ul>

            </nav>

            <a href="login" className="btn btn-primary">Login</a>

            <button className="nav-open-btn" aria-label="open menu" onClick={(e) => this.navAddEvent()} data-nav-toggler>
              <ion-icon name="menu-outline" aria-hidden="true"></ion-icon>
            </button>

            <div className="overlay" data-nav-toggler data-overlay></div>

          </div>
        </header>

        <main>
          <article>

            <section className="section contact" aria-labelledby="service-label">
              <div className="container" style={{marginTop: "20px"}}>

                <p className="section-subtitle" id="service-label">Have an account ?</p>

                <h2 className="h2 section-title">
                  Login
                </h2>
                <br/>
                <ul className="grid-list-contact">
                  <li>
                  </li>
                  <li>
                <div className="service-card" >

                  <form action="" className="input-wrapper " >
                    <input type="email" id="Lemail" placeholder="Email" className="input-field"/>
                    <input type="password" id="Lpassword"  placeholder="Password" className="input-field"/> 
                    
                    <br/>
                    <a href="forgot" style={{color: "hsla(234, 50%, 64%, 1)"}}>Forgot password?</a>
                    <div style={{display: "inline-flex"}}>
                      <a href="#" className="btn btn-outline" onClick={(e) => this.redirect()} style={{backgroundColor: "hsla(234, 50%, 64%, 1)"}}>Login</a>
                      <a href="signup" className="btn btn-outline" style={{backgroundColor: "hsla(234, 50%, 64%, 1)"}}>Signup</a>
                    </div>

                  </form>

                </div>
              </li>
            </ul>
              </div>
            </section>

          </article>
        </main>

        <footer className="footer">
            <div className="container grid-list">

            <div className="footer-brand">

                <p className="footer-text">
                &copy; Samrt Health hub
                </p>

                <ul className="social-list">

                <li>
                    <a href="#" className="social-link">
                    <ion-icon name="logo-facebook"></ion-icon>
                    </a>
                </li>

                <li>
                    <a href="#" className="social-link">
                    <ion-icon name="logo-twitter"></ion-icon>
                    </a>
                </li>

                <li>
                    <a href="#" className="social-link">
                    <ion-icon name="logo-dribbble"></ion-icon>
                    </a>
                </li>

                <li>
                    <a href="#" className="social-link">
                    <ion-icon name="logo-instagram"></ion-icon>
                    </a>
                </li>

                <li>
                    <a href="#" className="social-link">
                    <ion-icon name="logo-youtube"></ion-icon>
                    </a>
                </li>

                </ul>

            </div>


            </div>
        </footer>
      </div>
    );
  }
}

export default Main;