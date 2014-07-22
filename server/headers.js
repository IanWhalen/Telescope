var rootUrl = __meteor_runtime_config__.ROOT_URL;

BrowserPolicy.content.disallowInlineScripts();
BrowserPolicy.content.disallowConnect();

BrowserPolicy.content.allowConnectOrigin(rootUrl);
BrowserPolicy.content.allowConnectOrigin(rootUrl.replace('http', 'ws'));

BrowserPolicy.content.allowScriptOrigin("*.yahooapis.com");
BrowserPolicy.content.allowScriptOrigin("*.google-analytics.com");
BrowserPolicy.content.allowImageOrigin("*.google-analytics.com");
BrowserPolicy.content.allowImageOrigin("*.gravatar.com");
BrowserPolicy.content.allowFontDataUrl();
