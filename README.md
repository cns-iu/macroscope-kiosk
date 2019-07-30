# Macroscope Kiosk

[![Shipping faster with ZenHub](https://raw.githubusercontent.com/ZenHubIO/support/master/zenhub-badge.png)](https://app.zenhub.com/workspace/o/cns-iu/macroscope-kiosk)
[![Build Status](https://travis-ci.com/cns-iu/macroscope-kiosk.svg?branch=master)](https://travis-ci.com/cns-iu/macroscope-kiosk)
[![GitHub last commit](https://img.shields.io/github/last-commit/cns-iu/macroscope-kiosk/master.svg)](https://github.com/cns-iu/macroscope-kiosk/commits/master)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)
[![View Staging Site](https://img.shields.io/badge/staging-online-brightgreen.svg)](http://idemo.cns.iu.edu/macroscope-kiosk--staging/)
[![View Demo](https://img.shields.io/badge/demo-online-brightgreen.svg)](http://idemo.cns.iu.edu/macroscope-kiosk/)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=cns-iu_macroscope-kiosk&metric=alert_status)](https://sonarcloud.io/dashboard?id=cns-iu_macroscope-kiosk)
[![Documentation Status](https://cns-iu.github.io/macroscope-kiosk/images/coverage-badge-documentation.svg)](https://cns-iu.github.io/macroscope-kiosk/)

The macroscope kiosk is an application through which users can access macroscope tools from the *[Places & Spaces: Mapping Science](http://scimaps.org/)* exhibit.

## Instructions to Update Macroscope UI

### 1. Images

Using a screen-capture program such as Snag-It, take a shot of each website in the iteration. Take these images into Photoshop and size to 835px X 951px. On export, name the files the same (or similarly) to the macroscope name. 

Visual presentation of the images is important, so use a mock-up. Determine what image order is most pleasing visually. This may require making additional captures. Confirm mock-up with Lisel. Once she approves, upload the image files to /src/assets/macroscope-logos/iteration-#. If a folder does not already exist, create and commit one.

### 2. Content

All content is controlled by a single CSV file: /src/assets/data/macroscope-data.csv. Click on the pencil icon at the top right of the Github spreadsheet to edit. Copy the content to a text file. For ease, change the extension from TXT to CSV so that it opens in Excel, Calc, or other spreadsheet tool. Lisel will provide a document with all text content. Each macroscope will get one row and be added in the order they should appear on the site. Add:

- **id** (A short version of the macroscope name)
- **macroid** (This will be a number from 1-4 and represents the order they will appear from left to right in the UI)
- **title** (Provided in doc)
- **subtitle** (Provided in doc)
- **url*** (Provided in doc)
- **logo** (Name of the image file you created in Step 1)
- **type** (Most likely iframe)
- **descriptionTitle** (Provided in doc)
- **descriptionLong** (Provided in doc, this is the content for the More section)
- **descriptionShort** (Provided in doc, this is the teaser content above the More section)

For best results, take the text from the document Lisel provides and paste it into a text editor (Notepad, Brackets, VCode, etc). Do the following: 

- Replace quotes
- Add basic mark-up such as tags for paragraphs (p), bold (strong), italics (em).

When done adding mark-up, select and copy content to the CSV file. When done creating the four rows with their respective content, save the file and open it in a text editor. Copy and paste the updated content back into Github. Commit. Once committed, the build process is initiated. It takes about 6-10 minutes for the demo site to update. Check status of build at:

<https://travis-ci.com/cns-iu/macroscope-kiosk/>

When build completes, review results on Staging:

<http://idemo.cns.iu.edu/macroscope-kiosk--staging/>

Email Lisel with the url for staging.

## Demo site

<http://idemo.cns.iu.edu/macroscope-kiosk/>

## Change Log

See the [ChangeLog](CHANGELOG.md) for the latest developments.

## Credits

Macroscope Kiosk is developed at the [Cyberinfrastructure for Network Science Center at Indiana University](http://cns.iu.edu/)
