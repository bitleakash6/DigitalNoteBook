const express = require('express');
const router = express.Router();
const {jwtAuthMiddleware, generateToken} = require('./../jwt');
const Note = require('./../models/note');

//get route to get the list of notes
router.get('/notes', async (req, res) => {
    try {
        const data = await Note.find();
        console.log('data saved');
        res.status(200).json(data);
    } catch (err) {
        console.log('Error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//get route to using id to get the list of notes
router.get('/notes/:id',jwtAuthMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Note.findById(id);
        console.log('data saved');
        res.status(200).json(data);
    } catch (err) {
        console.log('Error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//post route to add a notes 
router.post('/notes', jwtAuthMiddleware,async (req, res) => {
    try {

        const data = req.body; // Assuming the request body contains the notes

        const newNotes = new Note(data);   //directly setting data

        //save the new notes to the database
        const response = await newNotes.save();
        console.log('data saved succesfully...');

        const payload = {
            id: response.id,
        }
        const token = generateToken(payload);

        res.status(200).json({response : response, token: token});
    }
    catch (err) {
        console.log('Error saving person:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//password route
router.put('/notes/:id',jwtAuthMiddleware, async (req, res)=>{
    try{

        const id = req.params.id;
        const updatedata = req.body;

        const responce = await Note.findByIdAndUpdate(id, updatedata, {
            new: true,
            runValidators : true,
        })

        if(!responce){
            res.status(404).json({error: 'notes not found'});
        }

        console.log(' data updated');
        res.status(200).json(responce);
    }catch (err){
        console.log('Error update info:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/notes/:id',jwtAuthMiddleware, async (req, res)=> {
    try{
        
        const id = req.params.id;
        const responce = await Note.findByIdAndDelete(id);
        if(!responce){
            return res.status(404).json({error: 'Note not found'});
        }

        console.log(' data delete');
        res.status(200).json({message: 'notes deleted succesfully'})
    }catch (err){
        console.log('Error delete notes', err);
        res.status(500).json({error: 'Internal server error'});
    }
});


router.post('/notes/:id/share', jwtAuthMiddleware, async (req, res) => {
    try {
        const noteId = req.params.id;
        const { sharedWithUserId } = req.body; // Assuming sharedWithUserId is the ID of the user to share the note with

        // Find the note by ID
        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        // Check if the note is already shared with the user
        if (note.sharedWith.includes(sharedWithUserId)) {
            return res.status(400).json({ error: 'Note is already shared with this user' });
        }

        // Add the user ID to the list of sharedWith users
        note.sharedWith.push(sharedWithUserId);

        // Save the updated note
        await note.save();

        res.status(200).json({ message: 'Note shared successfully' });
    } catch (err) {
        console.log('Error sharing note:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/search', jwtAuthMiddleware, async (req, res) => {
    try {
        const query = req.query.q; // Extract the query parameter from the request URL

        // Perform a case-insensitive search for notes containing the provided keyword(s)
        const searchResults = await Note.find({
            $or: [
                { content: { $regex: query, $options: 'i' } }
                // Add additional fields to search if needed
            ]
        });

        res.status(200).json(searchResults);
    } catch (err) {
        console.log('Error searching notes:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;