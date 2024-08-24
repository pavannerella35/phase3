import React from "react";
import $ from "jquery";
import axios from 'axios';

import "../assets/css/style.css";

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

            <section className="section service" aria-labelledby="service-label">
              <div className="container" style={{marginTop: "20px"}}>

                <p className="section-subtitle" id="service-label">What We Do?</p>

                <h2 className="h2 section-title">
                  The service we offer is specifically designed to meet your needs.
                </h2>

                <ul className="grid-list">

                  <li>
                    <div className="service-card">

                      <div className="card-icon">
                        <ion-icon name="call-outline" aria-hidden="true"></ion-icon>
                      </div>

                      <h3 className="h4 card-title">24/7 Support</h3>

                      <p className="card-text">
                        Access round-the-clock customer support to address any technical issues, questions, or concerns you may have.
                      </p>

                      <a href="#" className="btn-text">
                        <span className="span">Learn More</span>

                        <ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon>
                      </a>

                    </div>
                  </li>

                  <li>
                    <div className="service-card">

                      <div className="card-icon">
                        <ion-icon name="shield-checkmark-outline" aria-hidden="true"></ion-icon>
                      </div>

                      <h3 className="h4 card-title">Well-being</h3>

                      <p className="card-text">
                        Access resources and tools to support your mental and emotional well-being, including stress management techniques sessions.
                      </p>

                      <a href="#" className="btn-text">
                        <span className="span">Learn More</span>

                        <ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon>
                      </a>

                    </div>
                  </li>

                  <li>
                    <div className="service-card">

                      <div className="card-icon">
                        <ion-icon name="thermometer-outline"></ion-icon>
                      </div>

                      <h3 className="h4 card-title">Health Monitoring</h3>

                      <p className="card-text">
                      Keep tabs on key health metrics such as heart rate, blood glucose levels, and more using compatible health monitoring devices.
                      </p>

                      <a href="#" className="btn-text">
                        <span className="span">Learn More</span>

                        <ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon>
                      </a>

                    </div>
                  </li>

                  <li>
                    <div className="service-card">

                      <div className="card-icon">
                        <ion-icon name="pie-chart-outline" aria-hidden="true"></ion-icon>
                      </div>

                      <h3 className="h4 card-title">Nutrition Planning</h3>

                      <p className="card-text">
                        Access a database of nutritious recipes, meal plans, and dietary guidelines tailored to your health goals and preferences.
                      </p>

                      <a href="#" className="btn-text">
                        <span className="span">Learn More</span>

                        <ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon>
                      </a>

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