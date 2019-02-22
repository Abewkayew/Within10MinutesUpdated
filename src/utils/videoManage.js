import Firebase from './Firebase';

export default class videoManager{
    constructor(localurl) {
        this.localurl = localurl;
    }
    async getLocationVideoUrl() {
        let final_url = [] ;
        let local_url = this.localurl;
        let locaReferenceUrl = "";
        if (local_url === undefined || local_url == "") {
            console.log("Video url is not provided");
        } else {
            const store = Firebase.storage();
            var locationFirebaseUrl = "gs://within1hour-1483711039788.appspot.com/video/testAll/" + local_url;

            let index = local_url.indexOf(local_url[local_url.length - 4]);
            let mySubstring = local_url.substr(index);

            if (mySubstring != ".mp4") {
                locationFirebaseUrl += ".m4v"
            }

            
            locaReferenceUrl = store.refFromURL(locationFirebaseUrl);
            

            var loc_vid_url = await locaReferenceUrl.getDownloadURL().then(function (url) {
                // Insert url into an <Video> tag to "download"
                final_url = url;
                // console.log("All URLS are: " + url);
               return final_url; 
            });    





            // Get the download URL
            // return new Promise(resolve => {
            //     locaReferenceUrl.getDownloadURL().then(function (url) {
            //         // Insert url into an <Video> tag to "download"
            //         final_url = url;
            //         // console.log("All URLS are: " + url);
            //        resolve(final_url); 
            //     }).catch(function (error) {
            //         // console.log("Error: " + error);
            //     });
            // });
            

            
         }
        return loc_vid_url;
        
    }
    
}