// styled components
import StyledAuthorCard from './style';

// components
import Socials from '@components/Socials';
import Avatar from '@ui/Avatar';
import CollapsedText from '@components/CollapsedText';
import Spring from '@components/Spring';

// hooks
import {useState} from 'react';
import {useWindowSize} from 'react-use';
import useMeasure from 'react-use-measure';

// utils
import {toast} from 'react-toastify';
import {truncateMiddle} from '@utils/helpers';
import classNames from 'classnames';

// assets
import avatar from '@assets/avatar.webp';

const AuthorCard = () => {
    const [ref, {width}] = useMeasure();
    const [followers, setFollowers] = useState(2734);
    const [isFollowed, setIsFollowed] = useState(false);
    const isMobile = useWindowSize().width < 768;
    const id = '0x80D167890abcdef1234567890abcdef1234567890abcdef12345678900F1C';
    const bio = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                 labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                 laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                 voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                 non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`

    const handleCopy = () => {
        navigator.clipboard.writeText(id);
        toast.success('Copied to clipboard');
    }

    // const handleFollow = e => {
    //     setIsFollowed(!isFollowed);
    //     setFollowers(isFollowed ? followers - 1 : followers + 1);
    // }

    return (
        <StyledAuthorCard>
            <div className="cover"></div>
            <div className="container">
                   <Spring className="main d-flex flex-column g-30 bg-primary border-10">
                       <div className="main_header d-flex">
                           <Avatar src={avatar} alt="@ventuniconeymon" isVerified={true}/>
                           <div className="main_header-follow d-flex align-items-center g-20">
                            {/* <span className="d-flex flex-column">
                                <span className="h6">14.5k</span>
                                <span className="meta">Following</span>
                            </span>
                               <span className="d-flex flex-column">
                                <span className="h6">{followers}</span>
                                <span className="meta">Followers</span>
                            </span> */}
                               {/* <button className={classNames('btn btn--outline', {'active': isFollowed})}
                                         onClick={handleFollow}>
                                   {
                                       isFollowed ?
                                           (
                                               isMobile ?
                                                   <i className="icon icon-user-minus-solid"></i>
                                                   :
                                                   <span>Unfollow</span>
                                           )
                                           :
                                           (
                                               isMobile ?
                                                   <i className="icon icon-user-plus-solid"></i>
                                                   :
                                                   <span>Follow</span>
                                           )
                                   }
                               </button> */}
                           </div>
                           <div className="main_header-actions d-flex g-10">
                               <button className="btn btn--icon" aria-label="Share profile">
                                   <i className="icon icon-share"/>
                               </button>
                               <button className="btn btn--icon" aria-label="Menu">
                                   <i className="icon icon-ellipsis"/>
                               </button>
                           </div>
                       </div>
                       <div className="main_info">
                           <h4 className="main_info-name">Rebecca Jackson</h4>
                           <div className="main_info-id d-flex flex-wrap align-items-center text-sm">
                               <span className="text-bold text-light">@ventuniconeymon</span>
                               <div className="d-flex align-items-center g-10">
                                   <span>{truncateMiddle(id, 5, 4)}</span>
                                   <button className="text-accent" onClick={handleCopy} aria-label="Copy ID">
                                       <i className="icon-copy"/>
                                   </button>
                               </div>
                           </div>
                           <Socials className="main_info-socials"/>
                           <div className="main_info-bio" ref={ref}>
                               <CollapsedText width={width} text={bio} lines={3} withButton />
                           </div>
                       </div>
                   </Spring>
            </div>
        </StyledAuthorCard>
    )
}

export default AuthorCard

