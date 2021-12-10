import React, { useEffect, useState } from "react";
import {
	useWeb3ExecuteFunction,
	useMoralis,
	useMoralisQuery,
} from "react-moralis";
import { Modal } from "antd";
import { gameAbi, ERC20Abi } from "../contracts/abi";
import { notification } from "antd";

import { ReactComponent as Loader } from "../assets/loader.svg";

import "../styles/stakes.scss";

const Stakes = () => {
	const [stakeAmount, setStakeAmount] = useState(0);
	const [unstakeAmount, setUnstakeAmount] = useState(0);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const { user, Moralis, isWeb3Enabled, isWeb3EnableLoading } = useMoralis();
	const SGHODA_TOKEN_ADDRESS = "0xD8e785D3423799D24260C3B3d9B5B3961CD3875A";
	const GHODA_TOKEN_ADDRESS = "0xC86bb11da8566F2Cb4f9E53b6b9091D2ec17446b";
	const chessERC20Address = "0xC86bb11da8566F2Cb4f9E53b6b9091D2ec17446b";
	const chessGameAddress = "0xD8e785D3423799D24260C3B3d9B5B3961CD3875A";

	const openNoStakeErrorNotification = () => {
		notification["error"]({
			message: "No Tokens Staked",
			description:
				"You have not staked any tokens. Please stake some tokens to unstake tokens.",
			placement: "bottomRight",
		});
	};

	const {
		data: stakedBalance,
		error: stakedBalanceError,
		isLoading: isStakedBalanceLoading,
	} = useMoralisQuery(
		"PolygonTokenBalance",
		(query) =>
			query
				.equalTo("address", user?.get("ethAddress"))
				.equalTo("token_address", SGHODA_TOKEN_ADDRESS),
		[],
		{
			live: true,
		}
	);

	const {
		data: tokenBalance,
		error: tokenBalanceError,
		isLoading: isTokenBalanceLoading,
	} = useMoralisQuery(
		"PolygonTokenBalance",
		(query) =>
			query
				.equalTo("address", user?.get("ethAddress"))
				.equalTo("token_address", GHODA_TOKEN_ADDRESS),
		[],
		{
			live: true,
		}
	);

	// const {
	// 	data: stakeBalData,
	// 	error: stakeBalError,
	// 	fetch: stakeBalFetch,
	// 	isFetching: isStakeBalFetching,
	// } = useWeb3ExecuteFunction({
	// 	abi: gameAbi,
	// 	contractAddress: chessGameAddress,
	// 	functionName: "balanceOf",
	// 	params: {
	// 		account: user?.attributes?.ethAddress,
	// 	},
	// });

	const {
		data: approveData,
		error: approveError,
		fetch: approveFetch,
		isFetching: isApproveFetching,
	} = useWeb3ExecuteFunction({
		abi: ERC20Abi,
		contractAddress: chessERC20Address,
		functionName: "approve",
		params: {
			spender: chessGameAddress,
			amount: Moralis.Units.Token("1000000000", "18"),
		},
	});

	const {
		data: allowData,
		error: allowError,
		fetch: allowFetch,
		isFetching: isAllowFetching,
	} = useWeb3ExecuteFunction({
		abi: ERC20Abi,
		contractAddress: chessERC20Address,
		functionName: "allowance",
		params: {
			owner: user?.attributes?.ethAddress,
			spender: chessGameAddress,
		},
	});

	// const {
	// 	data: erc20Data,
	// 	error: erc20Error,
	// 	fetch: erc20Fetch,
	// 	isFetching: isErc20Fetching,
	// } = useWeb3ExecuteFunction({
	// 	abi: ERC20Abi,
	// 	contractAddress: chessERC20Address,
	// 	functionName: "balanceOf",
	// 	params: {
	// 		account: user?.attributes?.ethAddress,
	// 	},
	// });

	const {
		data: stakeData,
		error: stakeError,
		fetch: stakeFetch,
		isFetching: isStakeFetching,
	} = useWeb3ExecuteFunction({
		abi: gameAbi,
		contractAddress: chessGameAddress,
		functionName: "stake",
		params: {
			_amount: Moralis.Units.Token(Number(stakeAmount), "18"),
		},
	});

	const {
		data: unstakeData,
		error: unstakeError,
		fetch: unstakeFetch,
		isFetching: isUnstakeFetching,
	} = useWeb3ExecuteFunction({
		abi: gameAbi,
		contractAddress: chessGameAddress,
		functionName: "unstake",
		params: {
			_amount: Moralis.Units.Token(Number(unstakeAmount), "18"),
		},
	});

	const initaliser = () => {
		// stakeBalFetch();
		// erc20Fetch();
		// approveFetch();
		allowFetch();
		console.log("approve ->", approveData);
		console.log("allow ->", allowData);
		console.log("allow error:", allowError);
		// console.log("erc20 error:", erc20Data);
		// console.log("stakeBal error:", stakeBalData);
	};

	useEffect(() => {
		initaliser();
		if (!isWeb3Enabled) Moralis.enableWeb3();
	}, [isWeb3Enabled, tokenBalance, stakedBalance]);

	return (
		<div className="Stakes" style={{ marginTop: "3rem" }}>
			<Modal
				title="Loading"
				visible={isStakeFetching}
				footer={null}
				closable={false}>
				<p>Staking in progress...</p>
			</Modal>
			{/* <Modal
				title="Loading"
				visible={isAllowFetching}
				footer={null}
				closable={false}>
				<p>Allowance Check in progress...</p>
			</Modal> */}
			<Modal
				title="Loading"
				visible={isApproveFetching}
				footer={null}
				closable={false}>
				<p>Approving in progress...</p>
			</Modal>
			<Modal
				title="Loading"
				visible={isStakedBalanceLoading}
				footer={null}
				closable={false}>
				<p>Staked GHODA Check in progress...</p>
			</Modal>
			<Modal
				title="Loading"
				visible={isTokenBalanceLoading}
				footer={null}
				closable={false}>
				<p>GHODA Balance Check in progress...</p>
			</Modal>
			<Modal
				title="Loading"
				visible={isUnstakeFetching}
				footer={null}
				closable={false}>
				<p>Unstaking in progress...</p>
			</Modal>
			<section className="amounts">
				<div className="erc20-balance balance">
					<span className="label">GHODA</span>
					<span className="amount">
						{Moralis.Units.FromWei(Number(tokenBalance))}
					</span>
				</div>
				<div className="staked-balance balance">
					<span className="label">sGHODA</span>
					<span className="amount">
						{Moralis.Units.FromWei(Number(stakedBalance))}
					</span>
				</div>
			</section>

			<section className="stake-unstake">
				<div className="stake card">
					<div className="title">Stake GHODA</div>
					<div className="stake-input input">
						<span className="token">GHODA</span>
						<input
							type="number"
							className="stake-amount amount"
							value={stakeAmount}
							disabled={!approveData || !approveData?.status}
							onWheel={(e) => e.target.blur()}
							onChange={(e) => setStakeAmount(e.target.value)}
						/>
						<button
							className="max"
							onClick={() =>
								setStakeAmount(Moralis.Units.FromWei(Number(tokenBalance)))
							}
							disabled={!approveData?.status}>
							max
						</button>
					</div>
					<div className="stake-submit submit">
						{approveData?.status && stakeAmount < Number(allowData) ? (
							<button
								className="stake-btn"
								onClick={async () => {
									await stakeFetch();
									// await erc20Fetch();
									// await stakeBalFetch();
									console.log("stake error: ", stakeError);
									console.log("stakeBal error: ", stakedBalanceError);
									console.log("erc20 error: ", tokenBalanceError);
									setStakeAmount(0);
								}}>
								Stake
							</button>
						) : (
							<button
								className="approve-btn"
								onClick={async () => {
									await approveFetch();
									await allowFetch();
									console.log("approve error:", approveError);
									console.log("allow error:", allowError);
								}}>
								Approve
							</button>
						)}
					</div>
				</div>
				<div className="unstake card">
					<div className="title">Unstake sGHODA</div>
					<div className="unstake-input input">
						<span className="token">sGHODA</span>

						<input
							type="number"
							className="unstake-amount amount"
							value={unstakeAmount}
							disabled={
								!approveData ||
								!approveData?.status ||
								Number(stakedBalance) === 0
							}
							onWheel={(e) => e.target.blur()}
							onChange={(e) => setUnstakeAmount(e.target.value)}
						/>
						<button
							className="max"
							onClick={() => {
								if (Number(stakedBalance) === 0) {
									openNoStakeErrorNotification();
									return;
								}
								setUnstakeAmount(Moralis.Units.FromWei(Number(stakedBalance)));
							}}>
							max
						</button>
					</div>
					<div className="unstake-submit submit">
						<button
							className="unstake-btn"
							onClick={async () => {
								if (Number(stakedBalance) === 0) {
									openNoStakeErrorNotification();
									return;
								}
								await unstakeFetch();
								// await erc20Fetch();
								// await stakeBalFetch();
								console.log("stake error: ", unstakeError);
								console.log("stakeBal error: ", stakedBalanceError);
								console.log("erc20 error: ", tokenBalanceError);
								setUnstakeAmount(0);
							}}>
							Unstake
						</button>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Stakes;
