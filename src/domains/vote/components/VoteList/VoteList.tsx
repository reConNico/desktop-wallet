import { Address } from "app/components/Address";
import { Avatar } from "app/components/Avatar";
import { TransactionDetail } from "app/components/TransactionDetail";
import React from "react";

type VoteListProps = {
	votes?: any[];
};

export const VoteList = ({ votes }: VoteListProps) => {
	return (
		<div className="-my-5">
			{votes?.map((vote: any, index: number) => (
				<TransactionDetail key={index} border={index !== 0} label=" " extra={<Avatar address={vote.address} />}>
					<Address address={vote.address} walletName={vote.delegateName} size="lg" />
				</TransactionDetail>
			))}
		</div>
	);
};

VoteList.defaultProps = {
	votes: [],
};