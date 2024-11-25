// utils
import loadable from '@loadable/component'

// components
const Header = loadable(() => import('@components/Header'));
const Footer = loadable(() => import('@components/Footer'));
const BidModal = loadable(() => import('@components/BidModal'));
// const UsernamePrompt = loadable(() => import('@components/UsernamePrompt'));
const AppLayout = ({children}) => {
    return (
        <div>
            <Header/>
            {children}
            <Footer/>
            <BidModal/>
            {/* <UsernamePrompt/> */}
        </div>
    )
}

export default AppLayout