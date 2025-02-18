import { getContext, setContext } from "svelte";

type GeneratorConfig = {
	intensity: number;
	max: number;
	min: number;
	quantity: number;
	width: number;
	height: number;
};

const GENERATOR_DEFAULT: GeneratorConfig = {
	max: 100,
	min: 5,
	quantity: 5,
	intensity: 0.1,
	width: 0,
	height: 0,
};
class Generator {
	canvas: HTMLCanvasElement;
	width = $state(0);
	height = $state(0);
	config: GeneratorConfig;
	ctx: CanvasRenderingContext2D | null = null;

	constructor(
		element: HTMLCanvasElement,
		{
			min = GENERATOR_DEFAULT.min,
			max = GENERATOR_DEFAULT.max,
			width = GENERATOR_DEFAULT.width,
			height = GENERATOR_DEFAULT.height,
			quantity = GENERATOR_DEFAULT.quantity,
			intensity = GENERATOR_DEFAULT.intensity,
		} = {},
	) {
		this.config = { min, max, width, height, quantity, intensity };
		this.canvas = element;
		this.width = Number(element.getAttribute("width"));
		this.height = Number(element.getAttribute("height"));
		this.ctx = this.canvas.getContext("2d");
		this.initialize();
	}

	initialize() {}
}

const GENERATOR_KEY = Symbol("GENERATOR");

export function setGeneratorContext(element: HTMLCanvasElement, config = {}) {
	return setContext(GENERATOR_KEY, new Generator(element, config));
}
export function getGeneratorContext() {
	return getContext<ReturnType<typeof setGeneratorContext>>(GENERATOR_KEY);
}
