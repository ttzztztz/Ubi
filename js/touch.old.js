let jtouch_inside = document.getElementById("inside_ul");
let jtouch_inside_first = document.querySelector("li[data-opt='inside'][data-rank='0']");
let jtouch_inside_last = document.querySelector("li[data-opt='inside'][data-rank='3']");
let jtouch_inside_container = document.getElementById("inside_container");
const touch_inside_translate=[50,0,-50,-100];
let touch_now_hit = 1;
let touch_startX=0,touch_moveX=0,touch_endX=0,touch_transform=0;
function decidePicture(_touch_transform){
    let hit = touch_now_hit;
    if(Math.abs(_touch_transform) > 5){
        if(_touch_transform >0) {
            if (_touch_transform >=100) hit -= 3;
            else if (_touch_transform >= 50) hit -= 2;
            else if (_touch_transform >= 5) hit -= 1;
        }
        if(_touch_transform < 0){
            if (_touch_transform <= -100) hit =parseInt(hit) + 3;
            else if (_touch_transform <= -50) hit =parseInt(hit) + 2;
            else if (_touch_transform <= -5) hit = parseInt(hit) + 1;
        }
        if(hit>=touch_inside_translate.length) hit = hit - touch_inside_translate.length;
        if(hit< 0) hit = parseInt(hit) + parseInt(touch_inside_translate.length);
        if(touch_now_hit != hit){
            let old_element = document.querySelector("li[data-opt='inside'][data-rank='"+touch_now_hit+"']");
            let new_element = document.querySelector("li[data-opt='inside'][data-rank='"+hit+"']");
            old_element.children[0].classList.remove("inside_item_active");
            new_element.children[0].classList.add("inside_item_active");
        }
        touch_now_hit = hit;
    }
    touch_transform = touch_inside_translate[hit];
    if(touch_transform>=25){
        jtouch_inside_first.style.left = "0vw";
        jtouch_inside_last.style.left = "-50vw";
    } else if(touch_transform <= -75){
        jtouch_inside_first.style.left = "200vw";
        jtouch_inside_last.style.left = "150vw";
    } else {
        jtouch_inside_first.style.left = "0vw";
        jtouch_inside_last.style.left = "150vw";
    }
    jtouch_inside.style.transform = "translateX("+ touch_inside_translate[hit] +"vw)";
    jtouch_inside.classList.add("inside_transition");

}
function touch_px_to_vw(px){
    let avail_width = window.innerWidth;
    return px / avail_width * 100.0;
}
function touch_start(event){
    let touch = event.touches[0];
    touch_startX = touch.clientX;
    touch_endX = touch.clientX;
    jtouch_inside.classList.remove("inside_transition");
}
function touch_move(event) {
    let touch = event.touches[0];
    touch_endX = touch.clientX;

    let _pos = parseInt(touch_transform) + touch_px_to_vw((touch_startX - touch_endX) * -1.0);
    if(_pos>=25){
        if(_pos>=75){
            _pos = _pos - 200;
            touch_transform = _pos;
        }
        jtouch_inside_first.style.left = "0vw";
        jtouch_inside_last.style.left = "-50vw";
    } else if(_pos <= -75){
        if(_pos <= -125){
             _pos = parseInt(_pos) + 200;
             touch_transform = _pos;
        }
        jtouch_inside_first.style.left = "200vw";
        jtouch_inside_last.style.left = "150vw";

    } else {
        jtouch_inside_first.style.left = "0vw";
        jtouch_inside_last.style.left = "150vw";
    }
    jtouch_inside.style.transform = "translate3d(" + _pos + "vw,0px,0px)";
}
function touch_end(event){
    touch_moveX = touch_startX - touch_endX;
    let add = touch_px_to_vw(touch_moveX * -1.0) ;
    decidePicture(add);
}
jtouch_inside_container.addEventListener('touchstart',touch_start,false);
jtouch_inside_container.addEventListener('touchmove',touch_move,false);
jtouch_inside_container.addEventListener('touchend',touch_end,false);