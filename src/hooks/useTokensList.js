import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TONicon from "../images/tokens/TON.svg";

export default function useTokensList() {
    const tokenList = useSelector(state => state.walletReducer.tokenList);
    const clientData = useSelector(state => state.walletReducer.clientData);
    const updatedWallet = useSelector(state => state.walletReducer.updatedWallet);

    const [tokensWithNativeTons, settokensWithNativeTons] = useState([]);

    useEffect(() => {
        const TONdata = {
            walletAddress: clientData.address,
            symbol: "Native TONs",
            tokenName: "Native TON Crystal",
            type: "Native Tons",
            icon: TONicon,
            rootAddress: "none",
            balance: updatedWallet === null ? clientData.balance : updatedWallet,
        };

        const withNative = JSON.parse(JSON.stringify(tokenList));
        withNative.push(TONdata);
        settokensWithNativeTons(withNative);
    }, [tokenList, clientData, updatedWallet]);

	return {
		tokensList: tokensWithNativeTons,
	};
}