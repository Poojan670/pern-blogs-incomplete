import React, { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Wrapper = ({ children }) => {

    useEffect(() => {
        document.title = "Home"
    })

    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default Wrapper