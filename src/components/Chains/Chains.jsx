import { useEffect, useState } from "react";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { PolygonLogo, ETHLogo, EnergiLogo } from "./Logos";
import { useChain } from "react-moralis";
import { useWindowSize } from "../../hooks/useWindowSize";

const styles = {
	item: {
		display: "flex",
		alignItems: "center",
		height: "42px",
		fontWeight: "500",
		fontFamily: "Roboto, sans-serif",
		fontSize: "14px",
		padding: "0 10px",
	},
	button: {
		border: "2px solid rgb(231, 234, 243)",
		borderRadius: "12px",
	},
};

const menuItems = [
	// {
	// 	key: "0x539",
	// 	value: "Local Chain",
	// 	icon: <ETHLogo />,
	// },
	// {
	// 	key: "0x3",
	// 	value: "Ropsten Testnet",
	// 	icon: <ETHLogo />,
	// },
	// {
	// 	key: "0x89",
	// 	value: "Polygon",
	// 	icon: <PolygonLogo />,
	// },
	// {
	// 	key: "0x13881",
	// 	value: "Mumbai",
	// 	icon: <PolygonLogo />,
	// },
	{
		key: "0xC285",
		value: "Energi Testnet",
		icon: <EnergiLogo />,
	},
	{
		key: "0x9B75",
		value: "Energi Mainnet",
		icon: <EnergiLogo />,
	},
];

function Chains() {
	const { switchNetwork, chainId, chain } = useChain();
	const [selected, setSelected] = useState({});
	const { width } = useWindowSize();

	// console.log("chain", chain);

	useEffect(() => {
		if (!chainId) return null;
		const newSelected = menuItems.find((item) => item.key === chainId);
		setSelected(newSelected);
		console.log("current chainId: ", chainId);
	}, [chainId]);

	const handleMenuClick = (e) => {
		console.log("switch to: ", e.key);
		switchNetwork(e.key);
	};

	const menu = (
		<Menu onClick={handleMenuClick}>
			{menuItems.map((item) => (
				<Menu.Item key={item.key} icon={item.icon} style={styles.item}>
					<span style={{ marginLeft: "5px" }}>{item.value}</span>
				</Menu.Item>
			))}
		</Menu>
	);

	return (
		<div>
			<Dropdown overlay={menu} trigger={["click"]}>
				<Button
					key={selected?.key}
					icon={selected?.icon}
					style={{ ...styles.button, ...styles.item }}
				>
					{chain?.chainId === "0xC285" ? (
						<>
							<span style={{ marginLeft: width > 500 ? "5px" : 0 }}>
								{width > 500 ? selected?.value : null}
							</span>
							<DownOutlined />
						</>
					) : (
						<span style={{ marginLeft: "5px", color: "red" }}>
							Wrong Network
						</span>
					)}
				</Button>
			</Dropdown>
		</div>
	);
}

export default Chains;
