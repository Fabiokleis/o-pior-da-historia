// mobile nav bar

function nav_mobile(){
    let link = document.getElementsByClassName("m");
    let mob = document.getElementById("mobile");
    console.log(mob.style.dispay);
    if(mob.style.display == ""){
        mob.style.display = "block";
        
        for(let j of link){
            if(j.style.display == ""){
                j.style.display ="block";
            }
        }
    }else if(mob.style.display == "block"){
        mob.style.display = "";
    }
    
}
