window.onload = function() {

    let url = "http://local.console.brickmmo.com:7777/api/colours";

    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function(data) {
            console.log("API colours response:", data);
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

    const regexHex = /^([0-9A-F]{3}|[0-9A-F]{6})$/i;
    let notMatch = document.getElementById('notMatch');
    let matchColours = document.getElementById('matchColours');

    if(!checkPalette(keyword)){
        if(regexHex.test(keyword)){
            notMatch.innerHTML = 
            `<h2>Sorry, the colour <strong>${keyword}</strong> is not in our Database</h2>
             <div class="w3-container w3-center">
                <div class="w3-card w3-border w3-round-large" style="background-color: #${keyword}; width: 50%; max-width: 450px; height: 80px; margin: 0 auto"></div>
             </div>
            <h3>The closest colours are:</h3>`;
            matchColour(keyword)
        } else{
            notMatch.innerHTML = 
            `<h2>Sorry, the colour <strong>${keyword}</strong> is not a valid colour</h2>
            <h3>Please provide a valid pattern of <strong>Six-digit format (e.g. FF5B00)</strong> or <strong>Three-digit format (e.g. F50)</strong></h3>`;
            matchColours.innerHTML = "";
        }
    } else {
        notMatch.innerHTML = "";
        matchColours.innerHTML = "";
    }
    
}

function checkPalette(keyword) {
    keyword = keyword.toLowerCase();
    let colours = document.querySelectorAll('.w3-container.w3-col.l2.m3.s6');

    for (let i = 0; i < colours.length; i++) {
        let nameTag = colours[i].children[0].children[1].innerHTML.toLowerCase();
        let rgbTag = colours[i].children[0].children[2].innerHTML.toLowerCase();     
        
        if (nameTag.includes(keyword) || rgbTag.includes(keyword)) {
            return true;
        }
    }

    return false;
}

function matchColour(keyword){

    let url = `http://local.console.brickmmo.com:7777/api/colours/match/${keyword}`;

    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function(data) {
            console.log("API colours match response:", data);
            let textOutput = data.colours.map(color => 
                `<div class="w3-container w3-col l3 m3 s6">
                    <a href="details.html?id=${color.id}" style="color: black!important;">
                        <div class="w3-card w3-border w3-round-large w3-hover-shadow" style="background-color: #${color.rgb}; width: 100%; height: 80px; margin: 0 auto"></div>
                        <p>${color.name}</p>
                        <p>RGB:${color.rgb}</p>
                    </a>
                </div>`
            ).join('');
            document.getElementById('matchColours').innerHTML = textOutput;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Error when calling API:", textStatus, errorThrown);
        }
    });

}