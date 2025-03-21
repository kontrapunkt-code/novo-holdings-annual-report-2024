import { For, type ParentComponent } from "solid-js";

export const BlurShadow: ParentComponent = (props) => {
	const blurs = [0, 1, 2];

	return (
		<div class="group grid">
			<For each={blurs}>
				{(index) => (
					<div
						classList={{
							"col-[1] row-[1]": true,
							"-z-1 opacity-0 transition-all duration-400 ease-out group-hover:opacity-30":
								index !== 2,
							"blur-xl": index === 0,
							"blur-3xl": index === 1,
						}}
					>
						{props.children}
					</div>
				)}
			</For>
		</div>
	);
};
