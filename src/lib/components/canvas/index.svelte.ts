import { getContext, setContext } from "svelte";

export type ElementSizeConfig = {
	min: number;
	max: number;
};

export type ElementConfig = {
	size: ElementSizeConfig;
	rotation: number;
};

export type GeneratorConfig = {
	intensity: number;
	max: number;
	min: number;
	width: number;
	height: number;
	element: ElementConfig;
};

const ELEMENT_SIZE_DEFAULT: ElementSizeConfig = {
	min: 10,
	max: 20,
};
const ELEMENT_DEFAULT = {
	size: ELEMENT_SIZE_DEFAULT,
	rotation: 4,
};

const GENERATOR_DEFAULT: GeneratorConfig = {
	max: 12,
	min: 5,
	intensity: 0.1,
	width: 0,
	height: 0,
	element: ELEMENT_DEFAULT,
};
class Generator {
	canvas: HTMLCanvasElement;
	width = $state(0);
	height = $state(0);
	config: GeneratorConfig;
	ctx: CanvasRenderingContext2D;

	constructor(
		canvas: HTMLCanvasElement,
		{
			min = GENERATOR_DEFAULT.min,
			max = GENERATOR_DEFAULT.max,
			width = GENERATOR_DEFAULT.width,
			height = GENERATOR_DEFAULT.height,
			intensity = GENERATOR_DEFAULT.intensity,
			element = GENERATOR_DEFAULT.element,
		} = {},
	) {
		this.config = { min, max, width, height, intensity, element };
		this.canvas = canvas;
		this.width = Number(canvas.getAttribute("width"));
		this.height = Number(canvas.getAttribute("height"));
		this.ctx = this.canvas.getContext("2d");
		this.initialize();
	}

	initialize() {
		this.draw();
	}

	draw() {
		const config = this.config;

		const quantity = Math.floor(
			config.min + (config.max - config.min) * Math.random(),
		);

		for (let i = 0; i < quantity; i++) {
			this.drawElement();
		}
	}

	drawElement() {
		const config = this.config;
		const ctx = this.ctx;
		const element = config.element;


		const height = Math.floor(
			element.size.min +
			(element.size.max - element.size.min + 1) * Math.random(),
		);
		const width = height * 15 / 8;

		const position = {
			x: Math.floor(Math.random() * config.width),
			y: Math.floor(Math.random() * config.height),
		};
		ctx?.beginPath();
		ctx?.ellipse(
			position.x,
			position.y,
			width,
			height,
			Math.random() * 180,
			0,
			2 * Math.PI,
			!Math.round(Math.random()), //Randomly True or false for clockwise and anticlockwise
		);
		if (ctx) {
			ctx.fillStyle = "#FAABE5";
		}
		ctx?.fill();
	}
}

const GENERATOR_KEY = Symbol("GENERATOR");

export function setGeneratorContext(element: HTMLCanvasElement, config = {}) {
	return setContext(GENERATOR_KEY, new Generator(element, config));
}
export function getGeneratorContext() {
	return getContext<ReturnType<typeof setGeneratorContext>>(GENERATOR_KEY);
}
