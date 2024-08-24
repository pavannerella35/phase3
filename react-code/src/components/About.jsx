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

            <section className="about" aria-labelledby="about-label">
              <div className="container"  style={{marginTop: "20px"}}>

                <figure className="about-banner">
                  <img src={banner} width="800" height="580" loading="lazy" alt="about banner"
                    className="w-100" />
                </figure>

                <div className="about-content">

                  <p className="section-subtitle" id="about-label">Why Choose Us?</p>

                  <h2 className="h2 section-title">
                    We bring solutions to make life easier for our patient.
                  </h2>

                  <ul>

                    <li className="about-item">
                      <div className="accordion-card expanded" data-accordion>

                        <h3 className="card-title">
                          <button className="accordion-btn" data-accordion-btn>
                            <ion-icon name="chevron-down-outline" aria-hidden="true" className="down"></ion-icon>

                            <span className="span h5">Personalized Approach</span>
                          </button>
                        </h3>

                        <p className="accordion-content">
                          Tailored recommendations and insights based on your unique health profile.
                        </p>

                      </div>
                    </li>

                    <li className="about-item">
                      <div className="accordion-card expanded" data-accordion>

                        <h3 className="card-title">
                          <button className="accordion-btn" data-accordion-btn>
                            <ion-icon name="chevron-down-outline" aria-hidden="true" className="down"></ion-icon>

                            <span className="span h5">Comprehensive Solutions</span>
                          </button>
                        </h3>

                        <p className="accordion-content">
                          All-in-one platform integrating fitness tracking, nutrition planning, and health monitoring
                        </p>

                      </div>
                    </li>

                    {/* <li className="about-item">
                      <div className="accordion-card expanded" data-accordion>

                        <h3 className="card-title">
                          <button className="accordion-btn" data-accordion-btn>
                            <ion-icon name="chevron-down-outline" aria-hidden="true" className="down"></ion-icon>

                            <spna className="span h5">Cutting-Edge Technology</spna>
                          </button>
                        </h3>

                        <p className="accordion-content">
                          Harnessing the latest advancements in AI and data analytics to optimize your health outcomes.
                        </p>

                      </div>
                    </li> */}

                  </ul>

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