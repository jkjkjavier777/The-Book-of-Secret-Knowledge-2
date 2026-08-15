#!/usr/bin/env python3
"""
render_book.py
---------------
The binding ritual.

Takes the book in its open form — HTML, editable, unbound — and
seals it into the closed form: a PDF, letter-sized, meant to be
carried rather than edited.

This does not change what the book says. It changes what the book IS.
Source stays source. This just performs the conversion, once, cleanly.

Usage:
    python render_book.py [input_html] [output_pdf]

Defaults:
    input_html  = book_readme.html
    output_pdf  = The-Book-of-Secret-Knowledge_Letter.pdf
"""

from pathlib import Path
from weasyprint import HTML
import sys


def render(
    input_html: str = "book_readme.html",
    output_pdf: str = "The-Book-of-Secret-Knowledge_Letter.pdf",
) -> None:
    """Bind the open book. Fails loudly if the source doesn't exist —
    a ritual with no source is just an empty gesture."""

    html_path = Path(input_html)
    if not html_path.exists():
        raise SystemExit(f"Input file not found: {html_path}")

    HTML(filename=str(html_path)).write_pdf(output_pdf)
    print(f"Bound. Saved: {output_pdf}")


if __name__ == "__main__":
    if len(sys.argv) >= 3:
        render(sys.argv[1], sys.argv[2])
    elif len(sys.argv) == 2:
        render(sys.argv[1])
    else:
        render()

