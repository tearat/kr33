var color = 0;

$("h1").on("click", function () {
    if (color<3) {
        color += 1;
    } else {
        color = 0;
    }

    switch (color) {
        case 0:
            $("h1").css("color", "orangered");
            $("textarea").css("border-color", "orangered");
            break
            
        case 1:
            $("h1").css("color", "limegreen");
            $("textarea").css("border-color", "limegreen");
            break

        case 2:
            $("h1").css("color", "gold");
            $("textarea").css("border-color", "gold");
            break
            
        case 3:
            $("h1").css("color", "skyblue");
            $("textarea").css("border-color", "skyblue");
            break
            
        default:
            break
    }
});
