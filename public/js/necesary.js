window.onscroll = function (){
    var scroll = document.documentElement.scrollTop || document.body.scrollTop;
    
    if(screen.width >= 900){
        if(scroll > 100){
            document.getElementById("navbar").style.background = "rgb(234, 198, 20)";
            document.getElementById("active").style.color = "#ffffff"
            document.getElementById("active").style.borderBottom = "0.1rem solid #ffffff";
        }else{
            document.getElementById("navbar").style.background = "transparent";
            document.getElementById("active").style.color = "rgb(234, 198, 20)";
            document.getElementById("active").style.borderBottom = "0.1rem solid rgb(234, 198, 20)";
        }
    }
    if(scroll > 400){
        document.getElementById("boxUp").style.right = "1rem";
    }else{
        document.getElementById("boxUp").style.right = "-3rem";
    }
}

function copy(elementSelector) {

    let element = document.querySelector(elementSelector);
    let temp = document.createElement('input');
    document.body.append(temp);
    temp.value = element.textContent;
    temp.select();
    document.execCommand('copy');
    temp.remove();

}

$(document).ready(function() {
    $('a[href^="#"]').click(function() {
      var destino = $(this.hash);
      if (destino.length == 0) {
        destino = $('a[name="' + this.hash.substr(1) + '"]');
      }
      if (destino.length == 0) {
        destino = $('html');
      }
      $('html, body').animate({ scrollTop: destino.offset().top }, 500);
      return false;
    });
});