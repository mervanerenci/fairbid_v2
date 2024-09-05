// components
import {Helmet} from 'react-helmet';

const Title = ({title}) => {
    return (
        <Helmet>
            <title>{title} | Fairbid</title>
        </Helmet>
    )
}

export default Title