<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $rgb = $_POST['rgb'];
    $apiKey = '';
    $apiUrl = "https://rebrickable.com/api/v3/lego/colors/?key=$apiKey";

    // Getting the response from the API URL
    $response = file_get_contents($apiUrl);
    // Decoding the JSON response and get the results
    $colors = json_decode($response, true)['results'];

    // Filtering colors based on the provided RGB code
    $foundColors = array_filter($colors, function ($color) use ($rgb) {
        return strtoupper($color['rgb']) === strtoupper($rgb);
    });

    // Re-indexing the array
    $foundColors = array_values($foundColors);
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <title>Search Results</title>
</head>

<body>
    <div class="w3-container w3-center w3-pink">
        <h1 class="w3-cursive w3-text-white">Search Results</h1>
    </div>

    <div class="w3-container w3-margin-top">
        <form action="search.php" method="POST" class="w3-center">
            <input type="text" name="rgb" placeholder="Enter RGB code (e.g., FFFFFF)" class="w3-input w3-border w3-round-large w3-center" style="display:inline-block; width: 300px;">
            <button type="submit" class="w3-button w3-pink w3-round-large">Search</button>
        </form>
    </div>

    <div class="w3-container" id="mainBody">
        <?php if (!empty($foundColors)) : ?>
            <?php foreach ($foundColors as $index => $color) : ?>
                <div class="w3-padding-large w3-cell w3-quarter">
                    <div class="w3-card-4 w3-round-xlarge">
                        <div class="w3-padding-64" style="background-color: #<?= $color['rgb']; ?>;">
                        </div>
                        <div class="w3-padding-large w3-monospace">
                            <p><strong>RGB: </strong><?= $color['rgb']; ?></p>
                            <p><strong>Color: </strong><?= $color['name']; ?></p>
                            <div class="w3-right-align">
                                <strong><a href="#" class="more-link w3-text-pink" data-index="<?= $index; ?>">More</a></strong>
                            </div>
                        </div>
                    </div>
                </div>

            <?php endforeach; ?>
        <?php else : ?>
            <p class="w3-text-pink w3-center" style="font-size: 30px;">No colors found with RGB code <?= htmlspecialchars($rgb); ?>.</p>
        <?php endif; ?>
    </div>

    <!-- Modal -->
    <div id="colorModal" class="w3-modal">
        <div class="w3-card-4 w3-round-xlarge" id="modalContent">
            <div class="w3-container w3-padding-large w3-monospace w3-large"></div>
        </div>
    </div>

    <script>
        // Adding event listener to each 'More' link
        document.addEventListener('DOMContentLoaded', () => {
            const moreLinks = document.querySelectorAll('.more-link');
            const modal = document.getElementById('colorModal');
            const modalContent = document.getElementById('modalContent');
            const closeModal = document.querySelector('.w3-closebtn');

            moreLinks.forEach(link => {
                link.addEventListener('click', (event) => {
                    event.preventDefault();

                    const index = link.getAttribute('data-index');
                    const color = <?php echo json_encode($foundColors); ?>[index];

                    const brickLinkName = (color.external_ids.BrickLink && color.external_ids.BrickLink.ext_descrs[0]) || "N/A";
                    const brickOwlName = (color.external_ids.BrickOwl && color.external_ids.BrickOwl.ext_descrs[0]) || "N/A";
                    const legoName = (color.external_ids.LEGO && color.external_ids.LEGO.ext_descrs[0]) || "N/A";
                    const peeronName = (color.external_ids.Peeron && color.external_ids.Peeron.ext_descrs[0]) || "N/A";
                    const lDrawName = (color.external_ids.LDraw && color.external_ids.LDraw.ext_descrs[0]) || "N/A";

                    modalContent.innerHTML = `
                        <div class="w3-card-4 w3-round-xlarge w3-display-middle w3-modal-content" style="display: flex; flex-direction: row;">
                            
                                <div style="background-color: #${color.rgb}; flex:1;">
                                </div>
                                <div class="w3-padding-64 w3-padding-large w3-monospace w3-large" style="flex: 1;">
                                    <div class="w3-display-topright w3-pink">
                                        <button class="w3-button close-button">Close</button>
                                    </div>
                                    <p><strong>RGB: </strong><span>${color.rgb}</span></p>
                                    <p><strong>Color name: </strong><span>${color.name}</span></p>
                                    <p><strong>BrickLink: </strong><span>${brickLinkName}</span></p>
                                    <p><strong>BrickOwl: </strong><span>${brickOwlName}</span></p>
                                    <p><strong>LEGO: </strong><span>${legoName}</span></p>
                                    <p><strong>Peeron: </strong><span>${peeronName}</span></p>
                                    <p><strong>LDraw: </strong><span>${lDrawName}</span></p>
                                </div>
                            </div>
                    `;

                    modal.style.display = 'block';

                    // Adding close button functionality
                    const closeButton = document.querySelector('.close-button');
                    closeButton.addEventListener('click', () => {
                        modal.style.display = 'none';
                    });
                });
            });


        });
    </script>
</body>

</html>