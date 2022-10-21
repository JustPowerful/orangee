const express = require("express");
const router = express.Router();

let notesController = require("../controllers/notes");

// Viewing the notes notification page
router.get("/notes", notesController.viewAllNotes);

// Get notes
router.get("/notes/:subtaskid", notesController.viewNotes);

// Add notes
router.post("/notes/:subtaskid", notesController.addNote);

// [Archive] add note to archive by id
router.get("/archivenote/:id", notesController.archiveNote);

// [Archive] view notes in the archive
router.get("/viewarchive", notesController.viewArchive);

router.get("/viewarchive/:id", notesController.viewStArchive);

module.exports = router;
