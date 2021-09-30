import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import useTokensList from "./useTokensList";

export default function useSendAssetsSelectedToken() {
	const currentTokenForSend = useSelector(
		(state) => state.walletSeedReducer.currentTokenForSend,
	);
	const {tokensList} = useTokensList();

	const [selectedToken, setSelectedToken] = useState(selectToken());

	useEffect(() => {
		setSelectedToken(selectToken());
	}, [currentTokenForSend, tokensList]);

	function selectToken() {
		const inListToken = tokensList.find(
			(token) => token.symbol === currentTokenForSend.symbol,
		);

		return inListToken || currentTokenForSend;
	}

	return {
		selectedToken,
	};
}
