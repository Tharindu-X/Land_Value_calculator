        // Predefined data for Katunayke areas
        const katunaykeData = {
        
            "1": [855955.767, 881111.933, 874205.876, 849362.070, 879228.652, 928505.984,
                1001734.694, 1162054.822, 1274706.246, 1378050.982, 1509064.591,
                1712606.704, 1892413.396, 2055806.337, 2209910.798, 2245962.476,
                2226339.242, 2141202.136, 2047988.204, 1984360.805, 2033384.156,
                2165963.470, 2379288.431, 2641046.414, 2873770.203, 3089327.584,
                3259926.497, 3308889.163, 3401815.642, 3468742.897, 3433926.108],

            "2": [612342.4529, 588404.3918, 585608.0309, 608963.5718, 679277.7887,
                729254.8035, 807682.5789, 917281.9518, 1018363.857, 1130522.139,
                1253307.111, 1368043.101, 1486630.018, 1578532.784, 1619673.222,
                1573938.212, 1506493.87, 1450823.115, 1414039.108, 1479078.275,
                1616639.625, 1740187.245, 1927410.667, 2078886.245, 2239474.005,
                2358586.919, 2402446.712, 2452475.67, 2462431.112, 2494621.179, 2747677.293],

            "3": [282889.6316, 305611.3322, 326068.4508, 283284.942, 311291.3518,
                346738.6828, 394430.0012, 437807.3446, 486189.1157, 575501.3099,
                608945.6655, 658505.9221, 717310.776, 756468.1976, 770286.9627,
                757821.0782, 714883.7468, 695719.3271, 687563.4696, 714616.0519,
                757083.0359, 843655.5339, 941530.7179, 1007100.361, 1124310.082,
                1131582.082, 1151403.743, 1165657.572, 1171466.744, 1220151.114, 1315673.168],

            "4": [22847.98711, 24083.7395, 25522.65226, 27337.66359, 28744.67513,
                30697.36539, 36422.79426, 50753.15654, 63315.51982, 68454.97371,
                74737.83436, 81190.27517, 88364.69087, 109167.6421, 141377.7968,
                158167.9108, 161623.3162, 170478.4223, 191170.5588, 214628.027,
                234989.3983, 261490.9142, 296961.709, 369488.2853, 413218.1372,
                378941.1195, 362906.5606, 344536.4969, 345945.1875, 338462.6596,
                385953.975],

            "5": [16469.17674, 17497.16793, 19060.47249, 20422.44238, 21445.69628,
                22879.90979, 24681.263, 34243.47593, 45264.77313, 51539.30918,
                54752.37379, 53810.83809, 56995.47898, 71831.47618, 99872.65968,
                116806.0905, 117195.732, 128234.7943, 146611.9133, 156354.1431,
                166150.8517, 181228.4505, 205356.6353, 259745.4223, 276843.4739,
                261713.7649, 264865.2448, 252293.6706, 225866.7175, 233271.8248,
                292089.1],
        };
    


// Function to calculate the average gradient
function calculateAverageGradient(values) {
    if (values.length < 2) {
        alert("Error: At least two values are needed to calculate the gradient.");
        return 0;
    }

    let sum = 0;
    for (let i = 1; i < values.length; i++) {
        sum += values[i] - values[i - 1];
    }

    return (sum / (values.length - 1)) * 4;
}

// Function for district selection
function selectDistrict() {
    const district = document.getElementById("district").value.toLowerCase();
    if (district === "katunayke") {
        document.getElementById("district-selection").style.display = "none";
        document.getElementById("gradient-section").style.display = "block";

    } else {
        document.getElementById("district-selection").style.display = "none";
        // document.getElementById("gradient-section").style.display = "none";
        // document.getElementById("input-section").style.display = "block";
        // document.getElementById("budget-section").style.display = "block";
        document.getElementById("input-section-other-district").style.display = "block"; 
    }
}


// Function to calculate gradient for Katunayke
function calculateGradient() {
    const area = document.getElementById("area").value;
    const values = katunaykeData[area];

    if (!values) {
        alert("Invalid area selection.");
        return;
    }

    const gradient = calculateAverageGradient(values);
    document.getElementById("gradient-result").innerHTML = `<p>Calculated Average Gradient: Rs. ${gradient.toFixed(2)}</p>`;
    document.getElementById("budget-section").style.display = "block";
}

// Function to calculate gradient for other districts
function calculateGradientOtherDistrict() {
    const years = parseInt(document.getElementById("years-other-district").value);
    const values = [];

    for (let i = 0; i < years; i++) {
        const value = parseFloat(prompt(`Enter the land value for year ${i + 1}:`));
        if (isNaN(value) || value <= 0) {
            alert("Invalid value entered. Please enter valid land values.");
            return;
        }
        values.push(value);
    }

    const gradient = calculateAverageGradient(values);
    document.getElementById("gradient-result").innerHTML = `<p>Calculated Average Gradient: Rs. ${gradient.toFixed(2)}</p>`;
    document.getElementById("budget-section").style.display = "block";
}

// Function to calculate costs
function calculateCosts() {
    const budget = parseFloat(document.getElementById("budget").value);
    if (isNaN(budget) || budget <= 0) {
        alert("Please enter a valid budget.");
        return;
    }

    const totalStampfees = budget * 0.015;
    const lawyerFees = budget * 0.01;
    const averageSurveyFees = 50000;
    const fundsForLand = budget - totalStampfees - lawyerFees - averageSurveyFees;

    document.getElementById("costs-result").innerHTML = `
        <p>Budget: Rs. ${budget.toFixed(2)}</p>
        <p>Stamp Duty: Rs. ${totalStampfees.toFixed(2)}</p>
        <p>Lawyer Fees: Rs. ${lawyerFees.toFixed(2)}</p>
        <p>Average Survey Fees: Rs. ${averageSurveyFees.toFixed(2)}</p>
        <p>Funds Ready for Land Purchase: Rs. ${fundsForLand.toFixed(2)}</p>
        <p>Rounded value of your Land Purchase: Rs. ${Math.round(fundsForLand / 500000.0) * 500000.0}</p>
    `;
    document.getElementById("predictive-analysis").style.display = "block";
}

// Function for predictive analysis
function calculatePrediction() {
    const price = parseFloat(document.getElementById("price").value);
    const years = parseInt(document.getElementById("years").value);

    if (isNaN(price) || isNaN(years) || years <= 0) {
        alert("Please enter valid price and years.");
        return;
    }

    const averageGrowth = 0.05;
    const predictedPrice = price * Math.pow(1 + averageGrowth, years);
    const anticipatedRise = predictedPrice - price;

    document.getElementById("predictive-result").innerHTML = `
        <p>Annual Perch Land Price Growth: ${averageGrowth * 100}%</p>
        <p>Anticipated Rise in Land Value for Next ${years} years: Rs. ${anticipatedRise.toFixed(2)}</p>
        <p>Estimated Terminal Value of Land in ${years} Years: Rs. ${predictedPrice.toFixed(2)}</p>
        <p class="border p-2 border-blue-500 inline-block">Rounded Value of Your Land after ${years} years: Rs. ${Math.round(predictedPrice / 500000.0) * 500000.0}</p>
    `;
}
// Function to reset the form and hide all sections
function resetForm() {
    // Reset input fields
    document.getElementById("district").value = '';
    document.getElementById("area").value = '';
    document.getElementById("budget").value = '';
    document.getElementById("price").value = '';
    document.getElementById("years").value = '';

    // Hide all result sections
    document.getElementById("gradient-result").innerHTML = '';
    document.getElementById("costs-result").innerHTML = '';
    document.getElementById("predictive-result").innerHTML = '';

    // Show the initial district selection
    document.getElementById("district-selection").style.display = "block";
    document.getElementById("gradient-section").style.display = "none";
    document.getElementById("budget-section").style.display = "none";
    document.getElementById("predictive-analysis").style.display = "none";
    document.getElementById("input-section-other-district").style.display = "none";
}




    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    let slideIndex = 0;

    // Function to move to the next slide
    function nextSlide() {
        slideIndex++;

        if (slideIndex >= totalSlides) {
            slideIndex = 0; // Reset to first slide when reaching the last one
        }

        // Move the slider by a percentage to show the next image
        slider.style.transform = `translateX(-${slideIndex * 100}%)`;
    }

    // Change slide every 3 seconds
    setInterval(nextSlide, 3000);




// ---------------------auto typing-----------------------

let textType = document.querySelector('.typeing')
let textArray = textType.dataset.typeingtext.split("")
let typeCount = 0;

let autoTypeText = () => {
    if(typeCount < textType.dataset.typeingtext.length){
        textType.innerHTML += textType.dataset.typeingtext.charAt(typeCount)
        typeCount++
        textArray = textType.dataset.typeingtext.split("")
    }else {
        textArray.pop()
        textType.innerHTML = textArray.join("")
        if(textArray.length == 0){
            typeCount = 0
        }
    }  
}
setInterval(() => {
    autoTypeText()
},150)



// ----------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const teamRow = document.getElementById("team-row");
    let scrollAmount = 0;
    const scrollSpeed = 2; // Speed of scrolling (pixels per interval)
    const scrollInterval = 30; // Time interval in ms
    let scrollDirection = 1; // 1 for right, -1 for left

    function autoScroll() {
      if (teamRow.scrollWidth > teamRow.clientWidth) {
        scrollAmount += scrollSpeed * scrollDirection;
        teamRow.scrollLeft = scrollAmount;

        // Reverse direction if reaching start or end
        if (teamRow.scrollLeft + teamRow.clientWidth >= teamRow.scrollWidth || teamRow.scrollLeft <= 0) {
          scrollDirection *= -1; // Change direction
        }
      }
    }

    setInterval(autoScroll, scrollInterval);
  });