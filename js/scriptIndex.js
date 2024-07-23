window.onload = function() {

    let url = "http://local.console.brickmmo.com:7777/api/colours";

    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function(data) {
            console.log("API response:", data);
            let textOutput = data.colours.map(color => 
                `<div class="w3-container w3-col l2 m3 s6">
                    <a href="details.html?id=${color.id}" style="color: black!important;">
                        <div class="w3-card w3-border w3-round-large w3-hover-shadow" style="background-color: #${color.rgb}; width: 100%; height: 80px; margin: 0 auto"></div>
                        <p>${color.name}</p>
                        <p>RGB:${color.rgb}</p>
                    </a>
                </div>`
            ).join('');
            document.getElementById('mainBody').innerHTML = textOutput;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Error when calling API:", textStatus, errorThrown);
        }
    });
};

function searchColour(keyword) {
    keyword = keyword.toLowerCase();
    let colours = document.querySelectorAll('.w3-container.w3-col.l2.m3.s6');

    colours.forEach(colour => {
        let nameTag = colour.children[0].children[1].innerHTML.toLowerCase();
        let rgbTag = colour.children[0].children[2].innerHTML.toLowerCase();     
        
        if (nameTag.includes(keyword) || rgbTag.includes(keyword)) {
            colour.style.display = "block";
        } else {
            colour.style.display = "none";
        }
    });
}
