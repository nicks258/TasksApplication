//global file to set all hardcoded and baseURL

//API key
var apiKey: "d5dfa3b048f5962fb8ff5b831cc851f18ebcf3b4";
export var global = {
  apiKey: "d5dfa3b048f5962fb8ff5b831cc851f18ebcf3b4",
  BaseURL : "http://idreambooks.com/api/publications/",
  myvar : 'myvar 01',
  // function to return complete baseURL according to type and genre user selected..
  getUrl : function(type,genre) {
    return this.BaseURL + type + ".json?key=" + this.apiKey + "&slug=" + genre;
  },

  //setting base URL to be use in every file
  setBaseURL : function (URL) {
    this.BaseURL =  URL ;
  }
};
