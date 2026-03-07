import React from 'react'
import Hero from '../Components/Hero'
import AboutUsCurvedCentered from '../Components/AboutUs'
import Projects from '../Components/Projects/Projects'
import Mission from '../Components/Mission'
import Blog from '../Components/Blog'
import FooterCTA from '../Components/FooterCTA'
import Contact from '../Components/Contact'

const Home = () => {
  return (
    <div>
             <Hero />
      <AboutUsCurvedCentered />
      <Projects />
      <Mission />
      <Blog />
      <FooterCTA />
      <Contact />
    </div>
  )
}

export default Home