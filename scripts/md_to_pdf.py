#!/usr/bin/env python3
"""
Convert the Arabic contract markdown to a professional PDF.
Uses: markdown (MD→HTML) + weasyprint (HTML→PDF)
"""

import markdown
from weasyprint import HTML
from pathlib import Path

INPUT = Path("/home/z/my-project/download/عقد-روضة-نحو-المستقبل.md")
OUTPUT = Path("/home/z/my-project/download/عقد-روضة-نحو-المستقبل.pdf")

# Read the markdown
md_text = INPUT.read_text(encoding="utf-8")

# Convert MD → HTML
html_body = markdown.markdown(
    md_text,
    extensions=["tables", "fenced_code", "toc", "sane_lists"],
)

# Wrap with full HTML + CSS for Arabic + RTL + professional styling
full_html = f"""<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<title>عقد تطوير تطبيق ويب — روضة نحو المستقبل</title>
<style>
  @page {{
    size: A4;
    margin: 2cm 1.5cm;
    @bottom-center {{
      content: "صفحة " counter(page) " من " counter(pages);
      font-family: "Cairo", "Amiri", serif;
      font-size: 9pt;
      color: #64748b;
    }}
    @top-center {{
      content: "عقد روضة نحو المستقبل — نظام القبول والتسجيل الإلكتروني";
      font-family: "Cairo", "Amiri", serif;
      font-size: 8pt;
      color: #94a3b8;
    }}
  }}

  * {{
    box-sizing: border-box;
  }}

  body {{
    font-family: "Cairo", "Amiri", "Noto Sans Arabic", sans-serif;
    font-size: 11pt;
    line-height: 1.7;
    color: #1e293b;
    direction: rtl;
    text-align: right;
  }}

  h1 {{
    color: #0f2c5c;
    font-size: 22pt;
    font-weight: 800;
    margin: 24pt 0 12pt;
    padding-bottom: 6pt;
    border-bottom: 3px solid #c9a55a;
    page-break-after: avoid;
  }}

  h2 {{
    color: #0f2c5c;
    font-size: 16pt;
    font-weight: 700;
    margin: 20pt 0 10pt;
    padding-right: 12pt;
    border-right: 4px solid #c9a55a;
    page-break-after: avoid;
  }}

  h3 {{
    color: #1e3a8a;
    font-size: 13pt;
    font-weight: 700;
    margin: 14pt 0 8pt;
    page-break-after: avoid;
  }}

  p {{
    margin: 6pt 0;
    text-align: justify;
  }}

  table {{
    width: 100%;
    border-collapse: collapse;
    margin: 12pt 0;
    font-size: 10pt;
    page-break-inside: avoid;
  }}

  th {{
    background: #0f2c5c;
    color: white;
    padding: 8pt 10pt;
    text-align: right;
    font-weight: 700;
    border: 1px solid #1e293b;
  }}

  td {{
    padding: 6pt 10pt;
    border: 1px solid #cbd5e1;
    text-align: right;
    vertical-align: top;
  }}

  tr:nth-child(even) {{
    background: #f1f5f9;
  }}

  ul, ol {{
    margin: 6pt 0;
    padding-right: 20pt;
  }}

  li {{
    margin: 3pt 0;
  }}

  strong {{
    color: #0f2c5c;
    font-weight: 700;
  }}

  hr {{
    border: none;
    border-top: 2px dashed #c9a55a;
    margin: 20pt 0;
  }}

  code {{
    background: #f1f5f9;
    color: #be123c;
    padding: 2pt 4pt;
    border-radius: 3pt;
    font-family: "Courier New", monospace;
    font-size: 10pt;
    direction: ltr;
    display: inline-block;
  }}

  /* Cover page */
  .cover {{
    page-break-after: always;
    text-align: center;
    padding-top: 80pt;
  }}

  .cover h1 {{
    font-size: 32pt;
    color: #0f2c5c;
    border: none;
    margin-bottom: 12pt;
  }}

  .cover .subtitle {{
    font-size: 16pt;
    color: #c9a55a;
    font-weight: 700;
    margin-bottom: 30pt;
  }}

  .cover .info {{
    margin-top: 60pt;
    font-size: 12pt;
    color: #475569;
  }}

  /* Print optimizations */
  h1, h2, h3 {{
    page-break-after: avoid;
  }}

  table, ul, ol {{
    page-break-inside: avoid;
  }}
</style>
</head>
<body>
{html_body}
</body>
</html>
"""

# Convert HTML → PDF
HTML(string=full_html).write_pdf(str(OUTPUT))

# Verify
size = OUTPUT.stat().st_size
print(f"✓ PDF generated: {OUTPUT}")
print(f"  Size: {size:,} bytes ({size/1024:.1f} KB)")
