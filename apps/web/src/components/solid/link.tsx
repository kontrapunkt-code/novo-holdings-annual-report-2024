import type { GlobalSettings } from "@/scripts/queries";
import { type JSX, Match, Switch, mergeProps, splitProps } from "solid-js";

interface Props extends JSX.AnchorHTMLAttributes<HTMLAnchorElement> {
	link?: Partial<NonNullable<GlobalSettings["header"]>["callToAction"]>;
	class?: string;
	children?: JSX.Element;
}

export const Link = (props: Props) => {
	const [local, others] = splitProps(props, [
		"link",
		"href",
		"class",
		"children",
	]);
	const link = local.link ?? {};
	const { mailto, tel, external, slug } = link;

	const classes = mergeProps(
		{
			class:
				"flex focus-visible:outline-current focus-visible:outline-offset-4 rounded-sm",
		},
		local.class ? { class: local.class } : {},
	);

	return (
		<Switch fallback={local.children}>
			<Match when={local.href}>
				{(href) => (
					<a href={href()} {...classes} {...others}>
						{local.children}
					</a>
				)}
			</Match>
			<Match when={slug}>
				{(slug) => (
					<a href={`/${slug().trim()}`} {...classes} {...others}>
						{local.children}
					</a>
				)}
			</Match>
			<Match when={external}>
				{(external) => (
					<a
						href={external()}
						target="_blank"
						rel="noopener noreferrer"
						{...classes}
						{...others}
					>
						{local.children}
					</a>
				)}
			</Match>
			<Match when={mailto}>
				{(mailto) => (
					<a href={`mailto:${mailto}`} {...classes} {...others}>
						{local.children}
					</a>
				)}
			</Match>
			<Match when={tel}>
				{(tel) => (
					<a href={`tel:${tel}`} {...classes} {...others}>
						{local.children}
					</a>
				)}
			</Match>
		</Switch>
	);
};
