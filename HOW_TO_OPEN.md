# How to Open The Book of Secret Knowledge

This guide explains how to open and read **The Book of Secret Knowledge** on GitHub and locally.

---

## On GitHub

1. **Navigate to the Repository**:
   - Go to [The-Book-of-Secret-Knowledge-2](https://github.com/jkjkjavier777/The-Book-of-Secret-Knowledge-2).

2. **View the Book**:
   - Open `book_readme.html` in your browser by clicking on it in the repository.
   - GitHub will render the HTML file directly.

3. **Explore the Gallery**:
   - Open `gallery.html` to view generated artwork and navigate to other book files.

---

## Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/jkjkjavier777/The-Book-of-Secret-Knowledge-2.git
   cd The-Book-of-Secret-Knowledge-2
   ```

2. **Open the Book**:
   - Open `book_readme.html` in your preferred web browser.
   - Alternatively, use a local server for better rendering:
     ```bash
     python3 -m http.server 8000
     ```
     Then, navigate to `http://localhost:8000/book_readme.html` in your browser.

3. **View the Gallery**:
   - Open `gallery.html` in your browser to see the artwork and links to other files.

---

## Quick Links
- [README.md](README.md)
- [gallery.html](gallery.html)
- [book_readme.html](book_readme.html)

---

## Notes
- Ensure all required files (`book_readme.html`, `README.md`, `render_book.py`) are present.
- If the gallery requires artwork, upload `assets/token_flood_artwork.png` before merging.