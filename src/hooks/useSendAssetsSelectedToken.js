import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import useTokenList from "./useTokenList";

export default function useSendAssetsSelectedToken() {
	const currentTokenForSend = useSelector(
		(state) => state.walletSeedReducer.currentTokenForSend,
	);
	const {tokenList} = useTokenList();

	const [selectedToken, setSelectedToken] = useState(selectToken());

	useEffect(() => {
		setSelectedToken(selectToken());
	}, [currentTokenForSend, tokenList]);

	function selectToken() {
		const inListToken = tokenList.find(
			(token) => token.tokenName === currentTokenForSend.tokenName,
		);

		return inListToken || currentTokenForSend;
	}

	return {
		selectedToken,
	};
}
