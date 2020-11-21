const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');

/* NB: Not all routers are for handling api request */

// GET ALL MEMBERS
router.get('/', (req, res) => {
	res.json(members); // will show json data
})


// GET A SINGLE MEMBER
router.get('/:id', (req, res) => {
	/*NB: req.params.id holds the id passed to the url*/
	const found = members.some(member => member.id === parseInt(req.params.id));

	if(found) {
		res.json(members.filter(member => member.id === parseInt(req.params.id)));
	} else {
		res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
	}

});


// CREATE MEMBER
router.post('/', (req, res) => {
	const newMember = {
		id: uuid.v4(),
		name: req.body.name,
		email: req.body.email,
		status: 'active'
	}

	if (!newMember.name || !newMember.email) {
		return res.status(400).json({ msg: 'Please include a name and email' });
	}


	members.push(newMember);
	res.json(members);
	// res.redirect('/'); // will redirect to home
});

// UPDATE MEMBER
router.put('/:id', (req, res) => {
	/*NB: req.params.id holds the id passed to the url*/
	const found = members.some(member => member.id === parseInt(req.params.id));

	if(found) {
		const updMember = req.body;
		members.forEach(member => {
			if(member.id === parseInt(req.params.id)) {
				member.name = updMember.name ? updMember.name : member.name;
				member.email = updMember.email ? updMember.email : member.email;

				res.json({ msg: 'Member updated', member });
			}
		})

		me
	} else {
		res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
	}

});


// DELETE MEMBER
router.delete('/:id', (req, res) => {
	/*NB: req.params.id holds the id passed to the url*/
	const found = members.some(member => member.id === parseInt(req.params.id));

	if(found) {
		res.json({ 
			msg: 'Member deleted', 
			members: members.filter(member => member.id !== parseInt(req.params.id))
		});
	} else {
		res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
	}

});



module.exports = router;