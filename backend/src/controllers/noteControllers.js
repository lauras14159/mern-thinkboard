import Note from "../models/Node.js";

export async function getAllNotes(_, res) {
  //send the notes
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); //-1 wil sort in desc (show the newest first)
    res.status(200).json(notes);
  } catch (error) {
    console.error("ERROR in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "note not found" });
    res.status(200).json(note);
  } catch (error) {
    console.error("ERROR in getNoteById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNote(req, res) {
  //create notes
  try {
    const { title, content } = req.body; //same const title = req.body.title....
    const note = new Note({ title, content });
    const savedNote = await note.save();

    res.status(201).json(savedNote); //201 created successfully
  } catch (error) {
    console.error("ERROR in createNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req, res) {
  //update note
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    ); //,id bcz we name it here id router.put("/:id", updatedNote);

    if (!updatedNote)
      return res.status(404).json({ message: "note not found" });
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("ERROR in updateNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function deleteNote(req, res) {
  //delete note
  try {
    const deletedNote = await Note.findOneAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "note not found" });
    res.status(200).json({ message: "note deleted successfully!" });
  } catch (error) {
    console.error("ERROR in deleteNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
