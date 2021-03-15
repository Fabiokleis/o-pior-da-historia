var img_array = ["./img/3ep.png","./img/4ep.png","./img/5ep.png","./img/9ep.png","./img/14ep.png","./img/16ep.png","./img/17ep.png"];


// mobile nav bar
function nav_mobile(flp){
    let link = document.getElementsByClassName("m");
    let mob = document.getElementById("mobile");
    let nav = document.getElementsByTagName("nav")[0];
    let cont = document.getElementById("container");

    if(mob.style.display == ""){
        mob.style.display = "block";
        flp.src = "../img/menu_mobile_flipped.png";
        flp.style.height = "36px";
        flp.style.width = "46px";
        flp.style.marginRight ="-5px";
        nav.style.borderBottom = "solid 5px rgb(47, 33, 126)";
        cont.style.marginTop = "150px";
        for(let j of link){
            if(j.style.display == ""){
                j.style.display ="block";
            }
        }
    }else if(mob.style.display == "block"){
        mob.style.display = "";
        nav.style.borderBottom = "none";
        flp.src = "../img/menu_mobile.png"
        flp.style.height = "44px";
        flp.style.width = "40px";
        flp.style.marginRight ="0";
        cont.style.marginTop = "40px";
    }
    
}
function pause_audio(){
    let player = document.getElementById("player");
    let audio_ = document.getElementById("first");

    if(audio_.paused == true){
        player.setAttribute("src", "./img/pause.png");
        audio_.play();
    }else{
        player.setAttribute("src", "./img/play.png");
        audio_.pause();
    }
}
function mute_audio(){
    let audio_ = document.getElementById("first");
    let vol = document.getElementById("vol");
    let ip = document.getElementById("volume-control");
    if(audio_.muted == false){
    
        vol.setAttribute("src", "./img/mutado.png");
        audio_.muted = true;
        vol.style.width ="53px";
        vol.style.height ="30px"
        ip.value = 0;
        
    }else{
        vol.setAttribute("src", "./img/som.png");
        vol.style.width ="28px";
        vol.style.height ="28px"
        ip.value = 50;
        audio_.muted = false;
    }
}

function remove_slider(){
    let vol = document.getElementById("volume-control");
    vol.style.display = "none";
    slider_.textContent = "";
}
function thisVolume(volume_value) { 
    let audio_ = document.getElementById("first");
    document.getElementById("volume-control").innerHTML=volume_value; 
    audio_.volume = volume_value / 100; 
}

function prox_img(ola){
    let imag = document.getElementById("home");    
    if(!ola.dataset.num){
        ola.setAttribute("data-num",1);
        imag.setAttribute("src",img_array[1]);    
    }else{
        let a = imag.getAttribute("src");
        
        if(a != img_array[img_array.length-1]){
            let pp = parseInt(ola.dataset.num);
            console.log(img_array[pp]);
            pp++;
            ola.dataset.num = pp;
            imag.setAttribute("src",img_array[parseInt(ola.dataset.num)]);   
        }
    }
}
function ant_img(){
    let imag = document.getElementById("home");    
    let ola = document.getElementById("prox");
    let a = imag.getAttribute("src");
    console.log(img_array[0]);
    console.log(a);
    if(a != img_array[0]){
        let pp = parseInt(ola.dataset.num);
        pp--;
        ola.dataset.num = pp;
        
        imag.setAttribute("src",img_array[parseInt(ola.dataset.num)]);       
    }
}

let playlist = document.getElementById("playlist");
for(k = 0; k <= img_array.length; k++){
    playlist.innerHTML += "<div class='card'></div>";
    playlist.children[k].innerHTML += "<img class='icon'><p class='text'>ola mundo</p>";
}
let j;
for(j = 0; j < img_array.length; j++){
    console.log(playlist.children[j].firstChild.setAttribute("src",img_array[j]));
}