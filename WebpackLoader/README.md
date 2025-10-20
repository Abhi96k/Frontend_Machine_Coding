# WebpackLoader demo

This small demo demonstrates a minimal Webpack 5 setup that imports images, CSS and font files from JavaScript and lets webpack emit those assets into the `dist/` folder.

## What is Webpack and why use it?

Webpack is a JavaScript module bundler. It processes your project's modules (JavaScript, CSS, images, fonts, etc.), applies loaders and transforms, and outputs optimized bundles for the browser.

Main benefits shown in this demo:

- Bundle JavaScript modules into a single `bundle.js` for the browser.
- Resolve and emit static assets (images, fonts) so you can `import` them from JS/CSS.
- Use loaders (like `css-loader` + `style-loader`) to allow importing CSS from JavaScript.

## Project overview

Files of interest:

- `index.js` - demo entry. Imports images, CSS and a font file and wires images into the DOM.
- `webpack.config.js` - minimal webpack configuration with rules for images, CSS and fonts.
- `Style/Style.css` - example stylesheet (imported from `index.js`).
- `Font/BBHSansHegarty-Regular.ttf` - example font file imported directly from JS.

## How this project uses webpack

1. `index.js` imports images and CSS:

```js
import logo from "./assest/logo.svg";
import "./Style/Style.css";
import "./Font/BBHSansHegarty-Regular.ttf";

// then the script sets image `src` attributes to the imported URLs
```

2. `webpack.config.js` contains rules that tell webpack how to handle imports that are not plain JS:

- Images (png/jpg/gif/svg) use `type: 'asset/resource'` which emits files and returns the emitted URL.
- CSS files are processed with `css-loader` (resolves imports/urls inside CSS) and `style-loader` (injects styles into the page at runtime).
- Fonts (ttf/woff/woff2/eot/otf) are handled with `asset/resource` and emitted to `dist/fonts/`.

When you run `npm run build` webpack produces `dist/bundle.js` and copies the referenced assets into `dist/`.

## How to run

From the `WebpackLoader` folder run:

```bash
npm install
npm run build
```

- `npm install` installs the devDependencies used by the config (`webpack`, `webpack-cli`, `css-loader`, `style-loader`).
- `npm run build` runs `webpack --mode production` which generates the `dist/` output.

## Example: using the font in CSS via @font-face

You can reference emitted fonts in CSS. css-loader rewrites URLs to the emitted asset path. Example `Style/Style.css` snippet:

```css
@font-face {
  font-family: "BBHSansHegarty";
  src: url("../Font/BBHSansHegarty-Regular.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

body {
  font-family: "BBHSansHegarty", sans-serif;
}
```

When css-loader processes `Style.css` it will detect the `url(...)` and replace it with the emitted `dist/fonts/<hash>.ttf` path.

Alternatively, importing the font from JS (as this demo does) will also cause the font to be emitted. Use whichever approach matches your project structure.

## webpack.config.js explained (current)

Key parts in the config:

- `entry: './index.js'` — the entry point of the application.
- `output.path` and `output.filename` — where the compiled bundle is emitted (`dist/bundle.js`).
- `module.rules` — an array of rules that determine how different file types are handled. This demo includes:
  - Images: `test: /\\.(png|jpe?g|gif|svg)$/i` → `type: 'asset/resource'` (emits images and returns URLs).
  - Fonts: `test: /\\.(woff2?|eot|ttf|otf)$/i` → `type: 'asset/resource'` (emits fonts into `fonts/`).
  - CSS: `test: /\\.css$/i` → `use: ['style-loader', 'css-loader']` (allows importing CSS from JS).

If you need more advanced behavior (hashing, content-based names, publicPath override, inlining small assets) you can customize the `generator` or use `type: 'asset'` with `parser.dataUrlCondition.maxSize`.

## What we haven't added yet (and why you might want them)

- Dev server / live reload: this demo only builds static files. Add `webpack-dev-server` for local development with HMR.
- Minification and optimization config: production mode does some optimizations automatically, but you can add `TerserPlugin`, `CssMinimizerPlugin`, and split chunks for larger apps.
- Source maps: enable `devtool: 'source-map'` (or other values) for easier debugging.
- Babel / TypeScript: this project uses plain JS. Add `babel-loader` or `ts-loader` if you need transpilation.
- PostCSS / autoprefixer: for advanced CSS processing.
- Tests / linting integrated into build pipeline.

## Next steps (suggestions)

- Add `webpack-dev-server` and a simple npm script `start` for local dev:

```json
"scripts": {
	"start": "webpack serve --open --mode development",
	"build": "webpack --mode production"
}
```

- Add `clean-webpack-plugin` to remove `dist/` before each build.
- Add small example of `@font-face` usage in `Style/Style.css` (I included an example above).

## Troubleshooting

- If you get "Module parse failed" for binary assets, make sure your webpack config has an asset rule for that file type (as done for fonts above).
- If CSS `url()`s don't resolve, confirm `css-loader` is installed and included in the `use` chain for `.css` files.

---

If you want, I can also:

- Add a `start` script and configure `webpack-dev-server` for live reload.
- Show a tiny demo HTML served from `dist/` that references `bundle.js`.

Tell me which of those you'd like next and I'll implement it.
