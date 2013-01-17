
const SM = require("sm");
const PM = SM.for(__dirname, {
	// TODO: Check for `process.env.SM_VERBOSE`.
	verbose: true,
	// TODO: Check for `process.env.SM_NOW`.
	now: true
});


exports.main = function(callback) {
	// Install platform specific dependencies.
	PM.resolve("dev-" + process.platform + "/package.json", function(err, path) {
		if (err) {
			if (/Package not found and not declared/.test(err.message)) {
				return callback(new Error("Platform '" + process.platform + "' not yet supported!"));
			}
			return callback(err);
		}
		return callback(null);
	}).fail(callback);
}


if (require.main === module) {
	exports.main(function(err) {
		if (err) {
			console.error(err.stack);
			return process.exit(1);
		}
		return process.exit(0);
	});
}
