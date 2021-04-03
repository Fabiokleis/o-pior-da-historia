
let audio = document.getElementById("first");
let timer = document.getElementById("current-time");
let slider = document.getElementById("seek-slider");
let max_time = document.getElementById("max_time");
let playlist = document.getElementById("playlist");

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


async function prox_img(ola){
    let curr = document.getElementById("current_track");
    let card_curr = document.getElementById("playlist");
    let imag = document.getElementById("home");    
    let num = parseInt(ola.getAttribute("data-num"));
    let audio_ = document.getElementById("first");
    let player = document.getElementById("player");
    curr.children[0].innerHTML = card_curr.children[num].innerHTML;
    slider.value = 0;
    player.setAttribute("src", "./control/play.png");
    imag.setAttribute("src",thumbs_array[num]);    
    await read_tracks();
    audio_.setAttribute("src", tracks_array[num]);
}


async function write_cards(){
    await read_thumbs();
    if(playlist){
        for(k = 0; k < thumbs_array.length; k++){
            playlist.innerHTML += "<div class='card' onclick='prox_img(this)'></div>";
            playlist.children[k].setAttribute("data-num", k);
            playlist.children[k].innerHTML += "<img class='icon'><p class='text'></p>";
            playlist.children[k].innerHTML += "<p class='title'>Episode title</p>";
        }
        let j;
        for(j = 0; j < thumbs_array.length; j++){
        playlist.children[j].firstChild.setAttribute("src",thumbs_array[j]);
        }
    }
}

write_cards();

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

