# Phone Contact App

A simple browser-based contact manager built with vanilla JavaScript and IndexedDB. No frameworks, no backend — everything runs locally in your browser.

> **Note:** This project was built with AI assistance.

---

## Features

- **Add contacts** — name, phone number, email, and profile avatar
- **Avatar picker** — choose from preset anime-style avatars or paste a custom image URL
- **View contacts** — clean contact list with profile photo, name, and number
- **Search** — fuzzy search using Edit Distance (Levenshtein) algorithm, tolerates typos
- **Update contacts** — edit any field including avatar, with the same UI as adding
- **Delete contacts** — with a custom in-modal confirmation (no browser popups)
- **Toast notifications** — non-intrusive feedback via Toastify for add, update, and delete
- **Persistent storage** — all data is saved in IndexedDB, survives page refreshes

---

## Project Structure

```
phoneContact/
├── index.html                  # Main entry point
├── style.css                   # Global styles + modal styles
├── database/
│   └── contacts_db.js          # IndexedDB setup and store helper
├── crud/
│   ├── add_contact.js          # Add a contact
│   ├── view_contact.js         # Fetch all contacts
│   ├── update_contact.js       # Update a contact by ID
│   └── remove_contact.js       # Delete a contact by ID
└── src/
    ├── avatars.js              # Shared avatar name → URL map
    ├── search.js               # Edit Distance fuzzy search
    ├── toast.js                # Toastify wrapper (success / error / info)
    ├── view.css                # Contact list styles
    ├── add/
    │   └── formadd.js          # Add contact modal logic
    └── viewdetails/
        └── viewContact.js      # Contact list, search, details & edit modal
```

---

## How It Works

### Storage
Uses the browser's built-in **IndexedDB** (`contacts_db`, version 1) with a single object store (`contacts`) and auto-incrementing IDs.

### Search
Implements the **Edit Distance (Levenshtein)** algorithm to support fuzzy matching. A sliding window approach is used so short queries can match anywhere inside a longer name. The tolerance threshold is 1 mistake per 4 characters.

### Avatar Picker
Avatars are defined as a `key → URL` map in `src/avatars.js`. The character name (key) is shown in the input field instead of the raw URL. Both the add and edit modals share the same avatar map.

---

## Getting Started

No build step required. Just serve the folder with any static file server.

**Using VS Code Live Server:**
Right-click `index.html` → *Open with Live Server*

**Using Python:**
```bash
python -m http.server 5500
```

Then open `http://localhost:5500` in your browser.

---

## Dependencies

| Library | Source | Purpose |
|---|---|---|
| [Toastify JS](https://github.com/apvarun/toastify-js) | CDN | Toast notifications |

All other code is plain HTML, CSS, and JavaScript — no npm, no bundler.

---

## Browser Support

Requires a modern browser with support for **ES Modules** and **IndexedDB** (Chrome, Edge, Firefox, Safari).
