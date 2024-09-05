// utils
import loadable from '@loadable/component'

// components
const Header = loadable(() => import('@components/Header'));
const Footer = loadable(() => import('@components/Footer'));
const BidModal = loadable(() => import('@components/BidModal'));

const AppLayout = ({children}) => {
    return (
        <div>
            <Header/>
            {children}
            <Footer/>
            <BidModal/>
        </div>
    )
}

export default AppLayout