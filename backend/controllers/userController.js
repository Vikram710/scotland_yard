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
			return res.status(200).json({message: 'Success', ...response});
		} else {
			return res.status(400).json({message: err});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: 'Internal server error'});
	}
};

exports.updateUser = async (req, res) => {
	let [err, isError] = validateUserDetails(req.body);
	try {
		if (!isError) {
			let user = await User.updateOne({_id: req.body.id}, {$set: {name: req.body.name}});
			let response = {
				name: req.body.name,
				id: req.body.id,
			};
			return res.status(200).json({message: 'Success', ...response});
		} else {
			return res.status(400).json({message: err});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: 'Internal server error'});
	}
};
