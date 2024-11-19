import styles from './style.module.scss';
import Title from '@components/Title';
import PageHeader from '@components/PageHeader';
import Spring from '@components/Spring';


import { 
    FaGavel, 
    FaChartLine, 
    FaLock, 
    FaWallet,
    FaEthereum,
    FaMoneyBillWave,
    FaExchangeAlt, 
    FaUser,
    FaUserFriends
} from 'react-icons/fa';

const HowToFairbid = () => {
    const auctionTypes = [
        {
            title: "English Auction",
            icon: <FaGavel size={32} />,
            description: "Traditional auction format where bidding starts low and increases as buyers place competing bids. The highest bidder wins when the auction timer ends.",
            steps: [
                "Place a bid higher than the current highest bid",
                "Monitor the auction progress",
                "If outbid, place a new higher bid",
                "Highest bidder wins when timer ends"
            ]
        },
        {
            title: "Dutch Auction",
            icon: <FaChartLine size={32} />,
            description: "Price starts high and gradually decreases until a buyer accepts the current price. First buyer to accept the price wins the auction.",
            steps: [
                "Watch the price decrease over time",
                "Accept the current price when you're ready to buy",
                "First buyer to accept wins immediately",
                "No competitive bidding needed"
            ]
        },
        {
            title: "Sealed Bid Auction",
            icon: <FaLock size={32} />,
            description: "Buyers submit private bids without knowing others' bids. The highest bidder wins when the auction ends.",
            steps: [
                "Submit your bid privately",
                "Bids remain hidden from other buyers",
                "Wait for auction end",
                "Highest sealed bid wins"
            ]
        }
    ];

    const creditGuide = {
        title: "Using Credits",
        icon: <FaWallet size={32} />,
        sections: [
            {
                title: "Deposit ETH",
                icon: <FaEthereum size={24} />,
                description: "Convert your ETH to FairBid credits with zero fees. Credits can be used across all auction types."
            },
            {
                title: "Place Bids",
                icon: <FaMoneyBillWave size={24} />,
                description: "Use your credits to participate in auctions. All transactions are fee-free within the platform."
            },
            {
                title: "Withdraw Funds",
                icon: <FaExchangeAlt size={24} />,
                description: "Withdraw your credits as ETH to your wallet or as ckETH to Internet Computer."
            }
        ]
    };

    const userFeatures = {
        title: "User Features",
        sections: [
            {
                title: "Set Username",
                icon: <FaUser size={24} />,
                description: "Customize your identity on FairBid by setting a unique username that other users can easily recognize and remember.",
                steps: [
                    "Go to your profile settings",
                    "Choose a unique username",
                    "Save your changes"
                ]
            },
            {
                title: "Transfer Credits",
                icon: <FaUserFriends size={24} />,
                description: "Easily transfer your FairBid credits to other users directly within the platform.",
                steps: [
                    "Navigate to the transfer section",
                    "Enter recipient's username",
                    "Specify amount to transfer",
                    "Confirm the transaction"
                ]
            }
        ]
    };

    return (
        <>
            <Title title="How to FairBid"/>
            <PageHeader title="How to Use FairBid"/>
            
            <main className={styles.main}>
                <div className="container">
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Auction Types</h2>
                        <div className={styles.auctionTypes}>
                            {auctionTypes.map((type, index) => (
                                <Spring className={styles.auctionCard} key={index} index={index}>
                                    <div className={styles.iconWrapper}>
                                        {type.icon}
                                    </div>
                                    <h3 className={styles.cardTitle}>{type.title}</h3>
                                    <p className={styles.description}>{type.description}</p>
                                    <div className={styles.steps}>
                                        {type.steps.map((step, stepIndex) => (
                                            <div key={stepIndex} className={styles.step}>
                                                <span className={styles.stepNumber}>{stepIndex + 1}</span>
                                                <span className={styles.stepText}>{step}</span>
                                            </div>
                                        ))}
                                    </div>
                                </Spring>
                            ))}
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>{creditGuide.title}</h2>
                        <div className={styles.creditSection}>
                            {creditGuide.sections.map((section, index) => (
                                <Spring className={styles.creditCard} key={index} index={index}>
                                    <div className={styles.iconWrapper}>
                                        {section.icon}
                                    </div>
                                    <h3 className={styles.cardTitle}>{section.title}</h3>
                                    <p className={styles.description}>{section.description}</p>
                                </Spring>
                            ))}
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>{userFeatures.title}</h2>
                        <div className={styles.userFeatures}>
                            {userFeatures.sections.map((section, index) => (
                                <Spring className={styles.featureCard} key={index} index={index}>
                                    <div className={styles.iconWrapper}>
                                        {section.icon}
                                    </div>
                                    <h3 className={styles.cardTitle}>{section.title}</h3>
                                    <p className={styles.description}>{section.description}</p>
                                    <div className={styles.steps}>
                                        {section.steps.map((step, stepIndex) => (
                                            <div key={stepIndex} className={styles.step}>
                                                <span className={styles.stepNumber}>{stepIndex + 1}</span>
                                                <span className={styles.stepText}>{step}</span>
                                            </div>
                                        ))}
                                    </div>
                                </Spring>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
};

export default HowToFairbid;