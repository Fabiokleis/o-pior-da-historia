var firebaseConfig = {
    apiKey: "AIzaSyARBaeGyZEWo41g-9tRPgqrsZJ-_le-QlE",
    authDomain: "o-pior-da-historia.firebaseapp.com",
    databaseURL: "https://o-pior-da-historia-default-rtdb.firebaseio.com",
    projectId: "o-pior-da-historia",
    storageBucket: "o-pior-da-historia.appspot.com",
    messagingSenderId: "77619770765",
    appId: "1:77619770765:web:567a2277aac48aef3679c4",
    measurementId: "G-VJSH1ZWVMC"
};
firebase.initializeApp(firebaseConfig);


const data = firebase.storage();

const thumbs_list = data.ref("/thumbs/");
const tracks_list = data.ref("/tracks/");
const thumbs_array = [];
const tracks_array = [];

function read_thumbs() {
    return new Promise((reso, rej) => {
        thumbs_list.listAll().then(res => {
                res.items.forEach(urls => {
                    
                    urls.getDownloadURL().then(url => {
                        thumbs_array.push(url);

                        if(thumbs_array.length === 19){
                            thumbs_array.sort();
                            reso();
                        }
                    }).catch(err => {
                        console.log(err);
                        document.write("Houve um erro!");
                        rej();
                    });
                });
            }).catch(err => { console.log(err); document.write("Houve um erro inesperado!");});
    })
}
function read_tracks() {
    
    return new Promise((reso, rej) => {
        tracks_list.listAll().then(res => {
                res.items.forEach(urls => {
                    
                    urls.getDownloadURL().then(url => {
                        if(tracks_array.length < 19){
                            tracks_array.push(url);
                        }

                        if(tracks_array.length === 19){
                            tracks_array.sort();
                            reso();
                        }
                    }).catch(err => {
                        console.log(err);
                        document.write("Houve um erro inesperado!");
                        rej();
                    });
                });
            }).catch(err => { console.log(err); document.write("Houve um erro!");});
    })
}
