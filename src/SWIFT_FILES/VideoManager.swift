//
//  VideoManager.swift
//  Indenfor1Time
//
//  Created by AndreasK on 18/05/2018.
//  Copyright © 2018 AndreasK. All rights reserved.
//
import FirebaseStorage
class VideoManager {

    static let sharedInstance = VideoManager()

    func getLocationVideoUrl(_ locaurl : String, successHandler: @escaping (_ returnUrl: URL) -> Void, 
                                errorHandler: @escaping (_ error: String) -> Void) {
        
        if locaurl == "" {
            errorHandler("ingen videourl fundet")
        } else {
        let store = Storage.storage()
        var locationFirebaseUrl = "gs://within1hour-1483711039788.appspot.com/video/testAll/\(locaurl)"

        let index = locaurl.index(locaurl.endIndex, offsetBy: -4)
        let mySubstring = locaurl[index...]

        if mySubstring != ".mp4" {
            locationFirebaseUrl += ".m4v"
        }
        
        let locaReferenceUrl = store.reference(forURL: locationFirebaseUrl)
        
        locaReferenceUrl.downloadURL { url, error in
            if let error = error {
                errorHandler(error.localizedDescription)
            } else {
                if let url = url {
                    successHandler(url)
                } else {
                    errorHandler("Videourl kunne ikke findes")
                }
            }
        }
        }
    }
}
