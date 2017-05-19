module.exports = {
	"presets": [
		["env", {
		"targets": {
			"chrome": 57,
    		"edge": 13,
    		"firefox": 45,
    		"safari": 10,
    		"node": 7,
    		"ios": 10,
    		"opera": 34,
			"ie": 10
		},
		"modules": false,
		"loose": true
		}]
	],
	plugins: [
		['transform-react-jsx', {pragma: 'h'}],
		["transform-runtime", {
			"helpers": false,
			"polyfill": false,
			"regenerator": true,
			"moduleName": "babel-runtime"
		}]
	]
};
