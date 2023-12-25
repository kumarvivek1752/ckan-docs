---
sidebar_position: 1
---

# install Schemming on CKAN


### in this section we will learn how to install Schemming on CKAN

### What you'll need
 - [CKAN](https://docs.ckan.org/en/2.9/maintaining/installing/index.html) version 2.9 or above:
 - [ckanext-scheming](https://github.com/ckan/ckanext-scheming.git) compatible with CKAN 2.9.6 and above.
 - [official documentation](https://github.com/ckan/ckanext-scheming?tab=readme-ov-file#ckanext-scheming) of ckanext-scheming.



------------
Installation with Docker
------------
To install ckanext-scheming copy paste below code in your docker file.
```

### Scheming ###
RUN  pip3 install -e 'git+https://github.com/ckan/ckanext-scheming.git@master#egg=ckanext-scheming'

COPY translate.json /srv/app/src/ckanext-scheming/ckanext/scheming

COPY package_form.html /srv/app/src/ckanext-scheming/ckanext/scheming/templates/scheming/package/snippets/package_form.html

```


add below code in your `ckan.ini` file

```
scheming.dataset_schemas = ckanext.scheming:translate.json
scheming.presets = ckanext.scheming:presets.json
```






your `translate.json` file should look like this

```json title="translate.json"
{
    "scheming_version": 2,
    "dataset_type": "formpages",
    "about": "A reimplementation of the default CKAN dataset schema",
    "about_url": "http://github.com/ckan/ckanext-scheming",
    "dataset_fields": [
        {
            "start_form_page": {
                "title": "Required Fields",
                "description": "These fields provide detailed metadata about the dataset."
            },
            "field_name": "title",
            "label": "Title",
            "preset": "title",
            "form_placeholder": "eg. A descriptive title"
        },
        {
            "field_name": "name",
            "label": "URL",
            "preset": "dataset_slug",
            "form_placeholder": "eg. my-dataset"
        },
        {
            "field_name": "owner_org",
            "label": "Organization",
            "preset": "dataset_organization"
        },
        {
            "start_form_page": {
                "title": "English",
                "description": "These fields provide detailed metadata about the dataset."
            },
            "field_name": "en_title",
            "label": "English Dataset Title",
            "preset": "title",
            "form_placeholder": "eg. A descriptive title"
        },
        {
            "field_name": "notes",
            "label": "English Description",
            "form_snippet": "markdown.html",
            "form_placeholder": "eg. Some useful notes about the data"
        },
        {
            "start_form_page": {
                "title": "French dataset",
                "description": "These fields provide detailed metadata about the dataset."
            },
            "field_name": "fr_title",
            "label": "Freanch Dataset Title",
            "preset": "title",
            "form_placeholder": "eg. A descriptive title"
        },
        {
            "field_name": "fr_notes",
            "label": "French Description",
            "form_snippet": "markdown.html",
            "form_placeholder": "eg. Some useful notes about the data"
        },
        {
            "start_form_page": {
                "title": "Spanish dataset",
                "description": "These fields provide detailed metadata about the dataset."
            },
            "field_name": "es_title",
            "label": "Spanish Dataset Title",
            "preset": "title",
            "form_placeholder": "eg. A descriptive title"
        },
        {
            "field_name": "es_notes",
            "label": "Spanish Description",
            "form_snippet": "markdown.html",
            "form_placeholder": "eg. Some useful notes about the data"
        },
        {
            "start_form_page": {
                "title": "Russian dataset",
                "description": "These fields provide detailed metadata about the dataset."
            },
            "field_name": "ru_title",
            "label": "Russian Dataset Title",
            "preset": "title",
            "form_placeholder": "eg. A descriptive title"
        },
        {
            "field_name": "ru_notes",
            "label": "Russian Description",
            "form_snippet": "markdown.html",
            "form_placeholder": "eg. Some useful notes about the data"
        },
        {
            "start_form_page": {
                "title": "Chinese dataset",
                "description": "These fields provide detailed metadata about the dataset."
            },
            "field_name": "zh_title",
            "label": "Chinese Dataset Title",
            "preset": "title",
            "form_placeholder": "eg. A descriptive title"
        },
        {
            "field_name": "zh_notes",
            "label": "Chinese Description",
            "form_snippet": "markdown.html",
            "form_placeholder": "eg. Some useful notes about the data"
        },
        {
            "start_form_page": {
                "title": "Arabic dataset",
                "description": "These fields provide detailed metadata about the dataset."
            },
            "field_name": "ar_title",
            "label": "Arabic Dataset Title",
            "preset": "title",
            "form_placeholder": "eg. A descriptive title"
        },
        {
            "field_name": "ar_notes",
            "label": "Arabic Description",
            "form_snippet": "markdown.html",
            "form_placeholder": "eg. Some useful notes about the data"
        }
    ],
    "resource_fields": [
        {
            "field_name": "url",
            "label": "URL",
            "preset": "resource_url_upload"
        },
        {
            "field_name": "name",
            "label": "Name",
            "form_placeholder": "eg. January 2011 Gold Prices"
        },
        {
            "field_name": "description",
            "label": "Description",
            "form_snippet": "markdown.html",
            "form_placeholder": "Some useful notes about the data"
        },
        {
            "field_name": "format",
            "label": "Format",
            "preset": "resource_format_autocomplete"
        }
    ]
}

```

your `package_form.html` file should look like this

```jinja2 title="package_form.html"
{% extends 'package/new_package_form.html' %}

{% block stages %}
{%- set pages = h.scheming_get_dataset_form_pages(dataset_type) -%}
{%- if pages -%}
{%- set active_page = data.get('_form_page', 1) | int -%}


<ol class="stages stage-1">
    {%- for p in pages -%}
    {%-set pg_url = h.url_for(dataset_type +
    ('.scheming_edit_page' if form_style == 'edit' else '.scheming_new_page'),
    package_type=dataset_type,
    id=data.name or data.id,
    page=loop.index) -%}

    <li class="{{
          'first ' if loop.first else ''}}{{
          'active ' if loop.index == active_page else '' }}"
        style="width:{{ 100 / (loop.length + (0 if form_style == 'edit' else 1)) }}%">
        <span class="highlight" style="padding-right:0">
            {% if '//' not in pg_url.strip() %}
            <a href="{{
              h.url_for(dataset_type +
                  ('.scheming_edit_page' if form_style == 'edit' else '.scheming_new_page'),
                package_type=dataset_type,
                id=data.name or data.id,
                page=loop.index)
            }}">{{ h.scheming_language_text(p.title) }}</a>
            {%
            else %}{{ h.scheming_language_text(p.title) }}{% endif %}
        </span>
    </li>
    {%- endfor -%}
    {%- if form_style != 'edit' -%}
    <li class="last {{ s2 }}" style="width:{{ 100 / (pages | length + 1) }}%">
        {% if s2 != 'complete' %}
        <span class="highlight">{{ _('Add data') }}</span>
        {% else %}
        {% if s1 == 'active' %}
        {# stage 1 #}
        <button class="highlight" name="save" value="go-resources" type="submit">{{ _('Add data') }}</button>
        {% else %}
        {% link_for _('Add data'), named_route='dataset.new', class_="highlight" %}
        {% endif %}
        {% endif %}
    </li>
    {%- endif -%}
</ol>
{%- else -%}
{{ super() }}
{%- endif -%}
{% endblock %}

{% block errors %}
{%- if errors -%}
{%- set schema = h.scheming_get_dataset_schema(dataset_type) -%}
{%- snippet 'scheming/snippets/errors.html',
errors=errors, fields=schema.dataset_fields,
entity_type='dataset', object_type=dataset_type -%}
{%- endif -%}
{% endblock %}

{% block basic_fields %}
{%- if not dataset_type -%}
<p>
    dataset_type not passed to template. your version of CKAN
    might not be compatible with ckanext-scheming
</p>
{%- endif -%}

{%- set schema = h.scheming_get_dataset_schema(dataset_type) -%}
{%- set pages = h.scheming_get_dataset_form_pages(dataset_type) -%}
{%- if pages -%}
{%- set active_page = data.get('_form_page', 1) | int -%}
{%- set fields = pages[active_page - 1]['fields'] -%}
{%- else -%}
{%- set fields = schema.dataset_fields -%}
{%- endif -%}
{%- for field in fields -%}
{%- if field.form_snippet is not none -%}
{%- if field.field_name not in data %}
{# Set the field default value before rendering but only if
it doesn't already exist in data which would mean the form
has been submitted. #}
{% if field.default_jinja2 %}
{% do data.__setitem__(
field.field_name,
h.scheming_render_from_string(field.default_jinja2)) %}
{% elif field.default %}
{% do data.__setitem__(field.field_name, field.default) %}
{% endif %}
{% endif -%}
{%- snippet 'scheming/snippets/form_field.html',
field=field,
data=data,
errors=errors,
licenses=c.licenses,
entity_type='dataset',
object_type=dataset_type
-%}
{%- endif -%}
{%- endfor -%}

{%- if pages -%}
<input type="hidden" name="_ckan_phase" value="{{ active_page }}" />
{%- elif 'resource_fields' not in schema -%}
<!-- force controller to skip resource-editing step for this type -->
<input type="hidden" name="_ckan_phase" value="" />
{%- endif -%}

{% endblock %}

{% block metadata_fields %}
{% endblock %}

{% block save_button_text %}
{%- set pages = h.scheming_get_dataset_form_pages(dataset_type) -%}
{%- if pages and form_style == 'edit' -%}
{%- set active_page = data.get('_form_page', 1) | int -%}
{{ _('Update {page}').format(page=h.scheming_language_text(pages[active_page-1].title)) }}
{%- elif pages -%}
{{ _('Next') }}
{%- else -%}
{{ super() }}
{%- endif -%}
{% endblock %}

```