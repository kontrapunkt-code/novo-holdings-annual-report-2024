import { For, type ParentComponent } from "solid-js";

interface Props {
	class?: string;
	style?: string;
}

export const BlurShadow: ParentComponent<Props> = (props) => {
	const blurs = [0, 1, 2];

	return (
		<div
			classList={{
				"group grid": true,
				[props.class ?? ""]: !!props.class,
			}}
			style={props.style}
		>
			<For each={blurs}>
				{(index) => (
					<div
						classList={{
							"col-[1] row-[1]": true,
							"-z-1 opacity-0 transition-all duration-400 ease-out group-hover:opacity-40":
								index !== 2,
							"blur-md": index === 0,
							"blur-xl": index === 1,
						}}
					>
						{props.children}
					</div>
				)}
			</For>
		</div>
	);
};
