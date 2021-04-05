
let audio = document.getElementById("first");
let timer = document.getElementById("current-time");
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

async function prox_img(ola){
    let curr = document.getElementById("current_track");
    let card_curr = document.getElementById("playlist");
    let imag = document.getElementById("home");    
    let num = parseInt(ola.getAttribute("data-num"));
    let audio_ = document.getElementById("first");
    curr.children[0].innerHTML = card_curr.children[num].innerHTML;
    imag.setAttribute("src",thumbs_array[num]);    
    await read_tracks();
    audio_.setAttribute("src", tracks_array[num]);
}


async function write_cards(){
    if(thumbs_array.length < 19 && titles_array.length < 19){
        await read_thumbs();
        await read_titles();
    }
    if(playlist.innerHTML.length < 5684){
        for(k = 0; k < thumbs_array.length; k++){
            playlist.innerHTML += "<div class='card' onclick='prox_img(this)'></div>";
            playlist.children[k].setAttribute("data-num", k);
            playlist.children[k].innerHTML += "<img class='icon'>";
            playlist.children[k].innerHTML += "<p class='title'>"+titles_array[k]+"</p>";
        }
        let j;
        for(j = 0; j < thumbs_array.length; j++){
        playlist.children[j].firstChild.setAttribute("src",thumbs_array[j]);
        }
    }
}

write_cards();
