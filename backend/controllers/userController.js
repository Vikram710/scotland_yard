const Models = require('../models/Model');

const User = Models.User;

const validateUserDetails = (user) => {
	let err = '';
	let isError = false;
	if (!user.name || user.name.length == 0) {
		isError = true;
		err = 'Invalid name';
	}
	return [err, isError];
};

exports.createUser = async (req, res) => {
	let [err, isError] = validateUserDetails(req.body);
	try {
		if (!isError) {
			let newUser = {
				name: req.body.name,
			};
			let user = await User.create(newUser);
			let response = {
				name: user.name,
				id: user._id,
			};
			return res.status(200).json({status_code: 200, message: 'Success', ...response});
		} else {
			return res.status(400).json({status_code: 400, message: err});
		}
	} catch (error) {
		return res.status(500).json({status_code: 500, message: 'Internal server error'});
	}
};
