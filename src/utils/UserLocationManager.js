import Firebase from './Firebase'
import videoManager from './videoManage';

 async function getAllDatabaseLocations() {
        var ref = Firebase.database().ref("locations");
        // var firebaseValue = ref.on('value');
        var user_locations = [];
        await ref.on('value', snapshot => {
                snapshot.forEach((datas) => {
                    const data = datas.val();
                    // user_locations.push(data);
                    // console.log("Video from FIREBASE URL IS : " + data.videourl);
                    vid_manage = new videoManager(data.videourl);
                    var lokation = data.lokation;
                    var videourl = data.videourl;
                    var region = data.region;
                    var station = data.station;
                    var type = data.type;
                    var altitude = data.altitude;
                    var longitude = data.longitude;
                    var info = data.info;
                    var infoeng = data.infoEng;
                    var aabningstider = data.aabningstider;
                    var openinghours = data.openinghours;
                    var links = data.links;
    
                    var Lokationer = {
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
                   user_locations.push(Lokationer);
                //    console.log("INSIDE LOCATIONS RE: ", user_locations);
                  });
                // resolve(user_locations);
                  
                //    console.log("OUTSIDE LOCATIONS ARE: ", user_locations);
                // reject(new Error('Can not get location...'));   
          
        // setTimeout(() => resolve(user_locations), 4000)    
               
    });  

  }

// getAllDatabaseLocations().then(data =>{
//     console.log("DATABASES ARE: ", data);
// });

async function getData(){
    let userLocation = await getAllDatabaseLocations();
    // console.log("FINALLY DATAS ARE: ", userLocation);
    return userLocation;
}

// (async () => {
//     await getAllDatabaseLocations();
// })();

                // getData()
                //       .then(data=>{
                //            console.log("Success data is: ", data); 
                //       }).
                //       catch(error=>{
                //           console.log("The error is: " + error);
                //       });
    
    

export default getData;