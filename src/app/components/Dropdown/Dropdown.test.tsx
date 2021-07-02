import { act } from "@testing-library/react-hooks";
import { clickOutsideHandler } from "app/hooks/click-outside";
import React from "react";
import { fireEvent, render } from "testing-library";

import { Dropdown, DropdownOptionGroup } from "./Dropdown";

const options = [
	{ label: "Option 1", value: "1" },
	{ label: "Option 2", value: "2" },
];

describe("Dropdown", () => {
	it("should render", () => {
		const { container } = render(<Dropdown />);

		expect(container).toMatchSnapshot();
	});

	it("should render a small one", () => {
		const { container } = render(<Dropdown toggleSize="sm" />);

		expect(container).toMatchSnapshot();
	});

	it("should render a large one", () => {
		const { container } = render(<Dropdown toggleSize="lg" />);

		expect(container).toMatchSnapshot();
	});

	it("should render toggle icon", () => {
		const { container, getByTestId } = render(<Dropdown />);

		expect(container).toMatchSnapshot();
		expect(getByTestId("dropdown__toggle")).toBeTruthy();
	});

	it("should render with options", () => {
		const { container } = render(<Dropdown options={options} />);

		expect(container).toMatchSnapshot();
	});

	it("should open dropdown options on icon click", () => {
		const { getByTestId } = render(<Dropdown options={options} />);
		const toggle = getByTestId("dropdown__toggle");

		act(() => {
			fireEvent.click(toggle);
		});

		expect(getByTestId("dropdown__content")).toBeTruthy();
	});

	it("should select option by click", () => {
		const onSelect = jest.fn();
		const { getByTestId } = render(<Dropdown options={options} onSelect={onSelect} />);
		const toggle = getByTestId("dropdown__toggle");

		act(() => {
			fireEvent.click(toggle);
		});

		expect(getByTestId("dropdown__content")).toBeTruthy();

		const firstOption = getByTestId("dropdown__option--0");

		expect(firstOption).toBeTruthy();

		act(() => {
			fireEvent.click(firstOption);
		});

		expect(onSelect).toBeCalledWith({ label: "Option 1", value: "1" });
	});

	it("should select option with enter key", () => {
		const onSelect = jest.fn();
		const { getByTestId } = render(<Dropdown options={options} onSelect={onSelect} />);
		const toggle = getByTestId("dropdown__toggle");

		act(() => {
			fireEvent.click(toggle);
		});

		expect(getByTestId("dropdown__content")).toBeTruthy();

		const firstOption = getByTestId("dropdown__option--0");

		expect(firstOption).toBeTruthy();

		act(() => {
			fireEvent.keyDown(firstOption, { code: 13, key: "Enter" });
		});

		expect(onSelect).toBeCalledWith({ label: "Option 1", value: "1" });
	});

	it("should select option with space key", () => {
		const onSelect = jest.fn();
		const { getByTestId } = render(<Dropdown options={options} onSelect={onSelect} />);
		const toggle = getByTestId("dropdown__toggle");

		act(() => {
			fireEvent.click(toggle);
		});

		expect(getByTestId("dropdown__content")).toBeTruthy();

		const firstOption = getByTestId("dropdown__option--0");

		expect(firstOption).toBeTruthy();

		act(() => {
			fireEvent.keyDown(firstOption, { key: " ", keyCode: 32 });
		});

		expect(onSelect).toBeCalledWith({ label: "Option 1", value: "1" });
	});

	it("should ignore triggering onSelect callback if not exists", () => {
		const { getByTestId, container } = render(<Dropdown options={options} />);
		const toggle = getByTestId("dropdown__toggle");

		act(() => {
			fireEvent.click(toggle);
		});

		expect(getByTestId("dropdown__content")).toBeTruthy();

		const firstOption = getByTestId("dropdown__option--0");

		expect(firstOption).toBeTruthy();

		act(() => {
			fireEvent.click(firstOption);
		});

		expect(container.querySelectorAll("ul").length).toEqual(0);
	});

	it("should close dropdown content when click outside", () => {
		const onSelect = () => ({});
		const { getByTestId, container } = render(
			<div>
				<div data-testid="dropdown__outside" className="mt-16">
					outside elememt to be clicked
				</div>
				<div className="m-16">
					<Dropdown options={options} onSelect={onSelect} />
				</div>
			</div>,
		);
		const toggle = getByTestId("dropdown__toggle");

		act(() => {
			fireEvent.click(toggle);
		});

		expect(getByTestId("dropdown__content")).toBeTruthy();

		const firstOption = getByTestId("dropdown__option--0");

		expect(firstOption).toBeTruthy();

		const outsideElement = getByTestId("dropdown__outside");

		expect(outsideElement).toBeTruthy();

		act(() => {
			fireEvent.mouseDown(outsideElement);
		});

		expect(container.querySelectorAll("ul").length).toEqual(0);
	});

	it("should close dropdown with escape key", () => {
		const { getByTestId, container } = render(<Dropdown options={options} />);
		const toggle = getByTestId("dropdown__toggle");

		act(() => {
			fireEvent.click(toggle);
		});

		expect(getByTestId("dropdown__content")).toBeTruthy();

		act(() => {
			fireEvent.keyDown(toggle, { key: "Escape", keyCode: 27 });
		});

		expect(container.querySelectorAll("ul").length).toEqual(0);
	});

	it("should render with custom toggle content as react element", () => {
		const { container } = render(<Dropdown toggleContent={<div>custom toggle</div>} />);

		expect(container).toMatchSnapshot();
	});

	it("should render with custom toggle content as function", () => {
		const { container } = render(
			<Dropdown toggleContent={(isOpen: boolean) => <div>Dropdown is open: {isOpen}</div>} />,
		);

		expect(container).toMatchSnapshot();
	});

	it("should render a bottom position", () => {
		const { getByTestId, container } = render(<Dropdown options={options} position="bottom" />);
		const toggle = getByTestId("dropdown__toggle");

		act(() => {
			fireEvent.click(toggle);
		});

		expect(container).toMatchSnapshot();
	});

	it("should render a bottom-left position", () => {
		const { getByTestId, container } = render(<Dropdown options={options} position="bottom-left" />);
		const toggle = getByTestId("dropdown__toggle");

		act(() => {
			fireEvent.click(toggle);
		});

		expect(container).toMatchSnapshot();
	});

	it("should render a left position", () => {
		const { getByTestId, container } = render(<Dropdown options={options} position="left" />);
		const toggle = getByTestId("dropdown__toggle");

		act(() => {
			fireEvent.click(toggle);
		});

		expect(container).toMatchSnapshot();
	});

	it("should render a top-left position", () => {
		const { getByTestId, container } = render(<Dropdown options={options} position="top-left" />);
		const toggle = getByTestId("dropdown__toggle");

		act(() => {
			fireEvent.click(toggle);
		});

		expect(container).toMatchSnapshot();
	});

	it("should render a top", () => {
		const { getByTestId, container } = render(<Dropdown options={options} position="top" />);
		const toggle = getByTestId("dropdown__toggle");

		act(() => {
			fireEvent.click(toggle);
		});

		expect(container).toMatchSnapshot();
	});

	it("should render a top-right", () => {
		const { getByTestId, container } = render(<Dropdown options={options} position="top-right" />);
		const toggle = getByTestId("dropdown__toggle");

		act(() => {
			fireEvent.click(toggle);
		});

		expect(container).toMatchSnapshot();
	});

	it("should render dropdown group options with divider, icon and secondary label", () => {
		const primaryOptions: DropdownOptionGroup = {
			key: "primary",
			options: [
				{
					label: "Primary Options 1.1",
					value: "value 1.1",
				},
				{
					label: "Primary Options 1.2",
					value: "value 1.2",
				},
			],
			title: "Primary Options 1",
		};

		const secondaryOptions: DropdownOptionGroup = {
			hasDivider: true,
			key: "secondary",
			options: [
				{
					icon: "icon-1",
					iconPosition: "end",
					label: "Secondary Options 1.1",
					value: "value 1.1",
				},
				{
					icon: "icon-2",
					iconPosition: "start",
					label: "Secondary Options 1.2",
					secondaryLabel: "secondary label",
					value: "value 1.2",
				},
			],
			title: "Secondary Options 1",
		};
		const { getByTestId, container } = render(
			<Dropdown options={[primaryOptions, secondaryOptions]} position="top-right" />,
		);
		const toggle = getByTestId("dropdown__toggle");

		act(() => {
			fireEvent.click(toggle);
		});

		expect(container).toMatchSnapshot();
	});

	it("should render without options one", () => {
		const primaryOptions: DropdownOptionGroup = {
			key: "primary",
			options: [],
			title: "Primary Options 1",
		};

		const secondaryOptions: DropdownOptionGroup = {
			hasDivider: true,
			key: "secondary",
			options: [],
			title: "Secondary Options 1",
		};
		const { getByTestId, container } = render(
			<Dropdown options={[primaryOptions, secondaryOptions]} position="top-right" />,
		);
		const toggle = getByTestId("dropdown__toggle");

		act(() => {
			fireEvent.click(toggle);
		});

		expect(container).toMatchSnapshot();
	});

	it("should render with a disabled option", () => {
		const { getByTestId, container } = render(
			<Dropdown options={[{ disabled: true, label: "Disabled Option", value: "disabled" }]} />,
		);

		const toggle = getByTestId("dropdown__toggle");

		act(() => {
			fireEvent.click(toggle);
		});

		fireEvent.click(getByTestId("dropdown__option--0"));

		// Keep it open
		expect(toggle).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});

describe("ClickOutside Hook", () => {
	it("should not call callback if clicked on target element", () => {
		const element = document;
		const reference = { current: element };
		const callback = jest.fn();
		clickOutsideHandler(reference, callback);

		act(() => {
			fireEvent.mouseDown(element);
		});

		expect(callback).not.toBeCalled();
	});

	it("should call callback if clicked outside target element", () => {
		const div = document.createElement("div");
		const reference = { current: div };

		const callback = jest.fn();
		clickOutsideHandler(reference, callback);

		act(() => {
			fireEvent.mouseDown(document);
		});

		expect(callback).toBeCalled();
	});

	it("should do nothing if callback is not provided", () => {
		const div = document.createElement("div");
		const reference = { current: div };

		clickOutsideHandler(reference, null);

		act(() => {
			fireEvent.mouseDown(document);
		});
	});

	describe("positioning", () => {
		it("should render content below toggle", () => {
			const documentClientHeightSpy = jest.spyOn(document.body, "clientHeight", "get").mockReturnValue(50);
			const getComputedStyleSpy = jest
				.spyOn(window, "getComputedStyle")
				.mockReturnValueOnce({ marginTop: "10px" });

			const { getByTestId } = render(
				<Dropdown>
					<span>hello</span>
				</Dropdown>,
			);
			const toggle = getByTestId("dropdown__toggle");

			act(() => {
				fireEvent.click(toggle);
			});

			expect(getByTestId("dropdown__content")).toHaveAttribute("style", "opacity: 1;");

			documentClientHeightSpy.mockRestore();
			getComputedStyleSpy.mockRestore();
		});

		it("should render content below toggle and reduce its height", () => {
			const getBoundingClientRectSpy = jest
				.spyOn(Element.prototype, "getBoundingClientRect")
				.mockReturnValue({ height: 90, top: 0 });
			const toggleHeightSpy = jest.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockReturnValueOnce(10);
			const dropdownHeightSpy = jest.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockReturnValue(100);
			const documentClientHeightSpy = jest.spyOn(document.body, "clientHeight", "get").mockReturnValue(100);
			const elementClientHeightSpy = jest.spyOn(Element.prototype, "clientHeight", "get").mockReturnValue(100);

			const { getByTestId } = render(
				<Dropdown>
					<span>hello</span>
				</Dropdown>,
			);
			const toggle = getByTestId("dropdown__toggle");

			act(() => {
				fireEvent.click(toggle);
			});

			expect(getByTestId("dropdown__content")).toHaveAttribute(
				"style",
				"opacity: 1; height: 60px; overflow-y: scroll;",
			);

			getBoundingClientRectSpy.mockRestore();
			toggleHeightSpy.mockRestore();
			dropdownHeightSpy.mockRestore();
			documentClientHeightSpy.mockRestore();
			elementClientHeightSpy.mockRestore();
		});

		it("should render content above toggle and apply a negative margin", () => {
			const getBoundingClientRectSpy = jest
				.spyOn(Element.prototype, "getBoundingClientRect")
				.mockReturnValue({ height: 50, top: 100 });
			const offsetHeightSpy = jest.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockReturnValue(50);
			const documentClientHeightSpy = jest.spyOn(document.body, "clientHeight", "get").mockReturnValue(150);

			const { getByTestId } = render(
				<Dropdown>
					<span>hello</span>
				</Dropdown>,
			);
			const toggle = getByTestId("dropdown__toggle");

			act(() => {
				fireEvent.click(toggle);
			});

			expect(getByTestId("dropdown__content")).toHaveAttribute("style", "margin-top: -100px; opacity: 1;");

			getBoundingClientRectSpy.mockRestore();
			offsetHeightSpy.mockRestore();
			documentClientHeightSpy.mockRestore();
		});
	});
});
