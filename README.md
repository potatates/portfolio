# Mia Ma · portfolio

A one-page portfolio laid out like prints on a table. Scrolling is the only control: each scroll step glides to the next project, its prints gather by themselves and take turns as the lead image, and the last step pulls back to the whole table.

## Edit the words and pictures
Everything you'd change is in `projects.js`: your line, each project's idea, the three beats, credits, links and images. Images live in `img/` as `.jpg` (the first one listed leads). Add a project by adding another entry; the table makes room for up to 8.

## Files
- `index.html`: the page shell
- `style.css`: look and type
- `main.js`: the table, camera and scrolling
- `projects.js`: all content
- `img/`: images (about 1600px wide); `src-img/` holds the original exports and is not needed online

## Run it locally
Open `index.html` in a browser, or run `python3 -m http.server` in this folder and visit http://localhost:8000.

## Put it online (GitHub Pages)
Push this folder to a repo, then in the repo: Settings → Pages → Deploy from branch → `main` / root.
