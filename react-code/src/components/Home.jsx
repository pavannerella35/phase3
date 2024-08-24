import React from "react";
import $ from "jquery";
import axios from 'axios';

import "../assets/css/style.css";

import slide1 from "../assets/img/hero-slide-1.jpg";
import slide2 from "../assets/img/hero-slide-2.jpg";
import slide3 from "../assets/img/hero-slide-3.jpg";

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

    const accordions = document.querySelectorAll("[data-accordion]");

    let lastActiveAccordion = accordions[0];

    const initAccordion = function (currentAccordion) {

    const accordionBtn = currentAccordion.querySelector("[data-accordion-btn]");

    const expandAccordion = function () {
        if (lastActiveAccordion && lastActiveAccordion !== currentAccordion) {
        lastActiveAccordion.classList.remove("expanded");
        }

        currentAccordion.classList.toggle("expanded");

        lastActiveAccordion = currentAccordion;
    }

    accordionBtn.addEventListener("click", expandAccordion);

    }

    for (let i = 0, len = accordions.length; i < len; i++) { initAccordion(accordions[i]); }
        
  }

  navAddEvent() {
    const navbar = document.querySelector("[data-navbar]");
    const navTogglers = document.querySelectorAll("[data-nav-toggler]");
    const overlay = document.querySelector("[data-overlay]");
    
    
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
       
  }


  render() {
    return (

      <div>
        <header className="header" data-header>
            <div className="container">

            <a href="#" className="logo">
                <h2 className="logo-light color-white" >Smart Health Hub</h2>
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
                    <a href="" className="navbar-link">Home</a>
                </li>

                <li>
                    <a href="about" className="navbar-link">About</a>
                </li>

                <li>
                    <a href="service" className="navbar-link">Service</a>
                </li>

                <li>
                    <a href="contact" className="navbar-link">Contact</a>
                </li>

                <li>
                    <a href="https://blog.pxn2799.uta.cloud/" className="navbar-link">Blog</a>
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

            <section className="section hero has-bg-image" aria-label="home">
                
                <div className="container">

                <div className="hero-content">

                    <h1 className="h1 hero-title">Empowering Your Wellness Journey</h1>

                    <p className="hero-text">
                    Your Personalized Path to Optimal Health
                    </p>

                    <div className="btn-wrapper">

                    <a href="#" className="btn btn-primary">Explore Now</a>

                    <a href="#" className="btn btn-outline">Contact Us</a>

                    </div>

                </div>

                <div className="hero-slider" data-slider>

                    <div className="slider-inner">
                    <ul className="slider-container" data-slider-container>

                        <li className="slider-item">

                        <figure className="img-holder slider-size" >
                            <img src={slide1} width="575" height="550" alt="" className="img-cover" />
                        </figure>

                        </li>

                        <li className="slider-item">

                        <div className="hero-card">
                            <figure className="img-holder slider-size" >
                            <img src={slide2} width="575" height="550" alt="hero banner" className="img-cover"/>
                            </figure>

                            <button className="play-btn" aria-label="play adex intro">
                            <ion-icon name="play" aria-hidden="true"></ion-icon>
                            </button>
                        </div>

                        </li>

                        <li className="slider-item">

                        <figure className="img-holder slider-size" >
                            <img src={slide3} width="575" height="550" alt="" className="img-cover"/>
                        </figure>

                        </li>

                        <li className="slider-item">
                            <figure className="img-holder" >
                                <img src="../../assets/img/hero-slide-3.jpg" width="575" height="550" alt="" className="img-cover"/>
                            </figure>
                        </li>

                    </ul>
                    </div>

                    <button className="slider-btn prev" aria-label="slide to previous" data-slider-prev>
                    <ion-icon name="arrow-back"></ion-icon>
                    </button>

                    <button className="slider-btn next" aria-label="slide to next" data-slider-next>
                    <ion-icon name="arrow-forward"></ion-icon>
                    </button>

                </div>

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