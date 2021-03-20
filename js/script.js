var img_array = ["./thumbs/1ep.jpg","./thumbs/2ep.jpg","./thumbs/3ep.jpg","./thumbs/4ep.jpg","./thumbs/5ep.jpg","./thumbs/6ep.jpg","./thumbs/7ep.jpg","./thumbs/8ep.jpg","./thumbs/9ep.jpg","./thumbs/10ep.jpg","./thumbs/11ep.jpg","./thumbs/12ep.jpg","./thumbs/13ep.jpg","./thumbs/14ep.jpg","./thumbs/15ep.jpg","./thumbs/16ep.jpg","./thumbs/17ep.jpg","./thumbs/18ep.jpg","./thumbs/19ep.jpg"];
var track_array = ["./tracks/1ep.mp3","./tracks/2ep.mp3","./tracks/3ep.mp3","./tracks/4ep.mp3","./tracks/5ep.mp3","./tracks/6ep.mp3", "./tracks/7ep.mp3","./tracks/8ep.mp3","./tracks/9ep.mp3","./tracks/10ep.mp3","./tracks/11ep.mp3","./tracks/12ep.mp3","./tracks/13ep.mp3","./tracks/14ep.mp3","./tracks/15ep.mp3","./tracks/16ep.mp3","./tracks/17ep.mp3","./tracks/18ep.mp3","./tracks/19ep.mp3"];

let audio = document.getElementById("first");
let timer = document.getElementById("current-time");
let slider = document.getElementById("seek-slider");
let max_time = document.getElementById("max_time");

// mobile nav bar
function nav_mobile(flp){
    let link = document.getElementsByClassName("m");
    let mob = document.getElementById("mobile");
    let nav = document.getElementsByTagName("nav")[0];
    let cont = document.getElementById("container");
    let cont2 = document.getElementsByClassName("container");
    if(mob.style.display == ""){
        mob.style.display = "flex";
        mob.style.flexFlow = "column";
        flp.src = "../img/menu_mobile_flipped.png";
        flp.style.height = "36px";
        flp.style.width = "46px";
        flp.style.marginRight ="-5px";
        nav.style.borderBottom = "solid 5px rgb(47, 33, 126)";
        if(cont){
            
            cont.style.marginTop = "150px";
        
        }
        if(cont2[0]){
            cont2[0].style.marginTop = "150px";
        }
        for(let j of link){
            if(j.style.display == ""){
                j.style.display ="flex";
            }
        }
    }else if(mob.style.display == "flex"){
        mob.style.display = "";
        nav.style.borderBottom = "none";
        flp.src = "../img/menu_mobile.png"
        flp.style.height = "44px";
        flp.style.width = "40px";
        flp.style.marginRight ="0";
        if(cont){
            cont.style.marginTop = "40px";
        }
        
        if(cont2[0]){
            cont2[0].style.marginTop = "40px";
        }
    }
    
}
function pause_audio(){
    let player = document.getElementById("player");
    let audio_ = document.getElementById("first");

    if(audio_.paused == true){
        player.setAttribute("src", "./control/pause.png");
        requestAnimationFrame(whilePlaying);
        audio_.play();
    }else{
        player.setAttribute("src", "./control/play.png");
        cancelAnimationFrame(rAF);
        audio_.pause();
    }
}
function mute_audio(){
    let audio_ = document.getElementById("first");
    let vol = document.getElementById("vol");
    let ip = document.getElementById("volume-control");
    if(audio_.muted == false){
    
        vol.setAttribute("src", "./control/mutado.png");
        audio_.muted = true;
        ip.value = 0;
        
    }else{
        vol.setAttribute("src", "./control/som.png");
        
        ip.value = 50;
        audio_.muted = false;
    }
}


function thisVolume(volume_value) { 
    let vol = document.getElementById("vol");
    let audio_ = document.getElementById("first");
    document.getElementById("volume-control").innerHTML=volume_value; 

    audio_.volume = volume_value / 100;
    if(audio_.volume == 0){
        vol.setAttribute("src", "./control/mutado.png");
        
    }else{
        vol.setAttribute("src", "./control/som.png");
        
    }
}

let date = new Date();
let today = date.getDate();
let mouth = date.getDay();
let year = date.getFullYear();
let current_date = `${today} ${mouth} ${year}`;
let current_time = calculate_time(Math.floor(audio.duration));
function prox_img(ola){
    let curr = document.getElementById("current_track");
    let card_curr = document.getElementById("playlist");
    let imag = document.getElementById("home");    
    let num = parseInt(ola.getAttribute("data-num"));
    let audio_ = document.getElementById("first");
    let player = document.getElementById("player");
    curr.children[0].innerHTML = card_curr.children[num].innerHTML;
    slider.value = 0;
    player.setAttribute("src", "./control/play.png");
    
    audio_.setAttribute("src", track_array[num]);
    imag.setAttribute("src",img_array[num]);    
}
let playlist = document.getElementById("playlist");
if(playlist){

    for(k = 0; k < img_array.length; k++){
        playlist.innerHTML += "<div class='card' onclick='prox_img(this)'></div>";
        playlist.children[k].setAttribute("data-num", k);
        playlist.children[k].innerHTML += "<img class='icon'><p class='text'>"+current_date+"</p>";
        playlist.children[k].innerHTML += "<p class='title'>Episode title</p>";
    }
    let j;
    for(j = 0; j < img_array.length; j++){
        console.log(playlist.children[j].firstChild.setAttribute("src",img_array[j]));
    }
}


// audio input sync
if(audio){
audio.addEventListener("loadedmetadata", () => {

    max_time.innerText = calculate_time(audio.duration);
    setSliderMax();

});
}
function calculate_time(sec){
    let minut = Math.floor(sec/60);
    let second = Math.floor(sec%60);
    let returnedSecs = second < 10 ? `0${second}` : `${second}`
    return `${minut}:${returnedSecs}`
}
function setSliderMax(){
    slider.max = Math.floor(audio.duration);
}

if(slider){
    slider.addEventListener('input', () => {
        timer.innerText = calculate_time(slider.value);
        
        if(!audio.paused){
            cancelAnimationFrame(rAF);
        }
    });
    

    slider.addEventListener('change', () => {
        audio.currentTime = slider.value;
        if(!audio.paused){
            requestAnimationFrame(whilePlaying)
        }
    });

    slider.addEventListener('timeupdate',() => {
        slider.value = Math.floor(audio.currentTime);
    });
}
let rAF = null;
const whilePlaying = () => {
    slider.value = Math.floor(audio.currentTime);
    timer.innerText = calculate_time(slider.value);
    timer.style.setProperty('--seek-before-width', `${slider.value/slider.max*100}%`);
    rAF = requestAnimationFrame(whilePlaying);
}

