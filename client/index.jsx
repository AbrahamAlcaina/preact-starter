import { render, h } from 'preact';
import './index.sass';
import App from './app';
import configureStore from './app/configureStore';
import localeData from './../language/messages/data.json';


/* eslint-disable */
// load intl
const language = (navigator.languages && navigator.languages[0]) ||
                     navigator.language ||
                     navigator.userLanguage;
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.en;

const dataStore = window.__INITIAL_STATE__;
const store = configureStore(dataStore);
let elem;
function init() {
  console.log(language,messages)
  elem = render(<App store={store} locale={languageWithoutRegionCode} messages={messages}/>, document.body, document.getElementById('root'));
  window.app = elem;
}

init();

if (process.env.NODE_ENV === 'production') {
	// cache all assets if browser supports serviceworker
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    navigator.serviceWorker.register('/service-worker.js');
  }

	// add Google Analytics
  (function (i, s, o, g, r, a, m) {
    i.GoogleAnalyticsObject = r; i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments);
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
	m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m);
  }(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga'));
  ga('create', 'UA-XXXXXXXX-X', 'auto');
  ga('send', 'pageview');
} else {
	// use preact's devtools
  require('preact/devtools');
	// listen for HMR
  if (module.hot) {
    module.hot.accept('./app', init);
  }
}
/* eslint-enable */
