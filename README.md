Setup
=====

Project is built for [GitHub Pages](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll)
using `Jekyll` framework.

Install and Run
---------------

To install:
* Run `rvm use` (currently used Ruby version 2.7.2)
* Run `bundle install` (to install packages)

To launch run:
* `bundle exec jekyll serve --livereload` (to launch dev mode for local development)

Content
=======

Content is generally managed through `.json` files.

Text and Block Contents
-----------------------

Textual content is stored in `json` files in `_data` directory. General content of the pages is stored
in files with names starting with `page*`, e.g. `page_index.json` contains text for the Home page, etc.

Content of the specific blocks and sections of the site may be stored in corresponding files as well.

Most of content supports Markdown syntax.

SEO
---

SEO (title, description, keywords, og:title) managed via Front Matter variables at the top of each page.
Default values are stored in `_config.yml` (og:title falls back to page title if not set explicitly on the page).

It is possible to specify name of the thumbnail OpenGraph images (which may be displayed when sharing a link
on social media). These images should be stored in `/assets/images` directory and are referenced by Front Matter
variables `thumbnail` (Facebook requirements, default), `thumbnailVK` (for VK, optional),
`thumbnailTw` (for Twitter, optional).

Settings
--------

Additional global settings may be stored in `_config.yml`, e.g. settings for enabling/disabling some functionality
based on boolean flags.

Images
------

Images are stored in `/assets/images` directory. This includes images placed with `<img>` tag in HTML files as well
as images referenced as background in SCSS partials.

SVG assets that should be injected in HTML with `<use xlink:href=''>` tag (for additional styling options) are stored
in `svg-defs.html` partial.
