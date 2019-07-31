# How to add new macroscopes

## 1. Images

Using a screen-capture program such as Snag-It, take a shot of each website in the iteration. Take these images into Photoshop and size to 835px X 951px. On export, name the files the same (or similarly) to the macroscope name. 

Visual presentation of the images is important, so use a mock-up. Determine what image order is most pleasing visually. This may require making additional captures. Confirm mock-up with Lisel. Once she approves, upload the image files to /src/assets/macroscope-logos/iteration-#. If a folder does not already exist, create and commit one.

## 2. Content

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
