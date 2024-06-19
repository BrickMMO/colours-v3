window.onload = function () {
    var main = document.getElementById("mainBody");

    var url = "https://rebrickable.com/api/v3/lego/colors/";

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.responseType = "json";
    xhr.send(null);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data = xhr.response.results;
                console.log(data);
                data.forEach((color) => {
                    // Create and configure the color card element
                    var colorDiv = document.createElement("div");
                    colorDiv.className = "w3-padding-large w3-cell w3-quarter";
                    colorDiv.innerHTML = `
                        <div class="w3-card-4 w3-round-xlarge">
                            <div class="w3-padding-64" style="background-color: #${color.rgb};">
                            </div>
                            <div class="w3-padding-large w3-monospace">
                                <p><strong>RGB: </strong>${color.rgb}</p>
                                <p><strong>Color: </strong>${color.name}</p>
                                <div class="w3-right-align">
                                    <strong><a href="#" class="more-link w3-text-pink">More</a></strong>
                                </div>
                            </div>
                        </div>
                    `;
                    main.appendChild(colorDiv);
                });

                // Add event listeners to all 'More' links
                var moreLinks = document.querySelectorAll('.more-link');
                moreLinks.forEach((link, idx) => {
                    link.addEventListener('click', (event) => {
                        event.preventDefault(); // Prevent the default anchor behavior

                        // Extract the BrickLink name
                        var brickLinkName = (data[idx].external_ids.BrickLink && data[idx].external_ids.BrickLink.ext_descrs[0]) || "N/A";
                        var brickOwlName = (data[idx].external_ids.BrickOwl && data[idx].external_ids.BrickOwl.ext_descrs[0]) || "N/A";
                        var legoName = (data[idx].external_ids.LEGO && data[idx].external_ids.LEGO.ext_descrs[0]) || "N/A";
                        var peeronName = (data[idx].external_ids.Peeron && data[idx].external_ids.Peeron.ext_descrs[0]) || "N/A";
                        var lDrawName = (data[idx].external_ids.LDraw && data[idx].external_ids.LDraw.ext_descrs[0]) || "N/A";

                        // Create and style the details div
                        var detailsDiv = document.createElement("div");
                        detailsDiv.className = "w3-modal";
                        detailsDiv.style.display = "block";
                        detailsDiv.style.position = "fixed";
                        detailsDiv.innerHTML = `
                            <div class="w3-card-4 w3-round-xlarge w3-display-middle w3-modal-content" style="display: flex; flex-direction: row;">
                            
                                <div style="background-color: #${data[idx].rgb}; flex:1;">
                                </div>
                                <div class="w3-padding-64 w3-padding-large w3-monospace w3-large" style="flex: 1;">
                                    <div class="w3-display-topright w3-pink">
                                        <button class="w3-button close-button">Close</button>
                                    </div>
                                    <p><strong>RGB: </strong><span>${data[idx].rgb}</span></p>
                                    <p><strong>Color name: </strong><span>${data[idx].name}</span></p>
                                    <p><strong>BrickLink: </strong><span>${brickLinkName}</span></p>
                                    <p><strong>BrickOwl: </strong><span>${brickOwlName}</span></p>
                                    <p><strong>LEGO: </strong><span>${legoName}</span></p>
                                    <p><strong>Peeron: </strong><span>${peeronName}</span></p>
                                    <p><strong>LDraw: </strong><span>${lDrawName}</span></p>
                                </div>
                            </div>
                        `;

                        // Append the details div to the body
                        document.body.appendChild(detailsDiv);

                        // Add event listener to close the details div
                        detailsDiv.querySelector('.close-button').addEventListener('click', () => {
                            document.body.removeChild(detailsDiv);
                        });
                    });
                });
            }
            else {
                main.innerHTML = "API CALL WAS UNSUCCESSFUL!!!";
            }
        }
    }
}
