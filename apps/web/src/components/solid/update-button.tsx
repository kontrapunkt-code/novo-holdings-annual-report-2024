import { type Component, Match, type Resource, Switch } from "solid-js";
import { Icon } from "./icon";

interface Props {
	disabled?: boolean;
	invalid?: boolean;
	onClick: () => void;
	status: Resource<boolean>;
}

export const UpdateButton: Component<Props> = (props) => {
	return (
		<button
			type="button"
			class="button update-button"
			classList={{
				disabled: props.disabled,
				invalid: props.invalid,
			}}
			onClick={props.onClick}
		>
			<Switch fallback={<span>Update</span>}>
				<Match when={props.status.error}>
					<Icon icon="error" />
					<span>Error</span>
				</Match>
				<Match when={props.status.loading}>
					<Icon icon="sync" />
					<span>Loading</span>
				</Match>
				<Match when={props.status()}>
					<Icon icon="check" />
					<span>Success</span>
				</Match>
			</Switch>
		</button>
	);
};
