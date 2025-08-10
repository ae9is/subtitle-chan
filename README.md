__*Update: You might not need this project anymore. Chrome now supports live captions, the settings are at: [chrome://settings/captions](chrome://settings/captions). You may also use the browser extension [Subtitle Anything](https://github.com/ae9is/subtitle-anything). This project still helps if you need to green screen your subtitles.__

# subtitle-chan

Forked from https://github.com/sayonari/jimakuChan (jimaku = subtitle) and rewritten for React + Vite + Typescript.

Records live speech from the browser and uses the web speech api to perform transcription, with optional translation via an external api.

## Requirements

* Any major browser other than Firefox
* Translation service and API key (see below)

## Usage

You can deploy this app on your own service, or just try it out at the live github pages here:
https://ae9is.github.io/subtitle-chan/

## Transcription

Transcription, i.e. creating subtitles from speech, should just work as is if your browser is supported. Make sure Javascript is enabled and the page is allowed to connect to your mic.

The web speech api including speech recognition is not currently supported on Firefox. Other major browsers should work. You'll need an internet connection on browsers that use web services to do the speech recognition.

See here for a browser compatibility chart: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API#api.speechrecognition

## Translation

Translation is handled via a Google App Script call to the Google Translate Language Service: https://developers.google.com/apps-script/reference/language

The browser script expects you to deploy this App Script yourself, and give it the api key to the App Script you've deployed yourself.

You need to deploy it yourself, as App Scripts are free but limited to 5000 translation api calls per day unless you're a Google Workspaces customer (in which case it's 20,000): https://developers.google.com/apps-script/guides/services/quotas

App Scripts don't require billing to be enabled on your Google account, so it should be easy not to rack up any unexpected charges. And if you exceed your quota, your calls should just fail for the rest of the day. But to be safe, make sure to never share an api key with anyone else. And if you accidentally do, please change your api key.

Follow the steps below, or see this setup video for [jimakuChan](https://github.com/sayonari/jimakuChan): https://www.youtube.com/watch?v=dQG6ZRxMeBU

### Steps:

1. Go to https://script.google.com/ and create a new project
1. Copy and paste (and save!) the following into the new project's script, overwriting the contents *[it's OK to use jimakuChan's doGet() instead here]*:
    ```js
    function doGet(e) {
      const params = e.parameter
      const text = params.text
      let translatedText = ''
      if (text) {
        translatedText = LanguageApp.translate(text, params.source, params.target);
      }
      const output = ContentService.createTextOutput();
      output.setMimeType(ContentService.MimeType.JSON);
      output.setContent(translatedText);
      return output;
    }

    function doPost(e) {
      const params = e.parameter
      const text = e.postData.contents
      let translatedText = ''
      if (text) {
        translatedText = LanguageApp.translate(text, params.source, params.target);
      }
      const output = ContentService.createTextOutput();
      output.setMimeType(ContentService.MimeType.JSON);
      output.setContent(translatedText);
      return output;
    }
    ```
1. Select Deploy &rarr; New Deployment
1. In the New Deployment dialogue, click the gear next to "Select type" and choose "Web app"
1. Fill in the following settings and then Deploy
    - Execute as: Me
    - Who has access: Everyone
1. Copy your deployment ID (api key) ** **DO NOT SHARE THIS** **

Now that you've deployed your own translation api, you can enter the api key into subtitle-chan for translations to work. Please only put your api key into a web page you trust, and don't share it.

If you run out of quota, you can:
- Upgrade to a paid Google Workspace account (your quota will increase from 5k &rarr; 20k calls per day)
- Try cycling api keys with another Google account

Keep in mind that service providers keep tabs on traffic and can sometimes block the more flagrant violations of their apis.

As an alternative to Google App Scripts, you can always use an unlimited paid translation api like Google Cloud Translate: https://cloud.google.com/translate/pricing

Just fork this project, rework the translation api endpoint in the script, and you should be good to go.
