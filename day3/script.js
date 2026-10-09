let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];
// Step 2: searchNotes
function searchNotes(word) {
  return notes.filter(note => note.text.toLowerCase().includes(word.toLowerCase()));
}

// Step 3: longestNote
function longestNote() {
  if (notes.length === 0) return null;
  return notes.reduce((longest, note) =>
    note.text.length > longest.text.length ? note : longest, notes[0]);
}

// Step 4: countByCategory
function countByCategory() {
  const counts = {};
  notes.forEach(note => {
    counts[note.category] = (counts[note.category] || 0) + 1;
  });
  return counts;
}

// Step 5: getSummary
function getSummary() {
  const counts = countByCategory();
  const total = notes.length;
  const noteWord = total === 1 ? "note" : "notes";
  return `${total} ${noteWord}: ${counts.personal || 0} personal, ${counts.work || 0} work, ${counts.study || 0} study.`;
}

// Step 6: isDuplicate
function isDuplicate(text) {
  const normalized = text.trim().toLowerCase();
  return notes.some(note => note.text.trim().toLowerCase() === normalized);
}

// Step 7: addNote
function addNote(text, category) {
  const validCategories = ["personal", "work", "study"];
  if (text.length < 1 || text.length > 200) {
    console.log("Not added: text must be between 1 and 200 characters.");
    return false;
  }
  if (!validCategories.includes(category)) {
    console.log("Not added: invalid category.");
    return false;
  }
  if (isDuplicate(text)) {
    console.log("Not added: duplicate note.");
    return false;
  }
  notes.push({ id: notes.length + 1, text, category });
  console.log("Note added.");
  return true;
}

// Step 8: Tests

console.log(searchNotes("milk"));
// [{ id: 1, text: "Buy milk and bread", category: "personal" }]
console.log(searchNotes("xyz"));
// [] (no matches - edge case)

console.log(longestNote());
// { id: 3, text: "Email the project report to Grace", category: "work" } (34 chars, longest)

const originalNotes = notes;
notes = [];
console.log(longestNote());
// null (edge case: empty array)
notes = originalNotes;

console.log(countByCategory());
// { personal: 2, study: 2, work: 1 }

console.log(getSummary());
// "5 notes: 2 personal, 1 work, 2 study."

notes = [{ id: 1, text: "Test note", category: "personal" }];
console.log(getSummary());
// "1 note: 1 personal, 0 work, 0 study." (edge case: singular "note")
notes = originalNotes;

console.log(isDuplicate("buy milk and bread"));
// true (case-insensitive match)
console.log(isDuplicate("Go for a walk"));
// false (no match - edge case)

console.log(addNote("Pay rent", "personal"));
// true - logs "Note added."
console.log(addNote("Buy milk and bread", "personal"));
// false - logs "Not added: duplicate note." (edge case)
console.log(addNote("", "work"));
// false - logs "Not added: text must be between 1 and 200 characters." (edge case)
console.log(addNote("Random thought", "misc"));
// false - logs "Not added: invalid category." (edge case)






console.log()
console.log()