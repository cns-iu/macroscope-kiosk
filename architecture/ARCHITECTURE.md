## Architecture Overview

![architecture diagram](../architecture/arch.jpg)

#### Detailed description
- The home screen contains a carousel that slides  multiple macroscope images. Clicking on any carousel item fires up an iframe or a video element depending on the type of URL read by the csv reader.
- The contents of the carousel is provided by a csv file, which is read by a csv reader service.
- The iframe or the video tag opens up the contents of the macroscope url.
- The screen saver is rendered when the app detects that the user has been idle for 7 minutes, the textual content of the screen saver is read from the csv and a video is played in the background. The app uses an idle detector service
- The modals are generic components, the content of each model is fetched from the csv file.