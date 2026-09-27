import os
import re
import json
from html.parser import HTMLParser

project_root = os.path.abspath('.')
pages_dir = os.path.join(project_root, 'pages')

html_files = [os.path.join(project_root, 'index.html')]
for f in os.listdir(pages_dir):
    if f.endswith('.html'):
        html_files.append(os.path.join(pages_dir, f))

report = {
    'total_pages': len(html_files),
    'missing_title': [],
    'short_title': [],
    'long_title': [],
    'missing_desc': [],
    'short_desc': [],
    'long_desc': [],
    'missing_canonical': [],
    'missing_h1': [],
    'multiple_h1': [],
    'missing_og': [],
    'missing_schema': [],
    'images_without_alt': [],
    'broken_internal_links': [],
    'commercial_audit': {},
    'schema_breakdown': {},
    'pages_analysis': {}
}

title_re = re.compile(r'<title[^>]*>(.*?)</title>', re.IGNORECASE | re.DOTALL)
desc_re = re.compile(r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']*)["\']', re.IGNORECASE)
desc_re2 = re.compile(r'<meta[^>]+content=["\']([^"\']*)["\'][^>]+name=["\']description["\']', re.IGNORECASE)
canonical_re = re.compile(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\']([^"\']*)["\']', re.IGNORECASE)
h1_re = re.compile(r'<h1[^>]*>(.*?)</h1>', re.IGNORECASE | re.DOTALL)
og_title_re = re.compile(r'<meta[^>]+property=["\']og:title["\'][^>]+content=["\']([^"\']*)["\']', re.IGNORECASE)
og_desc_re = re.compile(r'<meta[^>]+property=["\']og:description["\'][^>]+content=["\']([^"\']*)["\']', re.IGNORECASE)
og_image_re = re.compile(r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']*)["\']', re.IGNORECASE)
schema_re = re.compile(r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', re.IGNORECASE | re.DOTALL)
img_re = re.compile(r'<img\s+([^>]*?)>', re.IGNORECASE | re.DOTALL)
a_re = re.compile(r'<a\s+([^>]*?)>', re.IGNORECASE | re.DOTALL)
attr_re = lambda attr, text: re.search(r'\b' + attr + r'=["\']([^"\']*)["\']', text, re.IGNORECASE)

for file in html_files:
    rel_path = os.path.relpath(file, project_root).replace('\\', '/')
    with open(file, 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()

    # 1. Title
    m_title = title_re.search(html)
    title = m_title.group(1).strip() if m_title else ''
    if not title:
        report['missing_title'].append(rel_path)
    elif len(title) < 30:
        report['short_title'].append({'file': rel_path, 'title': title, 'len': len(title)})
    elif len(title) > 85:
        report['long_title'].append({'file': rel_path, 'title': title, 'len': len(title)})

    # 2. Desc
    m_desc = desc_re.search(html) or desc_re2.search(html)
    desc = m_desc.group(1).strip() if m_desc else ''
    if not desc:
        report['missing_desc'].append(rel_path)
    elif len(desc) < 70:
        report['short_desc'].append({'file': rel_path, 'desc': desc, 'len': len(desc)})
    elif len(desc) > 220:
        report['long_desc'].append({'file': rel_path, 'desc': desc, 'len': len(desc)})

    # 3. Canonical
    m_can = canonical_re.search(html)
    canonical = m_can.group(1).strip() if m_can else ''
    if not canonical:
        report['missing_canonical'].append(rel_path)

    # 4. H1
    h1s = [re.sub(r'<[^>]+>', '', h.strip()) for h in h1_re.findall(html)]
    if len(h1s) == 0:
        report['missing_h1'].append(rel_path)
    elif len(h1s) > 1:
        report['multiple_h1'].append({'file': rel_path, 'count': len(h1s), 'h1s': h1s})

    # 5. OpenGraph
    og_title = og_title_re.search(html)
    og_desc = og_desc_re.search(html)
    og_image = og_image_re.search(html)
    if not (og_title and og_desc and og_image):
        report['missing_og'].append({
            'file': rel_path,
            'missing': {
                'title': not bool(og_title),
                'desc': not bool(og_desc),
                'image': not bool(og_image)
            }
        })

    # 6. Schema.org
    schemas = []
    for s_match in schema_re.findall(html):
        try:
            s_data = json.loads(s_match.strip())
            if isinstance(s_data, dict):
                schemas.append(s_data.get('@type', 'dict_without_type'))
            elif isinstance(s_data, list):
                schemas.extend([item.get('@type', 'dict_without_type') for item in s_data if isinstance(item, dict)])
        except Exception as e:
            schemas.append('JSON_PARSE_ERROR')
    if not schemas:
        report['missing_schema'].append(rel_path)
    report['schema_breakdown'][rel_path] = schemas

    # 7. Images alt
    for img_tag in img_re.findall(html):
        src_m = attr_re('src', img_tag)
        alt_m = attr_re('alt', img_tag)
        if not alt_m:
            src = src_m.group(1) if src_m else 'unknown'
            report['images_without_alt'].append({'file': rel_path, 'src': src})

    # 8. Broken links
    for a_tag in a_re.findall(html):
        href_m = attr_re('href', a_tag)
        if href_m:
            href = href_m.group(1).strip()
            if href and not href.startswith(('#', 'tel:', 'mailto:', 'http:', 'https:', 'javascript:')):
                clean_href = href.split('?')[0].split('#')[0]
                if clean_href:
                    dir_name = os.path.dirname(file)
                    target = os.path.normpath(os.path.join(dir_name, clean_href))
                    if not os.path.exists(target):
                        report['broken_internal_links'].append({'file': rel_path, 'href': href, 'resolved': target})

    report['pages_analysis'][rel_path] = {
        'title': title,
        'title_len': len(title),
        'desc_len': len(desc),
        'canonical': canonical,
        'h1_count': len(h1s),
        'schemas': schemas
    }

# Commercial audit
with open(os.path.join(project_root, 'index.html'), encoding='utf-8', errors='ignore') as f:
    idx_content = f.read()
with open(os.path.join(pages_dir, '10-contacts.html'), encoding='utf-8', errors='ignore') as f:
    cnt_content = f.read()
with open(os.path.join(pages_dir, '02-services.html'), encoding='utf-8', errors='ignore') as f:
    svc_content = f.read()
req_path = os.path.join(pages_dir, '15-requisites.html')
req_content = ''
if os.path.exists(req_path):
    with open(req_path, encoding='utf-8', errors='ignore') as f:
        req_content = f.read()

all_content = idx_content + cnt_content + svc_content + req_content

report['commercial_audit'] = {
    'inn_kpp_ogrn': bool(re.search(r'\bИНН\b|\bОГРН\b|\bКПП\b', cnt_content + req_content)),
    'bank_requisites': bool(re.search(r'р/с|расчетный\s+счет|БИК|корр', cnt_content + req_content, re.I)),
    'sro_membership': bool(re.search(r'\bСРО\b|НОПРИЗ|НОСТРОЙ|выписка\s+из\s+реестра', all_content, re.I)),
    'iso_certificates': bool(re.search(r'ISO|ИСО|9001|сертификат', all_content, re.I)),
    'liability_insurance': bool(re.search(r'страхован|страховой\s+полис', all_content, re.I)),
    'price_transparency': bool(re.search(r'руб|\bрублей\b|₽|стоимость\s+от|цена\s+от', svc_content, re.I)),
    'cost_calculator': bool(re.search(r'калькулятор|онлайн-расчет|рассчитать\s+стоимость', svc_content, re.I)),
    'client_recommendation_letters': bool(re.search(r'благодарственн|отзыв.*печать|скан\s+отзыва', all_content, re.I)),
    'team_engineers_credentials': bool(re.search(r'реестр\s+специалистов|НРС|главный\s+инженер|ГИП|ГАП', all_content, re.I))
}

with open('tools/audit-seo-report.json', 'w', encoding='utf-8') as f:
    json.dump(report, f, ensure_ascii=False, indent=2)

print("AUDIT SUMMARY:")
print(f"Total pages audited: {report['total_pages']}")
print(f"Missing Title: {len(report['missing_title'])}")
print(f"Short Title (<30 chars): {len(report['short_title'])}")
print(f"Long Title (>85 chars): {len(report['long_title'])}")
print(f"Missing Description: {len(report['missing_desc'])}")
print(f"Missing Canonical: {len(report['missing_canonical'])}")
print(f"Missing H1: {len(report['missing_h1'])}")
print(f"Multiple H1: {len(report['multiple_h1'])}")
print(f"Missing Schema.org: {len(report['missing_schema'])}")
print(f"Broken Internal Links: {len(report['broken_internal_links'])}")
print(f"Images without Alt: {len(report['images_without_alt'])}")
print("\nCOMMERCIAL FACTORS CHECK:")
for k, v in report['commercial_audit'].items():
    print(f"  {k}: {'PASS' if v else 'FAIL / MISSING'}")
