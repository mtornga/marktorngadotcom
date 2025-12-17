Hyphen / Black-Box Rendering Fix - Notes

Issue:
When generating resumes (especially PDFs), Unicode punctuation like en dashes (–), em dashes (—), and special bullets (•, ■) sometimes render as black boxes in downstream tools.

Solution / Rules:
1. Always use plain ASCII hyphen-minus: -
   Examples:
   - Write "high quality features" instead of "high–quality features".
   - Write "end-to-end" using the plain hyphen: end-to-end.

2. Avoid Unicode bullets in source text:
   - Do NOT use: •, ■, ▪, – as bullets.
   - Prefer simple ASCII bullets, e.g.:
     - "- " for bullets in text formats.
     - Let the PDF layout engine or Word handle visual bullets, but keep the underlying characters ASCII.

3. Normalize pasted job description text:
   - When pasting from a JD or prior document, replace all:
     – (en dash), — (em dash), •, ■
     with plain "-" or simple ASCII equivalents.

4. Resume-specific reminder:
   - For Mark Tornga’s resumes and cover letters, ALWAYS:
     - Use only ASCII punctuation for hyphens and bullets.
     - Avoid any "fancy" dash characters.

If you see black boxes again, do a quick search/replace:
- Find: "–", "—", "•", "■"
- Replace: "-"
