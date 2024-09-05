// components
import Avatar from '@ui/Avatar';
import Spring from '@components/Spring';

// utils
import dayjs from 'dayjs';
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const BidsHistory = ({data, active}) => {
    return (
        <div className="d-flex flex-column g-20">
            {
                data.map((item, index) => (
                    <Spring key={item.id} index={index}>
                        <div className="d-flex align-items-center g-15">
                            <Avatar src={item.user.avatar} isVerified={item.user.isVerified} alt={item.user.name}
                                    size="sm"/>
                            <div className="text-sm">
                                <p className="text-overflow">
                                    {
                                        active ?
                                            <span className="text-accent text-bold">{item.price} ETH</span>
                                            :
                                            <span>bid cancelled</span>
                                    } by <span className="text-light text-bold"> {item.user.name}</span>
                                </p>
                                <span className="text-xs">{dayjs(item.date).fromNow()}</span>
                            </div>
                        </div>
                    </Spring>
                ))
            }
        </div>
    )
}

export default BidsHistory