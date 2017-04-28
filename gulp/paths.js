var paths = {};

// var paths = {
//   /* Destination Folders */
//   assetsFolder: 'assets',
//   fontsFolder: 'assets/fonts',
//
//   /* Source folders*/
//   sourceFontAwesome: 'node_modules/font-awesome/',
//   sourceAcademicons: 'src/academicons-1.7.0/',
//
//
//   //imagesSrc: ['_src/img/**/*', '!_src/img/team/*.psd'],
//   //imagesDest: 'img',
//   //scripts: ['_src/js/**/*.js', '!_src/js/vendor**/*.js'],
//   //sass: '_src/sass/style.scss',
//   //sassFiles: '_src/sass/**/*.scss',
//   //fonts: 'fonts/**/*.css',
//   //assets: '_site/assets/',
//   jekyll: ['**/*.html', '**/*.md', 'assets/**/*.*', '!_site/**/*.html']
// }


// Folder naming conventions.
paths.siteFolderName		= '_site';	// Folder where the site is built

paths.sourceDir				= 'src';
paths.assetsFolderName		= 'assets'; 
paths.iconFolderName		= 'icons';
paths.includesFolderName	= '_includes';
paths.imageFolderName		= 'images';
paths.layoutsFolderName		= '_layouts';
paths.scriptFolderName		= 'javascripts';
paths.fontsFolderName		= 'fonts';

//////////////////////////////////////////////////////////////////////
//							Setup									//
//////////////////////////////////////////////////////////////////////

// Vendor source Folders 
// Font-Awesome
paths.vendorFontAwesomeFonts 	= 'node_modules/font-awesome/fonts/**.*';
paths.vendorFontAwesomeStyle 	= 'node_modules/font-awesome/scss/**.*';

// Academicons
paths.vendorAcademiconsFonts	= 'bower_components/academicons/fonts/**.*';
paths.vendorAcademiconsStyle	= 'bower_components/academicons/css/academicons.css';

//Bootstrap
paths.vendorBootstrapStyle		= 'node_modules/bootstrap/scss/**/**.*';
paths.vendorBootstrapJS			= 'node_modules/bootstrap/dist/js/bootstrap.js';

// SweetScroll
paths.vendorSweetScroll			= 'node_modules/sweet-scroll/sweet-scroll.js';
// Tether
paths.vendorTether				= 'node_modules/tether/dist/js/tether.js';
// JQuery
paths.vendorJQuery				= 'node_modules/jquery/dist/jquery.js';
// ParticleJS
paths.vendorParticleJS			= 'node_modules/particles.js/particles.js';

paths.vendorJQueryEasing		= 'src/javascript/vendor/jquery';


//Styles folder for source files
paths.srcStyleFontAwesome	= 'src/styles/font-awesome';
paths.srcStyleAcademicons	= 'src/styles/academicons';
paths.srcStyleBoostrap		= 'src/styles/bootstrap';

// JS sources 
paths.srcJSBoostrap		= 'src/javascript/bootstrap';
paths.srcJSSweetScroll	= 'src/javascript/sweet-scroll';
paths.srcJSTether		= 'src/javascript/tether';
paths.srcJSJQuery		= 'src/javascript/jquery';
paths.srcParticle		= 'src/javascript/particles';
paths.srcJS 			= 'src/javascript/';

// Jekyll folders
// Assets Folder
paths.assetsFontFolder		= 'assets/fonts';
paths.assetsCSSFolder		= 'assets/css';
paths.assetsJSFolder		= 'assets/js';



//////////////////////////////////////////////////////////////////////
//						Paths to important files					//
//////////////////////////////////////////////////////////////////////
paths.srcMainstyle		= 'src/main.scss';


paths.stylesFolderName   = 'stylesheets';
paths.tempFolderName     = '.tmp';

paths.prodUrl            = 'https://victorcaldas.com';

// Directory locations.
paths.sourceDir          = paths.sourceFolderName + '/';
paths.assetsDir          = paths.assetsFolderName + '/';
paths.tempDir            = paths.tempFolderName + '/';
paths.siteDir            = paths.siteFolderName + '/';



//Source fonts


// //Jekyll source locations
// // Assets Folder
// paths.fontFilesSite      = paths.assetsFolderName	+ paths.fontFolderName;



// Source asset files locations.
paths.sassFiles          = paths.sourceDir + paths.assetsDir + paths.stylesFolderName;
paths.jsFiles            = paths.sourceDir + paths.assetsDir + paths.scriptFolderName;
paths.iconFiles          = paths.sourceDir + paths.assetsDir + paths.iconFolderName;
paths.imageFiles         = paths.sourceDir + paths.assetsDir + paths.imageFolderName;
paths.fontFiles          = paths.sourceDir + paths.assetsDir + paths.fontFolderName;



// Temp asset files locations.
paths.assetFilesTemp     = paths.tempDir + paths.assetsFolderName
paths.sassFilesTemp      = paths.tempDir + paths.assetsDir + paths.stylesFolderName;
paths.jsFilesTemp        = paths.tempDir + paths.assetsDir + paths.scriptFolderName;
paths.iconFilesTemp      = paths.tempDir + paths.assetsDir + paths.iconFolderName;
paths.imageFilesTemp     = paths.tempDir + paths.assetsDir + paths.imageFolderName;
paths.fontFilesTemp      = paths.tempDir + paths.assetsDir + paths.fontFolderName;

// Site asset files locations.
paths.assetFilesSite     = paths.siteDir + paths.assetsFolderName
paths.sassFilesSite      = paths.siteDir + paths.assetsDir + paths.stylesFolderName;
paths.jsFilesSite        = paths.siteDir + paths.assetsDir + paths.scriptFolderName;
paths.iconFilesSite      = paths.siteDir + paths.assetsDir + paths.iconFolderName;
paths.imageFilesSite     = paths.siteDir + paths.assetsDir + paths.imageFolderName;

// Glob patterns by file type.
paths.sassPattern        = '/**/*.scss';
paths.jsPattern          = '/**/*.js';
paths.imagePattern       = '/**/*.+(jpg|JPG|jpeg|JPEG|png|PNG|svg|SVG|gif|GIF|webp|WEBP|tif|TIF)';
paths.markdownPattern    = '/**/*.+(md|MD|markdown|MARKDOWN)';
paths.htmlPattern        = '/**/*.html';
paths.txtPattern         = '/**/*.txt';
paths.xmlPattern         = '/**/*.{xml,json}';
paths.ymlPattern         = '/**/*.yml';

// File globs
paths.htmlFilesGlob      = paths.sourceFolderName + paths.htmlPattern
paths.imageFilesGlob     = paths.imageFiles + paths.imagePattern
paths.jsFilesGlob        = paths.jsFiles + paths.jsPattern
paths.mdFilesGlob        = paths.sourceFolderName + paths.markdownPattern
paths.sassFilesGlob      = paths.sassFiles + paths.sassPattern
paths.txtFilesGlob       = paths.sourceFolderName + paths.txtPattern
paths.xmlFilesGlob       = paths.sourceFolderName + paths.xmlPattern
paths.ymlFilesGlob       = paths.sourceFolderName + paths.ymlPattern

module.exports = paths;
