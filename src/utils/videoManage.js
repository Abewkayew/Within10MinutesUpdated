import Firebase from './Firebase';

export default class videoManager{
    constructor(localurl) {
        this.localurl = localurl;
    }
    getLocationVideoUrl() {
        let final_url = {};
        let local_url = this.localurl;
        let locaReferenceUrl = "";
        if (local_url === undefined || local_url == "") {
            console.log("Video url is not provided");
        } else {
            const store = Firebase.storage();
            var locationFirebaseUrl = "gs://within1hour-1483711039788.appspot.com/video/testAll/" + local_url;

            // let index = locaurl.index(locaurl.endIndex, offsetBy: -4)
            let index = local_url.indexOf(local_url[local_url.length - 4]);
            let mySubstring = local_url.substr(index);

            if (mySubstring != ".mp4") {
                locationFirebaseUrl += ".m4v"
            }

            // let locaReferenceUrl = store.refFromURL(locationFirebaseUrl);
            
            locaReferenceUrl = store.refFromURL(locationFirebaseUrl);
            
            // Get the download URL
            locaReferenceUrl.getDownloadURL().then(function (url) {
                // Insert url into an <Video> tag to "download"
                final_url.push(url);
                // console.log("All URLS are: " + url);
            }).catch(function (error) {
                // console.log("Error: " + error);
            });

            // final_url = locaReferenceUrl;

         }


        return locaReferenceUrl;
    }

}