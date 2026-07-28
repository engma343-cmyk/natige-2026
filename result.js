const student = JSON.parse(localStorage.getItem("student"));

if (!student) {
    alert("لم يتم العثور على بيانات الطالب");
    window.location.href = "index.html";
}

// عرض البيانات
document.getElementById("studentName").textContent = student.name;
document.getElementById("seatNo").textContent = student.seatNo;
document.getElementById("total").textContent = student.total + " درجة";
document.getElementById("percentage").textContent = student.percentage + "%";
document.getElementById("grade").textContent = student.grade;

const circleText = document.getElementById("percentageCircle");
const statusBox = document.getElementById("statusBox");
const message = document.getElementById("message");
const circle = document.querySelector(".circle");

// عداد النسبة
let start = 0;
const end = Number(student.percentage);

const counter = setInterval(() => {

    if (start >= end) {

        circleText.textContent = end + "%";
        clearInterval(counter);

    } else {

        start++;
        circleText.textContent = start + "%";

    }

}, 20);

// حركة الدائرة
const percent = Number(student.percentage);

let progress = 0;

const progressBar = setInterval(() => {

    if (progress >= percent) {

        clearInterval(progressBar);

    } else {

        progress++;

        const degree = progress * 3.6;

        if (student.status === "ناجح") {

            circle.style.background =
                `conic-gradient(#16a34a ${degree}deg,#e5e7eb ${degree}deg)`;

        } else {

            circle.style.background =
                `conic-gradient(#dc2626 ${degree}deg,#e5e7eb ${degree}deg)`;

        }

    }

},20);

// نجاح
if (student.status === "ناجح") {

    statusBox.innerHTML = `
        <div class="success">
            🎉 ألف مبروك النجاح 🎉
        </div>
    `;

    
    ;

    // سقوط الأعشاب
    const herbs = ["🌿","🍃","🌱","🌾","🌼","🌺","🌿","🍃"];

    const herbsBox = document.getElementById("herbs");

    setInterval(()=>{

        const leaf = document.createElement("div");

        leaf.className = "herb";

        leaf.innerHTML = herbs[Math.floor(Math.random()*herbs.length)];

        leaf.style.left = Math.random()*100+"vw";

        leaf.style.animationDuration = (4+Math.random()*4)+"s";

        leaf.style.fontSize = (25+Math.random()*20)+"px";

        herbsBox.appendChild(leaf);

        setTimeout(()=>{

            leaf.remove();

        },8000);

    },250);

}

// رسوب
else {

    statusBox.innerHTML = `
        <div class="fail">
            ❌ لم يحالفك التوفيق
        </div>
    `;

    message.innerHTML = `
        <h2 style="color:#dc2626">
            🌿 عطارة الأزهر تتمنى لك التوفيق 🌿
        </h2>

        <p>
            لا تجعل هذه النتيجة نهاية الطريق،
            واجعلها بداية جديدة للنجاح.
            نسأل الله أن يوفقك فيما هو قادم.
        </p>
    `;

}