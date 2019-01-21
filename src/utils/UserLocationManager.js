import Firebase from './Firebase'
import videoManager from './videoManage';
export default class UserLocationManager {
    
    getAllDatabaseLocations() {
        ref = Firebase.database().ref("locations")
        let user_locations = [];
        let videourl = "";
        ref.on("value", function (snapshot) {
            snapshot.forEach(function (datas) {
                const data = datas.val();
                let location_vars = [];

                // console.log("Video from FIREBASE URL IS : " + data.videourl);
                vid_manage = new videoManager(data.videourl);
                vid_ref = vid_manage.getLocationVideoUrl();
                vid_ref.getDownloadURL().then(function (url) {
                    videourl = url;
                   
                }).catch(function (error) {
                    console.log("Error: " + error);
                });

                let Lokationer = {
                    lokation: lokation,
                    videoUrl: videourl,
                    region: region,
                    station: station,
                    type: type,
                    altitude: altitude,
                    longitude: longitude,
                    info: info,
                    infoEng: infoeng,
                    aabningstider: aabningstider,
                    openingshours: openinghours,
                    links: links
                };
                
                location_vars.push(Lokationer);

            });

            user_locations.push(location_vars);

        });
        
        return user_locations;
           
    }


}