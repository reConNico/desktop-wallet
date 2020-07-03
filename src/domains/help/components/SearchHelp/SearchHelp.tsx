import { SearchBarOptions } from "app/components/SearchBar/SearchBarOptions";
import { SearchResource } from "app/components/SearchResource";
import { Table } from "app/components/Table";
import React from "react";
import { useTranslation } from "react-i18next";

type SearchHelpProps = {
	isOpen: boolean;
	data: any;
	onClose?: any;
	onSearch?: any;
};

export const SearchHelp = ({ isOpen, data, onClose, onSearch }: SearchHelpProps) => {
	const { t } = useTranslation();

	const options = [
		{ label: "All", value: "all" },
		{ label: "Delegate", value: "delegate" },
		{ label: "Plugin", value: "plugin" },
		{ label: "Transaction", value: "transaction" },
		{ label: "Wallet", value: "wallet" },
	];

	const [selectedOption, setSelectedOption] = React.useState(options[0]);

	const columns = [
		{
			Header: t("COMMON.TITLE"),
			accessor: "title",
		},
		{
			Header: t("COMMON.CATEGORY"),
			accessor: "category",
		},
	];

	return (
		<SearchResource
			isOpen={isOpen}
			title={t("HELP.MODAL_SEARCH_HELP.TITLE")}
			description={t("HELP.MODAL_SEARCH_HELP.DESCRIPTION")}
			searchBarExtra={
				<SearchBarOptions
					options={options}
					selectedOption={selectedOption}
					onSelect={(option: any) => setSelectedOption(option)}
				/>
			}
			onClose={onClose}
			onSearch={onSearch}
		>
			<div className="mt-8">
				<Table columns={columns} data={data}>
					{(rowData: any) => (
						<tr className="border-b border-theme-neutral-200">
							<td className="py-4 pr-8">
								<div className="font-semibold">{rowData.title}</div>

								<div className="mt-2 text-sm text-theme-neutral-700">{rowData.description}</div>
							</td>

							<td className="py-4 text-sm text-right align-top">
								<div>{rowData.category}</div>
							</td>
						</tr>
					)}
				</Table>
			</div>
		</SearchResource>
	);
};