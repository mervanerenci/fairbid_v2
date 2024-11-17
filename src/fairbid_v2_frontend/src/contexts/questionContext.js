import {createContext, useState, useContext, useEffect} from 'react';
import useScrollLock from '@hooks/useScrollLock';

export const QuestionContext = createContext(undefined);

export const QuestionContextAPI = ({children}) => {
   
    const [auctionId, setAuctionId] = useState(null)

      
    useEffect(() => {
        // set current auction id
        setAuctionId(auctionId);
        console.log("Question Context state:", {
            auctionId
        });
    }, []);

    return (
        <QuestionContext.Provider value={{auctionId}}>
            {children}
        </QuestionContext.Provider>
    );
}

export const useQuestionContext = () => useContext(QuestionContext);