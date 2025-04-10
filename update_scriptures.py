import pandas as pd

df = pd.read_excel("daily_verses.xlsx")

verse_col = "Book/Chapter/Verse"
passage_col = "Passage"

df = df[[verse_col, passage_col]].dropna()

verses = df[verse_col].tolist()
passages = df[passage_col].tolist()

js_code = (
    "export const verses = [\n"
    + ",\n".join(f' "{v}"' for v in verses)
    + "\n];\n\n"
    + "export const passages = [\n"
    + ",\n".join(f' "{p}"' for p in passages)
    + "\n];"
)

with open("dailyScriptures.js", "w", encoding="utf-8") as f:
    f.write(js_code)

print("JavaScript arrays created in dailyScriptures.js")