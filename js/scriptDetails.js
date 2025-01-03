window.onload = function() {

    const proper = [];
    proper['lego'] = 'LEGO';
    proper['ldraw'] = 'LDraw';
    proper['peeron'] = 'Peeron';
    proper['bricklink'] = 'BrickLink'
    proper['brickowl'] = 'BrickOwl';

    const urlParams = new URLSearchParams(window.location.search);

    const id = urlParams.get('id');

    let url = `https://api.brickmmo.com/colours/details/${id}`;

    let h1 = document.getElementById("h1_colour")
    let color_div = document.getElementById("color_div")
    let name = document.getElementById("name")
    let rgb = document.getElementById("rgb")
    let is_trans = document.getElementById("is_trans")
    let rebrickable_id = document.getElementById("rebrickable_id")
    let externals = document.getElementById("externals")

    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function(data) {
            console.log("API response:", data);
            h1.innerHTML = `Colour: ${data.colours.name}`;
            color_div.style.backgroundColor = `#${data.colours.rgb}`
            name.innerHTML = `<strong>Name: </strong>${data.colours.name}`;
            rgb.innerHTML = `<strong>RGB: </strong>${data.colours.rgb}`;
            is_trans.innerHTML = `<strong>Is Translucent?: </strong>${uppercaseFirst(data.colours.is_trans)}`;
            rebrickable_id.innerHTML = `<strong>Rebrickable ID: </strong>${data.colours.rebrickable_id}`;

            if(data.colours.external_ids){
                let textExternals = data.colours.external_ids.map(colorExternal => 
                    `<li>
                        <p><strong>${proper[colorExternal.source]} </strong>→ ${colorExternal.name}</p>
                    </li>`
                ).join('');
    
                externals.innerHTML = textExternals;
            } else{
                document.getElementById("externals_section").style.display = "none"
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Error when calling API:", textStatus, errorThrown);
        }
    });
};

function uppercaseFirst(source){
    return source.charAt(0).toUpperCase() + source.slice(1);
}

