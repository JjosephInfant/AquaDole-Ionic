/**
 * Copyright (c) 2019
 *
 * Store the application data that needs to be saved and retrived. 
 * Use setAquaAppStorage() to store the data as JSON (prefered) with a key.
 * Use getAquaAppStorage() to retrive the stored data using the designated key.
 *
 * @summary Store data in native storage
 * @author Joseph Soosai <infantjoseph@gmail.com>
 *
 * Created at     : 2019-01-23 12:32:46 
 */

import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class AquaStorage {

    constructor(private storage: Storage) {

    }

    /**
     * 
     *  Store the data in Application level.
     *  Sample - storage.set('name', 'Max');
     * 
     */
    setAquaAppStorage(key, value) {
        this.storage.set(key, value).then(
            () => console.log('Stored item!'),
            error => console.error('Error storing item', error)
        );
    }

    /**
     * 
     *  Retrives the data in Application level.
     *  Sample - storage.get('age');
     * 
     */
    getAquaAppStorage(key) {

        return this.storage.get(key).then((data) => {
            return data;
        }).catch(error => {
            console.error("Error in retriving data  -->  " + error)
        });
    }
}