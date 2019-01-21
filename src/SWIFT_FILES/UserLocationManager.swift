//
//  RealmObjects.swift
//  Indenfor1Time
//
//  Created by AndreasK on 10/05/2018.
//  Copyright © 2018 AndreasK. All rights reserved.
//

import SwiftyUserDefaults
import Firebase
final class Lokationer: Codable, DefaultsSerializable {
    
    init(lokation : String, videoUrl : String, region : String, station : String, type : String, altitude : String, 
    longitude : String, info : String, infoEng : String, aabningstider : String, openingshours : String, links : [Link]?) {
        self.lokation = lokation
        self.videoUrl = videoUrl
        self.region = region
        self.station = station
        self.type = type
        self.altitude = altitude
        self.longitude = longitude
        self.info = info
        self.infoEng = infoEng
        self.aabningstider = aabningstider
        self.openingshours = openingshours
        self.links = links
    }
    let lokation : String
    let videoUrl : String
    let region : String
    let station : String
    let type : String
    let altitude : String
    let longitude : String
    let info : String
    let infoEng : String
    let aabningstider : String
    let openingshours : String
    let links : [Link]?
    
}

private extension DefaultsKeys {
    static let userLocations = DefaultsKey<[Lokationer]?>("userLocations")
}

public class UserLocationsManager {
    static let sharedInstance = UserLocationsManager()
    private init() {}
    
    var userLocations: [Lokationer]? {
        get {
            return Defaults[.userLocations] ?? nil
        }
        set {
            Defaults[.userLocations] = newValue
        }
    }
    
    func getAllDatabaseLocations(successHandler: @escaping () -> Void, errorHandler: @escaping (_ error: String) -> Void) {
        let ref: DatabaseReference!
        ref = Database.database().reference()
        
        var locations = [Lokationer]()
        
        ref.child("locations").observeSingleEvent(of: .value, with: { snapshot in
            print(snapshot.childrenCount)
            
            for rest in snapshot.children.allObjects as! [DataSnapshot] {
                
                guard let loca = rest.value as? NSDictionary else {
                    errorHandler("getAllDatabaseLocations - error reading response")
                    return
                }
                
                if let lokation = loca["lokation"] as? String,
                    let altitude = loca["altitude"] as? String,
                    let longitude = loca["longitude"] as? String {
                    
                    let videourl = loca["videourl"] as? String ?? ""
                    let info = loca["info"] as? String ?? ""
                    let infoeng = loca["infoEng"] as? String ?? ""
                    let region = loca["region"] as? String ?? ""
                    let station = loca["station"] as? String ?? ""
                    let type = loca["type"] as? String ?? ""
                    let openingshours = loca["openingshours"] as? String ?? ""
                    let aabningstider = loca["aabningstider"] as? String ?? ""
                    
                    var links = [Link]()
                    if let linksa = loca["ny_links"] as? [NSDictionary] {
                        for i in linksa {
                            var link = Link()
                            for u in i {
                                if u.key as! String == "key" {
                                    link.linknavn = u.value as! String
                                } else if u.key as! String == "value" {
                                    link.linkurl = u.value as! String
                                }  else if u.key as! String == "english" {
                                    link.linkEnglish = u.value as! Bool
                                }   else if u.key as! String == "category" {
                                    link.category = u.value as! String
                                }
                            }
                            links.append(link)
                        }
                    }
 
                   locations.append(Lokationer(lokation: lokation, videoUrl: videourl, region: region, station: station, 
                   type: type, altitude: altitude, longitude: longitude, info: info, infoEng: infoeng, aabningstider: aabningstider,
                    openingshours: openingshours, links: links))
                    
                } else {
                    print(loca)
                }
            }
            
            self.userLocations = locations
            successHandler()
            
        })
    }
    
    func getLocationsFromRegion(_ region: String) -> [Lokationer]? {
        if let ul = userLocations {
            var omra = [Lokationer]()
            for i in ul {
                //TODO: Fuck.. de der regioners navne skal ordnse fra backend...
                if RegionManager.sharedInstance.returnRegionName(i.region) == region {
                    omra.append(i)
                }
            }
            return omra
        } else {
            return nil
        }
    }
}

